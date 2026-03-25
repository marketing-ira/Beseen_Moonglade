import { graphql, useStaticQuery, navigate } from "gatsby";
import { GatsbyImage, getImage, IGatsbyImageData, StaticImage } from "gatsby-plugin-image";
import React from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import Slider, { Settings } from "react-slick";

interface FileNode {
  relativePath: string;
  publicURL?: string | null;
  childImageSharp?: {
    backgroundImage?: IGatsbyImageData;
    cardImage?: IGatsbyImageData;
  } | null;
}

interface FeaturesProps {
  type: "waterfront" | "landscapes";
  list: string[];
}

interface FeatureCard {
  label: string;
  icon: React.ReactNode;
}

const MOBILE_CARDS_PER_PAGE = 6;
const MOBILE_AUTOPLAY_MS = 2800;

const normalizeLabel = (label: string) =>
  label
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/&/g, " and ")
    .replace(/\//g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

type FeatureIconRenderer = () => React.ReactNode;

const FEATURE_ICON_CLASSNAME = "h-[34px] w-[34px] sm:h-[40px] sm:w-[40px] lg:h-[44px] lg:w-[44px]";

const FALLBACK_ICON: FeatureIconRenderer = () => (
  <StaticImage
    src="../assets/images/clubhouse/Waterfront-icons/Skating-Rink.svg"
    alt=""
    aria-hidden="true"
    className={FEATURE_ICON_CLASSNAME}
  />
);

const FEATURE_ICON_BY_TYPE: Record<FeaturesProps["type"], Record<string, FeatureIconRenderer>> = {
  waterfront: {
    "aquatic pool": () => <StaticImage src="../assets/images/clubhouse/Waterfront-icons/Aquatic-Pool.png" alt="" aria-hidden="true" className={FEATURE_ICON_CLASSNAME} />,
    "bird feeding lawn": () => <StaticImage src="../assets/images/clubhouse/Waterfront-icons/Bird-Feeding.png" alt="" aria-hidden="true" className={FEATURE_ICON_CLASSNAME} />,
    "bubbling waters": () => <StaticImage src="../assets/images/clubhouse/Waterfront-icons/Bubbling-Waters.png" alt="" aria-hidden="true" className={FEATURE_ICON_CLASSNAME} />,
    "camping space": () => <StaticImage src="../assets/images/clubhouse/Waterfront-icons/Camping-Space.png" alt="" aria-hidden="true" className={FEATURE_ICON_CLASSNAME} />,
    "cricket pitch": () => <StaticImage src="../assets/images/clubhouse/Waterfront-icons/Cricket-Pitch.png" alt="" aria-hidden="true" className={FEATURE_ICON_CLASSNAME} />,
    "elevated walkway": () => <StaticImage src="../assets/images/clubhouse/Waterfront-icons/Elevated-Walkway.png" alt="" aria-hidden="true" className={FEATURE_ICON_CLASSNAME} />,
    "forest trail": () => <StaticImage src="../assets/images/clubhouse/Waterfront-icons/Forest-Trail.png" alt="" aria-hidden="true" className={FEATURE_ICON_CLASSNAME} />,
    "outdoor gymnasium": () => <StaticImage src="../assets/images/clubhouse/Waterfront-icons/Outdoor-Gymnasium.png" alt="" aria-hidden="true" className={FEATURE_ICON_CLASSNAME} />,
    "reflecting waters": () => <StaticImage src="../assets/images/clubhouse/Waterfront-icons/Reflecting-Waters.png" alt="" aria-hidden="true" className={FEATURE_ICON_CLASSNAME} />,
    "senior citizen park": () => <StaticImage src="../assets/images/clubhouse/Waterfront-icons/Senior-Citizen-Park.png" alt="" aria-hidden="true" className={FEATURE_ICON_CLASSNAME} />,
    "skating ring": () => <StaticImage src="../assets/images/clubhouse/Waterfront-icons/Skating-Rink.png" alt="" aria-hidden="true" className={FEATURE_ICON_CLASSNAME} />,
    "skating rink": () => <StaticImage src="../assets/images/clubhouse/Waterfront-icons/Skating-Rink.png" alt="" aria-hidden="true" className={FEATURE_ICON_CLASSNAME} />,
    "sun deck": () => <StaticImage src="../assets/images/clubhouse/Waterfront-icons/Sun-Deck.png" alt="" aria-hidden="true" className={FEATURE_ICON_CLASSNAME} />,
    "swing set": () => <StaticImage src="../assets/images/clubhouse/Waterfront-icons/Swing-Set.png" alt="" aria-hidden="true" className={FEATURE_ICON_CLASSNAME} />,
    "tree house": () => <StaticImage src="../assets/images/clubhouse/Waterfront-icons/Tree-House.png" alt="" aria-hidden="true" className={FEATURE_ICON_CLASSNAME} />,
    "zen zone": () => <StaticImage src="../assets/images/clubhouse/Waterfront-icons/Zen-Zone.png" alt="" aria-hidden="true" className={FEATURE_ICON_CLASSNAME} />,
  },
  landscapes: {
    "barbecue food area": () => <StaticImage src="../assets/images/clubhouse/Landscapes-icon/Barbecue-Food.png" alt="" aria-hidden="true" className={FEATURE_ICON_CLASSNAME} />,
    "childrens play area": () => <StaticImage src="../assets/images/clubhouse/Landscapes-icon/Childrens-Play-Area.png" alt="" aria-hidden="true" className={FEATURE_ICON_CLASSNAME} />,
    "cycling track": () => <StaticImage src="../assets/images/clubhouse/Landscapes-icon/Cycling-Track.png" alt="" aria-hidden="true" className={FEATURE_ICON_CLASSNAME} />,
    "entrance canopy": () => <StaticImage src="../assets/images/clubhouse/Landscapes-icon/Entrance-Canopy.png" alt="" aria-hidden="true" className={FEATURE_ICON_CLASSNAME} />,
    "iconic sculpture": () => <StaticImage src="../assets/images/clubhouse/Landscapes-icon/Iconic-Sculpture.png" alt="" aria-hidden="true" className={FEATURE_ICON_CLASSNAME} />,
    "kiosk dining": () => <StaticImage src="../assets/images/clubhouse/Landscapes-icon/Kios-Dining.png" alt="" aria-hidden="true" className={FEATURE_ICON_CLASSNAME} />,
    "meadow lawn": () => <StaticImage src="../assets/images/clubhouse/Landscapes-icon/Meadow-Lawn.png" alt="" aria-hidden="true" className={FEATURE_ICON_CLASSNAME} />,
    "mini amphitheater": () => <StaticImage src="../assets/images/clubhouse/Landscapes-icon/Mini-Amphitheater.png" alt="" aria-hidden="true" className={FEATURE_ICON_CLASSNAME} />,
    "outdoor dining": () => <StaticImage src="../assets/images/clubhouse/Landscapes-icon/Outdoor-Dining.png" alt="" aria-hidden="true" className={FEATURE_ICON_CLASSNAME} />,
    "oxygen valley": () => <StaticImage src="../assets/images/clubhouse/Landscapes-icon/Oxygen-Valley.png" alt="" aria-hidden="true" className={FEATURE_ICON_CLASSNAME} />,
    "pergola seating": () => <StaticImage src="../assets/images/clubhouse/Landscapes-icon/Pergola-Seating.png" alt="" aria-hidden="true" className={FEATURE_ICON_CLASSNAME} />,
    "powder room": () => <StaticImage src="../assets/images/clubhouse/Landscapes-icon/Powder-Room.png" alt="" aria-hidden="true" className={FEATURE_ICON_CLASSNAME} />,
    "sculpture garden": () => <StaticImage src="../assets/images/clubhouse/Landscapes-icon/Sculpture-Garden.png" alt="" aria-hidden="true" className={FEATURE_ICON_CLASSNAME} />,
    "sun lawn yoga lawn": () => <StaticImage src="../assets/images/clubhouse/Landscapes-icon/SunLawn-YogaLawn.png" alt="" aria-hidden="true" className={FEATURE_ICON_CLASSNAME} />,
    "water bridge": () => <StaticImage src="../assets/images/clubhouse/Landscapes-icon/Water-Bridge.png" alt="" aria-hidden="true" className={FEATURE_ICON_CLASSNAME} />,
  },
};

const SECTION_CONFIG = {
  waterfront: {
    title: "Waterfront & Outdoor Amenities",
    route: "/waterfront-amenities",
    backgroundImageName: "waterfront-bg.png",
    sectionId: "amenities",
    backgroundAlt: "Waterfront amenities at Moonglade Kokapet",
    backgroundPosition: "center",
  },
  landscapes: {
    title: "Landscapes & Waterscapes",
    route: "/landscapes-waterscapes",
    backgroundImageName: "landscapes-bg.png",
    sectionId: "landscapes-waterscapes",
    backgroundAlt: "Landscapes and waterscapes at Moonglade Kokapet",
    backgroundPosition: "center",
  },
} as const;

const Features: React.FC<FeaturesProps> = ({ type, list }) => {
  const [hasMounted, setHasMounted] = React.useState(false);
  const data = useStaticQuery(graphql`
    query FeaturesSectionImages {
      allFile(
        filter: {
          sourceInstanceName: { eq: "images" }
          relativePath: { in: ["waterfront-bg.png", "landscapes-bg.png", "blue-section-gradient.svg"] }
        }
      ) {
        nodes {
          relativePath
          publicURL
          childImageSharp {
            backgroundImage: gatsbyImageData(
              placeholder: BLURRED
              formats: [AUTO, WEBP]
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

  const config = SECTION_CONFIG[type];
  const featureBackground = data.allFile.nodes.find(
    (node: FileNode) => node.relativePath === config.backgroundImageName
  );
  const featureGradient = data.allFile.nodes.find(
    (node: FileNode) => node.relativePath === "blue-section-gradient.svg"
  );

  const backgroundImageData = featureBackground?.childImageSharp
    ? getImage(featureBackground.childImageSharp.backgroundImage) ?? null
    : null;
  const gradientImage = featureGradient?.publicURL
    ? `url(${featureGradient.publicURL})`
    : "none";
  const sliderRef = React.useRef<Slider | null>(null);
  const [mobilePageIndex, setMobilePageIndex] = React.useState(0);

  const handleButtonClick = () => {
    navigate(config.route);
  };

  const getFeatureIcon = React.useCallback(
    (label: string) => (FEATURE_ICON_BY_TYPE[type][normalizeLabel(label)] ?? FALLBACK_ICON)(),
    [type]
  );

  const cards: FeatureCard[] = list.map((item) => ({
    label: item,
    icon: getFeatureIcon(item),
  }));

  const mobilePages = React.useMemo(() => {
    const pages: FeatureCard[][] = [];

    for (let index = 0; index < cards.length; index += MOBILE_CARDS_PER_PAGE) {
      pages.push(cards.slice(index, index + MOBILE_CARDS_PER_PAGE));
    }

    return pages;
  }, [cards]);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  React.useEffect(() => {
    setMobilePageIndex(0);
  }, [type, list]);

  React.useEffect(() => {
    if (mobilePages.length <= 1) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setMobilePageIndex((currentPage) =>
        currentPage === mobilePages.length - 1 ? 0 : currentPage + 1
      );
    }, MOBILE_AUTOPLAY_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [mobilePages.length]);

  const showPreviousMobilePage = React.useCallback(() => {
    setMobilePageIndex((currentPage) => {
      if (mobilePages.length === 0) {
        return 0;
      }

      return currentPage === 0 ? mobilePages.length - 1 : currentPage - 1;
    });
  }, [mobilePages.length]);

  const showNextMobilePage = React.useCallback(() => {
    setMobilePageIndex((currentPage) => {
      if (mobilePages.length === 0) {
        return 0;
      }

      return currentPage === mobilePages.length - 1 ? 0 : currentPage + 1;
    });
  }, [mobilePages.length]);

  const sliderSettings = React.useMemo<Settings>(
    () => ({
      arrows: false,
      autoplay: true,
      autoplaySpeed: 2800,
      cssEase: "ease-out",
      dots: false,
      infinite: cards.length > 6,
      pauseOnFocus: true,
      pauseOnHover: true,
      responsive: [
        {
          breakpoint: 1536,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 1280,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
      ],
      rows: 1,
      speed: 700,
      slidesToShow: 6,
      slidesToScroll: 1,
    }),
    [cards.length]
  );

  return (
    <div id={config.sectionId}>
      <section
        className="relative isolate overflow-hidden bg-[#25336C]"
        aria-label={`${config.title} section`}
      >
        <div className="absolute inset-0 w-full h-full">
          {backgroundImageData ? (
            <GatsbyImage
              image={backgroundImageData}
              alt={config.backgroundAlt}
              className="w-full h-full"
              loading="lazy"
              style={{ height: "100%" }}
              objectFit="cover"
              objectPosition={config.backgroundPosition}
            />
          ) : (
            <div className="w-full h-full bg-gray-200 animate-pulse" />
          )}
        </div>

        <div className="absolute inset-0 bg-[#15245D]/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5F8FF]/10 via-transparent to-[#182A6B]/20" />

        <div
          className="absolute bottom-0 left-0 right-0 h-[72%]"
          style={{
            backgroundImage: gradientImage,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        />

        <div className="relative z-10 container flex min-h-[700px] flex-col justify-end px-4 pb-14 pt-20 sm:min-h-[760px] sm:pb-16 sm:pt-24 md:min-h-[820px] md:pb-14 lg:min-h-[880px] lg:pb-14 xl:min-h-[920px]">
          <div className="mx-auto flex w-full max-w-[1180px] flex-col items-center text-center">
            <h3 className="max-w-[10ch] text-center font-normal font-['Prata'] leading-[0.96] text-white text-[48px] sm:max-w-[12ch] sm:text-[38px] md:max-w-none md:text-[48px] md:whitespace-nowrap lg:text-[60px] xl:text-[72px] 2xl:text-[80px]">
              {config.title}
            </h3>

            <div className="mt-8 flex w-full items-center justify-center gap-2 sm:mt-10 sm:gap-4 lg:gap-6">
              <button
                type="button"
                onClick={() => sliderRef.current?.slickPrev()}
                className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/65 bg-white text-[#25336C] shadow-[0_12px_35px_rgba(10,18,54,0.22)] transition-colors hover:bg-[#E7B99D] md:flex md:h-11 md:w-11"
                aria-label={`Show previous ${config.title.toLowerCase()} items`}
              >
                <IoChevronBack className="text-lg sm:text-xl" />
              </button>

              <div className="hidden w-full max-w-[1120px] overflow-hidden rounded-[28px] bg-[#25336C]/62 px-3 py-7 backdrop-blur-[2px] md:block lg:px-0 lg:py-8">
                {hasMounted ? (
                  <Slider ref={sliderRef} {...sliderSettings}>
                    {cards.map((card) => (
                      <div key={card.label} className="px-3 py-2 sm:px-3">
                        <article className="flex flex-col items-center justify-start">
                          <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full border border-white/20 bg-[#E5B79E] shadow-[0_16px_40px_rgba(10,18,54,0.26)] sm:h-[82px] sm:w-[82px] lg:h-[90px] lg:w-[90px]">
                            {card.icon}
                          </div>

                          <p className="mt-3 min-h-[34px] max-w-[92px] text-center font-['Poppins'] text-[11px] leading-[1.3] text-white sm:max-w-[108px] sm:text-[13px] lg:max-w-[144px] lg:text-[14px]">
                            {card.label}
                          </p>
                        </article>
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <div className="grid grid-cols-4 gap-y-6 lg:grid-cols-5 xl:grid-cols-6">
                    {cards.map((card) => (
                      <div key={card.label} className="px-3 py-2 sm:px-3">
                        <article className="flex flex-col items-center justify-start">
                          <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full border border-white/20 bg-[#E5B79E] shadow-[0_16px_40px_rgba(10,18,54,0.26)] sm:h-[82px] sm:w-[82px] lg:h-[90px] lg:w-[90px]">
                            {card.icon}
                          </div>

                          <p className="mt-3 min-h-[34px] max-w-[92px] text-center font-['Poppins'] text-[11px] leading-[1.3] text-white sm:max-w-[108px] sm:text-[13px] lg:max-w-[144px] lg:text-[14px]">
                            {card.label}
                          </p>
                        </article>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="w-full max-w-[360px] px-2 py-2 sm:max-w-[420px] sm:px-4 md:hidden">
                <div className="grid grid-cols-3 gap-x-2 gap-y-5">
                  {(mobilePages[mobilePageIndex] ?? []).map((card) => (
                    <article key={card.label} className="flex flex-col items-center justify-start">
                      <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full border border-white/20 bg-[#E5B79E] shadow-[0_16px_40px_rgba(10,18,54,0.26)]">
                        {card.icon}
                      </div>

                      <p className="mt-3 min-h-[34px] max-w-[92px] text-center font-['Poppins'] text-[11px] leading-[1.3] text-white">
                        {card.label}
                      </p>
                    </article>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => sliderRef.current?.slickNext()}
                className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/65 bg-white text-[#25336C] shadow-[0_12px_35px_rgba(10,18,54,0.22)] transition-colors hover:bg-[#E7B99D] md:flex md:h-11 md:w-11"
                aria-label={`Show next ${config.title.toLowerCase()} items`}
              >
                <IoChevronForward className="text-lg sm:text-xl" />
              </button>
            </div>

            <div className="mt-5 flex items-center justify-center gap-3 md:hidden">
              <button
                type="button"
                onClick={showPreviousMobilePage}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/65 bg-white text-[#25336C] shadow-[0_12px_35px_rgba(10,18,54,0.22)] transition-colors hover:bg-[#E7B99D]"
                aria-label={`Show previous ${config.title.toLowerCase()} items`}
              >
                <IoChevronBack className="text-base" />
              </button>

              <button
                type="button"
                onClick={showNextMobilePage}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/65 bg-white text-[#25336C] shadow-[0_12px_35px_rgba(10,18,54,0.22)] transition-colors hover:bg-[#E7B99D]"
                aria-label={`Show next ${config.title.toLowerCase()} items`}
              >
                <IoChevronForward className="text-base" />
              </button>
            </div>

            <div className="flex items-center justify-center mt-8 sm:mt-10">
              <button
                onClick={handleButtonClick}
                className="font-['Prata'] min-w-[176px] py-3 px-9 border border-white text-white rounded-full text-[15px] sm:min-w-[214px] sm:text-[20px] lg:min-w-[240px] lg:px-12 lg:py-4 lg:text-[24px] hover:bg-white/10 transition-colors"
              >
                Explore more
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
