"use client";
import Link from "next/link";
import Image from "next/image";
import { fetchContentful } from "@/app/contentful/contentful";
import Footer from "@/app/component/footer";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Header from "@/app/component/header";

export default function ExhibitionList() {
    const searchParams = useSearchParams();
    const year = searchParams.get("year"); // URL에서 `year` 값 가져오기

    const [portfolio, setPortfolio] = useState([]); // ✅ 상태값으로 데이터 관리
    const [loading, setLoading] = useState(true);
    const [menuOn, setMenuOn] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let data = await fetchContentful("portfolio");
                if (!data) data = []; // 데이터가 없을 경우 빈 배열 처리

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
            <Header menuOn={menuOn} setMenuOn={setMenuOn} />
            <div className="exhibition_tab">
                <Link href={`/page/exhibition?year=${year}`}>프로젝트</Link>
                <Link href={`/page/exhibition_list?year=${year}`} className="active">디자이너</Link>
            </div>
            <div className="exhibition_listtype">
                <div className="listtype_hd">
                    <div>학생명 Student Name</div>
                    <div>작품이름 Project Name</div>
                    <div>전공 이름</div>
                </div>
                {loading ? (
                    <p>데이터를 불러오는 중...</p> // ✅ 로딩 상태 표시
                ) : portfolio.length > 0 ? (
                    portfolio.map((data) => {
                        const projectId = data.sys.id; // ✅ Contentful에서 가져온 고유 ID
                        const thumbnail = data.fields?.thumbnail?.fields?.file; // 안전한 접근
                        const imageUrl = thumbnail?.url ? `https:${thumbnail.url}` : "/default-image.jpg";
                        const imageDetails = thumbnail?.details?.image;

                        return (
                            <Link href={`/page/portfolio/${projectId}`} key={projectId}>
                                <div className={`exhibition-info-list ${data.fields.thumbnailBlack ? "whiteFont" : ""}`}>
                                    {/* ✅ 학생명 (한글 + 영어, 띄어쓰기 2번 추가) */}
                                    <div className={`exhibition-student-name ${data.fields.thumbnailBlack ? "whiteFont" : ""}`}>
                                        {data.fields.nameKr}  {data.fields.nameEng}
                                    </div>
                                    {/* ✅ 작품명 (한글 + 영어, 띄어쓰기 2번 추가) */}
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
