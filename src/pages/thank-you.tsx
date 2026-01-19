import React, { useState } from 'react'
import MainLayout from '../layout/MainLayout'
import { Link } from 'gatsby'
import type { HeadFC } from "gatsby"

const ThankYou = () => {
  const [isModalShow, setIsModalShow] = useState(false);
  const [isShowModalTitle, setIsModalTitle] = useState(false);

  return (
    <MainLayout
      setIsModalShow={setIsModalShow}
      isModalShow={isModalShow}
      setIsModalTitle={setIsModalTitle}
      isShowModalTitle={isShowModalTitle}
    >
      <div className="bg-white min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 pt-[120px] pb-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-['Prata'] text-[#1D256C] text-[28px] sm:text-[28px] md:text-[28px] lg:text-[64px] leading-[1.2] tracking-normal">
            Thank You....<br/>
            We appreciate your interest. Our<br />
            team will get back to you shortly.
          </h1>
          <div className="mt-12">
            <Link 
              to="/" 
              className="inline-flex items-center justify-center bg-[#1D256C] text-white text-lg px-12 py-4 rounded-lg font-['Prata'] hover:bg-opacity-90 transition-colors"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default ThankYou

export const Head: HeadFC = () => (
  <>
    <title>Thank You | Moonglade</title>
    <meta
      name="description"
      content="Thank you for your interest in Moonglade. Our team will get back to you shortly."
    />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="canonical" href="https://beseen.moonglade.life/thank-you" />
  </>
)