"use client";
import Link from "next/link";
import Image from "next/image";
import { fetchContentful } from "@/app/contentful/contentful";
import { useSearchParams } from "next/navigation";
import Footer from "@/app/component/footer";

export default async function Exhibition() {
    const searchParams = useSearchParams();
    const year = searchParams.get("year"); // URL에서 `year` 값 가져오기

    // ✅ 연도를 기준으로 Contentful에서 데이터를 가져옴
    var data = await fetchContentful("portfolio");
    let portfolio = data || []; // 데이터가 없을 경우 빈 배열 할당

    // ✅ 특정 연도(year)에 해당하는 프로젝트만 필터링
    if (year) {
        portfolio = portfolio.filter((item) => String(item.fields.NEWexhibitionYear) === year);
    }

    // ✅ 학생 이름(한글 기준)으로 가나다순 정렬
    portfolio.sort((a, b) => {
        return a.fields.nameKr.localeCompare(b.fields.nameKr, "ko-KR");
    });

    return (
        <div className="exhibition">
            <div className="exhibition_tab">
                <Link href={`/page/exhibition?year=${year}`} className="active">Projects</Link>
                <Link href={`/page/exhibition_list?year=${year}`}>Designers</Link>
            </div>
            <div className="exhibition-container">
                {portfolio.length > 0 ? (
                    portfolio.map((data) => {
                        const thumbnail = data.fields?.thumbnail?.fields?.file;
                        const imageUrl = thumbnail?.url ? `https:${thumbnail.url}` : "/default-image.jpg";
                        const imageDetails = thumbnail?.details?.image;

                        return (
                            // ✅ 기존 index 사용 대신 `sys.id` 사용하여 고유한 URL 생성
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
                                    <div>{data.fields.projectName}  {data.fields.projectNameEng}</div>
                                    <div className={`exhibition-student-name ${data.fields.thumbnailBlack ? "whiteFont" : ""}`}>
                                        {data.fields.nameKr}  {data.fields.nameEng}
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
