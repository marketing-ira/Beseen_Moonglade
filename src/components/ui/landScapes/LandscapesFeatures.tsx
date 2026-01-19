import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { navigate } from "gatsby";
import PlaceCard from "../../common/PlaceCard";
import landscapesWaterscapesFeatures from "../../../data/landscapes-waterscapes-features-data";
import { CardItem } from "../../../types/PlaceCardTypes";
import { graphql, useStaticQuery } from "gatsby";
import { getImage } from "gatsby-plugin-image";

function LandscapesFeature() {
  const data = useStaticQuery(graphql`
    query LandscapesFeatureImages {
      allFile(
        filter: {
          sourceInstanceName: { eq: "images" }
          relativeDirectory: { eq: "" }
        }
      ) {
        nodes {
          relativePath
          childImageSharp {
            gatsbyImageData(
              placeholder: BLURRED
              quality: 85
              formats: [AUTO, WEBP, AVIF]
              layout: CONSTRAINED
              width: 600
              height: 450
              breakpoints: [300, 600, 900, 1200]
              sizes: "(max-width: 768px) 100vw, 50vw"
            )
          }
        }
      }
    }
  `);

  const handleGoBackToHome = () => {
    navigate("/#waterfront-amenities");
  };

  const imageMap: Record<string, any> = {};
  for (const n of data.allFile.nodes) {
    imageMap[n.relativePath] = getImage(n.childImageSharp);
  }

  return (
    <section
      id="waterfront-amenities"
      className="container py-12 pt-[64px] sm:pt-[76px] lg:pt-[88px]"
    >
      <div className="my-3 md:my-7">
        <button
          onClick={handleGoBackToHome}
          className="bg-transparent flex items-center gap-2 py-2 pr-3 text-primaryText/70 hover:text-primaryText hover:border hover:border-primaryText hover:scale-105 transition-all text-sm sm:text-base md:text-lg"
        >
          <IoIosArrowBack className="text-xl md:text-2xl" />
          <span>Back To Home</span>
        </button>
      </div>

      <h3 className="font-['Prata'] font-semibold mb-3 text-lg sm:text-xl md:text-3xl lg:text-5xl leading-none">
        Landscapes Waterscapes
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-10 lg:gap-12 mt-8">
        {landscapesWaterscapesFeatures.map(
          (cardItem: CardItem, index: number) => {
            const imageData = imageMap[cardItem.imageName] || null;

            return (
              <PlaceCard
                key={index}
                label={cardItem.label}
                imageData={imageData}
                alt={cardItem.alt}
              />
            );
          }
        )}
      </div>
    </section>
  );
}

export default React.memo(LandscapesFeature);
