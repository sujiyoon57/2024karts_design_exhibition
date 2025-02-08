"use client"
import Link from "next/link"
import Image from "next/image"
import { fetchContentful } from "@/app/contentful/contentful"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import ScrollUp from "@/app/component/scrollUp"
import ReactPlayer from "react-player"
import { useSearchParams } from 'next/navigation'

export default async function ArchiveNew(props) {

    const id = parseInt(props.params.id);
    const data = await fetchContentful('archiveNew');
    const archiveNew = data[id].fields;
    const sys = data[id].sys;
    const len  = data.length > 0 && data.length;

    return (
        <div className="archive-container"> 
            <div className="archive_intro archive_intro_web"> 
                <div className="backtolist"><Link href="/page/archive">⟵<span>Back to Lists</span></Link></div>
                
                <p className="tit_img"><img src={`/asset/archiveintro${id === 0 ? "2024" : "2023"}.png`} /></p>
                
                <div className="info"> 
                    <div className="info_txt">
                        {id === 0 ? (
                            // ✅ "Loop to Leap (2024)" (수정 없음)
                            <>
                                <div>
                                    <p>‘Loop to Leap’는 반복적인 과정과 순환을 통해 완성도를 높이며, 이를 기반으로 새로운 차원으로 도약하는 한국예술종합학교 디자인 철학을 상징합니다. 루프(Loop)는 디자인의 창작 과정에서의 반복적 실험과 탐구의 과정을 나타내며, 이는 학생들이 자신만의 색깔을 다듬어가는 여정을 의미합니다. 리프(Leap)는 과정을 통해 성장과 도약을 이루는 순간을 상징하며, 새로운 시각의 가능성으로 창작의 지평을 넓혀가는 도전정신을 담고 있습니다. 졸업전시에서 선보이는 각각의 작품들은 단순히 반복의 결과물이 아니라, 끊임없는 시도와 실패, 그리고 발견을 통해 이루어진 창조적 여정을 상징합니다.</p>
                                    <p>"Loop to Leap" symbolizes the design philosophy of the Korea National University of Arts, emphasizing the pursuit of perfection through iterative processes and cycles, ultimately leading to breakthroughs into new dimensions. The Loop represents the repetitive experimentation and exploration inherent in the creative process, reflecting the journey of students as they refine their unique artistic identities. The Leap embodies moments of growth and transformation achieved through these processes, showcasing a spirit of challenge that broadens the horizons of creativity.</p>
                                </div>
                            </>
                        ) : (
                            // ✅ "Weave the Wave (2023)" (새로운 설명 추가)
                            <>
                                <div>
                                    <p>21명의 파동은 각자의 고유한 떨림을 유지하며 서로 자유로이 교차되며, 새로운 움직임과 떨림을 공유합니다. 우리의 고유한 파동은 끊임없는 움직임으로 각자의 궤적을 일구고 있습니다. 그 파동들의 궤적이 서로의 흐름으로 엮이며 세상에 울려나가는 그 첫 울림을 소개합니다.</p>
                                    <p>The 21 waves maintain their own tremors and freely cross each other, Share new movements and tremors. Our own waves are creating their own trajectories with constant movement. The trajectories of the waves are woven into each other’s flow and we introduce the first reverberation that resonates in the world.</p>
                                </div>
                            </>
                        )}
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
