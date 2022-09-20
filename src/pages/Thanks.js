import React, { useEffect, useState } from 'react';
import Seo from '@components/seo/seo';

import Layout from '@components/layout/layout';
import Container from '@components/ui/container';
import PageHeroSection from '@components/ui/page-hero-section';

import { BsFillPrinterFill } from 'react-icons/bs';
import { BsQuestionOctagonFill } from 'react-icons/bs';
import { AiFillDollarCircle } from 'react-icons/ai';
import { ImLoop2 } from 'react-icons/im';

import DownloadApps from '@components/common/download-apps';
import Link from 'next/link';

function Thanks() {
  let noData = '';

  useEffect(() => {
    localStorage.removeItem('borobazar-cart');
    console.log('Removesd: ', localStorage.getItem('borobazar-cart'));
    localStorage.removeItem('borobazar-cart');
  }, []);
  return (
    <>
      <Seo
        title="FAQ"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="faq"
      />

      {/* <PageHeroSection
        heroTitle="Congratulation, You Have successfully done your payment"
        className="faq-banner-area"
      /> */}
      {/* <Container>
        <div className="flex flex-col max-w-2xl py-12 mx-auto 2xl:max-w-4xl md:py-20">
        <div>Thanks</div>
        </div>
      </Container> */}
      {/* <DownloadApps /> */}
      <ThanksConponent />
    </>
  );
}

export default Thanks;

Thanks.Layout = Layout;

function ThanksConponent() {
  const [email, setEmail] = useState('nahid.muradabir@gmail.com');
  const [OrderNumber, setOrderNumber] = useState('sdfa56s4dfgas1gv6asdfgsda');
  return (
    <>
      <div className="thank_container container px-5">
        <div className="row">
          <div className="col-6">
            <div className="header d-flex justify-content-between w-100">
              <h1>Thank you for your Order </h1>
              <BsFillPrinterFill className="icon_print" />
            </div>
            <div className="details w-100">
              <p>Confirmation Email: {email} </p>
              <p>Order Number: {OrderNumber}</p>
              <a href="/my-account/account-settings">
                <button>Go to Your Dashboard</button>
              </a>
            </div>

            <div className="shipping_information">
              <h1>Shipping Information</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
                perferendis, dolorum fugit error tempore veritatis voluptates
                doloribus sapiente incidunt! Quibusdam?
              </p>
            </div>
          </div>
        </div>

        <p className="mt-5 pt-5 ">
          As your company grows or as policies change, be sure to regularly
          update your FAQ page so that customers can keep informed. If you have
          outdated information on your website, this can lead to bad customer
          experience or loss in sales. This can also put your customer service
          representative in a bad space because now they might have to rectify
          the situation or go through with the old policies to keep the customer
          happy.
        </p>
        <p className="mt-3">
          The best way to organize your eCommerce FAQ is to look at the most
          asked questions that customers send in your email, dm’s, and chat
          support. Based on that information, you can figure out your FAQ’s
          layout from the most valued questions to the least. Doing this takes
          work, but it improves your customer experience.
        </p>
        <p className="mt-3">
          Think of your FAQ page as the opportunity to expand upon helpful
          content that your site consistently provides, as well as another
          avenue for people to discover that great content. However, people have
          short attention spans, and if your FAQ has very detailed answers or
          steps, then you’ll need to keep them engaged with visuals or videos.
          Skyword found that if your content includes compelling images, you can
          average 94% more views than your boring counterparts.
        </p>
        <br />
        <br />
        <hr className="horizontalRow" />
        <br />

        <div className="row">
          <div className="col-md-4 col-Sec text-center">
            <div className="colmain m-3 ">
              <div className="icon_title d-flex justify-content-center align-items-center">
                <BsQuestionOctagonFill fontSize={30} color="#02b08e" />
                <h1 className="ml-4">Have Question? </h1>
              </div>
              <p>Check out our help center</p>
              <a href="/contact-us">
                <button type="button">See Our Help Center</button>
              </a>
            </div>
          </div>
          <div className="col-md-4 col-Sec text-center">
            <div className="colmain m-3 ">
              <div className="icon_title d-flex justify-content-center align-items-center">
                <ImLoop2 fontSize={30} color="#02b08e" />
                <h1 className="ml-4">Return & Exchange </h1>
              </div>
              <p>Check out our help center</p>
              <a href="/about-us">
                <button type="button">See Our Return Policy</button>
              </a>
            </div>
          </div>
          <div className="col-md-4 col-Sec text-center">
            <div className="colmain m-3 ">
              <div className="icon_title d-flex justify-content-center align-items-center">
                <AiFillDollarCircle fontSize={30} color="#02b08e" />
                <h1 className="ml-4">Price Match </h1>
              </div>
              <p>Check out our help center</p>
              <a href="/faq">
                <button type="button">See Our Price Matches</button>
              </a>
            </div>
          </div>
        </div>
      </div>

      <DownloadApps />
    </>
  );
}
