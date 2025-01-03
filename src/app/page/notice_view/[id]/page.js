import Link from "next/link"
import Image from "next/image"
import { fetchContentful } from "@/app/contentful/contentful"
import InstaLogoIcon from "/public/asset/instaLogo.svg"
import WebLogoIcon from "/public/asset/webLogo.svg"
import VimeoLogoIcon from "/public/asset/vimeoLogo.svg"
import Footer from "@/app/component/footer"
import ScrollUp from "@/app/component/scrollUp"
import ReactPlayer from "react-player"

export default async function Notice(props){



    const id = parseInt(props.params.id);
    const data = await fetchContentful('notice');
    const notice = data[id].fields;
    const len  = data.length > 0 && data.length; 

    
    return(
        <div className="notiview-container">
            <div className="notiview-top">
                <div className="notiview_tit">{notice.title}</div>
                <div className="notiview-info"> 
                    <div><span>작성자</span> <em>user</em></div>
                    <div><span>작성일</span> <em>2024-00-00</em></div>
                    <div><span>첨부파일</span> <em><Link href=''>pdf.pdf(213kb)</Link></em></div> 
                </div>
            </div>
            <div className="notiview-cont"> {notice.content} </div> 
            <div className="notiview-back"><Link href='/page/notice'>Back to List</Link></div> 
        </div>
    )
}