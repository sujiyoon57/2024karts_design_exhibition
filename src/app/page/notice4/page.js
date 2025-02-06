import Link from "next/link";
import Image from "next/image";
import { fetchContentful } from "@/app/contentful/contentful"; 

export default async function Notice4(){

    var data = await fetchContentful('notice4');
    const notice = data;
    
    return( 
        <div className="notice-container">
            <div className="notice_type">
                <button><Link href={ ` `}>전체</Link></button>
                <button className="type01"><Link href={ `/page/notice`}>학과</Link></button>
                <button className="type02"><Link href={ `/page/notice2`}>행사</Link></button>
                <button className="type03"><Link href={ `/page/notice3`}>채용</Link></button>
                <button className="type04 active"><Link href={ `/page/notice4`}>기타</Link></button>
            </div>
            <ul className="notice_th">
                <li>분류</li>
                <li>내용</li>
                <li>날짜</li>
            </ul>
            <ul className="notice_list">
            {notice && notice.map((data,index)=>(
                <li>
                <Link href={ `/page/notice4_view/${index}`} key={index}>
                     
                    <div className="notice-info">
                        <div className="type04">기타</div>
                        <div>{data.fields.title}</div>
                        <div>{(data.sys.createdAt).substr(0, 10)}</div>
                    </div>
                    
                </Link>
                </li>
            ))}
            </ul>
        </div>  
    )
}