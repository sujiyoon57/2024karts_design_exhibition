"use client";

import { fetchContentful } from "@/app/contentful/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/app/component/header";

export default function ArchiveIntroPage({ params }) {
    const { slug } = params; // ✅ URL에서 slug 값 가져오기
    const [archiveNew, setArchiveNew] = useState(null);
    const [activeTab, setActiveTab] = useState("info");
    const [menuOn, setMenuOn] = useState(false);
    const [loading, setLoading] = useState(true);

    // ✅ 데이터를 가져오는 useEffect
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchContentful("archiveNew"); 
                
                if (data) {
                    // ✅ slug 값으로 데이터 찾기
                    const matchedData = data.find(item => item.fields.slug === slug);
                    
                    if (matchedData) {
                        setArchiveNew(matchedData.fields);
                    } else {
                        console.error("Error: 해당 slug를 가진 데이터가 없습니다.");
                    }
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [slug]);

    if (loading) return <p>Loading...</p>; // ✅ 로딩 상태 추가
    if (!archiveNew) return <p>데이터를 불러올 수 없습니다.</p>; // ✅ 데이터가 없을 때 처리

    return (
        <div className="archive-container">
            <Header menuOn={menuOn} setMenuOn={setMenuOn} />
            <div className="archive_intro archive_intro_web">
                <div className="backtolist">
                    <Link href="/page/archive">⟵<span>Back to Lists</span></Link>
                </div>

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
                    <div className="title">{archiveNew?.title ?? "제목 없음"}</div>
                    <div className="info_txt">
                        {archiveNew?.post ? documentToReactComponents(archiveNew.post) : "내용 없음"}
                    </div>
                    <div className="info_link">
                        <p><Link href={`/page/exhibition?year=${archiveNew?.exhibitionYear}`}>View All Projects</Link></p>
                        {archiveNew?.download?.fields?.file?.url && (
                            <p><a href={`https:${archiveNew.download.fields.file.url}`} download>Download PDF</a></p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
