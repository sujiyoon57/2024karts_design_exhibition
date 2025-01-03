"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { fetchContentful } from '../../contentful/contentful';
 

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // 주요 Swiper CSS 파일을 가져옵니다.
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Navigation, Scrollbar, Autoplay, Pagination } from 'swiper/modules';
import SwiperCore from 'swiper'; 
SwiperCore.use([Autoplay, Pagination, Navigation]);


export default function MainPage(){

     

    return(
        <div className="main-banner">
            <Swiper  
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                slidesPerView={1}
                spaceBetween={20}
                breakpoints={{ 
                870: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                }} 
                navigation={true} modules={[Navigation]}
                className="mainBannerSwiper "
                >
                <SwiperSlide><img src="/asset/ex_main_banner.png" /></SwiperSlide>
                <SwiperSlide><img src="/asset/ex_main_banner.png" /></SwiperSlide>
                <SwiperSlide><img src="/asset/ex_main_banner.png" /></SwiperSlide>
            </Swiper>
        </div>
    )
}

