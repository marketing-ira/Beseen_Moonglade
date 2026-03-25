import React, { useState, memo, useRef, useCallback, useEffect } from "react";
import { navigate } from "gatsby";
import { getCurrentContactFormConfig } from "../../config/contactFormConfig";
import { TURNSTILE_SITE_KEY } from "../../config/turnstileConfig";

interface ContactCardPropsType {
  setIsModalShow?: React.Dispatch<React.SetStateAction<boolean>>;
  showEmail?: boolean;
  useConfig?: boolean;
  isShowModalTitle?: boolean;
  showBhkPreference?: boolean;
  variant?: "default" | "hero" | "inline-light";
  submitLabel?: string;
}

interface FormFields {
  name: string;
  mobile: string;
  email: string;
  bhkPreference: string;
  consent: boolean;
}

function ContactCard({
  setIsModalShow,
  showEmail,
  useConfig,
  isShowModalTitle,
  showBhkPreference = false,
  variant = "default",
  submitLabel,
}: ContactCardPropsType) {
  const [formData, setFormData] = useState<FormFields>({
    name: "",
    mobile: "",
    email: "",
    bhkPreference: "",
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
        const widgetTheme = variant === "hero" ? "dark" : "light";
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
          theme: widgetTheme,
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
  }, [isClient, variant]);

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
        (showBhkPreference && !formData.bhkPreference) ||
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
            setFormData({ name: "", mobile: "", email: "", bhkPreference: "", consent: false });
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

  const isHeroVariant = variant === "hero";
  const isInlineLightVariant = variant === "inline-light";
  const containerClasses = isHeroVariant
    ? "w-[300px] xl:w-[360px] bg-[#B88A73]/95 rounded-2xl shadow-[0_24px_80px_rgba(7,17,48,0.32)] p-5 xl:p-6"
    : isInlineLightVariant
    ? "w-full"
    : "w-[237px] md:w-[300px] lg:w-[320px] xl:w-[420px] bg-contactFormBG/70 rounded-xl shadow-lg p-6 sm:p-7 md:p-8 lg:p-8 backdrop-blur-lg";
  const formClasses = isHeroVariant
    ? "flex flex-col gap-4"
    : isInlineLightVariant
    ? "grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2 md:gap-y-10"
    : "flex flex-col gap-6";
  const labelClasses = isHeroVariant
    ? "block text-white/95 font-['Poppins'] text-[12px] xl:text-[14px] mb-2"
    : isInlineLightVariant
    ? "block font-['Prata'] text-[12px] md:text-[14px] leading-none text-primaryText"
    : "block text-primaryTitleText font-['Prata'] text-[10.5px] md:text-[21px] mb-1";
  const inputClasses = isHeroVariant
    ? "w-full font-['Prata'] text-[14px] text-white placeholder:text-white/60 bg-transparent border-0 border-b border-white/50 focus:ring-0 focus:border-white pb-2 pl-0 outline-none"
    : isInlineLightVariant
    ? "mt-3 w-full appearance-none border-0 border-b border-[#BFC0C8] bg-transparent pb-3 pl-0 font-['Prata'] text-[14px] leading-none text-primaryText outline-none focus:border-[#2B2F86] focus:ring-0 md:text-[16px]"
    : "w-full font-['Prata'] text-12px md:text-24px text-placeholderText bg-transparent border-0 border-b-2 border-bgPrimary focus:ring-0 focus:border-bgPrimary pb-1 md:pb-3 pl-1 outline-none";
  const mobileInputClasses = isHeroVariant
    ? "w-full font-['Prata'] text-[14px] text-white placeholder:text-white/60 bg-transparent border-0 border-b border-white/50 focus:ring-0 focus:border-white pb-2 pl-0 outline-none"
    : isInlineLightVariant
    ? "mt-3 w-full border-0 border-b border-[#BFC0C8] bg-transparent pb-3 pl-0 font-['Prata'] text-[14px] leading-none text-primaryText outline-none focus:border-[#2B2F86] focus:ring-0 md:text-[16px]"
    : "w-full font-['Prata'] text-14px md:text-24px text-placeholderText bg-transparent border-0 border-b-2 border-bgPrimary focus:ring-0 focus:border-bgPrimary pb-1 md:pb-3 pl-1 outline-none";
  const consentLabelClasses = isHeroVariant
    ? "font-['Prata'] text-[7px] xl:text-[8px] leading-[1.4] text-white/80"
    : isInlineLightVariant
    ? "font-['Prata'] text-[9px] leading-[1.45] text-primaryText md:text-[11px]"
    : "font-['Prata'] text-[5px] md:text-[10px] text-primaryTitleText";
  const submitButtonClasses = isHeroVariant
    ? `font-['Prata'] text-white shadow-sm rounded-full text-[12px] xl:text-[14px] border border-white/60 px-6 py-2 mt-2 hover:bg-white/10 ${
        isSubmitting ? "opacity-50 pointer-events-none" : ""
      }`
    : isInlineLightVariant
    ? `inline-flex min-w-[182px] items-center justify-center rounded-full border border-[#2B2F86] px-7 py-3 font-['Prata'] text-[14px] leading-none text-[#2B2F86] transition-colors hover:bg-[#2B2F86] hover:text-white md:min-w-[204px] md:px-9 md:text-[16px] ${
        isSubmitting ? "opacity-50 pointer-events-none" : ""
      }`
    : `font-['Prata'] text-primaryTitleText shadow-sm rounded-full text-[8px] md:text-[16px] lg:text-[18px] border-[0.58px] border-bgPrimary px-3 py-1 md:px-6 md:py-2 lg:px-8 lg:py-2 mt-2 md:mt-4 ${
        isSubmitting ? "opacity-50 pointer-events-none" : ""
      }`;

  return (
    <section className={containerClasses}>
      <form
        ref={formRef}
        className={formClasses}
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

        <div className={isInlineLightVariant ? "" : undefined}>
          <label
            htmlFor="name"
            className={labelClasses}
          >
            Name:
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className={inputClasses}
            placeholder={isHeroVariant ? "Sushma Sethupathi" : undefined}
            required
          />
        </div>

        {isInlineLightVariant && showBhkPreference && (
          <div>
            <label
              htmlFor="bhkPreference"
              className={labelClasses}
            >
              Prefer BHK
            </label>
            <div className="relative">
              <select
                id="bhkPreference"
                value={formData.bhkPreference}
                onChange={(e) => handleInputChange("bhkPreference", e.target.value)}
                className={inputClasses + " pr-10"}
                required
              >
                <option value="" disabled className="text-slate-900">
                  Select BHK
                </option>
                <option value="3 BHK" className="text-slate-900">
                  3 BHK
                </option>
                <option value="4 BHK" className="text-slate-900">
                  4 BHK
                </option>
              </select>
              <span className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-[#777780]">
                <svg
                  width="14"
                  height="8"
                  viewBox="0 0 14 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M1 1L7 7L13 1"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>
        )}

        {shouldShowEmail && (
          <div className={isInlineLightVariant ? "md:col-span-2" : undefined}>
            <label
              htmlFor="email"
              className={labelClasses}
            >
              Email ID:
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={inputClasses}
              required
            />
          </div>
        )}

        <div className={isInlineLightVariant ? "md:col-span-2" : undefined}>
          <label
            htmlFor="mobile"
            className={labelClasses}
          >
            Mobile Number:
          </label>
          <input
            id="mobile"
            type="tel"
            value={formData.mobile}
            onChange={(e) => handleInputChange("mobile", e.target.value)}
            className={mobileInputClasses}
            placeholder={isHeroVariant ? "+91 7853218970" : undefined}
            required
            pattern="[0-9+\- ]{10,15}"
          />
        </div>

        {!isInlineLightVariant && showBhkPreference && (
          <div>
            <label
              htmlFor="bhkPreference"
              className={labelClasses}
            >
              Prefer BHK
            </label>
            <select
              id="bhkPreference"
              value={formData.bhkPreference}
              onChange={(e) => handleInputChange("bhkPreference", e.target.value)}
              className={inputClasses}
              required
            >
              <option value="" disabled className="text-slate-900">
                Select BHK
              </option>
              <option value="3 BHK" className="text-slate-900">
                3 BHK
              </option>
              <option value="4 BHK" className="text-slate-900">
                4 BHK
              </option>
            </select>
          </div>
        )}

        <div className={isInlineLightVariant ? "flex items-start gap-3 md:col-span-2" : "flex items-start gap-3"}>
          <input
            id="consent"
            type="checkbox"
            checked={formData.consent}
            onChange={(e) => handleInputChange("consent", e.target.checked)}
            className={isHeroVariant ? "mt-1 h-3.5 w-3.5 bg-transparent rounded border border-white/60" : isInlineLightVariant ? "mt-0.5 h-4 w-4 rounded border border-[#BFC0C8] bg-transparent" : "mt-1 bg-transparent rounded border border-bgPrimary"}
            required
          />
          <label
            htmlFor="consent"
            className={consentLabelClasses}
          >
            I authorize representatives of Moonglade to call, SMS, Email, or
            WhatsApp me about its products and offers. This consent overrides
            any registration for DNC/NDNC.
          </label>
        </div>

        <div className={isHeroVariant ? "w-full flex justify-center overflow-hidden" : isInlineLightVariant ? "mt-4 w-full flex justify-center overflow-hidden md:col-span-2 md:justify-start" : "mt-4 w-full flex justify-center overflow-hidden"}>
          <div
            ref={turnstileWidgetRef}
            className={isHeroVariant ? "turnstile-widget w-full max-w-[280px] scale-[0.86] origin-top" : "turnstile-widget w-full max-w-[280px] md:max-w-[320px] scale-95 origin-top md:scale-100"}
            style={{ minHeight: 65 }}
          />
        </div>

        <div className={isInlineLightVariant ? "md:col-span-2" : undefined}>
          <button
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className={submitButtonClasses}
          >
            {submitLabel ?? (isShowModalTitle ? "Book Your Private Tour" : "Submit")}
          </button>
        </div>

        {apiMessage && (
          <div
            className={`${isInlineLightVariant ? "md:col-span-2" : ""} text-sm font-['Prata'] mt-2 ${
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
