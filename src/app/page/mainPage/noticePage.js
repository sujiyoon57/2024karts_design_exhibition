"use client"
import Image from "next/image"
import { fetchContentful } from "@/app/contentful/contentful"
import ScrollDown from "@/app/component/scrollDown"
import About from "@/app/component/about";
import { useSearchParams } from "next/navigation";
import { useState,useEffect } from "react";

export default function MainPage(){
    const [poster ,setPoster]=useState();
    const [mobilePoster,setMobilePoster]=useState();
    const [embedLink, setEmbedLink]=useState();
    const [scrollup, setScrollup] = useState(false);
    // const [counter, setCounter] = useState(0);

    useEffect(() => {
        const getContentful=async()=>{
          try{
            var data = await fetchContentful('poster');
            setPoster(data[0].fields.posterImage.fields.file.url);
            console.log(data[0].fields.posterImage.fields.file.url);
            setMobilePoster(data[0].fields.posterImageMobile.fields.file.url);
            console.log(data[0].fields.posterImageMobile.fields.file.url);
            setEmbedLink(data[0].fields.videoEmbedLink || null);
          }catch (error) {
            console.error("Error fetching data:", error);
          }
        }

        // const handleScroll = () => {
        //   // 스크롤이 100vh 이상인 경우 scrollup을 false로 설정
        //   if (window.scrollY >=  0.2 * window.innerHeight) {
        //     setScrollup(false);
        //   } 
        // };

        getContentful();

        // window.addEventListener("scroll", handleScroll);

        const aboutTimeout = setTimeout(() => {
          setScrollup(true);
        }, 5000);
        
      
          // Set another timeout to add the 'down' class to About after 20 seconds
          // const downTimeout = setTimeout(() => {
          //   setScrollup(false);
          // }, 18000);
      
          // Clear the timeouts to prevent them from running after the component unmounts
          return () => {
            clearTimeout(aboutTimeout);
            // window.removeEventListener("scroll", handleScroll);
            // clearTimeout(downTimeout);
          };
      

    }, []);

   
    

    return(
        <div className="main-notice"> 
            <h3>공지사항</h3>
            <ul className="notice_list">
                <li>
                  <a href="">
                    <div className="notice-info">
                      <div className="type01">학과</div>
                      <div>[대학내일 자회사 NHR] 디자인 어시스턴트 모집</div> 
                      <div>2024-12-06</div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="">
                    <div className="notice-info">
                      <div className="type02">채용</div>
                      <div>[대학내일 자회사 NHR] 디자인 어시스턴트 모집</div> 
                      <div>2024-12-06</div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="">
                    <div className="notice-info">
                      <div className="type03">기타</div>
                      <div>[대학내일 자회사 NHR] 디자인 어시스턴트 모집</div> 
                      <div>2024-12-06</div>
                    </div>
                  </a>
                </li> 
            </ul>
            <a href="/page/notice" className="more">전체 보기</a> 
        </div>
    )
}

