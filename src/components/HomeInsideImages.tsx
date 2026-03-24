import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage, type IGatsbyImageData } from "gatsby-plugin-image";
import { GrFormClose, GrNext, GrPrevious } from "react-icons/gr";
import { useLazyLoadStaggered } from "../hooks/useLazyLoad";

type GalleryImageNode = {
  relativePath: string;
  childImageSharp?: {
    gatsbyImageData: IGatsbyImageData;
  };
};

const imageOrder = [
  "home-inside-1.png",
  "home-inside-2.png",
  "home-inside-3.png",
  "home-inside-4.png",
  "home-inside-5.png",
  "home-inside-6.png",
];

function HomeInsideImages() {
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);
  const [isGalleryModalShow, setIsGalleryModalShow] = React.useState(false);

  const data = useStaticQuery(graphql`
    query HomeInsideImagesAssets {
      allFile(
        filter: {
          sourceInstanceName: { eq: "images" }
          relativeDirectory: { eq: "home-inside" }
        }
      ) {
        nodes {
          relativePath
          childImageSharp {
            gatsbyImageData(
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
              quality: 90
            )
          }
        }
      }
    }
  `);

  const imagesByFile: Record<string, IGatsbyImageData | null> = Object.fromEntries(
    (data.allFile.nodes as GalleryImageNode[]).map((node) => [
      node.relativePath.split("/").pop() ?? node.relativePath,
      node.childImageSharp ? getImage(node.childImageSharp) ?? null : null,
    ])
  );

  React.useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;

    const html = document.documentElement;
    const body = document.body;

    if (isGalleryModalShow) {
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
    } else {
      html.style.overflow = "";
      body.style.overflow = "";
    }

    return () => {
      html.style.overflow = "";
      body.style.overflow = "";
    };
  }, [isGalleryModalShow]);

  React.useEffect(() => {
    if (!isGalleryModalShow || typeof window === "undefined") return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsGalleryModalShow(false);
        setSelectedIndex(null);
      }

      if (event.key === "ArrowRight" && selectedIndex !== null && selectedIndex < imageOrder.length - 1) {
        setSelectedIndex(selectedIndex + 1);
      }

      if (event.key === "ArrowLeft" && selectedIndex !== null && selectedIndex > 0) {
        setSelectedIndex(selectedIndex - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isGalleryModalShow, selectedIndex]);

  const [containerRef, visibleIndices] = useLazyLoadStaggered(imageOrder.length, 100);

  const openModal = (index: number) => {
    setSelectedIndex(index);
    setIsGalleryModalShow(true);
  };

  const closeModal = () => {
    setIsGalleryModalShow(false);
    setSelectedIndex(null);
  };

  const showNext = () => {
    if (selectedIndex === null || selectedIndex >= imageOrder.length - 1) return;
    setSelectedIndex(selectedIndex + 1);
  };

  const showPrev = () => {
    if (selectedIndex === null || selectedIndex <= 0) return;
    setSelectedIndex(selectedIndex - 1);
  };

  return (
    <section className="pt-10 pb-14 md:pb-14">
      <div className="container">
        <div
          ref={containerRef}
          className="grid grid-cols-2 gap-2 p-2 bg-white md:grid-cols-3 md:gap-3 md:p-3"
        >
          {imageOrder.map((fileName, index) => {
            const image = imagesByFile[fileName];
            const isVisible = visibleIndices.has(index);

            return (
              <button
                key={fileName}
                type="button"
                onClick={() => openModal(index)}
                className={[
                  "relative overflow-hidden rounded-[2px] text-left transition-all duration-500",
                  "aspect-[4/3] cursor-pointer",
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                ].join(" ")}
                aria-label={`Open interior gallery image ${index + 1}`}
              >
                {image ? (
                  <GatsbyImage
                    image={image}
                    alt={`Beseen Moonglade interior view ${index + 1}`}
                    className="w-full h-full"
                    imgClassName="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {isGalleryModalShow && selectedIndex !== null && (
        <section
          className="fixed inset-0 z-50 flex items-center justify-center px-3 bg-black/80 backdrop-blur-md"
          onClick={closeModal}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="relative flex items-center justify-center w-full max-w-6xl gap-2 md:gap-4"
          >
            <button
              type="button"
              onClick={showPrev}
              disabled={selectedIndex === 0}
              className="p-3 transition-all bg-black rounded-full shadow disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Show previous image"
            >
              <GrPrevious fontSize={25} className="text-bgPrimary" />
            </button>

            <div className="flex justify-center flex-1">
              {imagesByFile[imageOrder[selectedIndex]] && (
                <div className="w-full overflow-hidden rounded-lg shadow-sm bg-white/5">
                  <GatsbyImage
                    image={imagesByFile[imageOrder[selectedIndex]] as IGatsbyImageData}
                    alt={`Beseen Moonglade interior view ${selectedIndex + 1}`}
                    className="max-h-[85vh] w-full"
                    imgClassName="max-h-[85vh] w-full object-contain"
                  />
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={closeModal}
              className="absolute right-0 top-[-3.25rem] rounded-full bg-black p-3 shadow transition-all md:right-2 md:top-2"
              aria-label="Close gallery"
            >
              <GrFormClose fontSize={25} className="text-bgPrimary" />
            </button>

            <button
              type="button"
              onClick={showNext}
              disabled={selectedIndex === imageOrder.length - 1}
              className="p-3 transition-all bg-black rounded-full shadow disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Show next image"
            >
              <GrNext fontSize={25} className="text-bgPrimary" />
            </button>
          </div>
        </section>
      )}
    </section>
  );
}

export default HomeInsideImages;