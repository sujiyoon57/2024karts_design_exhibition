import Link from "next/link";
import Image from "next/image";
import { fetchContentful } from "@/app/contentful/contentful"; 

export default async function Notice(){

    var data = await fetchContentful('notice');
    const notice = data;
    
    return( 
        <div className="notice-container">
            <div className="notice_type">
                <button className="type_all active">전체</button>
                <button className="type01">학과</button>
                <button className="type02">행사</button>
                <button className="type03">채용</button>
                <button className="type04">기타</button>
            </div>
            <ul className="notice_th">
                <li>분류</li>
                <li>내용</li>
                <li>날짜</li>
            </ul>
            <ul className="notice_list">
            {notice && notice.map((data,index)=>(
                <li>
                <Link href={ `/page/notice_view/${index}`} key={index}>
                     
                    <div className="notice-info">
                        <div className="type01">학과</div>
                        <div>{data.fields.title}</div>
                        <div>{data.sys.createdAt}</div>
                    </div>
                    
                </Link>
                </li>
            ))}
            </ul>
        </div>  
    )
}