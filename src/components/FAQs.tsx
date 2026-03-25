import React, { useState } from "react";

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "Where is Moonglade located?",
    answer:
      "Moonglade is located in Kokapet, OPP ORR Exit 18A, just 10 minutes from the Financial District. Within minutes, you can reach major workplaces, top schools, malls, and hospitals, while still enjoying a tranquil, green residential enclave.",
  },
  {
    question: "What types of apartments are available?",
    answer: "Moonglade offers elegantly designed 3 & 4 BHK flats with smart layouts, expansive living spaces, and premium finishes. Each unit maximizes natural light, ventilation, and privacy, catering to modern families seeking comfort, style, and luxury in Kokapet, Hyderabad.",
  },
  {
    question: "What Are the Moonglade Kokapet Price, Payment Plans, and Booking Options?",
    answer:
      "Moonglade offers transparent pricing and flexible payment plans for its 3 & 4 BHK apartments. Prospective buyers can book a site visit or download the brochure directly from the website to explore options and secure their home in this premium community.",
  },
  {
    question: "How many floors and towers are there?",
    answer: "7 towers with 2 Basements + Stilt + 4 Podium Levels + 40 floors.",
  },
  {
    question: "What Makes Moonglade Kokapet Hyderabad a Premium Residential Address?",
    answer:
      "Moonglade Kokapet is a luxury residential project by E-Infra & IRA Realty, spanning 14 acres of landscaped living. Located just minutes from the Financial District, it combines world-class amenities, spacious 3 & 4 BHK apartments, and premium design to offer a lifestyle that’s both refined and convenient.",
  },
  {
    question: "Is Moonglade Kokapet RERA Certified for Legal Assurance?",
    answer:
      "Yes, we are RERA-approved. Our RERA Registration Number is P02400009267, ensuring full legal compliance and transparency. Buyers can invest with confidence, knowing the project adheres to all regulatory standards in Hyderabad, Kokapet.",
  },
  {
    question: "What Lifestyle and World-Class Amenities Does Moonglade Offer?",
    answer:
      "Residents enjoy over 30 premium amenities across a 1,35,000 sq. ft. clubhouse and landscaped outdoors. Highlights include infinity pool, tennis courts, co-working lounges, kids’ play areas, and wellness spaces - designed to elevate everyday living.",
  },
  {
    question: "What Is the Possession Timeline for Moonglade Hyderabad Apartments?",
    answer:
      "The project is scheduled for completion in 2029, with timely delivery ensured by trusted developers and meticulous project management. Buyers will receive regular updates on construction progress, fostering transparency and trust throughout the home-buying experience.",
  },
  {
    question: "Are Schools, Malls, and Hospitals Easily Accessible from Moonglade?",
    answer:
      "Yes, Moonglade provides unmatched convenience with top schools, premium malls, and healthcare facilities within minutes of the project, combining urban lifestyle with serene, landscaped living.",
  },
  {
    question: "Who is this project by?",
    answer: "This project is by E-Infra and IRA.",
  },
];

function FAQs() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const toggle = (index: number) => {
    setActiveIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section className="container bg-bgSecondaryLight py-10 md:py-[72px] ">
      <div className="mx-auto md:w-4/5">
        {/* Title */}
        <h3 className="text-center font-medium text-[24px]    font-['Prata'] text-primaryText    lg:leading-[55px]   lg:text-[50px] leading-[30px] ">
          Frequently Asked Questions
        </h3>

        {/* List */}
        <div className="mt-6 space-y-4 sm:mt-12 md:mt-16 md:space-y-6">
          {faqs.map((item, index) => {
            const isOpen = index === activeIndex;
            return (
              <div
                key={item.question}
                className={
                  isOpen
                    ? " border-secondaryText border-[1.25px] md:border-[2.5px] rounded-lg bg-white"
                    : "rounded-lg bg-white"
                }
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  className={
                    "w-full flex items-center justify-between gap-4 text-left px-4 py-4 sm:px-6 sm:py-5"
                  }
                >
                  <div
                    className={`font-['Prata']  ${
                      isOpen
                        ? "text-secondaryText font-medium "
                        : "text-primaryText font-normal"
                    }  text-[14px] leading-7 sm:text-[16px] lg:text-[20px] `}
                  >
                    <h3>{item.question}</h3>
                  </div>

                  {/* Toggle Icon */}
                  <span
                    className={
                      (isOpen
                        ? "bg-secondaryText text-white"
                        : "bg-[#DEAF97] text-white") +
                      " inline-flex items-center justify-center rounded-full w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0"
                    }
                    aria-hidden="true"
                  >
                    {isOpen ? (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="3"
                          y="7.25"
                          width="10"
                          height="1.5"
                          fill="currentColor"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="7.25"
                          y="3"
                          width="1.5"
                          height="10"
                          fill="currentColor"
                        />
                        <rect
                          x="3"
                          y="7.25"
                          width="10"
                          height="1.5"
                          fill="currentColor"
                        />
                      </svg>
                    )}
                  </span>
                </button>

                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-4 pb-4 sm:px-6 sm:pb-6">
                      <h4 className="font-['Prata'] font-normal leading-[14px] text-[10px] sm:text-[16px] lg:font-[24px] sm:leading-[20px] lg:leading-[34px] text-[#43474E]">
                        {item.answer}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FAQs;
