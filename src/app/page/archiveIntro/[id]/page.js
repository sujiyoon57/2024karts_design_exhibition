"use client"; // 클라이언트 컴포넌트로 지정

import { fetchContentful } from "@/app/contentful/contentful";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ArchiveIntroPage({ params }) {
    const { id } = params; // params에서 id 추출
    const [archiveNew, setArchiveNew] = useState(null);
    const [activeTab, setActiveTab] = useState("info"); // 기본값은 info로 설정

    // 데이터를 가져오는 useEffect
    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                const data = await fetchContentful("archiveNew");
                //console.log(data);
                if (data && data[id]) {
                    setArchiveNew(data[id].fields);
                }
            }
        };
        fetchData();
    }, [id]);

    if (!archiveNew) return <p>Loading...</p>;

    return (
        <div className="archive-container">
            <div className="archive_intro archive_intro_web"> 
                <div className="backtolist"><Link href="/page/archive">⟵<span>Back to Lists</span></Link></div>
                
                <p className="tit_img tit_img_pc"><img src="/asset/archiveintro2024.png" /></p> {/*  titleimg */}
                <p className="tit_img tit_img_mo"><img src="https://images.ctfassets.net/vt7en4vb5az7/7s5gxLPx4g4S1un0K2xgxd/022295549158bba30a0d4aea75509840/2024_%ED%8F%AC%EC%8A%A4%ED%84%B0_%EC%84%B8%EB%A1%9C%ED%98%95.jpeg" /></p> {/*  titleimg-mobile */}
                <div className="info"> 
                    <div className="info_txt">
                         
                    </div>
                    <div className="info_link">
                        <p><Link href={archiveNew.link}>View All Projects</Link></p>
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
                            {/*  titleimg */}
                            <img src="/asset/archiveintro2024.png" />
                        </p>
                        <p className="tit_img tit_img_mo">
                            {/*  titleimg-mobile */}
                            <img src="https://images.ctfassets.net/vt7en4vb5az7/7s5gxLPx4g4S1un0K2xgxd/022295549158bba30a0d4aea75509840/2024_%ED%8F%AC%EC%8A%A4%ED%84%B0_%EC%84%B8%EB%A1%9C%ED%98%95.jpeg" /> 
                        </p>
                        <div className="info"> 
                            <div className="title">
                                {/*  title */}
                                전시이름 
                            </div>  
                            <div className="info_txt">
                                {/*  post */}
                                내용 나오는 자리입니다
                            </div>
                            <div className="info_link">
                                <p><Link href="/page/exhibition">View All Projects</Link></p>
                                <p><Link href="{/*  download */}">Download PDF</Link></p>
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
                            org
                        </div> 

                        org2
                    </div>
                    </div>
                )}
            </div>
        </div>
    );
}