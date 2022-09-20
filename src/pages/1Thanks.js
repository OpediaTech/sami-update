import React, { useEffect } from 'react'
import Seo from '@components/seo/seo';

import Layout from '@components/layout/layout';
import Container from '@components/ui/container';
import PageHeroSection from '@components/ui/page-hero-section';
import DownloadApps from '@components/common/download-apps';

function Thanks() {
  let noData = ""

  useEffect(()=> {
   
  localStorage.removeItem("borobazar-cart");
  localStorage.removeItem("borobazar-cart");
  localStorage.removeItem("borobazar-cart");
  localStorage.removeItem("borobazar-cart");
        console.log("Removesd: ",localStorage.getItem("borobazar-cart") )
        localStorage.removeItem("borobazar-cart");
  },[])
  return (
    <>
    <Seo
        title="FAQ"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="faq"
      />

<PageHeroSection heroTitle="Congratulation, You Have successfully done your payment" className="faq-banner-area" />
      {/* <Container>
        <div className="flex flex-col max-w-2xl py-12 mx-auto 2xl:max-w-4xl md:py-20">
        <div>Thanks</div>
        </div>
      </Container> */}
      <DownloadApps />
    
    </>
  )
}

export default Thanks


Thanks.Layout = Layout;