import React, { useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

// Import SVG assets
import Location from "../assets/images/moonGlade/location.svg";
import Arrow from "../assets/images/moonGlade/arrow.svg";
import HouseClub from "../assets/images/moonGlade/clubHouse.svg";
import Pricing from "../assets/images/moonGlade/pricing.svg";
import Size from "../assets/images/moonGlade/size.svg";
import Structure from "../assets/images/moonGlade/structure.svg";
import Towers from "../assets/images/moonGlade/towers.svg";
import Units from "../assets/images/moonGlade/units.svg";
import PlayIcon from "../assets/images/play-icon.svg";

const InfoWalkthrough = () => {
  const [isVideoModalShow, setIsVideoModalShow] = useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;

    const html = document.documentElement;
    const body = document.body;
    if (isVideoModalShow) {
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
    } else {
      html.style.overflow = "";
      body.style.overflow = "";
    }
    return () => {
      html.style.overflow = "";
      body.style.overflow = "";
    };
  }, [isVideoModalShow]);
  const data = useStaticQuery(graphql`
    query {
      allFile(
        filter: {
          sourceInstanceName: { eq: "images" }
          relativeDirectory: { eq: "moonGlade" }
        }
      ) {
        nodes {
          relativePath
          publicURL
          childImageSharp {
            gatsbyImageData(
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
              quality: 80
            )
          }
        }
      }
    }
  `);

  const featureGradient = data.allFile.nodes.find(
    (node: any) => node.relativePath === "moonGlade/walkthrough.png"
  );

  const iconClass =
    "w-[28px] h-[28px] sm:w-[45px] sm:h-[45px]  text-[#181B20] opacity-100";

  return (
    <>
      <section className="relative py-10 lg:py-[101px] px-4 sm:px-8 lg:px-[120px] overflow-hidden">
        {featureGradient && (
          <img
            src={featureGradient.publicURL}
            alt="Decorative gradient background"
            aria-hidden="true"
            className="pointer-events-none select-none absolute inset-0 w-full h-full object-cover opacity-[0.06] -z-10"
            loading="lazy"
            decoding="async"
                style={{ opacity: 0.06 }}
          />
        )}

        <div className="relative grid gap-8 lg:gap-0 lg:grid-cols-12 lg:items-stretch lg:h-auto">
          <div className="lg:col-span-7 flex flex-col lg:pr-8">
            <div className="mb-8 lg:mb-8">
              <h2 className="font-['Prata'] font-medium text-[24px] leading-[30px] sm:text-[40px] lg:text-[38px] tracking-normal lg:leading-[45px]">
              Be seen at a place that the city will admire.
                <span className="md:text-secondaryText"> Moonglade </span>
                at Kokapet
              </h2>

              <h3 className="font-['Prata'] text-[12px] sm:text-[14px] lg:text-[18px] font-normal mt-4 lg:mt-10  tracking-wide">
              Experience the exceptional at Moonglade, Kokapet, a commune with 3 BHK and 4BHK luxury apartments. It’s designed for modern families who have a penchant for everything superior.
              </h3>
            </div>

            <div className="bg-transparent grid grid-cols-2 flex-1">
              <div className="flex flex-col">
                <div className="flex items-center py-4 pl-[8px] gap-2 border-[0.4px] border-[#D9D9D9] flex-1 min-h-[80px]">
                  <Location className={iconClass} />
                  <div>
                    <h4 className="font-['Prata'] text-secondaryText font-bold text-[8px] sm:text-[12px]">
                      Location
                    </h4>
                    <h4 className="font-['Prata'] text-[14px] sm:text-[18px] font-normal leading-normal tracking-normal">
                      Kokapet, Opp. Exit 18A
                    </h4>
                  </div>
                </div>

                <div className="flex items-center py-4 pl-[8px] gap-2 border-[0.4px] border-[#D9D9D9] flex-1 min-h-[80px]">
                  <Units className={iconClass} />
                  <div>
                    <h4 className="font-['Prata'] text-secondaryText font-bold text-[8px] sm:text-[12px]">
                      Units
                    </h4>
                    <h4 className="font-['Prata'] text-[14px] sm:text-[18px] font-normal leading-normal tracking-normal">
                      2489 Apartments
                    </h4>
                  </div>
                </div>

                <div className="flex items-center py-4 pl-[8px] gap-2 border-[0.4px] border-[#D9D9D9] flex-1 min-h-[80px]">
                  <HouseClub className={iconClass} />
                  <div>
                    <h4 className="font-['Prata'] text-secondaryText font-bold text-[8px] sm:text-[12px]">
                      Clubhouse
                    </h4>
                    <h4 className="font-['Prata'] text-[14px] sm:text-[18px] font-normal leading-normal tracking-normal">
                      'Starlight' – 135,000 sq. ft.
                    </h4>
                  </div>
                </div>

                <div className="flex items-center py-4 pl-[8px] gap-2 border-[0.4px] border-[#D9D9D9] flex-1 min-h-[80px]">
                  <Pricing className={iconClass} />
                  <div>
                    <h4 className="font-['Prata'] text-secondaryText font-bold text-[8px] sm:text-[12px]">
                      Pricing
                    </h4>
                    <h4 className="font-['Prata'] text-[14px] sm:text-[18px] font-normal leading-normal tracking-normal">
                      Starting at ₹1.33 Cr*
                    </h4>
                  </div>
                </div>
              </div>

              {/* Column 2 */}
              <div className="flex flex-col">
                <div className="flex items-center py-4 pl-[8px] gap-2 border-[0.4px] border-[#D9D9D9] flex-1 min-h-[80px]">
                  <Arrow className={iconClass} />
                  <div>
                    <h4 className="font-['Prata'] text-secondaryText font-bold text-[8px] sm:text-[12px]">
                      Area
                    </h4>
                    <h4 className="font-['Prata'] text-[14px] sm:text-[18px] font-normal leading-normal tracking-normal">
                      14 Acres
                    </h4>
                  </div>
                </div>

                <div className="flex items-center py-4 pl-[8px] gap-2 border-[0.4px] border-[#D9D9D9] flex-1 min-h-[80px]">
                  <Size className={iconClass} />
                  <div>
                    <h4 className="font-['Prata'] text-secondaryText font-bold text-[8px] sm:text-[12px]">
                      Apartment Sizes
                    </h4>
                    <h4 className="font-['Prata'] text-[14px] sm:text-[18px] font-normal leading-normal tracking-normal">
                      1400–3950 sq. ft.
                    </h4>
                  </div>
                </div>

                <div className="flex items-center py-4 pl-[8px] gap-2 border-[0.4px] border-[#D9D9D9] flex-1 min-h-[80px]">
                  <Structure className={iconClass} />
                  <div>
                    <h4 className="font-['Prata'] text-secondaryText font-bold text-[8px] sm:text-[12px]">
                      Structure
                    </h4>
                    <h4 className="font-['Prata'] text-[14px] sm:text-[18px] font-normal leading-normal tracking-normal">
                      2 Basements + Stilt + 4 Podium Levels + 40 Floors
                    </h4>
                  </div>
                </div>

                <div className="flex items-center py-4 pl-[8px] gap-2 border-[0.4px] border-[#D9D9D9] flex-1 min-h-[80px]">
                  <Towers className={iconClass} />
                  <div>
                    <h4 className="font-['Prata'] text-secondaryText font-bold text-[8px] sm:text-[12px]">
                      Towers
                    </h4>
                    <h4 className="font-['Prata'] text-[14px] sm:text-[18px] font-normal leading-normal tracking-normal">
                      7
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content: Image and video */}
          <div className="lg:col-span-5 w-full flex flex-col">
            <div className="border border-gray-200 shadow-sm overflow-hidden h-full flex flex-col">
              {featureGradient?.childImageSharp ? (
                <GatsbyImage
                  image={getImage((featureGradient as any).childImageSharp)!}
                  alt={"Moonglade Towers"}
                  loading="eager"
                  className="w-full flex-1 object-cover"
                />
              ) : featureGradient ? (
                <img
                  src={featureGradient.publicURL}
                  alt={"Moonglade Towers"}
                  className="w-full flex-1 object-cover"
                  loading="eager"
                  decoding="async"
                />
              ) : (
                <div className="w-full bg-gray-100 flex-1" />
              )}
              <button
                onClick={() => setIsVideoModalShow(true)}
                type="button"
                aria-label="Play walkthrough video"
                className="bg-secondaryText text-white w-full py-4 lg:py-[26px] flex items-center justify-center gap-2 sm:gap-7 px-6 lg:px-10"
              >
                <PlayIcon className="w-[14px] h-[14px] sm:w-[69px] sm:h-[69px]" />
                <span className="font-['Prata'] text-[8px] sm:text-[19px]">
                  Click To View The Walkthrough Video.
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
      {isVideoModalShow && (
        <section
          onClick={() => setIsVideoModalShow(false)}
          className="fixed inset-0 z-50 w-full h-full bg-black/20 backdrop-blur-md flex justify-center items-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[90vw] sm:max-w-[80vw] md:max-w-[70vw] lg:max-w-[60vw] xl:max-w-[800px] mx-4"
          >
            <iframe
              className="w-full aspect-video"
              src="https://www.youtube.com/embed/8NdTTTGDqRg?si=ivWkc-CTlaJcl0yF&autoplay=1"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </section>
      )}
    </>
  );
};

export default InfoWalkthrough;
