import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";

const waterfrontList: string[] = [
  "Zen Zone",
  "Sun Deck",
  "Skating ring",
  "Bubbling Waters",
  "Elevated Walkway",
  "Tree House",
  "Outdoor Gymnasium",
  "Reflecting Waters",
  "Camping Space",
  "Senior Citizen Park",
  "Forest Trail",
  "Cricket Pitch",
  "Aquatic Pool",
  "Bird Feeding Lawn",
  "Swing Set",
];
const landscapesList: string[] = [
  "Entrance Canopy",
  "Sun Lawn/Yoga Lawn",
  "Mini Amphitheater",
  "Outdoor Dining",
  "Barbecue/Food Area",
  "Water Bridge",
  "Oxygen Valley",
  "Meadow Lawn",
  "Pergola Seating",
  "Powder Room",
  "Iconic Sculpture",
  "Kiosk/Dining",
  "Sculpture Garden",
  "Cycling Track",
  "Children's Play Area",
];

import Hero from "../components/Hero";
import MainLayout from "../layout/MainLayout";
import Features from "../components/Features";
import InfraProjects from "../components/InfraProjects";

const EinfraIraProjectDes = React.lazy(
  () => import("../components/EinfraIraProjectDes")
);
const InfoWalkthrough = React.lazy(
  () => import("../components/InfoWalkthrough")
);
const Clubhouse = React.lazy(() => import("../components/Clubhouse"));
const TailoredSpaceHeader = React.lazy(
  () => import("../components/TailoredSpaceHeader")
);
const TailoredSpace = React.lazy(() => import("../components/TailoredSpace"));
const FloorPlans = React.lazy(() => import("../components/FloorPlans"));
const MoongladeLocality = React.lazy(
  () => import("../components/MoongladeLocality")
);
const SiteVisitBar = React.lazy(() => import("../components/SiteVisitBar"));
const DownloadBrochureWithForm = React.lazy(
  () => import("../components/DownloadBrochureWithForm")
);
const FAQs = React.lazy(() => import("../components/FAQs"));
const DownloadBrochure = React.lazy(
  () => import("../components/DownloadBrochure")
);
const PriceTable = React.lazy(
  () => import("../components/PriceTable")
);

const IndexPage: React.FC<PageProps> = () => {
  const [isModalShow, setIsModalShow] = React.useState(false);
  const [isShowModalTitle, setIsModalTitle] = React.useState(false);

  return (
    <React.Suspense fallback={<div />}>
      <MainLayout
        setIsModalShow={setIsModalShow}
        isModalShow={isModalShow}
        setIsModalTitle={setIsModalTitle}
        isShowModalTitle={isShowModalTitle}
      >
        <Hero setIsModalShow={setIsModalShow} isModalShow={isModalShow} />
        
        <section className="bg-[#FFF9F7]">
          <EinfraIraProjectDes />
        </section>

        <InfoWalkthrough />

        <Clubhouse />
        <Features type="waterfront" list={waterfrontList} />
        
        <DownloadBrochure
          setIsModalShow={setIsModalShow}
          setIsModalTitle={setIsModalTitle}
        />
        <Features type="landscapes" list={landscapesList} />
        <TailoredSpaceHeader />
        <TailoredSpace />
        <FloorPlans
          setIsModalShow={setIsModalShow}
          setIsModalTitle={setIsModalTitle}
        />
        <SiteVisitBar
          setIsModalShow={setIsModalShow}
          setIsModalTitle={setIsModalTitle}
        />
        <section className="bg-bgPrimary md:bg-bgSecondaryLight ">
          <MoongladeLocality />
        </section>

        <PriceTable
          setIsModalShow={setIsModalShow}
          setIsModalTitle={setIsModalTitle}
        />

        <DownloadBrochureWithForm />
        
        <section className="bg-bgSecondaryLight">
          <InfraProjects />
          <FAQs />
        </section>
      </MainLayout>
    </React.Suspense>
  );
};

export default IndexPage;

export const Head: HeadFC = () => (
  <>
    <title>3 & 4 BHK Flats Kokapet near Financial District | ₹1.36Cr</title>
    <meta name="description" content="Moonglade - Premium 3 & 4 BHK apartments in Kokapet near Financial District, Hyderabad. 1400-3950 sqft from ₹1.33Cr. RERA approved. Book site visit today!" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossOrigin="anonymous"
    />
    <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
    <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
    
    {/* Preload critical hero images */}
    <link
      rel="preload"
      as="image"
      href="/static/105f3cee5979e47c13130c0b75d8124e/d97f4/moonglade-hero.png"
      media="(min-width: 640px)"
    />

    <link rel="canonical" href="https://beseen.moonglade.life" />

   <meta property="og:title" content="Moonglade Kokapet | Luxury 3 & 4 BHK Apartments in Financial District" />
    <meta property="og:description" content=" Book your dream 3 & 4 BHK luxury flats at Moonglade, Kokapet Hyderabad. Premium amenities and quick connectivity to the Financial District." />
    <meta property="og:image" content="https://beseen.moonglade.life/static/105f3cee5979e47c13130c0b75d8124e/d97f4/moonglade-hero.png" />
    
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Moonglade" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Moonglade | Luxury Apartments in Kokapet, Hyderabad" />
    <meta name="twitter:description" content="Explore Moonglade luxury apartments in Kokapet with premium amenities, floor plans, and locality highlights." />
    <meta name="robots" content="index, follow" />
    <meta name="author" content="Moonglade" />
    <meta name="keywords" content="luxury apartments, Kokapet, Hyderabad, real estate, premium amenities, floor plans" />
  </>
);
