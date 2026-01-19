import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MobileActions from "../components/MobileActions";

const ContactCard = React.lazy(
  () => import("../components/common/ContactCard")
);

interface MainLayoutProps {
  children: React.ReactNode;
  setIsModalShow: React.Dispatch<React.SetStateAction<boolean>>;
  setIsModalTitle: React.Dispatch<React.SetStateAction<boolean>>;
  isModalShow: boolean;
  isShowModalTitle: boolean;
}

function MainLayout({
  setIsModalShow,
  isModalShow,
  children,
  setIsModalTitle,
  isShowModalTitle
}: MainLayoutProps) {


  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const hash = window.location.hash;
    if (!hash) return;

    const id = hash.replace("#", "");
    let attempts = 0;
    const maxAttempts = 40;

    const interval = setInterval(() => {
      const el = document.getElementById(id);

      if (el) {
        const navHeight =
          window.innerWidth >= 1024 ? 88 :
          window.innerWidth >= 640 ? 76 : 64;

        const top = el.offsetTop - navHeight;

        window.scrollTo({
          top,
          behavior: "smooth",
        });

        clearInterval(interval);
      }

      attempts++;
      if (attempts >= maxAttempts) clearInterval(interval);
    }, 120);

    return () => clearInterval(interval);
  }, []);



  React.useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    html.style.overflow = isModalShow ? "hidden" : "";
    body.style.overflow = isModalShow ? "hidden" : "";

    return () => {
      html.style.overflow = "";
      body.style.overflow = "";
    };
  }, [isModalShow]);


  const [isDesktop, setIsDesktop] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const checkDesktop = () => {
      const isDesktopView = window.innerWidth > 768;
      setIsDesktop(isDesktopView);

      const existingScript = document.getElementById("wa-widget");

      if (isDesktopView && !existingScript) {
        const script = document.createElement("script");
        script.src = "https://do8wl071qiuy9.cloudfront.net/integration-plugin.js";
        script.async = true;
        script.id = "wa-widget";
        script.setAttribute("widget-id", "tGQzGZ");
        document.body.appendChild(script);
      } else if (!isDesktopView && existingScript) {
        existingScript.remove();
      }
    };

    checkDesktop();
    window.addEventListener("resize", checkDesktop);

    return () => {
      window.removeEventListener("resize", checkDesktop);
      const existingScript = document.getElementById("wa-widget");
      if (existingScript) existingScript.remove();
    };
  }, []);



  return (
    <>
      <Navbar
        setIsModalShow={setIsModalShow}
        setIsModalTitle={setIsModalTitle}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <div className={isModalShow ? "pointer-events-none" : "pointer-events-auto"}>
        <main>{children}</main>
      </div>

   
      <button
        type="button"
        onClick={() => {
          setIsModalShow(true);
          setIsModalTitle(true);
        }}
        className="fixed top-2/3 right-4 -translate-y-1/2 z-[9999] bg-[#B1856E] text-white shadow-lg px-4 py-4 rounded-xl border border-gray-300 text-sm pointer-events-auto origin-right rotate-90"
        aria-label="Open contact card"
      >
        Schedule Site Visit
      </button>

      <Footer />

      <MobileActions
        onBookClick={() => {
          setIsModalShow(true);
          setIsModalTitle(true);
        }}
        onExploreClick={() => {
          setIsMobileMenuOpen(true);
        }}
        onWhatsAppClick={() => {
          if (typeof window !== "undefined") {
            window.open(`https://wa.api-whatsapp.in/VOHZfi`, "_blank");
          }
        }}
        mobileThreshold={640}
      />

      {isModalShow && (
        <section
          onClick={() => {
            setIsModalShow(false);
            setIsModalTitle(false);
          }}
          className="fixed inset-0 z-50 w-full h-full bg-black/20 backdrop-blur-md flex justify-center items-center sm:mt-8"
        >
          <React.Suspense fallback={<div>Loading...</div>}>
            <div onClick={(e) => e.stopPropagation()}>
              <ContactCard
                setIsModalShow={setIsModalShow}
                isShowModalTitle={isShowModalTitle}
              />
            </div>
          </React.Suspense>
        </section>
      )}
    </>
  );
}

export default MainLayout;
