import Link from "next/link"
import {getEntryById} from "@/app/contentful/contentful"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export default async function NoticeView({ params }) {
    const { id } = params;

    const data = await getEntryById(id, 300); //5분 캐싱
    const notice = data.fields;
    const sys = data.sys;

    if (!notice) return <div>Loading...</div>;

    const options = {
      renderText: (text) => {
        return text.split("\n").map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
        ));
      },
    };

    return (
        <div className="notiview-container">
            <div className="notiview-top">
                <div className="notiview_tit">{notice.title}</div>
                <div className="notiview-info">
                    <div><span>작성자</span> <em>{notice.writer}</em></div>
                    <div><span>작성일</span> <em>{sys?.createdAt?.substr(0, 10)}</em></div>
                    {notice.file?.fields?.file?.url && (
                        <div>
                            <span>첨부파일</span>
                            <em>
                                <Link href={`https:${notice.file.fields.file.url}`} target="_blank">
                                    {notice.file.fields.file.fileName} ({notice.file.fields.file.details.size} byte)
                                </Link>
                            </em>
                        </div>
                    )}
                </div>
            </div>
            <div className="notiview-cont">
                {notice.contents && (
                <div className="notiview-cont">
                    {documentToReactComponents(notice.contents, options)}
                </div>
                )}
            </div>
            <div className="notiview-back">
                <Link href='/page/notice'>Back to List</Link>
            </div>
        </div>
    );
}