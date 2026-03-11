import React, { useState, useEffect, useRef, useCallback } from "react";
import { TURNSTILE_SITE_KEY } from "../config/turnstileConfig";
const PDF_URL = "/Moonglade-Brochure.pdf";
const PDF_FILENAME = "Moonglade-Brochure.pdf";

interface FormFields {
  name: string;
  mobile: string;
  consent: boolean;
}

interface DownloadState {
  isLoading: boolean;
  error: string | null;
}

function DownloadBrochureWithForm() {
  const [formData, setFormData] = useState<FormFields>({
    name: "",
    mobile: "",
    consent: false,
  });

  const [downloadState, setDownloadState] = useState<DownloadState>({
    isLoading: false,
    error: null,
  });

  const [apiMessage, setApiMessage] = useState<string>("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileWidgetRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [isClient, setIsClient] = useState(false);

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
          callback: (token: string) => setTurnstileToken(token),
          "expired-callback": () => setTurnstileToken(""),
          "error-callback": (error: any) => {
            console.error("Turnstile error:", error);
            setTurnstileToken("");
          },
          theme: "light",
          size: widgetSize,
        });
        widgetIdRef.current = id;
      } catch (err) {
        console.error("Turnstile render error:", err);
      }
    };

    // Poll until turnstile is available (with 30s timeout)
    let attempts = 0;
    const maxAttempts = 60; // 60 * 500ms = 30 seconds
    
    const interval = setInterval(() => {
      attempts++;
      if ((window as any).turnstile) {
        clearInterval(interval);
        renderWidget();
      } else if (attempts >= maxAttempts) {
        console.error('Turnstile script failed to load after 30 seconds');
        clearInterval(interval);
      }
    }, 500);

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

  const handleInputChange = useCallback(
    (field: keyof FormFields, value: string | boolean) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (downloadState.error) {
        setDownloadState((prev) => ({ ...prev, error: null }));
      }
    },
    [downloadState.error]
  );

  const downloadPdf = useCallback(async (): Promise<boolean> => {
    try {
      const link = document.createElement("a");
      link.href = PDF_URL;
      link.download = PDF_FILENAME;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return true;
    } catch (error) {
      console.error("Error downloading PDF:", error);
      return false;
    }
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!formData.name || !formData.mobile || !formData.consent) {
        alert("Please fill all required fields and give consent.");
        return;
      }
      if (!turnstileToken) {
        alert("Please complete the CAPTCHA.");
        return;
      }

      setDownloadState({ isLoading: true, error: null });
      setApiMessage("");

      try {
        const form_payload = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          if (key === "mobile") {
            const mobileWithPrefix = value.toString().startsWith("+91") ? value.toString() : `+91${value}`;
            form_payload.append(key, mobileWithPrefix);
          } else {
            form_payload.append(key, value.toString());
          }
        });
        form_payload.append("property", "Moonglade");
        form_payload.append("turnstileToken", turnstileToken);

        const apiResponse = await fetch(
          "https://irarealty.in/cms/api/submitMoonglade",
          { method: "POST", body: form_payload }
        );

        const responseJson = await apiResponse.json();

        if (apiResponse.ok && responseJson.success) {
          setApiMessage(responseJson.message || "Form submitted successfully!");
          setDownloadState({ isLoading: false, error: null });

          const downloadSuccess = await downloadPdf();
          if (!downloadSuccess) throw new Error("PDF download failed");

          setTimeout(() => {
            setFormData({ name: "", mobile: "", consent: false });
            setTurnstileToken("");
            // Reset the Turnstile widget for next submission
            if (widgetIdRef.current && (window as any).turnstile) {
              (window as any).turnstile.reset(widgetIdRef.current);
            }
          }, 3000);

          return;
        }

        throw new Error((responseJson && responseJson.message) || "Form submission failed");
      } catch (error: any) {
        console.error(error);
        setDownloadState({ isLoading: false, error: error.message });
      }
    },
    [formData, turnstileToken, downloadPdf]
  );

  useEffect(() => {
    if (apiMessage) {
      const timer = setTimeout(() => setApiMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [apiMessage]);

  // Prevent SSR rendering to avoid hydration issues
  if (!isClient) return null;

  return (
    <section className="px-4 sm:px-[120px] pt-7 pb-8 md:pt-24 md:pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-[72px] items-start md:items-end">
        <div>
          <h2 className="font-['Prata'] text-[24px] sm:text-[30px] md:text-[49px] text-primaryText">
            Download the <br /> Moonglade Brochure
          </h2>
          <h3 className="mt-6 font-['Prata'] text-[#43474E] text-[16px] md:text-[16px]">
            Please enter your details to download our brochure. Our team will
            get in touch with you and make sure your home buying journey is
            hassle-free.
          </h3>
        </div>

        <form className="w-full" onSubmit={handleSubmit} noValidate>
          <label
            htmlFor="db-name"
            className="block font-['Prata'] text-primaryText text-[16px] md:text-[20px]"
          >
            Name:
          </label>
          <input
            id="db-name"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="mt-3 w-full border-b border-[#C9C9C9] bg-transparent font-['Prata'] text-[18px] md:text-[24px] pb-3 outline-none"
            required
            disabled={downloadState.isLoading}
          />

          {/* Mobile */}
          <label
            htmlFor="db-mobile"
            className="block mt-8 font-['Prata'] text-primaryText text-[16px] md:text-[20px]"
          >
            Mobile Number:
          </label>
          <input
            id="db-mobile"
            type="tel"
            inputMode="tel"
            pattern="[0-9+\- ]{10,15}"
            value={formData.mobile}
            onChange={(e) => handleInputChange("mobile", e.target.value)}
            className="mt-3 w-full border-b border-[#C9C9C9] bg-transparent font-['Prata'] text-[18px] md:text-[24px] pb-3 outline-none"
            required
            disabled={downloadState.isLoading}
          />

          {/* Consent */}
          <div className="mt-6 flex items-start gap-3">
            <input
              id="db-consent"
              type="checkbox"
              checked={formData.consent}
              onChange={(e) => handleInputChange("consent", e.target.checked)}
              className="mt-1 h-4 w-4 rounded border border-[#C9C9C9]"
              required
              disabled={downloadState.isLoading}
            />
            <label
              htmlFor="db-consent"
              className="font-['Prata'] text-[7px] md:text-[14px] text-primaryText"
            >
              I authorize representatives of Moonglade to call, SMS, Email,
              or WhatsApp me about its products and offers. This consent
              overrides any registration for DNC/NDNC.
            </label>
          </div>

          {/* Turnstile */}
          <div className="mt-4 w-full flex justify-center overflow-hidden">
            <div
              ref={turnstileWidgetRef}
              className="turnstile-widget w-full max-w-[280px] md:max-w-[320px] scale-95 md:scale-100 origin-top"
              style={{ minHeight: 65 }}
            />
          </div>

          {/* Submit */}
          <div className="mt-8">
            <button
              type="submit"
              disabled={downloadState.isLoading}
              className="font-['Prata'] text-white bg-[#1E247E] shadow-sm rounded-full px-6 py-2 md:px-10 md:py-3 text-[12px] md:text-[24px] border-none disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {downloadState.isLoading ? "Submitting..." : "Download Brochure"}
            </button>
          </div>


          {/* Error */}
          {downloadState.error && (
            <div className="text-red-500 text-sm mt-2">
              {downloadState.error}
            </div>
          )}

          {/* Success */}
          {apiMessage && (
            <div className="text-green-600 text-sm mt-2">{apiMessage}</div>
          )}
        </form>
      </div>
    </section>
  );
}

export default DownloadBrochureWithForm;
