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
import ViewAll from "/public/asset/viewall.svg"
SwiperCore.use([Autoplay, Pagination, Navigation]);

export default function Designer(){
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent]=useState([]);
    const [isImageVertical,setIsImageVertical]=useState(true);
    const [count, setCount] = useState(0);
    const [portfolio,setPortfolio]=useState([]);
    const [isMobile, setIsMobile]=useState(false);
    const [len, setLen] =useState(0);
    const [selectedStudentMobile, setSelectedStudenttMobile]=useState(0);


    useEffect(() => {
        const getContentful=async()=>{
          try{
            var data = await fetchContentful('portfolio');
            setPortfolio(data);
            
            if(data.length>0){
              const storedCount = parseInt(localStorage.getItem("count")) || 0;
              console.log('count'+storedCount);
              setLen(data.length);
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
      setSelectedStudenttMobile(swiper.realIndex);
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
                            className={index === selectedStudent ? 'selected' : 'notSelected'}
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
                            className={index === selectedStudent ? 'selected' : 'notSelected'}
                            onClick={()=>setSelectedStudent(index)}
                            >
                            {student.fields.nameEng}
                            </li>
                        )
                        }
                    })}
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
                    {portfolio.map((student, index) => (
                        <SwiperSlide id="swiperslide" key={index}>
                        <div className={`slidename ${index === selectedStudentMobile ? 'current' : '' }`}>
                            {student.fields.nameEng}
                        </div>
                        </SwiperSlide>
                    ))}
                    </Swiper> }
                </div>
            </div>
            <div className="designers-thumbnail-container">
                <div className="designer-image-wrap web-thumbnail">
                  <div style={{borderLeft:'1px solid rgba(0, 0, 0, 0.30)', width:'10px', height:'88%', display:'inline-block', position:'absolute', top:'0' }}></div>
                    {portfolio[selectedStudent] &&
                        <Link href={`page/portfolio/${selectedStudent}`}>
                         <Image 
                            src={'https:' + portfolio[selectedStudent].fields.thumbnail.fields.file.url} alt=".." 
                            width={0} height={0} 
                            sizes="100vw"
                            // onLoad={handleImageLoad}
                            // id={isImageVertical ? '' : 'horizontalImage'}
                            className="thumbnail-image"
                            />
                        </Link>}
                </div>
                <div className="designer-image-wrap mobile-thumbnail">
                  <div style={{marginLeft:'50%', transform:'translate(-50%)',borderTop:'1px solid rgba(0, 0, 0, 0.30)', width:'80%', height:'15px'}}></div>
                    {portfolio[selectedStudentMobile] &&
                        <Link href={`page/portfolio/${selectedStudentMobile}`}>
                         <Image 
                            src={'https:' + portfolio[selectedStudentMobile].fields.thumbnail.fields.file.url} alt=".." 
                            width={0} height={0} 
                            sizes="100vw"
                            // onLoad={handleImageLoad}
                            // id={isImageVertical ? '' : 'horizontalImage'}
                            className="thumbnail-image"
                            />
                        </Link>}
                </div>
            </div>
            <div className="viewallicon"><Link href='/page/exhibition'><ViewAll/></Link></div>
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