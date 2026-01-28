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
    <title>Waterfront Amenities | Moonglade Kokapet</title>
    <meta
      name="description"
      content="Explore Moonglade's premium waterfront amenities in Kokapet, Hyderabad. Features include Zen Zone, Sun Deck, Skating Ring, Aquatic Pool, and more. Book a site visit today!"
    />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    
    {/* DNS prefetch for performance */}
    <link rel="dns-prefetch" href="//fonts.googleapis.com" />
    <link rel="dns-prefetch" href="//fonts.gstatic.com" />
    
    <link rel="canonical" href="https://beseen.moonglade.life/waterfront-amenities" />
    
    {/* Open Graph Tags */}
    <meta property="og:title" content="Waterfront Amenities | Moonglade Kokapet" />
    <meta property="og:description" content="Explore Moonglade's premium waterfront amenities in Kokapet, Hyderabad. Features include Zen Zone, Sun Deck, Skating Ring, Aquatic Pool, and more." />
    <meta property="og:image" content="https://beseen.moonglade.life/static/105f3cee5979e47c13130c0b75d8124e/d97f4/moonglade-hero.png" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://beseen.moonglade.life/waterfront-amenities" />
    <meta property="og:site_name" content="Moonglade" />
    
    {/* Twitter Card */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Waterfront Amenities | Moonglade Kokapet" />
    <meta name="twitter:description" content="Explore Moonglade's premium waterfront amenities in Kokapet, Hyderabad." />
    <meta name="twitter:image" content="https://beseen.moonglade.life/static/105f3cee5979e47c13130c0b75d8124e/d97f4/moonglade-hero.png" />
    
    <meta name="robots" content="index, follow" />
    <meta name="keywords" content="waterfront amenities, Kokapet, luxury apartments, Moonglade, Hyderabad, premium facilities" />
  </>
);
