import React, { useState, memo, useRef, useCallback, useEffect } from "react";
import { navigate } from "gatsby";
import { getCurrentContactFormConfig } from "../../config/contactFormConfig";
import { TURNSTILE_SITE_KEY } from "../../config/turnstileConfig";

interface ContactCardPropsType {
  setIsModalShow?: React.Dispatch<React.SetStateAction<boolean>>;
  showEmail?: boolean;
  useConfig?: boolean;
  isShowModalTitle?: boolean;
}

interface FormFields {
  name: string;
  mobile: string;
  email: string;
  consent: boolean;
}

function ContactCard({
  setIsModalShow,
  showEmail,
  useConfig,
  isShowModalTitle,
}: ContactCardPropsType) {
  const [formData, setFormData] = useState<FormFields>({
    name: "",
    mobile: "",
    email: "",
    consent: false,
  });

  const [apiMessage, setApiMessage] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  const formRef = useRef<HTMLFormElement>(null);
  const turnstileWidgetRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  const [turnstileToken, setTurnstileToken] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSubmittingRef = useRef(false);

  const [utmData, setUtmData] = useState({
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
  });
  const [pathname, setPathname] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setPathname(window.location.pathname);

      setUtmData({
        utm_source: params.get("utm_source") || "",
        utm_medium: params.get("utm_medium") || "",
        utm_campaign: params.get("utm_campaign") || "",
      });
    }
  }, []);  

  useEffect(() => setIsClient(true), []);

  useEffect(() => {
    if (!isClient) return;

    // Script is loaded globally via gatsby-browser.js
    // Note: CSP warnings from "normal?lang=auto:1" are expected - they originate from
    // inside Cloudflare's Turnstile iframe and cannot be eliminated from our end

    const removeWidget = () => {
      try {
        if (widgetIdRef.current && (window as any).turnstile) {
          (window as any).turnstile.remove(widgetIdRef.current);
        }
      } catch (_) {
        // ignore removal errors
      }
      widgetIdRef.current = null;
    };

    const renderWidget = () => {
      if (!(window as any).turnstile || !turnstileWidgetRef.current) return;

      // Properly remove previous widget before re-rendering
      removeWidget();

      const widgetSize = window.innerWidth < 768 ? "compact" : "normal";

      try {
        const id = (window as any).turnstile.render(turnstileWidgetRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          callback: (token: string) => {
            setTurnstileToken(token);
          },
          "expired-callback": () => setTurnstileToken(""),
          "error-callback": (error: any) => {
            console.error("Turnstile error:", error);
            setTurnstileToken("");
          },
          theme: "dark",
          size: widgetSize,
        });
        widgetIdRef.current = id;
      } catch (err) {
        console.error("Turnstile render error:", err);
      }
    };

    // Poll until turnstile is available (with 30s timeout)
    let attempts = 0;
    const maxAttempts = 75; // 75 * 400ms = 30 seconds
    
    const interval = setInterval(() => {
      attempts++;
      if ((window as any).turnstile) {
        clearInterval(interval);
        renderWidget();
      } else if (attempts >= maxAttempts) {
        console.error('Turnstile script failed to load after 30 seconds');
        clearInterval(interval);
      }
    }, 400);

    // Debounced resize handler to avoid rapid re-renders
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(renderWidget, 300);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      clearInterval(interval);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      removeWidget();
    };
  }, [isClient]);

  const shouldShowEmail = useConfig
    ? getCurrentContactFormConfig(pathname ?? undefined).showEmail
    : showEmail;

  const handleInputChange = useCallback(
    (field: keyof FormFields, value: string | boolean) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setApiMessage("");
      setIsSuccess(null);
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      // prevent duplicate submissions
      if (isSubmittingRef.current) return;

      if (
        !formData.name ||
        !formData.mobile ||
        !formData.consent ||
        (shouldShowEmail && !formData.email)
      ) {
        alert("Please fill all required fields and give consent.");
        return;
      }

      if (!turnstileToken) {
        alert("Please complete the CAPTCHA.");
        return;
      }

      setApiMessage("");
      setIsSuccess(null);

      setIsSubmitting(true);
      isSubmittingRef.current = true;

      try {
        const form_payload = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
          if (key === "mobile") {
            const mobileWithPrefix = value.toString().startsWith("+91")
              ? value.toString()
              : `+91${value}`;
            form_payload.append(key, mobileWithPrefix);
          } else {
            form_payload.append(key, value.toString());
          }
        });

        Object.entries(utmData).forEach(([key, value]) => {
          if (value) {
            form_payload.append(key, value);
          }
        });

        form_payload.append("property", "Moonglade");
        form_payload.append("turnstileToken", turnstileToken);

        const apiResponse = await fetch(
          "https://irarealty.in/cms/api/submitMoonglade",
          {
            method: "POST",
            body: form_payload,
          }
        );

        const responseJson = await apiResponse.json();

        setApiMessage(responseJson.message);

        if (apiResponse.ok && responseJson.success) {
          setIsSuccess(true);

          setTimeout(() => {
            setFormData({ name: "", mobile: "", email: "", consent: false });
            setTurnstileToken("");
            // Reset the Turnstile widget for next use
            if (widgetIdRef.current && (window as any).turnstile) {
              (window as any).turnstile.reset(widgetIdRef.current);
            }
            navigate(`/thank-you?name=${encodeURIComponent(formData.name)}&phone=${encodeURIComponent(formData.mobile)}`);
          }, 1500);
        } else {
          setIsSuccess(false);
        }
      } catch (error: any) {
        setApiMessage(`Error: ${error.message}`);
        setIsSuccess(false);
      } finally {
        // allow retry after request completes (unless navigated away)
        setIsSubmitting(false);
        isSubmittingRef.current = false;
      }
    },
    [formData, turnstileToken, shouldShowEmail, utmData]
  );

  if (!isClient) return null;
  return (
    <section className="w-[237px] md:w-[300px] lg:w-[320px] xl:w-[420px] bg-contactFormBG/70 rounded-xl shadow-lg p-6 sm:p-7 md:p-8 lg:p-8 backdrop-blur-lg">
      <form
        ref={formRef}
        className="flex flex-col gap-6"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        {isShowModalTitle && (
          <header className="flex flex-col gap-1 text-primaryTitleText">
            <h2 className="font-normal text-[20px] md:text-[36px] leading-none tracking-normal">
              We are excited to
            </h2>
            <h1 className="font-normal text-[36px] md:text-[66px] leading-none tracking-normal">
              meet you
            </h1>
          </header>
        )}

        <div>
          <label
            htmlFor="name"
            className="block text-primaryTitleText font-['Prata'] text-[10.5px] md:text-[21px] mb-1"
          >
            Name:
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="w-full font-['Prata'] text-12px md:text-24px text-placeholderText bg-transparent border-0 border-b-2 border-bgPrimary focus:ring-0 focus:border-bgPrimary pb-1 md:pb-3 pl-1 outline-none"
            required
          />
        </div>

        {shouldShowEmail && (
          <div>
            <label
              htmlFor="email"
              className="block text-primaryTitleText font-['Prata'] text-[10.5px] md:text-[21px] mb-1"
            >
              Email ID:
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="w-full font-['Prata'] text-12px md:text-24px text-placeholderText bg-transparent border-0 border-b-2 border-bgPrimary focus:ring-0 focus:border-bgPrimary pb-1 md:pb-3 pl-1 outline-none"
              required
            />
          </div>
        )}

        <div>
          <label
            htmlFor="mobile"
            className="block text-primaryTitleText font-['Prata'] text-[10.5px] md:text-[21px] mb-1"
          >
            Mobile Number:
          </label>
          <input
            id="mobile"
            type="tel"
            value={formData.mobile}
            onChange={(e) => handleInputChange("mobile", e.target.value)}
            className="w-full font-['Prata'] text-14px md:text-24px text-placeholderText bg-transparent border-0 border-b-2 border-bgPrimary focus:ring-0 focus:border-bgPrimary pb-1 md:pb-3 pl-1 outline-none"
            required
            pattern="[0-9+\- ]{10,15}"
          />
        </div>

        <div className="flex gap-3 items-start">
          <input
            id="consent"
            type="checkbox"
            checked={formData.consent}
            onChange={(e) => handleInputChange("consent", e.target.checked)}
            className="mt-1 bg-transparent rounded border border-bgPrimary"
            required
          />
          <label
            htmlFor="consent"
            className="font-['Prata'] text-[5px] md:text-[10px] text-primaryTitleText"
          >
            I authorize representatives of Moonglade to call, SMS, Email, or
            WhatsApp me about its products and offers. This consent overrides
            any registration for DNC/NDNC.
          </label>
        </div>

        <div className="mt-4 w-full flex justify-center overflow-hidden">
          <div
            ref={turnstileWidgetRef}
            className="turnstile-widget w-full max-w-[280px] md:max-w-[320px] scale-95 md:scale-100 origin-top"
            style={{ minHeight: 65 }}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className={`font-['Prata'] text-primaryTitleText shadow-sm rounded-full text-[8px] md:text-[16px] lg:text-[18px] border-[0.58px] border-bgPrimary px-3 py-1 md:px-6 md:py-2 lg:px-8 lg:py-2 mt-2 md:mt-4 ${
            isSubmitting ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          {isShowModalTitle ? "Book Your Private Tour" : "Submit"}
        </button>

        {apiMessage && (
          <div
            className={`text-sm font-['Prata'] mt-2 ${
              isSuccess ? "text-green-500" : "text-red-500"
            }`}
          >
            {apiMessage}
          </div>
        )}
      </form>
    </section>
  );
}

export default memo(ContactCard);
