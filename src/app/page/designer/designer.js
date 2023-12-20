"use client"

import { useEffect, useState, } from "react";
import axios from "axios"; 
import Link from "next/link";
import Image from "next/image";
import { fetchContentful } from '../../contentful/contentful';
import Footer from "@/app/component/footer";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // 주요 Swiper CSS 파일을 가져옵니다.
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Navigation, Scrollbar, Autoplay ,Pagination} from 'swiper/modules';
import SwiperCore from 'swiper';
SwiperCore.use([Autoplay, Pagination, Navigation]);

export default function Designer(){
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent]=useState([]);
    const [isImageVertical,setIsImageVertical]=useState(true);
    const [count, setCount] = useState(0);
    const [portfolio,setPortfolio]=useState([]);

    useEffect(() => {
        const getContentful=async()=>{
          try{
            var data = await fetchContentful('portfolio');
            setPortfolio(data);
            // console.log(data);
            if(data.length>0){
              const storedCount = parseInt(localStorage.getItem("count")) || 0;
              const nextCount = (storedCount + 1) % data.length;
              setCount(nextCount);
              localStorage.setItem("count", nextCount.toString());
              setSelectedStudent(nextCount);
            }
          }catch (error) {
            console.error("Error fetching data:", error);
          }
        }
        getContentful();
        
    }, []);
  
    const handleImageLoad = (event) => {
      const image = event.target;
      const vertical = image.naturalWidth < image.naturalHeight;
      setIsImageVertical(vertical);
    };

    const handleSlideChange = (swiper) => {
      setSelectedStudent(swiper.realIndex);
    };

    return (
      <div className="designers" id="specific-section">
        <div className="designers-container" >
            <div className="name-container">
                <div className="web-name-list">
                    {portfolio && portfolio.map((student, index)=>{
                        if(student.fields && (count<=index && index<portfolio.length)){
                        return(
                            <li
                            key={index}
                            id={student === selectedStudent ? 'selected' : 'notSelected'}
                            onClick={()=>setSelectedStudent(index)}
                            >
                            {student.fields.nameEng}
                            </li>
                        )
                        }
                    })}
                    {portfolio && portfolio.map((student,index)=>{
                        if(student.fields && (0<=index && index<count)){
                        return(
                            <li
                            key={index}
                            id={student === selectedStudent ? 'selected' : 'notSelected'}
                            onClick={()=>setSelectedStudent(index)}
                            >
                            {student.fields.nameEng}
                            </li>
                        )
                        }
                    })}
                </div>
                <div className="mobile-name-list">
                    <Swiper
                    slidesPerView={'auto'}
                    spaceBetween={'70'}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    // navigation={true}
                    onSlideChange={(swiper) => handleSlideChange(swiper)}
                    className="mySwiper"
                    >
                    {portfolio.map((student, index) => (
                        <SwiperSlide id="swiperslide" key={index}>
                        <div className={`slidename ${index === selectedStudent ? 'current' : '' }`}
                        s>
                            {student.fields.nameEng}
                        </div>
                        </SwiperSlide>
                    ))}
                    </Swiper> 
                </div>
            </div>
            <div className="designers-thumbnail-container">
                {portfolio[selectedStudent] &&
                <Link href={`page/portfolio/${selectedStudent}`}>
                    <div className="lineD">
                         <Image 
                            src={'https:' + portfolio[selectedStudent].fields.thumbnail.fields.file.url} alt=".." 
                            width={0} height={0} 
                            sizes="100vw"
                            onLoad={handleImageLoad}
                            id={isImageVertical ? '' : 'horizontalImage'}
                            />
                    </div>
                </Link>}
            </div>
        </div>
        <Footer/>
      </div>
    );
  }

  /* selected를 index로 */

  {/* <Swiper
              slidesPerView={3}
              spaceBetween={10}
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              // navigation={true}
              onSlideChange={(swiper) => handleSlideChange(swiper)}
              className="mySwiper"
              id="swiper"
            >
              {portfolio.map((student, index) => (
                <SwiperSlide id="swiperslide" key={index}>
                  <div className={`slidename ${index === currentSlide ? 'current' : '' }`}>
                    {student.fields.nameEng}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper> */}