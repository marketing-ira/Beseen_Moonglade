import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { graphql, useStaticQuery } from "gatsby";
import MainLayout from "../layout/MainLayout";

import LandscapesFeatureSection from "../components/ui/landScapes/LandscapesFeatures";
import LazyDownloadBrochure from "../components/LazyDownloadBrochure";

const LandscapesWaterscapes: React.FC<PageProps> = () => {
  const [isModalShow, setIsModalShow] = React.useState(false);
  const [isShowModalTitle, setIsModalTitle] = React.useState(false);

  return (
    <MainLayout 
      setIsModalShow={setIsModalShow} 
      isModalShow={isModalShow}
      setIsModalTitle={setIsModalTitle}
      isShowModalTitle={isShowModalTitle}
    >
      <section className="bg-bgWaterFront">
        <LandscapesFeatureSection />
      </section>
      <LazyDownloadBrochure />
    </MainLayout>
  );
};

export default LandscapesWaterscapes;

export const Head: HeadFC = () => (
  <>
    <title>Landscapes & Waterscapes</title>
    <meta
      name="description"
      content="Discover landscaped waterscapes and amenities at Moonglade. View features and download the brochure to learn more."
    />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    {/* DNS prefetch for performance */}
    <link rel="dns-prefetch" href="//fonts.googleapis.com" />
    <link rel="dns-prefetch" href="//fonts.gstatic.com" />

    <link
      rel="canonical"
      href="https://beseen.moonglade.life/landscapes-waterscapes"
    />
  </>
);
