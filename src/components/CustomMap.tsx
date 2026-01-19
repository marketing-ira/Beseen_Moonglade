import React, { useEffect, useRef } from "react";

const CustomMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Google Maps script dynamically
    const script = document.createElement("script");
    script.src =
      "https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=maps,marker";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const google = (window as any).google;

      // Initialize basic map
      const map = new google.maps.Map(mapRef.current!, {
        center: { lat: -33.9, lng: 151.1 },
        zoom: 12,
        disableDefaultUI: true,
      });

      // Custom Popup overlay
      class Popup extends google.maps.OverlayView {
        position: any;
        containerDiv: HTMLDivElement;

        constructor(position: any, content: HTMLElement) {
          super();
          this.position = position;

          Object.assign(content.style, {
            background: "#fff",
            padding: "10px",
            borderRadius: "10px",
            boxShadow: "0px 4px 20px rgba(0,0,0,0.25)",
            fontSize: "14px",
            lineHeight: "20px",
          });

          const bubbleAnchor = document.createElement("div");
          Object.assign(bubbleAnchor.style, {
            position: "absolute",
            width: "100%",
            bottom: "8px",
            left: "0px",
          });
          bubbleAnchor.appendChild(content);

          this.containerDiv = document.createElement("div");
          Object.assign(this.containerDiv.style, {
            position: "absolute",
            cursor: "auto",
          });
          this.containerDiv.appendChild(bubbleAnchor);

          Popup.preventMapHitsAndGesturesFrom(this.containerDiv);
        }

        onAdd() {
          this.getPanes().floatPane.appendChild(this.containerDiv);
        }

        onRemove() {
          if (this.containerDiv.parentElement) {
            this.containerDiv.parentElement.removeChild(this.containerDiv);
          }
        }

        draw() {
          const position = this.getProjection().fromLatLngToDivPixel(
            this.position
          );

          const display =
            Math.abs(position.x) < 4000 && Math.abs(position.y) < 4000
              ? "block"
              : "none";

          if (display === "block") {
            this.containerDiv.style.left = position.x + "px";
            this.containerDiv.style.top = position.y + "px";
          }

          this.containerDiv.style.display = display;
        }
      }

      // Popup Content
      const contentDiv = document.createElement("div");
      contentDiv.innerHTML = `
        <div>
          <h4 style="margin:0;font-size:16px;">Moonglade</h4>
          <p style="margin:4px 0 0;">Custom popup location</p>
        </div>
      `;

      // Add Popup Overlay
      const popup = new Popup(
        new google.maps.LatLng(-33.866, 151.196),
        contentDiv
      );

      popup.setMap(map);
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "550px",
        borderRadius: "40px",
        overflow: "hidden",
      }}
    />
  );
};

export default CustomMap;
