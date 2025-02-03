"use client"
import Link from "next/link"
import Image from "next/image"
import { fetchContentful } from "@/app/contentful/contentful"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import InstaLogoIcon from "/public/asset/instaLogo.svg"
import WebLogoIcon from "/public/asset/webLogo.svg"
import VimeoLogoIcon from "/public/asset/vimeoLogo.svg"
import Footer from "@/app/component/footer"
import ScrollUp from "@/app/component/scrollUp"
import ReactPlayer from "react-player"
import { useSearchParams } from 'next/navigation'


export default async function Notice2(props){

    const id = parseInt(props.params.id);
    const data = await fetchContentful('notice2');
    const notice = data[id].fields;
    const sys = data[id].sys;
    const len  = data.length > 0 && data.length; 
    //const timeFormat = searchParams.get("timeFormat")

    //console.log(notice);

    return(

        <div className="notiview-container">
            <div className="notiview-top">
                <div className="notiview_tit">{notice.title}</div>
                <div className="notiview-info"> 
                    <div><span>작성자</span> <em>{notice.writer}</em></div>
                    <div><span>작성일</span> <em>{(sys.createdAt).substr(0, 10)}</em></div>
                    {notice.file !== undefined && notice.file.fields.file.url !== '' ? (
                        <div><span>첨부파일</span> <em><Link href={'https:'+notice.file.fields.file.url}>{notice.file.fields.file.fileName}({notice.file.fields.file.details.size}byte)</Link></em></div> 
                    ) : null}
                </div>
            </div>
            <div className="notiview-cont"> 
                {notice.contents && notice.contents.content.map((data)=>(
                    <p key={data.id} className="about-flex-item">
                        {documentToReactComponents(data)}</p>
                ))}
            </div> 
            <div className="notiview-back"><Link href='/page/notice2'>Back to List</Link></div> 
        </div>
    );
}
