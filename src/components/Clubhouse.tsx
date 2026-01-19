import React, { useState } from "react";
import { graphql, useStaticQuery } from "gatsby";
import Star from "../assets/icons/star.svg";
import { GatsbyImage } from "gatsby-plugin-image";
import { useLazyLoad } from "../hooks/useLazyLoad";
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
              formats: [AUTO, WEBP, AVIF]
              quality: 85
            )
          }
        }
      }
    }
  `);

  const clubHouse = data.allFile.nodes.find(
    (node: any) => node.relativePath === "clubhouse/clubhouse.png"
  );

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
          <h3 className="font-['Prata'] text-[16px] sm:text-[14px] lg:text-[18px] font-normal lg:pr-[430px] pr-9 mt-[18px]">
            At 135,000 sft., Starlight, the clubhouse at Moongalde is a
            playground for the privileged. Whether it’s for games, relaxation,
            or celebration it has exclusive spaces for every age.
          </h3>
        </div>
      </div>
      {clubHouse?.childImageSharp ? (
        <section
          className="w-full h-[25vh] md:h-screen bg-contain md:bg-cover bg-center bg-no-repeat relative"
          style={{
            backgroundImage: `url(${clubHouse.publicURL})`,
          }}
        >
          <div className="mx-auto px-4 py-5 sm:px-8 lg:px-[120px] md:py-8 lg:py-12  h-full">
            <h3 className="font-['Prata'] text-[24px] leading-[30px] text-white md:text-[64px] md:leading-[60px] tracking-normal font-medium  drop-shadow-lg">
              Clubhouse
            </h3>
          </div>
        </section>
      ) : (
        <GatsbyImage
          image={clubHouse?.publicURL}
          alt={"Modern clubhouse at Moonglade luxury apartments in Kokapet"}
          className="w-full h-auto"
          loading="lazy"
        />
      )}

      {/* Floors Section */}

      {/* First Row */}
      <div className="px-4 sm:px-8 lg:px-[120px] py-8 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* 1st Floor */}
          <div className="border border-[#E5E7EB] bg-white py-4 px-4 sm:py-5 sm:px-6 lg:py-[24px] lg:px-[28px]">
            <div className="font-['Prata'] text-[14px] sm:text-[18px] lg:text-[20px] ">
              <h3>1st</h3>
            </div>
            <div className="font-['Prata'] text-[14px] sm:text-[18px] lg:text-[20px] text-primaryText font-medium uppercase relative after:content-[''] after:block after:w-[40px] sm:after:w-[50px] lg:after:w-[60px] after:h-[1px] after:bg-[#DEAF97] after:mt-[6px]">
              <h3>Floor</h3>
            </div>
            <div className="font-['Prata'] text-[16px] sm:text-[14px] lg:text-[18px] text-primaryText leading-5 sm:leading-6 mt-3 sm:mt-4">
              <strong><h4> Banquet Hall, Dining Area, Admin Room</h4></strong>
            </div>
          </div>

          {/* 2nd Floor */}
          <div className="border border-[#E5E7EB] bg-white py-4 px-4 sm:py-5 sm:px-6 lg:py-[24px] lg:px-[28px]">
            <div className="font-['Prata'] text-[14px] sm:text-[18px] lg:text-[20px] ">
              <h3>2nd</h3>
            </div>
            <div className="font-['Prata'] text-[14px] sm:text-[18px] lg:text-[20px] text-primaryText font-medium uppercase relative after:content-[''] after:block after:w-[40px] sm:after:w-[50px] lg:after:w-[60px] after:h-[1px] after:bg-[#DEAF97] after:mt-[6px]">
              <h3>Floor</h3>
            </div>
            <div className="font-['Prata'] text-[16px] sm:text-[14px] lg:text-[18px] text-primaryText leading-5 sm:leading-6 mt-3 sm:mt-4">
              <strong><h4>Restaurant & Kitchen, Supermarket, Medical Center,Business Center & Conference, Guest Rooms</h4></strong>
            </div>
          </div>

          {/* 3rd Floor */}
          <div className="border border-[#E5E7EB] bg-white py-4 px-4 sm:py-5 sm:px-6 lg:py-[24px] lg:px-[28px]">
            <div className="font-['Prata'] text-[14px] sm:text-[18px] lg:text-[20px] ">
              <h3>3rd</h3>
            </div>
              <div className="font-['Prata'] text-[14px] sm:text-[18px] lg:text-[20px] text-primaryText font-medium uppercase relative after:content-[''] after:block after:w-[40px] sm:after:w-[50px] lg:after:w-[60px] after:h-[1px] after:bg-[#DEAF97] after:mt-[6px]">
              <h3>Floor</h3>
            </div>
<div className="font-['Prata'] text-[16px] sm:text-[14px] lg:text-[18px] text-primaryText leading-5 sm:leading-6 mt-3 sm:mt-4">
             <strong> <h4>Kids Play Zone, Day Care,Refuge Area</h4></strong>
            </div>
          </div>

          {/* 4th Floor */}
          <div className="border border-[#E5E7EB] bg-white py-4 px-4 sm:py-5 sm:px-6 lg:py-[24px] lg:px-[28px]">
            <div className="font-['Prata'] text-[14px] sm:text-[18px] lg:text-[20px] ">
              <h3>4th</h3>
            </div>
            <div className="font-['Prata'] text-[14px] sm:text-[18px] lg:text-[20px] text-primaryText font-medium uppercase relative after:content-[''] after:block after:w-[40px] sm:after:w-[50px] lg:after:w-[60px] after:h-[1px] after:bg-[#DEAF97] after:mt-[6px]">
              <h3>Floor</h3>
            </div>
            <div className="font-['Prata'] text-[16px] sm:text-[14px] lg:text-[18px] text-primaryText leading-5 sm:leading-6 mt-3 sm:mt-4">
              <strong><h4>Spa/Salon, Refuge Area, Mini Theaters</h4></strong>
            </div>
          </div>
        </div>
      </div>

      {/* Second Row */}
      <div className="px-4 sm:px-8 lg:px-[120px] pb-10 lg:pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* 5th Floor */}
          <div className="border border-[#E5E7EB] bg-white py-4 px-4 sm:py-5 sm:px-6 lg:py-[24px] lg:px-[28px]">
            <div className="font-['Prata'] text-[14px] sm:text-[18px] lg:text-[20px] ">
              <h3>5th</h3>
            </div>
            <div className="font-['Prata'] text-[14px] sm:text-[18px] lg:text-[20px] text-primaryText font-medium uppercase relative after:content-[''] after:block after:w-[40px] sm:after:w-[50px] lg:after:w-[60px] after:h-[1px] after:bg-[#DEAF97] after:mt-[6px]">
              <h3>Floor</h3>
            </div>
            <div className="font-['Prata'] text-[16px] sm:text-[14px] lg:text-[18px] text-primaryText leading-5 sm:leading-6 mt-3 sm:mt-4">
              <strong><h4>Indoor Games, Gym, Yoga & Meditation, Refuge Area</h4></strong>
            </div>
          </div>

          {/* 6th & 7th Floor */}
          <div className="border border-[#E5E7EB] bg-white py-4 px-4 sm:py-5 sm:px-6 lg:py-[24px] lg:px-[28px]">
            <div className="font-['Prata'] text-[14px] sm:text-[18px] lg:text-[20px] ">
              6th & 7th
            </div>
            <div className="font-['Prata'] text-[14px] sm:text-[18px] lg:text-[20px] text-primaryText font-medium uppercase relative after:content-[''] after:block after:w-[40px] sm:after:w-[50px] lg:after:w-[60px] after:h-[1px] after:bg-[#DEAF97] after:mt-[6px]">
              <h3>Floor</h3>
            </div>
            <div className="font-['Prata'] text-[16px] sm:text-[14px] lg:text-[18px] text-primaryText leading-5 sm:leading-6 mt-3 sm:mt-4">
             <strong><h4> Squash and Badminton Courts, Coffee Shop, Library</h4></strong>
            </div>
          </div>

          {/* Rooftop */}
          <div className="border border-[#E5E7EB] bg-white py-4 px-4 sm:py-5 sm:px-6 lg:py-[24px] lg:px-[28px]">
            <div className="font-['Prata'] text-[14px] sm:text-[18px] lg:text-[20px] ">
              <h3>Rooftop</h3>
            </div>
            <div className="font-['Prata'] text-[14px] sm:text-[18px] lg:text-[20px] text-primaryText font-medium uppercase relative after:content-[''] after:block after:w-[40px] sm:after:w-[50px] lg:after:w-[60px] after:h-[1px] after:bg-[#DEAF97] after:mt-[6px]">
              &nbsp;
            </div>
           <div className="font-['Prata'] text-[16px] sm:text-[14px] lg:text-[18px] text-primaryText leading-5 sm:leading-6 mt-3 sm:mt-4">
             <strong><h4> Separate pools for men, women, and kids</h4></strong>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Clubhouse;
