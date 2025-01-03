import Link from "next/link"
import Image from "next/image"
import { fetchContentful } from "@/app/contentful/contentful"
import InstaLogoIcon from "/public/asset/instaLogo.svg"
import WebLogoIcon from "/public/asset/webLogo.svg"
import VimeoLogoIcon from "/public/asset/vimeoLogo.svg"
import Footer from "@/app/component/footer"
import ScrollUp from "@/app/component/scrollUp"
import ReactPlayer from "react-player"

export default async function Portfolio(props){



    const id = parseInt(props.params.id);
    const data = await fetchContentful('portfolio');
    const portfolio = data[id].fields;
    const len  = data.length > 0 && data.length;
    const preIndex = id === 0 ? len - 1 : id - 1;
    const nextIndex = id === (len - 1) ? 0 : id + 1;
    const preUrl = data[preIndex] ? data[preIndex].fields.mainImage.fields.file.url : '';
    const nextUrl = data[nextIndex] ? data[nextIndex].fields.mainImage.fields.file.url : '';

    const projectNameLength = portfolio.projectName.length;

    
    return(
        <div className="portfolio-container">
            <div className="portfolio-box1">
                <div className="project-intro">
                    <div className="project-name">{portfolio.projectName}</div>
                    <div className="student-info">
                        <div>{portfolio.nameEng}</div>
                        {/* <div>{portfolio.major}</div> */}
                    </div>
                </div>
            </div>
            
            <div className="portfolio-flex">
                <div className="portfolio-image-container">
                <div >
                    {portfolio.mainVimeoEmbedLink ? (
                        <div className="video-wrap">
                            <iframe 
                                width="100%"
                                src={`${portfolio.mainVimeoEmbedLink}?autoplay=1&loop=1&mute=1`}
                                frameborder="0" 
                                allowfullscreen
                                allow="autoplay"
                            ></iframe>
                            {/* <ReactPlayer
                            className='react-player'
                            url={portfolio.mainVimeoEmbedLink}    // 플레이어 url
                            playing={true}        // 자동 재생 on
                            muted={true}          // 자동 재생 on
                            controls={false}       // 플레이어 컨트롤 노출 여부
                            // light={false}         // 플레이어 모드
                            
                            width={'100%'}
                            // sizes='100vw'
                        /> */}
                        </div>
                    ):(
                        <div className="portfolio-image-wrap">{portfolio.mainImage && <Image src={'https:'+portfolio.mainImage.fields.file.url} alt=".." width={0} height={0} sizes="100vw"/>}</div>
                    )}
                </div>
                </div>
                <div className="portfolio-box2">
                    <div className="project-info-wrap">
                        {/* <div className="project-info">
                            <div className="project-name">{portfolio.projectName}</div>
                            <div className="project-detail">
                                <div>
                                    <div>
                                        <div className="key">student</div>
                                        <div className="value">{portfolio.nameEng}</div>
                                    </div>
                                    <div>
                                        <div className="key">advisor</div>
                                        <div className="value">{portfolio.advisor}</div>
                                    </div>
                                </div>
                                <div>
                                    <div className="key">category</div>
                                    <div className="value">
                                        {portfolio.category && portfolio.category.map((type, index)=>(
                                            <div key={index}>{type}</div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        <div className="portfolio-cation-wrap">
                            <div>
                                {portfolio.statementKr && portfolio.statementKr.content.map((data,index)=>(
                                index==0?(
                                    <p key={index}>{data.content[0].value}</p>
                                ):(
                                    <p key={index}>&nbsp;&nbsp;&nbsp;{data.content[0].value}</p>
                                )
                                ))}
                            </div>
                            <div>
                                {portfolio.statementEng && portfolio.statementEng.content.map((data,index)=>(
                                index==0?(
                                    <p key={index}>{data.content[0].value}</p>
                                ):(
                                    <p key={index}>&nbsp;&nbsp;&nbsp;{data.content[0].value}</p>
                                )
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="portfolio-image-container">
                    <div className="vedio-wrap">
                        {portfolio.topEmbed&&
                        <iframe 
                            width="100%"
                            src={`${portfolio.topEmbed}&mute=1&autoplay=1`}
                            frameborder="0" 
                            allowfullscreen
                            allow="autoplay"
                        ></iframe>}
                    </div>
                    <div className="portfolio-image-wrap">
                        {portfolio.works&&portfolio.works.map((data, index)=>(
                            <Image key={index} src={'https:'+data.fields.file.url} alt=".." width={0} height={0} sizes="100vw" style={{display:'block'}}/>
                        ))}
                    </div>
                    <div className="vedio-wrap">
                        {portfolio.bottomEmbed&&
                        <iframe 
                        width="100%"
                        src={`${portfolio.bottomEmbed}&mute=1&autoplay=1`}
                        frameborder="0" 
                        allowfullscreen
                        allow="autoplay"
                    ></iframe>}
                    </div>
                </div>
            </div>
            <div className="portfolio-box3">
                <div className="student-info-detail">
                    <div>
                        <div>{portfolio.nameKr}</div>
                        <div>{portfolio.nameEng}</div>
                    </div>
                    <div>
                        <div>{portfolio.introductionKr}</div>
                        {/* <div>{portfolio.email}</div> */}
                        <div className="link-container">
                        {portfolio.instagramLink !== undefined && portfolio.instagramLink !== '' ? (
                            <Link href={portfolio.instagramLink}>
                                <span><InstaLogoIcon/></span>
                            </Link>
                        ) : null}
                        {portfolio.webLink !== undefined && portfolio.webLink !== '' ? (
                            <Link href={portfolio.webLink}>
                                <span><WebLogoIcon/></span>
                            </Link>
                        ) : null}
                        {portfolio.vimeoLink !== undefined && portfolio.vimeoLink !== '' ? (
                            <Link href={portfolio.vimeoLink}>
                                <span><VimeoLogoIcon/></span>
                            </Link>
                        ) : null}
                        </div>
                        <div>{portfolio.introductionEng}</div>
                        <div>{portfolio.email}</div>
                    </div>
                </div>
                {/* <div className="link-container">
                {portfolio.instagramLink !== undefined && portfolio.instagramLink !== '' ? (
                    <Link href={portfolio.instagramLink}>
                        <span><InstaLogoIcon/></span>
                    </Link>
                ) : null}
                {portfolio.webLink !== undefined && portfolio.webLink !== '' ? (
                    <Link href={portfolio.webLink}>
                        <span><WebLogoIcon/></span>
                    </Link>
                ) : null}
                {portfolio.vimeoLink !== undefined && portfolio.vimeoLink !== '' ? (
                    <Link href={portfolio.vimeoLink}>
                        <span><VimeoLogoIcon/></span>
                    </Link>
                ) : null}
                </div> */}
                {/* <div className="navigation">
                    <div><Link href='/page/exhibition'>view all projects</Link></div>
                    <div><Link href='/' as="/#specific-section">back</Link></div>
                </div>*/}
                <div className="move-page">
                    <div>other projects</div>
                    <div className="page-image-wrap">
                        {preUrl && 
                            <Link href={`/page/portfolio/${preIndex}`}>
                                <Image src={`https:${preUrl}`} alt=".." width={0} height={0} sizes="100vw"/>
                            </Link>
                        }
                        {nextUrl && 
                            <Link href={`/page/portfolio/${nextIndex}`}>
                                <Image src={`https:${nextUrl}`} alt=".." width={0} height={0} sizes="100vw"/>
                            </Link>
                        }
                    </div>
                </div>
                <ScrollUp/> 
            </div>
        </div>
    )
}