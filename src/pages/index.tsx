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
import LazySection from "../components/LazySection";

const EinfraIraProjectDes = React.lazy(
  () => import("../components/EinfraIraProjectDes")
);
const EinfraIraStats = React.lazy(
  () => import("../components/EinfraIraStats")
);
const InfoWalkthrough = React.lazy(
  () => import("../components/InfoWalkthrough")
);
const Clubhouse = React.lazy(() => import("../components/Clubhouse"));
const TailoredSpaceHeader = React.lazy(
  () => import("../components/TailoredSpaceHeader")
);
const TailoredSpace = React.lazy(() => import("../components/TailoredSpace"));
const HomeInsideImages = React.lazy(
  () => import("../components/HomeInsideImages")
);
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
    <MainLayout
      setIsModalShow={setIsModalShow}
      isModalShow={isModalShow}
      setIsModalTitle={setIsModalTitle}
      isShowModalTitle={isShowModalTitle}
    >
      <h1 style={{position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden'}}>
        3 & 4 BHK Flats in Kokapet near Financial District, Hyderabad | Moonglade
      </h1>

      {/* Non-lazy — render eagerly so SSR and client agree on initial output */}
      <Hero setIsModalShow={setIsModalShow} isModalShow={isModalShow} />

      {/* Each lazy section uses LazySection which combines IntersectionObserver
          + React.Suspense — the JS chunk only downloads when near viewport */}
      <LazySection className="bg-[#FFF9F7]" minHeight="350px">
        <EinfraIraProjectDes />
      </LazySection>

      <LazySection>
        <EinfraIraStats />
      </LazySection>

      <LazySection minHeight="450px">
        <InfoWalkthrough />
      </LazySection>

      <LazySection minHeight="450px">
        <Clubhouse />
      </LazySection>

      <Features type="waterfront" list={waterfrontList} />

      <LazySection minHeight="150px">
        <DownloadBrochure
          setIsModalShow={setIsModalShow}
          setIsModalTitle={setIsModalTitle}
        />
      </LazySection>

      <Features type="landscapes" list={landscapesList} />

      <LazySection minHeight="100px">
        <TailoredSpaceHeader />
      </LazySection>

      <LazySection minHeight="450px">
        <TailoredSpace />
      </LazySection>
   
      <LazySection minHeight="450px">
        <FloorPlans
          setIsModalShow={setIsModalShow}
          setIsModalTitle={setIsModalTitle}
        />
      </LazySection>

      <LazySection minHeight="100px">
        <SiteVisitBar
          setIsModalShow={setIsModalShow}
          setIsModalTitle={setIsModalTitle}
        />
      </LazySection>
          <LazySection minHeight="450px">
        <HomeInsideImages />
      </LazySection>

      <LazySection className="bg-bgPrimary md:bg-bgSecondaryLight" minHeight="450px">
        <MoongladeLocality />
      </LazySection>

     


      <LazySection minHeight="350px">
        <PriceTable
          setIsModalShow={setIsModalShow}
          setIsModalTitle={setIsModalTitle}
        />
      </LazySection>

      <LazySection minHeight="350px">
        <DownloadBrochureWithForm />
      </LazySection>

      <section className="bg-bgSecondaryLight">
        <InfraProjects />
        <LazySection minHeight="350px">
          <FAQs />
        </LazySection>
      </section>
    </MainLayout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => (
  <>
    <title>3 & 4 BHK Flats Kokapet near Financial District | ₹1.36Cr</title>
    <meta name="description" content="Moonglade - Premium 3 & 4 BHK apartments in Kokapet near Financial District, Hyderabad. 1400-3950 sqft from ₹1.33Cr. RERA approved. Book site visit today!" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    {/* <meta http-equiv="Content-Security-Policy"
content="
default-src 'self';
script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google-analytics.com https://challenges.cloudflare.com;
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src 'self' https://fonts.gstatic.com;
img-src 'self' data: https:;
connect-src 'self' https://www.google-analytics.com;
frame-src https://challenges.cloudflare.com;
">
</meta>     */}
    {/* Fonts are loaded from gatsby-ssr.ts to keep SSR and client output aligned. */}


    <link rel="canonical" href="https://beseen.moonglade.life" />

   <meta property="og:title" content="Moonglade Kokapet | Luxury 3 & 4 BHK Apartments in Financial District" />
    <meta property="og:description" content=" Book your dream 3 & 4 BHK luxury flats at Moonglade, Kokapet Hyderabad. Premium amenities and quick connectivity to the Financial District." />
    <meta property="og:image" content="https://beseen.moonglade.life/icons/icon-512x512.png" />
    
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
