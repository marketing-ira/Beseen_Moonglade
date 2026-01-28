import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image";

function Footer() {
  const data = useStaticQuery(graphql`
    query {
      footerBg: file(relativePath: { eq: "footer-bg.jpg" }) {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH)
        }
      }
      blueGradient: file(relativePath: { eq: "blue-section-gradient.svg" }) {
        publicURL
      }
    }
  `);

  const footerBgImage = getImage(data.footerBg);
  const gradientUrl = data.blueGradient?.publicURL;

  return (
    <footer className="relative w-full h-[80vh] md:h-screen ">
      {footerBgImage && (
        <GatsbyImage
          image={footerBgImage}
          alt="Footer background"
          className="absolute inset-0 w-full h-full"
          style={{ position: "absolute" }}
        />
      )}
      {gradientUrl && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${gradientUrl})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      )}

      <div className="relative  px-4 sm:px-[120px] h-full w-full flex lg:flex-row flex-col items-start lg:items-end justify-end lg:justify-start pb-8 sm:pb-20 gap-8 lg:gap-10">
        {/* footer logo  */}
        <section className="md:hidden block space-y-4 lg:space-y-10">
          <div className=" mb-10">
            <StaticImage
              src="../assets/images/footer-logo.svg"
              alt="Footer Logo"
              // className=" w-[240.31px] sm:w-[350px] md:w-[480.61px] "
            />
            <p className="font-['Prata'] font-normal text-[10.58px] leading-[10.82px] md:text-[21.15px] text-nowrap  md:leading-[21.65px]  tracking-normal  text-primaryTitleText mt-3 ">
              © 2026 All rights reserved. E-Infra IRA Ventures
            </p>
          </div>

          <div className="pb-3 mt-5 md:pt-3">
            <StaticImage src="../assets/images/brands-logo.svg" alt="Footer Brand Logo" className="w-[143.53px] md:w-[286.7px] " />
          </div>
        </section>

        {/* social and address  */}
        <section className="grid grid-cols-2 gap-6 md:gap-10">
          <div className="flex flex-col gap-8 md:gap-14 justify-between items-start">
            <address className="not-italic md:pb-12">
              <h6 className="font-['Prata'] font-semibold text-primaryTitleText text-[12px] leading-[13px] md:text-2xl md:leading-tight lg:leading-[22px] tracking-normal   pb-2 md:pb-3 uppercase">
                Get in touch
              </h6>
              <p className="font-['Prata'] font-normal text-[9px] md:text-xl leading-tight md:leading-[22px] tracking-normal  text-primaryTitleText pt-3 flex items-center  gap-2">
                <span className="rounded-full border-white p-2 bg-transparent border-[2px] flex">
                  <StaticImage src="../assets/icons/phone.svg" alt="Phone" 
                  // style={{ width: '24px', height: '24px' }}
                   />
                </span>

                <a href="tel:+919091599599" className="hover:underline">
                  +91 90915 99599
                </a>
              </p>
              <p className="font-['Prata'] font-normal text-[9px] md:text-xl leading-tight md:leading-[22px] tracking-tighter  text-primaryTitleText pt-2 flex items-center   gap-2">
                <span className="rounded-full border-white p-2 bg-transparent border-[2px] flex ">
                  <StaticImage src="../assets/icons/mail.svg" alt="Email"
                  //  style={{ width: '24px', height: '24px' }}
                    />
                </span>
                <a
                  href="mailto:info@moonglade.life"
                  className="hover:underline"
                >
                   info@moonglade.life
                </a>
              </p>

              <div className="pb-3 mt-5 md:pt-3 md:flex  hidden  space-x-6">
                <StaticImage src="../assets/icons/einfraa-footer.svg" alt="Einfraa"
                //  className="w-[143.53px] md:w-[286.7px] "
                  />
                <StaticImage src="../assets/icons/Irawhite-footer.svg" alt="Ira White" 
                // className="w-[143.53px] md:w-[286.7px] "
                 />
              </div>
            </address>
          </div>

          <div className="flex flex-col gap-6 justify-between items-start">
            <address className="not-italic">
              <h6 className="flex justify-between flex-col items-start font-['Prata'] font-semibold text-primaryTitleText text-[12px] leading-[13px] md:text-2xl md:leading-tight lg:leading-[22px] tracking-tighter uppercase">
                address
              </h6>
              <div className="font-['Prata'] text-[9px] md:text-xl font-normal leading-tight md:leading-[24px] tracking-tighter capitalize text-primaryTitleText flex  flex-col pt-3  ">
                <span>E-Infra IRA Ventures</span>
                <span>Brindavan Colony, Narsingi (V), Kokapet,</span>
                <span>Gandipet Mandal, Ranga Reddy District,</span>
                <span>Telangana – 500075</span>
              </div>
            </address>
          </div>
        </section>

        <section className="md:block hidden space-y-4 lg:space-y-10 md:pb-28">
          <div className="md:mb-10">
            <StaticImage
              src="../assets/images/footer-logo.svg"
              alt="Footer Logo"
              className=" w-[240.31px] sm:w-[350px] md:w-[480.61px] "
            />
            <p className="font-['Prata'] font-normal text-[10.58px] leading-[10.82px] md:text-[21.15px] text-nowrap  md:leading-[21.65px]  tracking-normal  text-primaryTitleText sm:mt-3 md:mt-5">
              © 2026 All rights reserved. E-Infra IRA Ventures
            </p>
          </div>

          <div className="pb-3 mt-5 md:pt-3 md:hidden  flex  space-x-6">
            <StaticImage src="../assets/icons/einfraa-footer.svg" alt="Einfraa" className="w-[143.53px] md:w-[286.7px] " />
            <StaticImage src="../assets/icons/Irawhite-footer.svg" alt="Ira White" className="w-[143.53px] md:w-[286.7px] " />
          </div>
        </section>
      </div>
    </footer>
  );
}

export default Footer;
