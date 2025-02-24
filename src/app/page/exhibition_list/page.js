"use client";

import { Suspense } from "react"; // 추가
import Link from "next/link";
import Image from "next/image";
import { fetchContentful } from "@/app/contentful/contentful";
import { useSearchParams } from "next/navigation"; // ✅ useSearchParams 사용
import { useState, useEffect } from "react";
import Header from "@/app/component/header";

export default function Exhibition() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <ExhibitionContent />
        </Suspense>
    );
}

function ExhibitionContent() {
    const searchParams = useSearchParams(); // ✅ useSearchParams 사용
    const projectIds = searchParams.get("projects")?.split(",") || []; // ✅ projects 파라미터 가져오기

    const [portfolio, setPortfolio] = useState([]);
    const [loading, setLoading] = useState(true);
    const [menuOn, setMenuOn] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                let data = await fetchContentful("portfolio");
                if (!data) data = [];

                // ✅ 프로젝트 ID 기반 필터링
                if (projectIds.length > 0) {
                    data = data.filter((item) => projectIds.includes(item.sys.id));
                }

                // ✅ 학생 이름(한글 기준)으로 가나다순 정렬
                data.sort((a, b) => a.fields.nameKr.localeCompare(b.fields.nameKr, "ko-KR"));

                setPortfolio(data);
            } catch (error) {
                console.error("Error fetching portfolio data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [projectIds]); // ✅ `projects` 값이 변경될 때마다 데이터 다시 불러오기

    return (
        <div className="exhibition">
            <Header menuOn={menuOn} setMenuOn={setMenuOn} />
            <div className="exhibition_tab">
                <Link href={`/page/exhibition?projects=${projectIds.join(",")}`}>프로젝트</Link>
                <Link href={`/page/exhibition_list?projects=${projectIds.join(",")}`} className="active">디자이너</Link>
            </div>
            <div className="exhibition_listtype">
                <div className="listtype_hd">
                    <div>학생명 Student Name</div>
                    <div>작품이름 Project Name</div>
                    <div>전공 이름</div>
                </div>
                {loading ? (
                    <p>데이터를 불러오는 중...</p>
                ) : portfolio.length > 0 ? (
                    portfolio.map((data) => {
                        const projectId = data.sys.id;
                        const thumbnail = data.fields?.thumbnail?.fields?.file;
                        const imageUrl = thumbnail?.url ? `https:${thumbnail.url}` : "/default-image.jpg";
                        const imageDetails = thumbnail?.details?.image;

                        return (
                            <Link href={`/page/portfolio/${projectId}`} key={projectId} passHref legacyBehavior>
                                <a>
                                    <div className={`exhibition-info-list ${data.fields.thumbnailBlack ? "whiteFont" : ""}`}>
                                        <div className={`exhibition-student-name ${data.fields.thumbnailBlack ? "whiteFont" : ""}`}>
                                            {data.fields.nameKr}  {data.fields.nameEng}
                                        </div>
                                        <div>
                                            {data.fields.projectName}  {data.fields.projectNameEng}
                                        </div>
                                        <div>{data.fields.major}</div>
                                    </div>
                                    <div className="exhibition-image-container-list">
                                        <Image
                                            src={imageUrl}
                                            alt="Project Thumbnail"
                                            width={imageDetails?.width || 500}
                                            height={imageDetails?.height || 300}
                                            sizes="100vw"
                                            className={(imageDetails?.height || 0) > (imageDetails?.width || 0) ? "isVertical" : ""}
                                        />
                                    </div>
                                </a>
                            </Link>

                        );
                    })
                ) : (
                    <p>해당 프로젝트가 없습니다.</p>
                )}
            </div>
        </div>
    );
}
