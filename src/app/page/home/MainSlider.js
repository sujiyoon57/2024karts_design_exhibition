"use client"

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // 주요 Swiper CSS 파일을 가져옵니다.
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Navigation, Scrollbar, Autoplay, Pagination } from 'swiper/modules';
import SwiperCore from 'swiper';
SwiperCore.use([Autoplay, Pagination, Navigation]);

export default function MainSlider({ poster }) {
    /*
    * 2025.12
    * 기존에 poster과 posterm를 각각 만들어 같은 data를 넣음
    * poster는 pc버전에, posterm은 모바일 버전으로 사용됨
    * -> posterm은 없애고 poster로 통일시킴*/

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
                        <SwiperSlide key={data.sys.id || Math.random()}>
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
                    {poster && poster.map((data) => (
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

