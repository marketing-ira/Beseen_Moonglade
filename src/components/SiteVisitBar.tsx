import React from "react";
interface SiteVisitBarPropsType {
  setIsModalShow: React.Dispatch<React.SetStateAction<boolean>>;
  setIsModalTitle: React.Dispatch<React.SetStateAction<boolean>>;
}
function SiteVisitBar({
  setIsModalShow,
  setIsModalTitle,
}: SiteVisitBarPropsType) {
  return (
    <section className="bg-gradient-to-r from-bgGradientLeft to-bgGradientRight ">
      <div className="px-4 sm:px-[120px] py-5 sm:py-6 lg:py-8">
        <div className="flex items-center justify-between">
          <h3 className="font-['Prata'] sm:font-medium sm:text-[28px]  sm:leading-[60px] text-primaryText capitalize  font-normal text-[14px] leading-[24px]  w-[50%] sm:w-[70%] lg:w-[60%] ">
            Walk Through Your Future Home Today — Model Flat Now Open.
          </h3>

          <div className="">
            <button
              onClick={() => {
                setIsModalShow(true);
                setIsModalTitle(true);
              }}
              type="button"
              className=" bg-secondaryText text-white rounded-full px-6 sm:px-10 lg:px-16 py-2 md:py-3 sm:py-4 text-[12px] sm:text-[20px] lg:text-[24px] "
            >
              Book a Site Visit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SiteVisitBar;
