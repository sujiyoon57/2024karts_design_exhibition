"use client"
import Link from "next/link"
import { fetchContentful } from "@/app/contentful/contentful"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Footer from "@/app/component/footer"
import ScrollUp from "@/app/component/scrollUp"
import { useSearchParams } from 'next/navigation'


export default async function Notice(props){

    const id = parseInt(props.params.id);
    const data = await fetchContentful('notice');
    const notice = data[id].fields;
    const sys = data[id].sys;
    const len  = data.length > 0 && data.length; 

    return(
        <div className="notiview-container">
            <div className="notiview-top">
                <div className="notiview_tit">{notice.title}</div>
                <div className="notiview-info"> 
                    <div><span>작성자</span> <em>{notice.writer}</em></div>
                    <div><span>작성일</span> <em>{sys.createdAt.substr(0, 10)}</em></div>
                    {notice.file?.fields?.file?.url ? (
                        <div>
                            <span>첨부파일</span> 
                            <em>
                                <Link href={'https:' + notice.file.fields.file.url}>
                                    {notice.file.fields.file.fileName} ({notice.file.fields.file.details.size}byte)
                                </Link>
                            </em>
                        </div> 
                    ) : null}
                </div>
            </div>

            {/* ✅ 본문 내용이 Contentful에서 작성한 대로 렌더링되도록 수정 */}
            <div className="notiview-cont"> 
                {notice.contents && documentToReactComponents(notice.contents)}
            </div> 

            <div className="notiview-back">
                <Link href='/page/notice'>Back to List</Link>
            </div> 
        </div>
    );
}
