import React, { useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image";

import PlayIcon from "../assets/images/play-icon.svg";

type DetailCardProps = {
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
};

const DetailCard = ({ icon, title, description }: DetailCardProps) => {
  return (
    <div className="flex min-h-[92px] items-start gap-3 border border-[#D9D9D9] border-opacity-1 px-3 py-4 sm:min-h-[108px] sm:gap-4 sm:px-4 lg:min-h-[100px] lg:px-5">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center sm:h-12 sm:w-12">
        {icon}
      </div>
      <div className="space-y-1 sm:space-y-1.5">
        <h4 className="font-['Prata'] text-[11px] font-normal leading-[1.2] text-secondaryText sm:text-[14px] lg:text-[18px]">
          {title}
        </h4>
        <div className="font-['Poppins'] text-[12px] leading-[1.35] text-[#202020] sm:text-[14px] lg:text-[16px] font-light">
          {description}
        </div>
      </div>
    </div>
  );
};

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

  return (
    <>
      <section className="relative py-10 lg:py-[101px] px-4 sm:px-8 lg:px-[120px] overflow-hidden">
        {featureGradient && (
          <img
            src={featureGradient.publicURL}
            alt="Decorative gradient background for Moonglade Info Walkthrough section"
            aria-hidden="true"
            className="pointer-events-none select-none absolute inset-0 w-full h-full object-cover opacity-[0.06] -z-10"
            loading="lazy"
            decoding="async"
            style={{ opacity: 0.06 }}
          />
        )}

        <div className="relative mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)] lg:items-start lg:gap-9 xl:gap-12">
          <div>
            <div className="">
              <h2 className="font-['Prata'] max-w-[580px] text-[30px] font-normal leading-[1.04] tracking-[-0.03em] text-[#202020] sm:text-[40px] lg:text-[42px] lg:leading-[1.02]">
                Be Seen at a Place That the City Will Admire
                <span className="text-[#8D8D8D]"> - </span>
                Moonglade at Kokapet
              </h2>

              <p className="mt-5 max-w-[640px] font-poppins font-light text-[14px] leading-[1.65] text-[#4A4A4A] sm:text-[16px] lg:mt-8 lg:text-[16px]">
                Experience the exceptional at Moonglade, Kokapet, a
                <b className="font-semibold"> RERA-approved gated community in Kokapet, Hyderabad</b>,
                featuring 3 BHK and 4 BHK <b className="font-semibold"> luxury high-rise apartments in Kokapet</b>.
                Designed for modern families with a penchant for superior living, this is where comfort meets style.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 border border-opacity-5 border-[#D9D9D9] sm:mt-10 sm:grid-cols-2 lg:mt-12">
              <DetailCard
                icon={<StaticImage src="../assets/images/moonGlade/location.svg" alt="Beseen Moonglade Location Icon" className="w-[28px] sm:w-[36px]" />}
                title="Location"
                description={
                  <>
                    Kokapet, Opp. Exit 18A,
                    <br />
                    close to <b className="font-semibold">Outer Ring Road (ORR)</b>
                  </>
                }
              />
              <DetailCard
                icon={<StaticImage src="../assets/images/moonGlade/arrow.svg" alt="Beseen Moonglade Area Icon" className="w-[28px] sm:w-[36px]" />}
                title="Area"
                description={
                  <>
                    14 Acres, <b className="font-semibold">high-rise</b>
                    <br />
                    <b className="font-semibold">gated community</b>
                  </>
                }
              />
              <DetailCard
                icon={<StaticImage src="../assets/images/moonGlade/units.svg" alt="Beseen Moonglade Units Icon" className="w-[28px] sm:w-[36px]" />}
                title="Units"
                description={
                  <>
                    2489 <b className="font-semibold">RERA-approved flats</b>
                    <br />
                    <b className="font-semibold">Kokapet</b>
                  </>
                }
              />
              <DetailCard
                icon={<StaticImage src="../assets/images/moonGlade/size.svg" alt="Beseen Moonglade Size Icon" className="w-[28px] sm:w-[36px]" />}
                title="Apartment Sizes"
                description={
                  <>
                    1400-3950 sq. ft.
                    <br />
                    <b className="font-semibold">luxury apartments</b>
                  </>
                }
              />
              <DetailCard
                icon={<StaticImage src="../assets/images/moonGlade/clubhouse.svg" alt="Beseen Moonglade Clubhouse Icon" className="w-[28px] sm:w-[36px]" />}
                title="Clubhouse"
                description={
                  <>
                    135,000 sq. ft. of <b className="font-semibold">gated</b>
                    <br />
                    <b className="font-semibold">community luxury homes</b> amenities
                  </>
                }
              />
              <DetailCard
                icon={<StaticImage src="../assets/images/moonGlade/structure.svg" alt="Beseen Moonglade Structure Icon" className="w-[28px] sm:w-[36px]" />}
                title="Structure"
                description={
                  <>
                    2 Basements + Stilt + 4
                    <br />
                    Podium Levels + 40 Floors
                  </>
                }
              />
              <DetailCard
                icon={<StaticImage src="../assets/images/moonGlade/pricing.svg" alt="Beseen Moonglade Pricing Icon" className="w-[28px] sm:w-[36px]" />}
                title="Pricing"
                description={
                  <>
                    Starting at ₹1.4 Cr* for a
                    <br />
                   <b className="font-semibold">3 BHK flat 1400 sqft Hyderabad</b>  & a 
                    <b className="font-semibold">4 BHK flat 3500 sqft Hyderabad</b>
                  </>
                }
              />
              <DetailCard
                icon={<StaticImage src="../assets/images/moonGlade/towers.svg" alt="Beseen Moonglade Towers Icon" className="w-[28px] sm:w-[36px]" />}
                title="Towers"
                description={<b className="font-semibold">7</b>}
              />
            </div>
          </div>

          <div className="w-full">
            <div className="overflow-hidden border border-[#D9D9D9] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
              {featureGradient?.childImageSharp ? (
                <GatsbyImage
                  image={getImage((featureGradient as any).childImageSharp)!}
                  alt={"Moonglade Towers"}
                  loading="eager"
                  className="h-full w-full object-cover"
                />
              ) : featureGradient ? (
                <img
                  src={featureGradient.publicURL}
                  alt="Moonglade Towers walkthrough image"
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div className="aspect-[1.06/1] w-full bg-gray-100" />
              )}
              <button
                onClick={() => setIsVideoModalShow(true)}
                type="button"
                aria-label="Play walkthrough video"
                className="flex w-full items-center justify-center gap-3 bg-secondaryText px-5 py-4 text-white sm:gap-5 sm:px-8 sm:py-5 lg:justify-start lg:px-12 lg:py-6"
              >
                <PlayIcon className="h-[36px] w-[36px] sm:h-[52px] sm:w-[52px] lg:h-[64px] lg:w-[64px]" />
                <span className="font-['Poppins'] text-[13px] leading-none sm:text-[16px] lg:text-[20px]">
                  Click to View the Walkthrough Video
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
              title="Moonglade Walkthrough Video"
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
