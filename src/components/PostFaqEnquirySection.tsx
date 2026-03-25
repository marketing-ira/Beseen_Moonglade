import React from "react";
import ContactCard from "./common/ContactCard";

function PostFaqEnquirySection() {
  return (
    <section className="bg-[#FFF9F7] px-4 pb-10 pt-8 sm:px-8 md:px-[72px] md:pb-16 md:pt-14 xl:px-[120px] xl:pb-20">
      <div className="mx-auto grid max-w-[1560px] grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(620px,1fr)] lg:gap-[88px] xl:gap-[110px]">
        <div className="max-w-[480px]  pt-2 md:pt-0">
          <h2 className="font-['Prata'] text-[34px] leading-[1.16] text-primaryText sm:text-[40px] md:text-[52px] md:leading-[1.12]">
            Your Dream Home <br /> Starts Here
          </h2>
          <p className="mt-7 max-w-[320px] font-['Prata'] text-[14px] leading-[1.65] text-[#43474E] md:text-[16px]">
            Ready to find your home at Moonglade? Our sales team is just a
            message away. Let&apos;s talk.
          </p>
        </div>

        <div className="w-full max-w-[760px]">
          <ContactCard
            showEmail={false}
            showBhkPreference={true}
            submitLabel="Enquire Now"
            variant="inline-light"
          />
        </div>
      </div>
    </section>
  );
}

export default PostFaqEnquirySection;