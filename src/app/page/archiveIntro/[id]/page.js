"use client";

import { fetchContentful } from "@/app/contentful/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/app/component/header";

export default function ArchiveIntroPage({ params }) {
    const { id } = params; // ✅ 이제 id가 slug 값이 됨
    const [archiveNew, setArchiveNew] = useState(null);
    const [loading, setLoading] = useState(true);
    const [menuOn, setMenuOn] = useState(false);
    const [activeTab, setActiveTab] = useState("info"); // ✅ 추가된 부분

    // ✅ slug 기반으로 데이터 가져오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id) {
                    const data = await fetchContentful("archiveNew");

                    if (data && Array.isArray(data)) {
                        const filteredData = data.find((item) => item.fields.slug === id);

                        if (filteredData) {
                            setArchiveNew(filteredData.fields);
                        } else {
                            console.error(`해당 slug(${id})를 가진 데이터를 찾을 수 없습니다.`);
                        }
                    }
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!archiveNew) return <p>해당 slug를 가진 데이터를 찾을 수 없습니다.</p>; // ✅ 데이터 없을 경우 예외 처리

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
                        <p>
                            <Link
                                href={{
                                    pathname: "/page/exhibition",
                                    query: { projects: archiveNew?.portfolioList?.map(item => item.sys.id).join(",") }
                                }}
                            >
                                View All Projects
                            </Link>
                        </p>
                        {/* ✅ 'Download PDF' 버튼에 새로운 class 추가 */}
                        <p><button className="download-btn" onClick={downloadFile}>Download PDF</button></p>
                    </div>


                </div>
                <div className="credit">

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
                                                                {typeof cell === "string" ? cell : documentToReactComponents(cell)}
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
                                                                {typeof cell === "string" ? cell : documentToReactComponents(cell)}
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
                                    <p>
                                        <Link
                                            href={{
                                                pathname: "/page/exhibition",
                                                query: { projects: archiveNew?.portfolioList?.map(item => item.sys.id).join(",") }
                                            }}
                                        >
                                            View All Projects
                                        </Link>
                                    </p>
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
                                                                        {typeof cell === "string" ? cell : documentToReactComponents(cell)}
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
                                                                        {typeof cell === "string" ? cell : documentToReactComponents(cell)}
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
