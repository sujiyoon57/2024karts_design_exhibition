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


export default function MainPage() {

    const [banner, setBanner] = useState();

    useEffect(() => {
        const getContentful = async () => {
            try {

                var data = await fetchContentful('banner');
                setBanner(data);

                //console.log(data);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        getContentful();
    }, []);

    return (
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
                {banner && banner.map((data) => (
                    <SwiperSlide key={data.sys.id || Math.random()}>  
                        <img src={'https:' + data.fields.image.fields.file.url} alt={`banner-${data.sys.id}`} />
                    </SwiperSlide>
                ))}


            </Swiper>
        </div>
    )
}

