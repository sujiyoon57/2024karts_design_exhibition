import Image from "next/image"
import { fetchContentful } from "@/app/contentful/contentful"
import ScrollDown from "@/app/component/scrollDown"

export default async function MainPage(){

    const data = await fetchContentful('poster');
    const poster = data[0].fields.posterImage.fields.file.url;
    const mobilePoster = data[0].fields.posterImageMobile.fields.file.url;
    const embedLink = data[0].fields.videoEmbedLink || null;


    return(
        <div className='main-container'>
            {embedLink?(
                <div className="video-container"></div>
            ):(
            <div className='img-container'>
                <Image src={`https:${poster}`} alt='..' width={0} height={0} sizes='100vw' className="web-poster" />
                <Image src={`https:${mobilePoster}`} alt='..' width={0} height={0} sizes='100vw' className="mobile-poster"/>
            </div>)}
            <ScrollDown/>
        </div>
    )
}

