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
    <title>Landscapes & Waterscapes | Moonglade Kokapet</title>
    <meta
      name="description"
      content="Discover beautifully landscaped waterscapes and premium amenities at Moonglade Kokapet. Features include Entrance Canopy, Sun Lawn, Mini Amphitheater, Cycling Track, and more."
    />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    {/* DNS prefetch for performance */}
    <link rel="dns-prefetch" href="//fonts.googleapis.com" />
    <link rel="dns-prefetch" href="//fonts.gstatic.com" />

    <link
      rel="canonical"
      href="https://beseen.moonglade.life/landscapes-waterscapes"
    />
    
    {/* Open Graph Tags */}
    <meta property="og:title" content="Landscapes & Waterscapes | Moonglade Kokapet" />
    <meta property="og:description" content="Discover beautifully landscaped waterscapes and premium amenities at Moonglade Kokapet. Features include Entrance Canopy, Sun Lawn, Mini Amphitheater, Cycling Track, and more." />
    <meta property="og:image" content="https://beseen.moonglade.life/static/105f3cee5979e47c13130c0b75d8124e/d97f4/moonglade-hero.png" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://beseen.moonglade.life/landscapes-waterscapes" />
    <meta property="og:site_name" content="Moonglade" />
    
    {/* Twitter Card */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Landscapes & Waterscapes | Moonglade Kokapet" />
    <meta name="twitter:description" content="Discover beautifully landscaped waterscapes and premium amenities at Moonglade Kokapet." />
    <meta name="twitter:image" content="https://beseen.moonglade.life/static/105f3cee5979e47c13130c0b75d8124e/d97f4/moonglade-hero.png" />
    
    <meta name="robots" content="index, follow" />
    <meta name="keywords" content="landscapes, waterscapes, Kokapet, luxury apartments, Moonglade, Hyderabad, premium amenities" />
  </>
);
