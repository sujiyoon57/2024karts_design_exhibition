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

        getContentful();
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
                    <p></p>
                    <p></p>
                </div>
            </div>       
            <ScrollDown/>
        </div>
    )
}

