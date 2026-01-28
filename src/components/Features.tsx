import { graphql, useStaticQuery, navigate } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";

interface FileNode {
  relativePath: string;
  publicURL: string;
  childImageSharp?: any;
}

interface FeaturesProps {
  type: "waterfront" | "landscapes";
  list: string[];
}

const Features: React.FC<FeaturesProps> = ({ type, list }) => {
  const data = useStaticQuery(graphql`
    query FeaturesBackgroundImages {
      allFile(
        filter: {
          sourceInstanceName: { eq: "images" }
          relativePath: {
            in: [
              "waterfront-bg.png"
              "landscapes-bg.png"
              "blue-section-gradient.svg"
            ]
          }
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
              layout: FULL_WIDTH
              breakpoints: [480, 768, 1024, 1280, 1920]
              sizes: "(max-width: 768px) 100vw, 100vw"
            )
          }
        }
      }
    }
  `);

  const featureBackground = data.allFile.nodes.find(
    (node: FileNode) => node.relativePath === `${type}-bg.png`
  );
  const featureGradient = data.allFile.nodes.find(
    (node: FileNode) => node.relativePath === "blue-section-gradient.svg"
  );

  const backgroundImageData = featureBackground?.childImageSharp
    ? getImage(featureBackground.childImageSharp)
    : null;
  const gradientImage = featureGradient?.publicURL
    ? `url(${featureGradient.publicURL})`
    : "none";

  const getTitle = () =>
    type === "waterfront"
      ? "Waterfront Amenities"
      : "Landscapes Waterscapes";

  const handleButtonClick = () => {
    const route =
      type === "waterfront"
        ? "/waterfront-amenities"
        : "/landscapes-waterscapes";
    navigate(route);
  };

  const splitIntoColumns = (items: string[], columns: number) => {
    const cols: string[][] = Array.from({ length: columns }, () => []);
    items.forEach((item, i) => cols[i % columns].push(item));
    return cols;
  };

  const columns = splitIntoColumns(list, 5);

  return (
    <div id="#amenities">
      <section
       
        className="block xl:hidden w-full flex flex-col items-center text-center pb-10 bg-[#25336C]"
        aria-label={`${getTitle()} section`}
      >
        <h3 className="font-['Prata'] text-[28px] sm:text-[34px] text-white mb-4 mt-6">
          {getTitle()}
        </h3>

        {backgroundImageData && (
          <div className="w-full px-4">
            <GatsbyImage
              image={backgroundImageData}
              alt={`${getTitle()} mobile image`}
              className="w-full h-auto rounded-lg"
              loading="lazy"
              objectFit="cover"
              objectPosition="center"
            />
          </div>
        )}

        <div className="container mt-6 px-6 py-8">
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 w-full">
            {list.map((item) => (
              <h4
                key={item}
                className="font-['Prata'] text-[14px] sm:text-[18px] text-white text-left leading-tight"
              >
                {item}
              </h4>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <button
              onClick={handleButtonClick}
              className="font-['Prata'] py-2 px-8 border border-white text-white rounded-full text-[14px] sm:text-[18px] hover:bg-white/10 transition-colors"
            >
              Explore more
            </button>
          </div>
        </div>
      </section>

      <section
    
        className="hidden xl:flex relative w-full h-[140vh] overflow-hidden flex-col justify-end items-center pb-[59px]"
        aria-label={`${getTitle()} section`}
      >
        <div className="absolute inset-0 w-full h-full">
          {backgroundImageData ? (
            <GatsbyImage
              image={backgroundImageData}
              alt={`${getTitle()} background`}
              className="w-full h-full"
              loading="lazy"
              style={{ height: "100%" }}
              objectFit="cover"
              objectPosition="center"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 animate-pulse" />
          )}
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-[70%] z-5"
          style={{
            backgroundImage: gradientImage,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        />

        <div className="relative z-10 container flex flex-col justify-end">
          <h3 className="text-center font-normal font-['Prata'] text-white tracking-normal leading-none text-[80px] xl:text-[90px]">
            {getTitle()}
          </h3>

          <div className="mt-8 mx-auto">
            <div className="flex justify-between gap-8">
              {columns.map((col, idx) => (
                <ul key={idx} className="text-white list-disc list-inside">
                  {col.map((item) => (
                    <li key={item} className="mb-5 text-[18px] font-['Prata']">
                      {item}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>

          <div className="flex justify-center items-center mt-12">
            <button
              onClick={handleButtonClick}
              className="font-['Prata'] py-3 px-12 border border-white text-white rounded-full text-[24px] hover:bg-white/10 transition-colors"
            >
              Explore more
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
