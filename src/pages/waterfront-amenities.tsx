import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import MainLayout from "../layout/MainLayout";

import WaterfrontFeaturesSection from "../components/ui/waterFront/WaterfrontFeatures";
import LazyDownloadBrochure from "../components/LazyDownloadBrochure";

const WaterfrontAmenities: React.FC<PageProps> = () => {
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
        <WaterfrontFeaturesSection />
      </section>
      <LazyDownloadBrochure />
    </MainLayout>
  );
};

export default WaterfrontAmenities;

export const Head: HeadFC = () => (
  <>
    <title>Waterfront Amenities</title>
    <meta
      name="description"
      content="Explore Moonglade's waterfront amenities, features, and lifestyle offerings. Book a site visit and download the brochure."
    />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    
    {/* DNS prefetch for performance */}
    <link rel="dns-prefetch" href="//fonts.googleapis.com" />
    <link rel="dns-prefetch" href="//fonts.gstatic.com" />
    
    <link rel="canonical" href="https://beseen.moonglade.life/waterfront-amenities" />
  </>
);
