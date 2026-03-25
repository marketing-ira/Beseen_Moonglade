import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";

type FloorTitleSegment = {
  value: string;
  suffix?: string;
};

type FloorCard = {
  description: string;
  mobileSpan: string;
  desktopSpan: string;
  descriptor?: string;
  title?: string;
  titleSegments?: FloorTitleSegment[];
};

const floorRows: FloorCard[][] = [
  [
    {
      titleSegments: [{ value: "1", suffix: "st" }],
      descriptor: "Floor",
      description: "Banquet Hall, Dining Area, Admin Room",
      mobileSpan: "col-span-2",
      desktopSpan: "lg:col-span-2",
    },
    {
      titleSegments: [{ value: "2", suffix: "nd" }],
      descriptor: "Floor",
      description:
        "Restaurant & Kitchen, Supermarket, Medical Center, Business Center & Conference, Guest Rooms",
      mobileSpan: "col-span-3",
      desktopSpan: "lg:col-span-4",
    },
    {
      titleSegments: [{ value: "3", suffix: "rd" }],
      descriptor: "Floor",
      description: "Kids Play Zone, Day Care, Refuge Area",
      mobileSpan: "col-span-3",
      desktopSpan: "lg:col-span-3",
    },
    {
      titleSegments: [{ value: "4", suffix: "th" }],
      descriptor: "Floor",
      description: "Spa/Salon, Refuge Area, Mini Theaters",
      mobileSpan: "col-span-2",
      desktopSpan: "lg:col-span-3",
    },
  ],
  [
    {
      titleSegments: [{ value: "5", suffix: "th" }],
      descriptor: "Floor",
      description: "Indoor Games, Gym, Yoga & Meditation, Refuge Area",
      mobileSpan: "col-span-2",
      desktopSpan: "lg:col-span-3",
    },
    {
      titleSegments: [
        { value: "6", suffix: "th" },
        { value: "&" },
        { value: "7", suffix: "th" },
      ],
      descriptor: "Floor",
      description: "Squash and Badminton Courts, Coffee Shop, Library",
      mobileSpan: "col-span-3",
      desktopSpan: "lg:col-span-5",
    },
    {
      title: "Rooftop",
      description: "Separate pools for men, women, and kids",
      mobileSpan: "col-span-5",
      desktopSpan: "lg:col-span-4",
    },
  ],
];

const Clubhouse = () => {
  const data = useStaticQuery(graphql`
    query {
      allFile(
        filter: {
          sourceInstanceName: { eq: "images" }
          relativeDirectory: { eq: "clubhouse" }
        }
      ) {
        nodes {
          relativePath
          publicURL
          childImageSharp {
            gatsbyImageData(
              placeholder: BLURRED
              formats: [AUTO, WEBP]
              quality: 85
            )
          }
        }
      }
    }
  `);

  const clubHouse = data.allFile.nodes.find(
    (node: any) => node.relativePath === "clubhouse/clubhouse.png",
  );

  const renderFloorTitle = (floor: FloorCard) => {
    if (floor.title) {
      return (
        <div className="font-['Prata'] text-[34px] leading-[0.92] tracking-[-0.03em] text-[#1F2430] sm:text-[40px] lg:text-[55px]">
          {floor.title}
        </div>
      );
    }

    return (
      <div className="font-['Prata'] text-[38px] leading-[0.85] tracking-[-0.04em] text-[#1F2430] sm:text-[44px] lg:text-[58px]">
        {floor.titleSegments?.map((segment, index) => (
          <span key={`${segment.value}-${index}`} className="inline-flex items-start">
            <span>{segment.value}</span>
            {segment.suffix ? (
              <span className="ml-[2px] text-[0.48em] leading-none">{segment.suffix}</span>
            ) : null}
            {index < (floor.titleSegments?.length ?? 0) - 1 ? (
              <span className="mx-[6px]"> </span>
            ) : null}
          </span>
        ))}
      </div>
    );
  };

  return (
    <>
      <div
        id="#clubhouse"
        className="flex gap-2 flex-row items-center justify-between px-4 sm:px-8 lg:px-[120px] py-6 lg:py-12"
      >
        <div className="flex flex-col ">
          <h2 className="font-['Prata'] text-[24px] sm:text-[40px] lg:text-[48px] font-medium leading-[20px] sm:leading-[1.2] lg:leading-[55px]">
            Be seen amongst the finest.
          </h2>
          <h3 className="font-['Poppins'] font-light text-[14px] sm:text-[14px] lg:text-[18px] lg:pr-[430px] pr-9 mt-[18px]">
            At 135,000 sft., Starlight, the clubhouse at Moongalde is a
            playground for the privileged. Whether it’s for games, relaxation,
            or celebration it has exclusive spaces for every age.
          </h3>
        </div>
      </div>
        {/* Use GatsbyImage instead of CSS background-image so Gatsby serves responsive optimized images
          at the correct breakpoint instead of the raw PNG via publicURL */}
      {clubHouse?.childImageSharp ? (
        <section className="w-full h-[25vh] md:h-screen relative overflow-hidden">
          <GatsbyImage
            image={clubHouse.childImageSharp.gatsbyImageData}
            alt="Modern clubhouse at Moonglade luxury apartments in Kokapet"
            loading="lazy"
            className="!absolute inset-0 w-full h-full"
            imgStyle={{ objectFit: "cover", objectPosition: "center" }}
          />
          {/* Overlay content on top of the image */}
          <div className="flex flex-col justify-between relative z-10 mx-auto px-4 py-5 sm:px-8 lg:px-[120px] md:py-8 lg:py-12 h-full">
            <h3 className="font-['Prata'] text-[24px] leading-[30px] text-white md:text-[64px] md:leading-[60px] tracking-normal font-medium drop-shadow-lg">
              Clubhouse Amenities
            </h3>

            <div className="font-['Poppins']  leading-[30px] text-white  tracking-normal  ">
              <h4 className="mb-0 md:text-[36px] md:leading-[42px] font-light">
                Probably visible even from the moon.
              </h4>
              <h3 className="md:text-[48px] md:leading-[56px] font-light">
                A 1,35,000 sft clubhouse!
              </h3>
            </div>
          </div>
        </section>
      ) : null}

      <section className="px-4 py-8 sm:px-8 lg:px-[120px] lg:py-14">
        <div className="mx-auto flex max-w-[1220px] flex-col gap-4 lg:gap-5">
          {floorRows.map((row, rowIndex) => (
            <div
              key={`floor-row-${rowIndex}`}
              className="grid grid-cols-5 gap-4 lg:grid-cols-12 lg:gap-5"
            >
              {row.map((floor) => (
                <article
                  key={`${floor.title ?? floor.description}`}
                  className={`border border-[#D9D9D9] px-4 py-5 shadow-[0_0_0_1px_rgba(255,255,255,0.65)_inset] sm:px-5 sm:py-6 ${floor.mobileSpan} ${floor.desktopSpan}`}
                >
                  <div className="flex min-h-[118px] flex-col justify-between gap-5 sm:min-h-[126px] lg:min-h-[110px]">
                    <div>
                      {renderFloorTitle(floor)}
                      {floor.descriptor ? (
                        <div className="mt-1 font-['Prata'] text-[12px] uppercase leading-none tracking-[0.16em] text-[#1F2430] sm:text-[13px] lg:text-[16px]">
                          {floor.descriptor}
                        </div>
                      ) : null}
                      <div className="mt-4 h-px w-[132px] max-w-full bg-[#DEAF97]" />
                    </div>
                    <p className="max-w-[34ch] font-['Poppins'] text-[12px] font-light leading-[1.45] text-[#404652] sm:text-[13px] lg:text-[13px]">
                      {floor.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Clubhouse;
