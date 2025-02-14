"use client"

import { useEffect, useState } from "react";
import MainPage from './page/mainPage/mainPage';
import MainSlider from './page/mainPage/mainSlider';
import NoticePage from './page/mainPage/noticePage';
import BannerPage from './page/mainPage/bannerPage';
import Header from "@/app/component/header";
import Designer from './page/designer/designer';

export default function Home() {

  const [menuOn, setMenuOn] = useState(false);
  
  return (
    <div className='layout-container'>
      <Header menuOn={menuOn} setMenuOn={setMenuOn} />
      <MainSlider/>
      <NoticePage/>
      <BannerPage/>
    </div>
  )
}