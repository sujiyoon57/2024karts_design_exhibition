"use client"; // 클라이언트 컴포넌트로 지정

import { fetchContentful } from "@/app/contentful/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/app/component/header";

export default function ArchiveIntroPage({ params }) {
    const { id } = params; // params에서 id 추출
    const [archiveNew, setArchiveNew] = useState({});
    const [activeTab, setActiveTab] = useState("info");
    const [menuOn, setMenuOn] = useState(false);

    // 데이터를 가져오는 useEffect
    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                const data = await fetchContentful("archiveNew");
                if (data && data[id]) {
                    console.log("이미지", data[id].fields.titleimg);
                    setArchiveNew(data[id].fields);
                }
            }
        };
        fetchData();
    }, [id]);

    const options = {
        renderText: (text) => {
          return text.split("\n").map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
          ));
        },
      };

      const downloadFile = async () => {
        const url = `https:${archiveNew?.download?.fields?.file?.url}`;
        const response = await fetch(url);
        const blob = await response.blob();
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = "downloadedFile.pdf"; // 다운로드 파일명
        link.click();
        };

    // if (!archiveNew) return <p>Loading...</p>;

    return (
        <div className="archive-container">
            <div>
                {archiveNew.title ? archiveNew.title : "데이터 로딩 중..."} {/* ✅ 상태가 변경되면 자동 업데이트됨 */}
            </div>
            <Header menuOn={menuOn} setMenuOn={setMenuOn} />
            <div className="archive_intro archive_intro_web"> 
                <div className="backtolist"><Link href="/page/archive">⟵<span>Back to Lists</span></Link></div>
                <p className="tit_img tit_img_pc"><img
                    src={archiveNew?.titleimg?.fields?.file?.url ? `https:${archiveNew.titleimg.fields.file.url}` : "/default-image.png"}
                    alt="Title Image"
                /></p>
                <p className="tit_img tit_img_mo"><img
                    src={archiveNew?.titleimgMobile?.fields?.file?.url ? `https:${archiveNew.titleimgMobile.fields.file.url}` : "/default-image.png"}
                    alt="Title Image"
                /></p>

                {/* <p className="tit_img tit_img_pc"><img src="/asset/archiveintro2024.png" /></p>
                <p className="tit_img tit_img_mo"><img src="https://images.ctfassets.net/vt7en4vb5az7/7s5gxLPx4g4S1un0K2xgxd/022295549158bba30a0d4aea75509840/2024_%ED%8F%AC%EC%8A%A4%ED%84%B0_%EC%84%B8%EB%A1%9C%ED%98%95.jpeg" /></p>  titleimg-mobile */}
                <div className="info"> 
                    <div className="info_txt">
                         
                    </div>
                    <div className="info_link">
                        <p><Link href={archiveNew?.link ? archiveNew.link : "/default"}>View All Projects</Link></p>
                        <p><Link href="">Download PDF</Link></p> 
                    </div>    
                    
                </div>
                <div className="credit"> 
                    <h4>졸업준비위원회 Graduation Preparatory Committee</h4>
                    <div className="committee">  
                        org
                    </div>

                    org2
                </div>
            </div>
            <div className="archive_intro archive_intro_mo">
                <div className="exhibition_tab mo-archive-tab">
                    <button
                        className={activeTab === "info" ? "active" : ""}
                        onClick={() => setActiveTab("info")}
                    >
                        Info
                    </button>
                    <button
                        className={activeTab === "credit" ? "active" : ""}
                        onClick={() => setActiveTab("credit")}
                    >
                        Credit
                    </button>
                </div>

                {/* Info 탭 내용 */}
                {activeTab === "info" && (
                    <div className="tab_cont_info">
                        <p className="tit_img tit_img_pc">
                            <img
                            src={archiveNew?.titleimg?.fields?.file?.url ? `https:${archiveNew.titleimg.fields.file.url}` : "/default-image.png"}
                            alt="Title Image"
                            />
                        </p>
                        <p className="tit_img tit_img_mo">
                            <img
                            src={archiveNew?.titleimgMobile?.fields?.file?.url ? `https:${archiveNew.titleimgMobile.fields.file.url}` : "/default-image.png"}
                            alt="Title Image"
                            />
                        </p>
                        <div className="info"> 
                            <div className="title">
                                {/*  title */}
                                {archiveNew?.title ?? "제목 없음"}
                            </div>  
                            <div className="info_txt">
                                {archiveNew?.post 
                                ? documentToReactComponents(archiveNew.post, options) 
                                : "제목 없음"}
                            </div>
                            <div className="info_link">
                                <p><Link href="/page/exhibition">View All Projects</Link></p>
                                {/* <p><a href={archiveNew?.download?.fields?.file?.url} download>Download PDF</a></p> */}
                                <button onClick={downloadFile}>Download PDF</button>
                            </div>    
                            
                        </div>
                    </div>
                )}

                {/* Credit 탭 내용 */}
                {activeTab === "credit" && (
                    <div className="tab_cont_credit">
                    <div className="credit">
                        <h4>졸업준비위원회 Graduation Preparatory Committee</h4>
                        <div className="committee"> 
                            {archiveNew?.org 
                                ? documentToReactComponents(archiveNew.org, options) 
                                : "제목 없음"}
                        </div> 

                        {archiveNew?.org2 
                            ? documentToReactComponents(archiveNew.org2, options) 
                            : "제목 없음"}
                    </div>
                    </div>
                )}
            </div>
        </div>
    );
}