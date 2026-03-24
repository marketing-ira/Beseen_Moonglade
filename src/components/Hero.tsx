import React, { useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import Einfraa from "../assets/icons/einfraa.svg";
import IraWhite from "../assets/icons/Irawhite.svg";

import ContactCard from "./common/ContactCard";

interface FileNode {
  relativePath: string;
  childImageSharp?: any;
}

interface HeroProps {
  setIsModalShow?: React.Dispatch<React.SetStateAction<boolean>>;
  isModalShow: boolean;
}

function Hero({ setIsModalShow, isModalShow }: HeroProps) {
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  const data = useStaticQuery(graphql`
    query HeroImages {
      allFile(
        filter: {
          sourceInstanceName: { eq: "images" }
          relativePath: { in: ["moonglade-hero.png", "mobile-hero.png"] }
        }
      ) {
        nodes {
          relativePath
          childImageSharp {
            gatsbyImageData(
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
              quality: 85
              layout: FULL_WIDTH
              breakpoints: [480, 768, 1024, 1280, 1920]
              sizes: "(max-width: 768px) 100vw, 100vw"
            )
          }
        }
      }
    }
  `);

  const moonGlade = data.allFile.nodes.find(
    (node: FileNode) => node.relativePath === "moonglade-hero.png"
  );

  const mobileHero = data.allFile.nodes.find(
    (node: FileNode) => node.relativePath === "mobile-hero.png"
  );

  const desktopImage = moonGlade?.childImageSharp
    ? getImage(moonGlade.childImageSharp)
    : null;

  const mobileImage = mobileHero?.childImageSharp
    ? getImage(mobileHero.childImageSharp)
    : null;

  return (
    <>
      <section
        id="/"
        className="relative w-full mt-[64px] sm:mt-[76px] lg:mt-[88px]"
        aria-label="Hero Section"
      >
        {/* Download Brochure Button - Top Right */}
        <button
          onClick={() => setIsBrochureModalOpen(true)}
          className="absolute bottom-0 left-1/2 z-10 inline-flex -translate-x-1/2 items-center justify-center rounded-full bg-[#16a6df] px-6 py-3 font-['Prata'] text-[12px] text-white shadow-lg transition-colors hover:bg-[#16a6df] sm:bottom-auto sm:left-auto sm:right-6 sm:top-6 sm:translate-x-0 sm:px-8 sm:py-4 sm:text-[16px] md:right-8 md:top-1/2 md:-translate-y-1/2 lg:px-6 lg:text-[18px]"
          aria-label="Download Brochure"
        >
          Download Brochure
        </button>
        {/* sm:top-6 sm:right-6 md:top-1/2 md:-translate-y-1/2 md:right-8 */}
        {/* Desktop Hero Image */}
        <div className="hidden sm:block w-full">
          {desktopImage ? (
            <GatsbyImage
              image={desktopImage}
              alt="Moonglade luxury apartments in Kokapet, Hyderabad - Premium 3 & 4 BHK flats near Financial District"
              loading="eager"
              className="w-full h-auto"
              imgStyle={{
                objectFit: "contain",
                objectPosition: "center",
              }}
            />
          ) : (
            <div className="w-full h-[400px] bg-gray-200 animate-pulse" aria-label="Hero image placeholder" />
          )}
        </div>
        {/* Mobile Hero Image */}
        <div className="block sm:hidden">
          {(mobileImage || desktopImage) ? (
            <GatsbyImage
              image={(mobileImage || desktopImage)!}
              alt="Moonglade luxury apartments in Kokapet, Hyderabad - Premium 3 & 4 BHK flats near Financial District"
              loading="eager"
              className="w-full"
              style={{ maxHeight: "100vh" }}
              imgStyle={{ objectFit: "cover" }}
            />
          ) : (
            <div className="w-full h-[400px] bg-gray-200 animate-pulse" aria-label="Hero image placeholder" />
          )}
        </div>
      </section>

      {/* Brochure Modal (client-only to avoid hydration mismatch) */}
      {mounted && isBrochureModalOpen && (
        <section
          onClick={() => setIsBrochureModalOpen(false)}
          className="fixed inset-0 z-50 w-full h-full bg-black/20 backdrop-blur-md flex justify-center items-start pt-[84px] sm:pt-[96px] px-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsBrochureModalOpen(false)}
              className="absolute top-2 right-2 z-10 text-white bg-black/50 hover:bg-black/70 rounded-full w-8 h-8 flex items-center justify-center text-xl font-bold transition-colors"
              aria-label="Close modal"
            >
              ×
            </button>
            <ContactCard showEmail={false} />
          </div>
        </section>
      )}
    </>
  );
}

export default Hero;



// import React from "react";
// import { useStaticQuery, graphql } from "gatsby";
// import { GatsbyImage, getImage } from "gatsby-plugin-image";

// import Einfraa from "../assets/icons/einfraa.svg";
// import IraWhite from "../assets/icons/Irawhite.svg";

// const ContactCard = React.lazy(() => import("./common/ContactCard"));

// interface FileNode {
//   relativePath: string;
//   publicURL: string;
//   childImageSharp?: any;
// }

// interface HeroProps {
//   setIsModalShow?: React.Dispatch<React.SetStateAction<boolean>>;
//   isModalShow: boolean;
// }

// function Hero({ setIsModalShow, isModalShow }: HeroProps) {
//   const data = useStaticQuery(graphql`
//     query HeroImages {
//       allFile(
//         filter: {
//           sourceInstanceName: { eq: "images" }
//           relativePath: { in: ["moonglade-hero.png", "mobile-hero.png"] }
//         }
//       ) {
//         nodes {
//           relativePath
//           publicURL
//           childImageSharp {
//             gatsbyImageData(
//               placeholder: BLURRED
//               formats: [AUTO, WEBP, AVIF]
//               quality: 85
//               layout: FULL_WIDTH
//               breakpoints: [480, 768, 1024, 1280, 1920]
//               sizes: "(max-width: 768px) 100vw, 100vw"
//             )
//           }
//         }
//       }
//     }
//   `);

//   const moonGlade = data.allFile.nodes.find(
//     (node: FileNode) => node.relativePath === "moonglade-hero.png"
//   );
//   const moonGladeImage = moonGlade?.childImageSharp
//     ? getImage(moonGlade.childImageSharp)
//     : null;

//   const mobileHero = data.allFile.nodes.find(
//     (node: FileNode) => node.relativePath === "mobile-hero.png"
//   );
//   const mobileHeroImage = mobileHero?.childImageSharp
//     ? getImage(mobileHero.childImageSharp)
//     : null;

//   return (
//     <section
//       id="/"
//       className="relative w-full h-screen overflow-hidden mt-[64px] sm:mt-[76px] lg:mt-[88px]"
//       aria-label="Hero Section"
//     >
//       <div className="hidden sm:block absolute inset-0 z-0">
//         {moonGladeImage ? (
//           <GatsbyImage
//             image={moonGladeImage}
//             alt="Moonglade hero"
//             className="w-full h-full"
//             loading="eager"
//             fetchPriority="high"
//             style={{ height: "100vh" }}
//             objectFit="cover"
//             objectPosition="center"
//           />
//         ) : (
//           <div className="w-full h-full bg-gray-200 animate-pulse" />
//         )}
//       </div>

//       <div className="block sm:hidden absolute inset-0 z-0">
//         <GatsbyImage
//           image={mobileHeroImage || moonGladeImage}
//           alt="Moonglade mobile hero"
//           className="w-full h-full"
//           loading="eager"
//           fetchPriority="high"
//           style={{ height: "100vh" }}
//           objectFit="cover"
//           objectPosition="center"
//         />
//       </div>

//       <div className="relative z-10 w-full h-full px-5 sm:px-[120px] flex md:flex-row flex-col justify-between items-center text-center md:text-left">
        
//         <div className="max-w-[420px] text-[#1D256C] mt-10 md:mt-0 md:space-y-4">
//           <p className="mt-2 text-[11px] md:text-[18px] font-semibold">
//             RERA: P02400009267
//           </p>

//           <p className="font-medium text-[32px] md:text-[3rem] leading-[1.1]">
//             Elevate Your Life at Moonglade
//           </p>

//           <h1 className="mt-2 text-[16px] md:text-[26px] font-medium">
//             Luxury 3 & 4 BHK Flats Near Kokapet
//           </h1>

//           <h2 className="mt-2 text-[11px] md:text-[18px] font-semibold text-[#B1856E]">
//             Starting ₹1.33 Cr* | 2 Mins from ORR | Possession 2029
//           </h2>
//         </div>

//         {/* <div className="hidden sm:block">
//           <button className="px-6 py-3 bg-[#1D256C] text-white font-medium rounded-md">
//             Download brochure
//           </button>
//         </div> */}

//         {!isModalShow && (
//           <div className="hidden md:block mt-10 md:mt-0 w-full md:w-auto">
//             <ContactCard />
//           </div>
//         )}

//         <div className="sm:hidden flex flex-col items-center w-full mt-6">

//           <button
//             onClick={() => setIsModalShow && setIsModalShow(true)}
//             className="w-[70%] py-3 bg-[#1D256C] text-white font-medium rounded-md mb-6"
//           >
//             Download Brochure
//           </button>

//           <div className="flex justify-center items-center mb-3 space-x-6">
//             <div className="w-24">
//               <Einfraa />
//             </div>
//             <div className="w-20">
//               <IraWhite />
//             </div>
//           </div>
//         </div>

//         <div className="absolute bottom-4 left-[120px] hidden sm:flex items-center space-x-6">
//           <div className="w-32 lg:w-40">
//             <Einfraa />
//           </div>
//           <div className="w-28 lg:w-36">
//             <IraWhite />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Hero;
