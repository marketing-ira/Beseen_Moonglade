import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import ContactCard from "./common/ContactCard";

interface FileNode {
  relativePath: string;
  childImageSharp?: any;
}

interface HeroProps {
  setIsModalShow?: React.Dispatch<React.SetStateAction<boolean>>;
  isModalShow: boolean;
}

function Hero(_: HeroProps) {
  const data = useStaticQuery(graphql`
    query HeroImages {
      allFile(
        filter: {
          sourceInstanceName: { eq: "images" }
          relativePath: { in: ["moonglade-banner.png", "moonglade-banner-mobile.png"] }
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
    (node: FileNode) => node.relativePath === "moonglade-banner.png"
  );

  const mobileHero = data.allFile.nodes.find(
    (node: FileNode) => node.relativePath === "moonglade-banner-mobile.png"
  );

  const desktopImage = moonGlade?.childImageSharp
    ? getImage(moonGlade.childImageSharp)
    : null;

  const mobileImage = mobileHero?.childImageSharp
    ? getImage(mobileHero.childImageSharp)
    : null;

  return (
    <section
      id="/"
      className="relative w-full overflow-hidden mt-[64px] sm:mt-[76px] lg:mt-[88px]"
      aria-label="Hero Section"
    >
      <div className="hidden w-full sm:block">
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

      <div className="absolute inset-0 items-center justify-end hidden px-6 pointer-events-none lg:flex xl:px-16 2xl:px-24">
        <div className="pointer-events-auto mt-10 xl:mt-14 mr-[1%] xl:mr-[2%]">
          <ContactCard
            showEmail={false}
            showBhkPreference={true}
            variant="hero"
            submitLabel="Submit"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
