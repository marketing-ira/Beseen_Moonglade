import React, { useState } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const bullets = [
  { title: "Schools:", text: "5–15 minutes (Global Edge, DPS, Oakridge)" },
  { title: "Hospitals:", text: "9–20 minutes (Continental, Apollo, Care)" },
  { title: "IT Parks:", text: "4–15 minutes (Kokapet, Financial District, Wipro Circle)" },
  { title: "Shopping:", text: "5 minutes (Kokapet One Mall)" },
  { title: "Connectivity:", text: "Close to ORR & NH-65, RGIA (20 minutes)" },
];

function MoongladeLocality() {
  const [zoom, setZoom] = useState(1);


  const handleDoubleClick = () => setZoom(1);

  return (
    <section className="px-4 sm:px-[120px] pt-[35px] md:pt-[85px] md:pb-[65px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[26px] lg:gap-12 items-center">

        {/* LEFT TEXT */}
        <div className="p-[1rem] sm:p-0 flex flex-col justify-between gap-5">
          <h3 className="font-['Prata'] text-primaryText text-[28px] sm:text-[44px] md:text-[54px] leading-[38px] sm:leading-[58px] md:leading-[64px] font-medium">
            Perfectly Positioned<br />to be SEEN
          </h3>

          <ul className="mt-6 space-y-5">
            {bullets.map((item) => (
              <li key={item.title} className="font-['Prata'] text-primaryText flex items-start gap-3">
                <span className="w-2 h-2 bg-primaryText rounded-full mt-2"></span>
                <div>
                  <h4 className="font-semibold text-[12px] sm:text-[14px]">{item.title}</h4>
                  <h4 className="text-[16px] sm:text-[16px] leading-relaxed">{item.text}</h4>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative w-full bg-[#FFF1EA] lg:rounded-[50px] overflow-hidden">

          <div
            onDoubleClick={handleDoubleClick}
            className="cursor-zoom-in transition-transform duration-300 ease-in-out"
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: "center center",
              height: "100%",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "500px",
                overflow: "hidden",
                borderRadius: "40px",
                position: "relative",
              }}
            >
      <iframe
  src="https://www.google.com/maps/d/u/0/embed?mid=1VpmgUE0x-ycti9Hgqud6yvpFm5J34C8"
  width="100%"
  height="550"
  style={{
    border: 0,
    position: "absolute",
    top: "-60px" // Moves map up → hides header
  }}
  allowFullScreen
  loading="lazy"
></iframe>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MoongladeLocality;
