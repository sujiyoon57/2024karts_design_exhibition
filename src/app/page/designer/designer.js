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
    const [isMobile, setIsMobile]=useState(false);

    useEffect(() => {
        const getContentful=async()=>{
          try{
            var data = await fetchContentful('portfolio');
            setPortfolio(data);
            
            if(data.length>0){
              const storedCount = parseInt(localStorage.getItem("count")) || 0;
              console.log('count'+storedCount);
              const nextCount = (storedCount + 1) % data.length;
            //   setCount(nextCount);
              localStorage.setItem("count", nextCount.toString());
              setSelectedStudent(0);

              const firstPart = data.slice(nextCount); 
              const secondPart = data.slice(0, nextCount); 
              const newArray = [...firstPart, ...secondPart];
            //   console.log(newArray);
              setStudents(newArray);
            }
          }catch (error) {
            console.error("Error fetching data:", error);
          }
        }
        getContentful();

        const windowWidth = window.innerWidth;

      // 윈도우의 너비가 870px 이하이면 변수 업데이트
      if (windowWidth <= 870) {
        setIsMobile(true);
      }else{
        setIsMobile(false);
      }
        
    }, []);

    // console.log(students);
  
    // const handleImageLoad = (event) => {
    //   const image = event.target;
    //   const vertical = image.naturalWidth < image.naturalHeight;
    //   setIsImageVertical(vertical);
    // };

    const handleSlideChange = (swiper) => {
      setSelectedStudent(swiper.realIndex);
    };

    return (
      <div className="designers" id="specific-section">
        <div className="designers-container" >
            <div className="name-container">
                <div className="web-name-list">
                    {students && students.map((std, index)=>{
                        return(<li
                        key={index}
                        id={index === selectedStudent ? 'selected' : 'notSelected'}
                        onClick={()=>setSelectedStudent(index)}
                        >
                        {std.fields.nameEng}
                        </li>)
                    })}
                    {/* {portfolio && portfolio.map((student, index)=>{
                        if(student.fields && (count<=index && index<portfolio.length)){
                        return(
                            <li
                            key={index}
                            id={index === selectedStudent ? 'selected' : 'notSelected'}
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
                    })} */}
                </div>
                <div className="mobile-name-list">
                    {isMobile && <Swiper
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
                    {students.map((student, index) => (
                        <SwiperSlide id="swiperslide" key={index}>
                        <div className={`slidename ${index === selectedStudent ? 'current' : '' }`}
                        s>
                            {student.fields.nameEng}
                        </div>
                        </SwiperSlide>
                    ))}
                    </Swiper> }
                </div>
            </div>
            <div className="designers-thumbnail-container">
                <div className="designer-image-wrap">
                    {students[selectedStudent] &&
                        <Link href={`page/portfolio/${selectedStudent}`}>
                         <Image 
                            src={'https:' + students[selectedStudent].fields.thumbnail.fields.file.url} alt=".." 
                            width={0} height={0} 
                            sizes="100vw"
                            // onLoad={handleImageLoad}
                            id={isImageVertical ? '' : 'horizontalImage'}
                            className="thumbnail-image"
                            />
                        </Link>}
                </div>
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