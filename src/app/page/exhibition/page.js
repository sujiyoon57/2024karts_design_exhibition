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
    const portfolio =
        data?
            ( year? data.filter((item) => year===item.fields.NEWexhibitionYear) : data )
                .sort((a, b) => a.fields.nameKr.localeCompare(b.fields.nameKr, "ko-KR"))
            : [];

    return (
        <div className="exhibition">
            <div className="exhibition_tab">
                {/*<Link href={`/page/exhibition?projects=${projectIds.join(",")}`} className="active">프로젝트</Link>*/}
                {/*<Link href={`/page/exhibition_list?projects=${projectIds.join(",")}`}>디자이너</Link>*/}
                <Link href={year ? `/page/exhibition?exhibitionYear=${year}` : `/page/exhibition`} className="active">프로젝트</Link>
                <Link href={year ? `/page/exhibition_list?exhibitionYear=${year}` : `/page/exhibition_list`}>디자이너</Link>
            </div>
            <div className="exhibition-container">
                {portfolio.length > 0 ? (
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
