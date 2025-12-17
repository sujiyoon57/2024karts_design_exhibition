"use client"

import {useRouter} from "next/navigation";
import VideoComponent from "@/app/component/VideoComponent";
import Image from "next/image";
import Link from "next/link";
import ScrollUp from "@/app/component/scrollUp";

export default function Portfolio({projects, portfolio, id}){
    const router = useRouter();

    const currentIndex = projects.findIndex((item) => item.sys.id === id);
    const nextProjects = [];
    for (let i = 1; i <= 3; i++) {
        nextProjects.push(projects[(currentIndex + i) % projects.length]);
    }

    return (
        <div className="portfolio-container">
            <div className="portfolio-box1">
                <div className="project-intro">
                    <div className="project-name">{portfolio.projectName}</div>
                    <div className="student-info">
                        <div className="name-pc">{portfolio.nameEng}</div>
                        <div className="name-mobile">
                            <span>{portfolio.nameKr} </span>
                            <span>{portfolio.nameEng}</span>
                            <span className="major">{portfolio.major}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="portfolio-flex">
                <div className="portfolio-image-container">
                    <div className="portfolio-image-wrap">
                        {portfolio.mainVimeoEmbedLink ? (
                            <iframe
                                width="100%"
                                height="500"
                                src={`${portfolio.mainVimeoEmbedLink}?autoPlay=1&loop=1&muted=1`}
                                frameBorder="0"
                                allow="autoPlay; fullscreen"
                                allowFullScreen
                            ></iframe>
                        ) : portfolio.mainImage?.fields.file.contentType?.startsWith("video/") ? (
                            <VideoComponent fileUrl={`https:${portfolio.mainImage.fields.file.url}`} fileType={portfolio.mainImage.fields.file.contentType} />
                        ) : portfolio.mainImage?.fields.file.url ? (
                            <Image
                                src={`https:${portfolio.mainImage.fields.file.url}`}
                                alt="Main Image"
                                width={800}
                                height={500}
                                sizes="100vw"
                                priority // ✅ 추가
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
                                    <p key={index}>{data.content[0].value}</p>
                                ))}
                            </div>
                            <div>
                                {portfolio.statementEng?.content.map((data, index) => (
                                    <p key={index}>{data.content[0].value}</p>
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
                                src={`${portfolio.topEmbed}&mute=1&autoPlay=1`}
                                frameBorder="0"
                                allowFullScreen
                                allow="autoPlay"
                            ></iframe>
                        )}
                    </div>

                    <div className="portfolio-image-wrap">
                        {Array.isArray(portfolio.works) &&
                            portfolio.works.map((data, index) => {
                                const fileUrl = data.fields?.file?.url ? `https:${data.fields.file.url}` : "";
                                const fileType = data.fields?.file?.contentType || "";

                                return fileType.startsWith("video/") ? (
                                    <video
                                        key={index}
                                        controls
                                        width="100%"
                                        preload="metadata"
                                        muted
                                        autoPlay
                                        playsInline
                                        {...(typeof window !== "undefined" && window.innerWidth <= 768
                                            ? { poster: `${fileUrl}#t=0.1` } // 모바일일 때만 포스터 적용
                                            : {})}
                                    >
                                        <source src={fileUrl} type={fileType} />
                                        브라우저가 비디오 태그를 지원하지 않습니다.
                                        crossOrigin="anonymous" // ✅ 추가 (Third-Party Cookie 문제 방지)
                                    </video>
                                ) : (
                                    <Image
                                        key={index}
                                        src={fileUrl}
                                        alt="Portfolio Work"
                                        width={800}
                                        height={500}
                                        style={{ width: "100%", height: "auto" }} // 새로운 방식 적용
                                        priority // ✅ 추가
                                    />
                                );

                            })}
                    </div>

                    <div className="vedio-wrap">
                        {portfolio.bottomEmbed && (
                            <iframe
                                width="100%"
                                src={`${portfolio.bottomEmbed}&mute=1&autoPlay=1`}
                                frameBorder="0"
                                allowFullScreen
                                allow="autoPlay"
                            ></iframe>
                        )}
                    </div>
                </div>
            </div>

            <div className="portfolio-box3">
                <div className="student-info-detail">
                    <div className="top-section">
                        <div className="name">{portfolio.nameKr}<br />{portfolio.nameEng}</div>
                        <div className="introduct">{portfolio.introductionKr}<br />{portfolio.introductionEng}</div>
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
                </div>
                <div className="info_link">
                    <p>
                        <Link href='/page/exhibition'>
                            View All Projects
                        </Link>
                    </p>
                    <p>
                        <Link href="#" onClick={(e) => {
                            e.preventDefault();
                            router.back();
                        }}>
                            Back
                        </Link>
                    </p>
                </div>
                <div className="move-page">
                    <div>other projects</div>
                    <div className="page-image-wrap">
                        {nextProjects.map((project) => (
                            <Link href={`/page/portfolio/${project.fields.NEWexhibitionYear}/${project.sys.id}`} key={project.sys.id}>
                                {project.fields.mainVimeoEmbedLink && project.fields.thumbnail ? (
                                    <Image
                                        src={`https:${project.fields.thumbnail.fields.file.url}`}
                                        alt="Project Thumbnail"
                                        width={800}
                                        height={500}
                                        sizes="100vw"
                                        priority // ✅ 추가
                                    />
                                ) : project.fields.mainImage?.fields.file.contentType?.startsWith("video/") && project.fields.thumbnail ? (
                                    <Image
                                        src={`https:${project.fields.thumbnail.fields.file.url}`}
                                        alt="Project Thumbnail"
                                        width={800}
                                        height={500}
                                        sizes="100vw"
                                        priority // ✅ 추가
                                    />
                                ) : (
                                    project.fields.mainImage && (
                                        <Image
                                            src={`https:${project.fields.mainImage.fields.file.url}`}
                                            alt="Project Thumbnail"
                                            width={800}
                                            height={500}
                                            sizes="100vw"
                                            priority // ✅ 추가
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