import Link from "next/link";
import Image from "next/image";
import { fetchContentful } from "@/app/contentful/contentful";
import Footer from "@/app/component/footer";
import ScrollUp from "@/app/component/scrollUp";

export default async function Portfolio(props) {
    const id = props.params.id; // Contentful의 sys.id 값이 URL로 전달됨
    const data = await fetchContentful("portfolio");

    // ✅ 현재 포트폴리오 데이터 찾기
    const portfolioItem = data.find((item) => item.sys.id === id);

    if (!portfolioItem) {
        return <div>해당 포트폴리오를 찾을 수 없습니다.</div>;
    }

    const portfolio = portfolioItem.fields;
    const currentYear = portfolio.NEWexhibitionYear; // ✅ 현재 프로젝트의 연도

    // ✅ 같은 연도의 프로젝트만 필터링 후 가나다순 정렬
    const sameYearProjects = data
        .filter((item) => item.fields.NEWexhibitionYear === currentYear)
        .sort((a, b) => a.fields.nameKr.localeCompare(b.fields.nameKr, "ko-KR"));

    // ✅ 현재 포트폴리오의 인덱스 찾기 (가나다순 기준)
    const currentIndex = sameYearProjects.findIndex((item) => item.sys.id === id);

    // ✅ 다음 3개의 프로젝트 가져오기 (순환 구조)
    const nextProjects = [];
    for (let i = 1; i <= 3; i++) {
        nextProjects.push(sameYearProjects[(currentIndex + i) % sameYearProjects.length]);
    }

    return (
        <div className="portfolio-container">
            <div className="portfolio-box1">
                <div className="project-intro">
                    <div className="project-name">{portfolio.projectName}</div>
                    <div className="student-info">
                        <div>{portfolio.nameEng}</div>
                    </div>
                </div>
            </div>

            <div className="portfolio-flex">
                <div className="portfolio-image-container">
                    <div className="portfolio-image-wrap">
                        {/* ✅ Vimeo가 있으면 썸네일을, 없으면 메인이미지를 표시 */}
                        {portfolio.mainVimeoEmbedLink ? (
                            portfolio.thumbnail && portfolio.thumbnail.fields.file.url ? (
                                <Image
                                    src={`https:${portfolio.thumbnail.fields.file.url}`}
                                    alt="Thumbnail Image"
                                    width={800}
                                    height={500}
                                    sizes="100vw"
                                />
                            ) : (
                                <div>썸네일 이미지 없음</div>
                            )
                        ) : portfolio.mainImage ? (
                            <Image
                                src={`https:${portfolio.mainImage.fields.file.url}`}
                                alt="Main Image"
                                width={800}
                                height={500}
                                sizes="100vw"
                            />
                        ) : (
                            <div>이미지가 없습니다.</div>
                        )}
                    </div>
                </div>
                <div className="portfolio-box2">
                    <div className="project-info-wrap">
                        <div className="portfolio-cation-wrap">
                            <div>
                                {portfolio.statementKr?.content.map((data, index) => (
                                    index === 0 ? (
                                        <p key={index}>{data.content[0].value}</p>
                                    ) : (
                                        <p key={index}>&nbsp;&nbsp;&nbsp;{data.content[0].value}</p>
                                    )
                                ))}
                            </div>
                            <div>
                                {portfolio.statementEng?.content.map((data, index) => (
                                    index === 0 ? (
                                        <p key={index}>{data.content[0].value}</p>
                                    ) : (
                                        <p key={index}>&nbsp;&nbsp;&nbsp;{data.content[0].value}</p>
                                    )
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="portfolio-image-container">
                    <div className="vedio-wrap">
                        {portfolio.topEmbed && (
                            <iframe
                                width="100%"
                                src={`${portfolio.topEmbed}&mute=1&autoplay=1`}
                                frameBorder="0"
                                allowFullScreen
                                allow="autoplay"
                            ></iframe>
                        )}
                    </div>

                    <div className="portfolio-image-wrap">
                        {Array.isArray(portfolio.works) &&
                            portfolio.works.map((data, index) => {
                                const fileUrl = data.fields?.file?.url ? `https:${data.fields.file.url}` : "";
                                const fileType = data.fields?.file?.contentType || "";

                                return fileType.startsWith("video/") ? (
                                    <video key={index} controls width="100%">
                                        <source src={fileUrl} type={fileType} />
                                        브라우저가 비디오 태그를 지원하지 않습니다.
                                    </video>
                                ) : (
                                    <Image
                                        key={index}
                                        src={fileUrl}
                                        alt="Portfolio Work"
                                        width={800}
                                        height={500}
                                        layout="responsive"
                                    />
                                );
                            })}
                    </div>

                    <div className="vedio-wrap">
                        {portfolio.bottomEmbed && (
                            <iframe
                                width="100%"
                                src={`${portfolio.bottomEmbed}&mute=1&autoplay=1`}
                                frameBorder="0"
                                allowFullScreen
                                allow="autoplay"
                            ></iframe>
                        )}
                    </div>
                </div>
            </div>

            <div className="portfolio-box3">
                <div className="student-info-detail">
                    <div className="name">
                        <div>{portfolio.nameKr}</div>
                        <div>{portfolio.nameEng}</div>
                    </div>
                    <div className="introduct">
                        <div>{portfolio.introductionKr}</div>
                        <div>{portfolio.introductionEng}</div> 
                    </div>
                    <div className="contact">
                        <div>{portfolio.email}</div>
                        <div className="link-container">
                            {portfolio.instagramLink && (
                                <div>
                                    <Link href={portfolio.instagramLink} target="_blank" rel="noopener noreferrer">
                                        @{new URL(portfolio.instagramLink).pathname.replace("/", "")}
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="move-page">
                    <div>other projects</div>
                    <div className="page-image-wrap">
                        {nextProjects.map((project) => (
                            <Link href={`/page/portfolio/${project.sys.id}`} key={project.sys.id}>
                                {/* ✅ Vimeo가 있는 경우 썸네일 표시, 없는 경우 메인이미지 표시 */}
                                {project.fields.mainVimeoEmbedLink ? (
                                    project.fields.thumbnail && project.fields.thumbnail.fields.file.url ? (
                                        <Image
                                            src={`https:${project.fields.thumbnail.fields.file.url}`}
                                            alt="Project Thumbnail"
                                            width={800}
                                            height={500}
                                            sizes="100vw"
                                        />
                                    ) : (
                                        <div>썸네일 이미지 없음</div>
                                    )
                                ) : (
                                    project.fields.mainImage && (
                                        <Image
                                            src={`https:${project.fields.mainImage.fields.file.url}`}
                                            alt="Project Thumbnail"
                                            width={800}
                                            height={500}
                                            sizes="100vw"
                                        />
                                    )
                                )}
                            </Link>
                        ))}
                    </div>
                </div>
                <ScrollUp />
            </div>
        </div>
    );
}
