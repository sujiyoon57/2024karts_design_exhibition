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

        const handleScroll = () => {
          // 스크롤이 100vh 이상인 경우 scrollup을 false로 설정
          if (window.scrollY >=  0.4 * window.innerHeight) {
            setScrollup(false);
          } else {
            const aboutTimeout = setTimeout(() => {
              setScrollup(true);
            }, 7000);
          }
        };

        getContentful();

        window.addEventListener("scroll", handleScroll);

        const aboutTimeout = setTimeout(() => {
          setScrollup(true);
        }, 7000);
      
          // Set another timeout to add the 'down' class to About after 20 seconds
          // const downTimeout = setTimeout(() => {
          //   setScrollup(false);
          // }, 18000);
      
          // Clear the timeouts to prevent them from running after the component unmounts
          return () => {
            clearTimeout(aboutTimeout);
            window.removeEventListener("scroll", handleScroll);
            // clearTimeout(downTimeout);
          };
      

    }, []);

   
    

    return(
        <div className='main-container'  > 
            {embedLink?(
                <div className="video-container"></div>
            ):(
            <div className='img-container'>
                {poster && <Image src={`https:${poster}`} alt='..' width={0} height={0} sizes='100vw' className="web-poster"/>}
                {mobilePoster && <Image src={`https:${mobilePoster}`} alt='..' width={0} height={0} sizes='100vw' className="mobile-poster"/>}
            </div>)}
            <div className={`content-container ${scrollup ? 'up':'down'}`} >
                <div className="content">
                    <p>21명의 파동은 각자의 고유한 떨림을 유지하며 서로 자유로이 교차되며, 
새로운 움직임과 떨림을 공유합니다. 
우리의 고유한 파동은 끊임없는 움직임으로 각자의 궤적을 일구고 있습니다. 
그 파동들의 궤적이 서로의 흐름으로 엮이며 세상에 울려나가는 그 첫 울림을 소개합니다.</p>
                    <p>The 21 waves maintain their own tremors and freely cross each other, 
Share new movements and tremors. 
Our own waves are creating their own trajectories with constant movement. 
The trajectories of the waves are woven into each other&rsquos flow and we introduce the first reverberation that resonates in the world.</p>
                </div>
            </div>  
            <ScrollDown/>
        </div>
    )
}

