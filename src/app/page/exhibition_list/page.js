import { Suspense } from "react"; // 추가
import Link from "next/link";
import Image from "next/image";
import { fetchContentful } from "@/app/contentful/contentful";

export default function Exhibition({searchParams}) {
    const year = searchParams?.exhibitionYear;

    return (
        <Suspense fallback={<p>Loading...</p>}>
            <ExhibitionContent year={year}/>
        </Suspense>
    );
}

async function ExhibitionContent({year}) {
    // const projectIds = searchParams?.projects?.split(",") ?? [];

    const data = await fetchContentful("portfolio");

    /*
    * 2025.12
    * projectIds를 넘겨주는 방식에서, exhibitionYear을 넘겨주는 방식으로 변경
    * year를 넘겨주는 방식의 경우 전체 작품 조회시 exhibitionYear=undefined 으로 넘어가는 상황 존재
    * -> Link 이동시 year조건 추가
    * */
    // const portfolio = data?
    //     data.filter((item) => projectIds.includes(item.sys.id))
    //     .sort((a, b) => a.fields.nameKr.localeCompare(b.fields.nameKr, "ko-KR")) : [];
    // const portfolio = data?
    //     data.filter((item) => projectIds.includes(item.sys.id))
    //         .sort((a, b) => a.fields.nameKr.localeCompare(b.fields.nameKr, "ko-KR")) : [];
    const portfolio =
        data?
            ( year? data.filter((item) => year===item.fields.NEWexhibitionYear) : data )
                .sort((a, b) => a.fields.nameKr.localeCompare(b.fields.nameKr, "ko-KR"))
            : [];

    return (
        <div className="exhibition">
            <div className="exhibition_tab">
                {/*<Link href={`/page/exhibition?projects=${projectIds.join(",")}`}>프로젝트</Link>*/}
                {/*<Link href={`/page/exhibition_list?projects=${projectIds.join(",")}`} className="active">디자이너</Link>\*/}
                <Link href={year ? `/page/exhibition?exhibitionYear=${year}` : `/page/exhibition`}>프로젝트</Link>
                <Link href={year ? `/page/exhibition_list?exhibitionYear=${year}` : `/page/exhibition_list`} className="active">디자이너</Link>
            </div>
            <div className="exhibition_listtype">
                <div className="listtype_hd">
                    <div>학생명 Student Name</div>
                    <div>작품이름 Project Name</div>
                    <div>전공 이름</div>
                </div>
                {portfolio.length > 0 ? (
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
