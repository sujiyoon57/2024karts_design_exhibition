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

    const [poster, setPoster] = useState();
    const [posterm, setPosterm] = useState();

    useEffect(() => {
        const getContentful = async () => {
            try {

                var data = await fetchContentful('poster');
                setPoster(data);
                setPosterm(data);
                //console.log(data);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        getContentful();
    }, []);

    return (
        <div className="main_visual">
            {/* PC 버전 */}
            <div className="main_visual_web">
                <Swiper
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                    pagination={true}
                    className="mySwiper"
                >
                    {poster && poster.map((data) => (
                        <SwiperSlide key={data.sys.id || Math.random()}>  // ✅ Contentful의 `sys.id` 사용
                            <a href={data.fields.link || "https://www.kartsdesign.co.kr/page/archiveIntro/0"} target="_blank" rel="noopener noreferrer">
                                <img src={'https:' + data.fields.posterImage.fields.file.url} alt={`poster-${data.sys.id}`} />
                            </a>
                        </SwiperSlide>
                    ))}

                </Swiper>
            </div>

            {/* 모바일 버전 */}
            <div className="main_visual_mo">
                <Swiper
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                    pagination={true}
                    className="mySwiper"
                >
                    {posterm && posterm.map((data) => (
                        <SwiperSlide key={data.sys.id || Math.random()}>  
                            <a href={data.fields.link || "https://www.kartsdesign.co.kr/page/archiveIntro/0"} target="_blank" rel="noopener noreferrer">
                                <img src={'https:' + data.fields.posterImageMobile.fields.file.url} alt={`poster-mobile-${data.sys.id}`} />
                            </a>
                        </SwiperSlide>
                    ))}

                </Swiper>
            </div>
        </div>
    );

}

