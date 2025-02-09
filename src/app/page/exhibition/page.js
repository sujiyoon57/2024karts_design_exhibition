"use client";
import Link from "next/link";
import Image from "next/image";
import { fetchContentful } from "@/app/contentful/contentful";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Footer from "@/app/component/footer";

export default function Exhibition() {
    const searchParams = useSearchParams();
    const year = searchParams.get("year"); // URL에서 `year` 값 가져오기

    const [portfolio, setPortfolio] = useState([]); // ✅ 상태값으로 데이터 관리
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let data = await fetchContentful("portfolio");
                if (!data) data = []; // 데이터가 없으면 빈 배열 처리

                // ✅ 특정 연도(year)에 해당하는 프로젝트만 필터링
                if (year) {
                    data = data.filter((item) => String(item.fields.NEWexhibitionYear) === year);
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
    }, [year]);

    return (
        <div className="exhibition">
            <div className="exhibition_tab">
                <Link href={`/page/exhibition?year=${year}`} className="active">프로젝트</Link>
                <Link href={`/page/exhibition_list?year=${year}`}>디자이너</Link>
            </div>
            <div className="exhibition-container">
                {loading ? (
                    <p>데이터를 불러오는 중...</p> // ✅ 로딩 상태 표시
                ) : portfolio.length > 0 ? (
                    portfolio.map((data) => {
                        const thumbnail = data.fields?.thumbnail?.fields?.file;
                        const imageUrl = thumbnail?.url ? `https:${thumbnail.url}` : "/default-image.jpg";
                        const imageDetails = thumbnail?.details?.image;

                        return (
                            <Link href={`/page/portfolio/${data.sys.id}`} key={data.sys.id}>
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
                            </Link>
                        );
                    })
                ) : (
                    <p>해당 연도의 프로젝트가 없습니다.</p>
                )}
            </div>
        </div>
    );
}
