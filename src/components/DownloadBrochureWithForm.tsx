import React, { useState, useEffect, useRef, useCallback } from "react";
import { getTurnstileSiteKey } from "../config/turnstileConfig";
import { countryCodes } from "../utils/countryCodes";
import { useUtm } from "../hooks/useUtm";
const PDF_URL = "/Moonglade-Brochure.pdf";
const PDF_FILENAME = "Moonglade-Brochure.pdf";

interface FormFields {
  name: string;
  countryCode: string;
  mobile: string;
  bhkPreference: string;
  consent: boolean;
}

interface DownloadState {
  isLoading: boolean;
  error: string | null;
}

function DownloadBrochureWithForm() {
  const [formData, setFormData] = useState<FormFields>({
    name: "",
    countryCode: "+91",
    mobile: "",
    bhkPreference: "",
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
  const utmData = useUtm();

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
          sitekey: getTurnstileSiteKey(window.location.hostname),
          callback: (token: string) => setTurnstileToken(token),
          "expired-callback": () => setTurnstileToken(""),
          "error-callback": (error: any) => {
            // Only clear token on a genuine challenge failure (no token obtained yet).
            // Do NOT clear if the widget already succeeded (token was set via callback).
            // PAT/Private Access Token failures (ERR_SSL_PROTOCOL_ERROR on localhost)
            // fire this callback but the token is still valid.
            setTurnstileToken((prev) => {
              if (prev) return prev; // keep existing valid token
              console.error("Turnstile challenge failed:", error);
              return "";
            });
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

      if (
        !formData.name ||
        !formData.countryCode ||
        !formData.mobile ||
        !formData.bhkPreference ||
        !formData.consent
      ) {
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
        const mobileValue = `${formData.countryCode}${formData.mobile.toString().replace(/\D/g, "")}`;
        Object.entries(formData).forEach(([key, value]) => {
          if (key === "mobile") {
            form_payload.append(key, mobileValue);
          } else if (key === "countryCode") {
            return;
          } else {
            form_payload.append(key, value.toString());
          }
        });
        form_payload.append("property", "Moonglade");
        form_payload.append("turnstileToken", turnstileToken);

        // Append UTM parameters to POST body
        Object.entries(utmData).forEach(([key, value]) => {
          if (value) form_payload.append(key, value);
        });

        const apiResponse = await fetch("https://irarealty.in/cms/api/submitMoonglade", {
          method: "POST",
          body: form_payload,
        });

        const responseJson = await apiResponse.json();

        if (apiResponse.ok && responseJson.success) {
          setApiMessage(responseJson.message || "Form submitted successfully!");
          setDownloadState({ isLoading: false, error: null });

          const downloadSuccess = await downloadPdf();
          if (!downloadSuccess) throw new Error("PDF download failed");

          setTimeout(() => {
            setFormData({ name: "", countryCode: "+91", mobile: "", bhkPreference: "", consent: false });
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
    [formData, turnstileToken, downloadPdf, utmData]
  );

  useEffect(() => {
    if (apiMessage) {
      const timer = setTimeout(() => setApiMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [apiMessage]);

  // Prevent SSR rendering to avoid hydration issues
  if (!isClient) return null;

  const fieldLabelClassName =
    "block font-['Prata'] text-[12px] md:text-[14px] leading-none text-primaryText";
  const fieldInputClassName =
    "mt-3 w-full border-b border-[#BFC0C8] bg-transparent pb-3 font-['Prata'] text-[14px] md:text-[16px] leading-none text-primaryText outline-none placeholder:text-[#B2B2B8] disabled:opacity-70";
  const countryCodeSelectTextColor = "#181B20";

  return (
    <section className="bg-[#FFFDFC] px-4 pb-10 pt-8 sm:px-8 md:px-[72px] md:pb-16 md:pt-20 xl:px-[120px] xl:pb-20">
      <div className="mx-auto grid max-w-[1560px] grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(620px,1fr)] lg:gap-[88px] xl:gap-[110px]">
        <div className="max-w-[480px]  pt-2 md:pt-0">
          <h2 className="font-['Prata'] text-[36px] leading-[1.2] text-primaryText sm:text-[42px] md:text-[58px] md:leading-[1.12]">
            Download the <br /> Moonglade Brochure
          </h2>
          <p className="mt-8 max-w-[430px] font-['Prata'] text-[14px] leading-[1.7] text-[#43474E] md:text-[16px]">
            Please enter your details to download our brochure. Our team will
            get in touch with you and make sure your home buying journey is
            hassle-free.
          </p>
        </div>

        <form className="w-full max-w-[760px]" onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2 md:gap-y-10">
            <div>
              <label htmlFor="db-name" className={fieldLabelClassName}>
                Name:
              </label>
              <input
                id="db-name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={fieldInputClassName}
                required
                disabled={downloadState.isLoading}
              />
            </div>

            <div>
              <label htmlFor="db-bhk" className={fieldLabelClassName}>
                Prefer BHK
              </label>
              <div className="relative">
                <select
                  id="db-bhk"
                  value={formData.bhkPreference}
                  onChange={(e) => handleInputChange("bhkPreference", e.target.value)}
                  className={fieldInputClassName + " appearance-none pr-10"}
                  required
                  disabled={downloadState.isLoading}
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

            <div className="md:col-span-2">
              <label htmlFor="db-countryCode" className={fieldLabelClassName}>
                Country Code:
              </label>
              <div className="relative">
                <select
                  id="db-countryCode"
                  value={formData.countryCode}
                  onChange={(e) => handleInputChange("countryCode", e.target.value)}
                  style={{ color: countryCodeSelectTextColor }}
                  className={fieldInputClassName + " appearance-none"}
                  required
                  disabled={downloadState.isLoading}
                >
                  {countryCodes.map((code) => (
                    <option
                      key={code.value}
                      value={code.value}
                      style={{
                        color: "#181B20",
                        backgroundColor: "transparent",
                      }}
                    >
                      {code.label}
                    </option>
                  ))}
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

            <div className="md:col-span-2">
              <label htmlFor="db-mobile" className={fieldLabelClassName}>
                Mobile Number:
              </label>
              <input
                id="db-mobile"
                type="tel"
                inputMode="tel"
                pattern="[0-9\- ]{6,15}"
                value={formData.mobile}
                onChange={(e) => handleInputChange("mobile", e.target.value)}
                className={fieldInputClassName}
                placeholder="7853218970"
                required
                disabled={downloadState.isLoading}
              />
            </div>
          </div>

          <div className="flex items-start gap-3 mt-6 md:mt-7">
            <input
              id="db-consent"
              type="checkbox"
              checked={formData.consent}
              onChange={(e) => handleInputChange("consent", e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border border-[#BFC0C8]"
              required
              disabled={downloadState.isLoading}
            />
            <label
              htmlFor="db-consent"
              className="max-w-[700px] font-['Prata'] text-[9px] leading-[1.45] text-primaryText md:text-[11px]"
            >
              I authorize representatives of Moonglade to call, SMS, Email,
              or WhatsApp me about its products and offers. This consent
              overrides any registration for DNC/NDNC.
            </label>
          </div>

          <div className="flex justify-center w-full mt-4 overflow-hidden md:justify-start">
            <div
              ref={turnstileWidgetRef}
              className="turnstile-widget w-full max-w-[280px] md:max-w-[320px] scale-95 md:scale-100 origin-top"
              style={{ minHeight: 65 }}
            />
          </div>

          <div className="mt-7 md:mt-8">
            <button
              type="submit"
              disabled={downloadState.isLoading}
              className="inline-flex min-w-[188px] items-center justify-center rounded-full border border-[#2B2F86] px-7 py-3 font-['Prata'] text-[14px] leading-none text-[#2B2F86] transition-colors hover:bg-[#2B2F86] hover:text-white disabled:cursor-not-allowed disabled:opacity-70 md:min-w-[214px] md:px-9 md:text-[16px]"
            >
              {downloadState.isLoading ? "Submitting..." : "Download Brochure"}
            </button>
          </div>

          {downloadState.error && (
            <div className="mt-2 text-sm text-red-500">
              {downloadState.error}
            </div>
          )}

          {/* Success */}
          {apiMessage && (
            <div className="mt-2 text-sm text-green-600">{apiMessage}</div>
          )}
        </form>
      </div>
    </section>
  );
}

export default DownloadBrochureWithForm;
