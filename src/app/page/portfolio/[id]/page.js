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

    // ✅ 현재 포트폴리오의 인덱스 찾기
    const currentIndex = data.findIndex((item) => item.sys.id === id);

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
                    <div>
                        {portfolio.mainVimeoEmbedLink ? (
                            <div className="video-wrap">
                                <iframe
                                    width="100%"
                                    src={`${portfolio.mainVimeoEmbedLink}?autoplay=1&loop=1&mute=1`}
                                    frameBorder="0"
                                    allowFullScreen
                                    allow="autoplay"
                                ></iframe>
                            </div>
                        ) : (
                            <div className="portfolio-image-wrap">
                                {portfolio.mainImage && (
                                    <Image src={"https:" + portfolio.mainImage.fields.file.url} alt=".." width={0} height={0} sizes="100vw" />
                                )}
                            </div>
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
                            portfolio.works.map((data, index) => (
                                <Image
                                    key={index}
                                    src={data.fields?.file?.url ? "https:" + data.fields.file.url : ""}
                                    alt=".."
                                    width={0}
                                    height={0}
                                />
                            ))}
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
                            {portfolio.webLink && (
                                <div>
                                    <Link href={portfolio.webLink} target="_blank" rel="noopener noreferrer">
                                        {new URL(portfolio.webLink).hostname.replace("www.", "")}
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="move-page">
                    <div>other projects</div>
                    <div className="page-image-wrap">
                        {Array.from({ length: 3 }).map((_, i) => {
                            // ✅ 현재 프로젝트 이후의 인덱스를 계산 (초과하면 처음으로 돌아감)
                            const projectIndex = (currentIndex + i + 1) % data.length;
                            const project = data[projectIndex];

                            return (
                                <Link href={`/page/portfolio/${project.sys.id}`} key={project.sys.id}>
                                    {project.fields.mainImage && (
                                        <Image
                                            src={`https:${project.fields.mainImage.fields.file.url}`}
                                            alt="Project Thumbnail"
                                            width={0}
                                            height={0}
                                            sizes="100vw"
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </div>
                <ScrollUp />
            </div>
        </div>
    );
}
