"use client";

import Link from "next/link";
import Image from "next/image";
import { fetchContentful } from "@/app/contentful/contentful";
import { useSearchParams } from "next/navigation"; // ✅ useSearchParams() 사용
import { useState, useEffect } from "react";
import Header from "@/app/component/header";

export default function Exhibition() {
    const searchParams = useSearchParams(); // ✅ useSearchParams()를 사용하여 URL 파라미터 가져오기
    const projectIds = searchParams.get("projects")?.split(",") || []; // ✅ projects 파라미터 가져오기

    const [portfolio, setPortfolio] = useState([]);
    const [loading, setLoading] = useState(true);
    const [menuOn, setMenuOn] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let data = await fetchContentful("portfolio");
                if (!data) data = [];

                // ✅ 특정 프로젝트 ID에 해당하는 데이터만 필터링
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
    }, [projectIds]); // ✅ projectIds가 변경될 때마다 데이터 다시 가져오기

    return (
        <div className="exhibition">
            <Header menuOn={menuOn} setMenuOn={setMenuOn} />
            <div className="exhibition_tab">
                <Link href={`/page/exhibition?projects=${projectIds.join(",")}`} className="active">프로젝트</Link>
                <Link href={`/page/exhibition_list?projects=${projectIds.join(",")}`}>디자이너</Link>
            </div>
            <div className="exhibition-container">
                {loading ? (
                    <p>데이터를 불러오는 중...</p>
                ) : portfolio.length > 0 ? (
                    portfolio.map((data) => {
                        const thumbnail = data.fields?.thumbnail?.fields?.file;
                        const imageUrl = thumbnail?.url ? `https:${thumbnail.url}` : "/default-image.jpg";
                        const imageDetails = thumbnail?.details?.image;

                        return (
                            <Link href={`/page/portfolio/${data.sys.id}`} key={data.sys.id} passHref legacyBehavior>
                                <a>
                                    <div className="exhibition-image-container">
                                        <Image
                                            src={imageUrl}
                                            alt="Project Thumbnail"
                                            width={imageDetails?.width || 500}
                                            height={imageDetails?.height || 300}
                                            sizes="100vw"
                                            className={imageDetails?.height > imageDetails?.width ? "isVertical" : ""}
                                        />
                                    </div>
                                    <div className={`exhibition-info ${data.fields.thumbnailBlack ? "whiteFont" : ""}`}>
                                        <div>{data.fields.projectName} {data.fields.projectNameEng}</div>
                                        <div className={`exhibition-student-name ${data.fields.thumbnailBlack ? "whiteFont" : ""}`}>
                                            {data.fields.nameKr} {data.fields.nameEng}
                                        </div>
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
