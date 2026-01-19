import React from "react";
import { FaPhoneAlt, FaWhatsapp, FaCompass } from "react-icons/fa";

interface MobileActionsProps {
  onBookClick?: () => void;
  onExploreClick?: () => void;
  onWhatsAppClick?: () => void;
  mobileThreshold?: number; 
}

const MobileActions: React.FC<MobileActionsProps> = ({
  onBookClick,
  onExploreClick,
  onWhatsAppClick,
  mobileThreshold = 640,
}) => {
  const [isMobile, setIsMobile] = React.useState<boolean>(
    typeof window !== "undefined" ? window.innerWidth <= mobileThreshold : false
  );

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const check = () => setIsMobile(window.innerWidth <= mobileThreshold);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [mobileThreshold]);

  if (!isMobile) return null;

  const containerStyle: React.CSSProperties = {
    position: "fixed",
    bottom: 20,
    left: "50%",
    transform: "translateX(-50%)",
    width: "calc(100% - 40px)",
    maxWidth: 350,
    height: 65,
    background: "linear-gradient(180deg, #fff5f5 0%, #ffffff 100%)",
    borderRadius: 50,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.15)",
    zIndex: 400,
  };

  const navItemStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: 12,
    color: "#222",
    textAlign: "center",
    cursor: "pointer",
    userSelect: "none",
  };

  const navIconStyle: React.CSSProperties = {
    fontSize: 18,
    marginBottom: 4,
  };

  const exploreBtnStyle: React.CSSProperties = {
    position: "absolute",
    top: -28,
    left: "50%",
    transform: "translateX(-50%)",
    width: 70,
    height: 70,
    backgroundColor: "#1D256C",
    borderRadius: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.25)",
    color: "#fff",
    cursor: "pointer",
  };

  const exploreIconStyle: React.CSSProperties = {
    fontSize: 22,
    marginBottom: 4,
  };

  const exploreTextStyle: React.CSSProperties = {
    fontSize: 12,
    color: "#fff",
    marginTop: 2,
  };

  return (
    <div style={containerStyle}>
      <div
        style={navItemStyle}
        onClick={() => {
          onBookClick && onBookClick();
        }}
        aria-hidden
      >
        <FaPhoneAlt style={navIconStyle} />
        <span>Book A Site Visit</span>
      </div>

      <div
        style={exploreBtnStyle}
        onClick={() => {
          onExploreClick && onExploreClick();
        }}
        aria-hidden
      >
        <FaCompass style={exploreIconStyle} />
        <span style={exploreTextStyle}>Explore</span>
      </div>

      <div
        style={navItemStyle}
        onClick={() => {
          onWhatsAppClick && onWhatsAppClick();
        }}
        aria-hidden
      >
        <FaWhatsapp style={navIconStyle} />
        <span>WhatsApp</span>
      </div>
    </div>
  );
};

export default MobileActions;
