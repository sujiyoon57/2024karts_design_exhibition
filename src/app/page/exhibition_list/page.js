import Link from "next/link";
import Image from "next/image";
import { fetchContentful } from "@/app/contentful/contentful";
import Footer from "@/app/component/footer";

export default async function Exhibition() {
    var data = await fetchContentful("portfolio");
    let portfolio = data || []; // 데이터가 없을 경우 빈 배열 할당

    // ✅ 학생 이름(한글 기준)으로 가나다순 정렬
    portfolio.sort((a, b) => {
        return a.fields.nameKr.localeCompare(b.fields.nameKr, "ko-KR");
    });

    return (
        <div className="exhibition">
            {/* <div className="exhibition-title">{title}</div> */}
            <div className="exhibition_tab">
                <Link href={`/page/exhibition`}>Projects</Link>
                <Link href={`/page/exhibition_list`} className="active">Designers</Link>
            </div>
            <div className="exhibition_listtype">
                <div className="listtype_hd">
                    <div>학생명 Student Name</div>
                    <div>작품이름 Project Name</div>
                    <div>전공 이름</div>
                </div>
                {portfolio.map((data, index) => {
                    const thumbnail = data.fields?.thumbnail?.fields?.file; // 안전한 접근
                    const imageUrl = thumbnail?.url ? `https:${thumbnail.url}` : "/default-image.jpg";
                    const imageDetails = thumbnail?.details?.image;

                    return (
                        <Link href={`/page/portfolio/${index}`} key={index}>
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
                })}
            </div>
        </div>
    );
}
