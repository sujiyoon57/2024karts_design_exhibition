"use client"

import {documentToReactComponents} from "@contentful/rich-text-react-renderer";
import Link from "next/link";

export default function Info({ archiveNew, id }){

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

    const downloadFile = async () => {
        const url = `https:${archiveNew?.download?.fields?.file?.url}`;
        const response = await fetch(url);
        const blob = await response.blob();
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = "downloadedFile.pdf"; // 다운로드 파일명
        link.click();
    };

    return(
        <div className="info">
            <div className="title">
                {archiveNew?.title ?? "제목 없음"}
            </div>
            <div className="info_txt">
                {archiveNew?.post
                    ? documentToReactComponents(archiveNew.post, options)
                    : "제목 없음"}
            </div>
            <div className="info_link">
                {/* ✅ 'View All Projects' 스타일 그대로 유지 */}
                <p>
                    <Link
                        href={{
                            pathname: "/page/exhibition",
                            query: { exhibitionYear : archiveNew.exhibitionYear }
                            // query: { projects: archiveNew?.portfolioList?.map(item => item.sys.id).join(",") }
                        }}
                    >
                        View All Projects
                    </Link>
                </p>
                {/* ✅ 'Download PDF' 버튼에 새로운 class 추가 */}
                <p><button className="download-btn" onClick={downloadFile}>Download PDF</button></p>
            </div>
        </div>
    );
}