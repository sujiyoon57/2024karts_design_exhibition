"use client"; // 클라이언트 컴포넌트로 지정

import { fetchContentful } from "@/app/contentful/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/app/component/header";

export default function ArchiveIntroPage({ params }) {
    const { id } = params; // params에서 id 추출
    const [archiveNew, setArchiveNew] = useState({});
    const [activeTab, setActiveTab] = useState("info");
    const [menuOn, setMenuOn] = useState(false);

    // 데이터를 가져오는 useEffect
    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                const data = await fetchContentful("archiveNew");
                if (data && data[id]) {
                    console.log("이미지", data[id].fields.titleimg);
                    setArchiveNew(data[id].fields);
                }
            }
        };
        fetchData();
    }, [id]);

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

    // ✅ exhibitionYear 값 추가 (년도별 페이지 이동 가능하도록 수정)
    const exhibitionYear = archiveNew?.NEWexhibitionYear || (id === "1" ? "2023" : "2024");


    return (
        <div className="archive-container">
            <div>
                {archiveNew.title ? archiveNew.title : "데이터 로딩 중..."} {/* ✅ 상태가 변경되면 자동 업데이트됨 */}
            </div>
            <Header menuOn={menuOn} setMenuOn={setMenuOn} />
            <div className="archive_intro archive_intro_web">
                <div className="backtolist"><Link href="/page/archive">⟵<span>Back to Lists</span></Link></div>
                <p className="tit_img tit_img_pc"><img
                    src={archiveNew?.titleimg?.fields?.file?.url ? `https:${archiveNew.titleimg.fields.file.url}` : "/default-image.png"}
                    alt="Title Image"
                /></p>
                <p className="tit_img tit_img_mo"><img
                    src={archiveNew?.titleimgMobile?.fields?.file?.url ? `https:${archiveNew.titleimgMobile.fields.file.url}` : "/default-image.png"}
                    alt="Title Image"
                /></p>

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
                        <p><Link href={`/page/exhibition?year=${encodeURIComponent(exhibitionYear)}`}>View All Projects</Link></p>

                        {/* ✅ 'Download PDF' 버튼에 새로운 class 추가 */}
                        <p><button className="download-btn" onClick={downloadFile}>Download PDF</button></p>
                    </div>


                </div>
                <div className="credit">
                    <h4>
                        졸업준비위원회
                        <br />
                        <span className="credit-en">Graduation Preparatory Committee</span>
                    </h4>

                    {/* ✅ org 데이터 구조를 모바일처럼 적용 */}
                    {archiveNew?.org && (
                        <div className="org-container">
                            {archiveNew.org.content.map((section, sectionIndex) => (
                                <div key={sectionIndex} className="section">
                                    {section.content.length === 1 ? (
                                        <h4 className="section-title">
                                            {documentToReactComponents(section.content[0])}
                                        </h4>
                                    ) : (
                                        <table className="org-table">
                                            <tbody>
                                                {section.content.map((row, rowIndex) => (
                                                    <tr key={rowIndex} className={`row-${rowIndex}`}>
                                                        {row.content.map((cell, cellIndex) => (
                                                            <td key={cellIndex} className={`column-${cellIndex}`}>
                                                                {documentToReactComponents(cell)}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* ✅ org2도 모바일처럼 적용 */}
                    {archiveNew?.org2 && (
                        <div className="org2-container">
                            {archiveNew.org2.content.map((section, sectionIndex) => (
                                <div key={sectionIndex} className="section">
                                    {section.content.length === 1 ? (
                                        <h4 className="section-title">
                                            {documentToReactComponents(section.content[0])}
                                        </h4>
                                    ) : (
                                        <table className="org2-table">
                                            <tbody>
                                                {section.content.map((row, rowIndex) => (
                                                    <tr key={rowIndex} className={`row-${rowIndex}`}>
                                                        {row.content.map((cell, cellIndex) => (
                                                            <td key={cellIndex} className={`column-${cellIndex}`}>
                                                                {documentToReactComponents(cell)}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>



            </div>
            <div className="archive_intro archive_intro_mo">
                <div className="exhibition_tab mo-archive-tab">
                    <button
                        className={activeTab === "info" ? "active" : ""}
                        onClick={() => setActiveTab("info")}
                    >
                        Info
                    </button>
                    <button
                        className={activeTab === "credit" ? "active" : ""}
                        onClick={() => setActiveTab("credit")}
                    >
                        Credit
                    </button>
                </div>

                {/* Info 탭 내용 */}
                {activeTab === "info" && (
                    <div className="tab_cont_info">
                        <p className="tit_img tit_img_pc">
                            <img
                                src={archiveNew?.titleimg?.fields?.file?.url ? `https:${archiveNew.titleimg.fields.file.url}` : "/default-image.png"}
                                alt="Title Image"
                            />
                        </p>
                        <p className="tit_img tit_img_mo">
                            <img
                                src={archiveNew?.titleimgMobile?.fields?.file?.url ? `https:${archiveNew.titleimgMobile.fields.file.url}` : "/default-image.png"}
                                alt="Title Image"
                            />
                        </p>
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
                                {/* ✅ 모바일에서도 년도별 페이지 이동 가능하도록 수정 */}
                                <div className="info_link">
                                    {/* ✅ 'View All Projects' 스타일 그대로 유지 */}
                                    <p><Link href={`/page/exhibition?year=${encodeURIComponent(exhibitionYear)}`}>View All Projects</Link></p>

                                    {/* ✅ 'Download PDF' 버튼에 새로운 class 추가 */}
                                    <p><button className="download-btn" onClick={downloadFile}>Download PDF</button></p>
                                </div>
                            </div>

                        </div>
                    </div>
                )}


                {/* Credit 탭 내용 */}
                {activeTab === "credit" && (
                    <div className="tab_cont_credit">
                        <div className="credit">
                            <h4>
                                졸업준비위원회<br />
                                <span className="credit-en">Graduation Preparatory Committee</span>
                            </h4>

                            {archiveNew?.org && (
                                <div className="org-container">
                                    {archiveNew.org.content.map((section, sectionIndex) => (
                                        <div key={sectionIndex} className="section">
                                            {section.content.length === 1 ? (
                                                <h4 className="section-title">
                                                    {documentToReactComponents(section.content[0])}
                                                </h4>
                                            ) : (
                                                <table className="org-table">
                                                    <tbody>
                                                        {section.content.map((row, rowIndex) => (
                                                            <tr key={rowIndex} className={`row-${rowIndex}`}>
                                                                {row.content.map((cell, cellIndex) => (
                                                                    <td key={cellIndex} className={`column-${cellIndex}`}>
                                                                        {documentToReactComponents(cell)}
                                                                    </td>
                                                                ))}
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}




                            {/* ✅ org2 기존 코드 유지 */}
                            {archiveNew?.org2 && (
                                <div className="org2-container">
                                    {archiveNew.org2.content.map((section, sectionIndex) => (
                                        <div key={sectionIndex} className="section">
                                            {section.content.length === 1 ? (
                                                <h4 className="section-title">
                                                    {documentToReactComponents(section.content[0])}
                                                </h4>
                                            ) : (
                                                <table className="org2-table">
                                                    <tbody>
                                                        {section.content.map((row, rowIndex) => (
                                                            <tr key={rowIndex} className={`row-${rowIndex}`}>
                                                                {row.content.map((cell, cellIndex) => (
                                                                    <td key={cellIndex} className={`column-${cellIndex}`}>
                                                                        {documentToReactComponents(cell)}
                                                                    </td>
                                                                ))}
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div >
        </div >
    );
}
