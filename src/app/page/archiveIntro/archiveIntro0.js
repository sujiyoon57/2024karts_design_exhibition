"use client"
import Link from "next/link"
import Image from "next/image"
import { fetchContentful } from "@/app/contentful/contentful"

export default async function ArchiveIntro0() {
    // ✅ id === 0 데이터 가져오기
    const data = await fetchContentful('archiveNew');
    const archiveNew = data[0].fields; // 0번 데이터만 가져옴

    return (
        <div className="archive-container"> 
            <div className="archive_intro">
                <div className="backtolist">
                    <Link href="/page/archive">⟵<span>Back to Lists</span></Link>
                </div>
                
                <p className="tit_img"><img src="/asset/archiveintro2024.png" alt="Archive Intro 2024" /></p>
                <div className="info"> 
                    <div className="info_txt">
                        <p>{archiveNew.description}</p> {/* Contentful에서 불러온 설명 */}
                    </div>
                    <div className="info_link">
                        <p><Link href={archiveNew.link}>View All Projects</Link></p>
                        <p><Link href="">Download PDF</Link></p> 
                    </div>    
                </div>
            </div>
        </div>  
    );
}
