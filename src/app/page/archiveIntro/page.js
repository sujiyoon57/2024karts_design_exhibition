
import Link from "next/link";
import Image from "next/image";
import { fetchContentful } from "@/app/contentful/contentful"; 

export default async function Notice(){

    var data = await fetchContentful('notice');
    const notice = data;
    
    return( 
        <div className="archive-container"> 
             
            <div className="archive_intro archive_intro_web"> 
                <div className="backtolist"><a href="/page/archive">⟵<span>Back to Lists</span></a></div>
                
                <p className="tit_img"><img src="/asset/archiveintro2024.png" /></p>
                <div className="info"> 
                    <div className="info_txt">
                            <div>
                                <p>‘Loop to Leap’는 반복적인 과정과 순환을 통해 완성도를 높이며, 이를 기반으로 새로운 차원으로 도약하는 한국예술종합학교 디자인 철학을 상징합니다. 루프(Loop)는 디자인의 창작 과정에서의 반복적 실험과 탐구의 과정을 나타내며, 이는 학생들이 자신만의 색깔을 다듬어가는 여정을 의미합니다. 리프(Leap)는 과정을 통해 성장과 도약을 이루는 순간을 상징하며, 새로운 시각의 가능성으로 창작의 지평을 넓혀가는 도전정신을 담고 있습니다. 졸업전시에서 선보이는 각각의 작품들은 단순히 반복의 결과물이 아니라, 끊임없는 시도와 실패, 그리고 발견을 통해 이루어진 창조적 여정을 상징합니다.</p>
                                <p>"Loop to Leap" symbolizes the design philosophy of the Korea National University of Arts, emphasizing the pursuit of perfection through iterative processes and cycles, ultimately leading to breakthroughs into new dimensions. The Loop represents the repetitive experimentation and exploration inherent in the creative process, reflecting the journey of students as they refine their unique artistic identities. The Leap embodies moments of growth and transformation achieved through these processes, showcasing a spirit of challenge that broadens the horizons of creativity.</p>
                            </div>
                            <div>
                                <p>한국예술종합학교 미술원 디자인과의 졸업전시 "Loop to Leap"은 학생들이 창작의 여정에서 마주한 순환(Loop)의 반복 속에서 배움을 얻고, 이를 기반으로 더 큰 도약(Leap)을 이루는 모습을 조명합니다.
                                디자인은 단순한 결과물이 아니라, 지속적인 탐구와 발전 속에서 완성되어 가는 과정임을 보여줍니다.</p>
                                <p> The graduation exhibition of the Korea National University of Arts, School of Visual Arts, Department of Design, titled "Loop to Leap," highlights the students' journeys of creation. It celebrates the learning derived from cycles of repetition (Loop) and the leaps of progress (Leap) that emerge as a result. This philosophy underscores that design is not merely a final product but a continuous process of exploration and evolution.</p>
                            </div>
                            <div>
                                <p>본 2024학년도 디자인과 졸업전시는 개인의 성장뿐 아니라 다양한 형태와 아이디어가 하나로 모여 협력과 공존을 이루는 과정을 담고 있습니다. "Loop to Leap"은 창작의 반복에서 발견된 가능성이 결국 혁신과 도약으로 이어진다는 메시지를 전달하며, 디자인과 학생들의 도전과 성장을 선보이고자 합니다.</p>
                                <p>The 2024 Design Graduation Exhibition captures not only individual growth but also the collective process of collaboration and coexistence, where diverse forms and ideas converge. "Loop to Leap" delivers a powerful message: the possibilities discovered
through iterative creation eventually lead to innovation and breakthroughs. It showcases the challenges and growth of design
students, celebrating their journey of creative discovery and advancement.</p>
                            </div>
                    </div>
                    <div className="info_link">
                        <p><a href="/page/archive">View All Projects</a></p>
                        <p><a href="">Download PDF</a></p>
                    </div>    
                    
                </div>
                <div className="credit">
                    <h4>졸업준비위원회 Graduation Preparatory Committee</h4>
                    <div className="committee"> 
                        <dl>
                            <dt>졸준위원장</dt>
                            <dd>윤지수</dd>
                        </dl>
                        <dl>
                            <dt>커뮤 대표</dt>
                            <dd>윤수영</dd>
                        </dl>
                        <dl>
                            <dt>인터 대표</dt>
                            <dd>이승주</dd>
                        </dl>
                        <dl>
                            <dt>제품 대표</dt>
                            <dd>김정인</dd>
                        </dl>
                        <dl>
                            <dt>운송 대표</dt>
                            <dd>박세현</dd>
                        </dl>
                    </div>

                    <h4>비주얼 아이덴티티 Visual identity</h4>
                    <dl>
                        <dt>BI 디자인</dt>
                        <dd>민한슬<br />여린<br />이선호<br />홍지원<br />Yavarkhani Zahra</dd>
                    </dl>
                    <dl>
                        <dt>Web 디자인</dt>
                        <dd>강민서<br />김다윤<br />방지연</dd>
                    </dl>

                    <h4>대외 홍보 Public Relations</h4>
                    <dl>
                        <dt>인스타그램</dt>
                        <dd>김지영<br />서채연<br />안지수</dd>
                    </dl>
                    <dl>
                        <dt>web 업로드</dt>
                        <dd>김인영<br />박민지<br />이다연</dd>
                    </dl>

                    <h4>인쇄 Presswork</h4>
                    <dl>
                        <dt>도록 디자인</dt>
                        <dd>김초희<br />김태은<br />손선우<br />허수린<br />Nguyen Hoang Khanh Thy</dd>
                    </dl>
                    <dl>
                        <dt>발주</dt>
                        <dd>류창현<br />박준범</dd>
                    </dl>

                    <h4>기자재 관리 Material Management</h4>
                    <dl>
                        <dt>도록 디자인</dt>
                        <dd>송화<br />유나연<br />이인<br />이재호<br />이희재<br />최현우<br />한윤제</dd>
                    </dl>

                    <h4>지도교수 및 심사위원</h4>
                    <dl>
                        <dt>지도교수</dt>
                        <dd>심규하<br />정윤하<br />김경균<br />박영하<br />심대기<br />김기현<br />이한승</dd>
                    </dl>
                    <dl>
                        <dt>심사위원</dt>
                        <dd>어민선<br />박영하<br />심대기<br />전채리<br />신동혁</dd>
                    </dl>
                </div>
            </div>
            <div className="archive_intro archive_intro_mo"> 
                <div className="exhibition_tab mo-archive-tab">
                    <a class="active" href="">Info</a>
                    <a class="" href="">Credit</a>
                </div> 
                
                <div className="tab_cont_info"> 
                    <p className="tit_img"><img src="/asset/archiveintro2024.png" /></p>
                    <div className="info"> 
                        <div className="title">전시이름 </div>  
                        <div className="info_txt">
                            <div>
                                <p>‘Loop to Leap’는 반복적인 과정과 순환을 통해 완성도를 높이며, 이를 기반으로 새로운 차원으로 도약하는 한국예술종합학교 디자인 철학을 상징합니다. 루프(Loop)는 디자인의 창작 과정에서의 반복적 실험과 탐구의 과정을 나타내며, 이는 학생들이 자신만의 색깔을 다듬어가는 여정을 의미합니다. 리프(Leap)는 과정을 통해 성장과 도약을 이루는 순간을 상징하며, 새로운 시각의 가능성으로 창작의 지평을 넓혀가는 도전정신을 담고 있습니다. 졸업전시에서 선보이는 각각의 작품들은 단순히 반복의 결과물이 아니라, 끊임없는 시도와 실패, 그리고 발견을 통해 이루어진 창조적 여정을 상징합니다.</p>
                                <p>"Loop to Leap" symbolizes the design philosophy of the Korea National University of Arts, emphasizing the pursuit of perfection through iterative processes and cycles, ultimately leading to breakthroughs into new dimensions. The Loop represents the repetitive experimentation and exploration inherent in the creative process, reflecting the journey of students as they refine their unique artistic identities. The Leap embodies moments of growth and transformation achieved through these processes, showcasing a spirit of challenge that broadens the horizons of creativity.</p>
                            </div>
                            <div>
                                <p>한국예술종합학교 미술원 디자인과의 졸업전시 "Loop to Leap"은 학생들이 창작의 여정에서 마주한 순환(Loop)의 반복 속에서 배움을 얻고, 이를 기반으로 더 큰 도약(Leap)을 이루는 모습을 조명합니다.
                                디자인은 단순한 결과물이 아니라, 지속적인 탐구와 발전 속에서 완성되어 가는 과정임을 보여줍니다.</p>
                                <p> The graduation exhibition of the Korea National University of Arts, School of Visual Arts, Department of Design, titled "Loop to Leap," highlights the students' journeys of creation. It celebrates the learning derived from cycles of repetition (Loop) and the leaps of progress (Leap) that emerge as a result. This philosophy underscores that design is not merely a final product but a continuous process of exploration and evolution.</p>
                            </div>
                            <div>
                                <p>본 2024학년도 디자인과 졸업전시는 개인의 성장뿐 아니라 다양한 형태와 아이디어가 하나로 모여 협력과 공존을 이루는 과정을 담고 있습니다. "Loop to Leap"은 창작의 반복에서 발견된 가능성이 결국 혁신과 도약으로 이어진다는 메시지를 전달하며, 디자인과 학생들의 도전과 성장을 선보이고자 합니다.</p>
                                <p>The 2024 Design Graduation Exhibition captures not only individual growth but also the collective process of collaboration and coexistence, where diverse forms and ideas converge. "Loop to Leap" delivers a powerful message: the possibilities discovered
through iterative creation eventually lead to innovation and breakthroughs. It showcases the challenges and growth of design
students, celebrating their journey of creative discovery and advancement.</p>
                            </div>
                        </div>
                        <div className="info_link">
                            <p><a href="/page/archive">View All Projects</a></p>
                            <p><a href="">Download PDF</a></p>
                        </div>    
                        
                    </div> 
                        
                </div>
                <div className="tab_cont_credit"> 
                    <div className="credit">
                        <h4>졸업준비위원회 Graduation Preparatory Committee</h4>
                        <div className="committee">
                            <dl>
                                <dt>졸준위원장</dt>
                                <dd>윤지수</dd>
                            </dl>
                            <dl>
                                <dt>커뮤 대표</dt>
                                <dd>윤수영</dd>
                            </dl>
                            <dl>
                                <dt>인터 대표</dt>
                                <dd>이승주</dd>
                            </dl>
                            <dl>
                                <dt>제품 대표</dt>
                                <dd>김정인</dd>
                            </dl>
                            <dl>
                                <dt>운송 대표</dt>
                                <dd>박세현</dd>
                            </dl>
                        </div>

                        <h4>비주얼 아이덴티티 Visual identity</h4>
                        <dl>
                            <dt>BI 디자인</dt>
                            <dd>민한슬<br />여린<br />이선호<br />홍지원<br />Yavarkhani Zahra</dd>
                        </dl>
                        <dl>
                            <dt>Web 디자인</dt>
                            <dd>강민서<br />김다윤<br />방지연</dd>
                        </dl>

                        <h4>대외 홍보 Public Relations</h4>
                        <dl>
                            <dt>인스타그램</dt>
                            <dd>김지영<br />서채연<br />안지수</dd>
                        </dl>
                        <dl>
                            <dt>web 업로드</dt>
                            <dd>김인영<br />박민지<br />이다연</dd>
                        </dl>

                        <h4>인쇄 Presswork</h4>
                        <dl>
                            <dt>도록 디자인</dt>
                            <dd>김초희<br />김태은<br />손선우<br />허수린<br />Nguyen Hoang Khanh Thy</dd>
                        </dl>
                        <dl>
                            <dt>발주</dt>
                            <dd>류창현<br />박준범</dd>
                        </dl>

                        <h4>기자재 관리 Material Management</h4>
                        <dl>
                            <dt>도록 디자인</dt>
                            <dd>송화<br />유나연<br />이인<br />이재호<br />이희재<br />최현우<br />한윤제</dd>
                        </dl>

                        <h4>지도교수 및 심사위원</h4>
                        <dl>
                            <dt>지도교수</dt>
                            <dd>심규하<br />정윤하<br />김경균<br />박영하<br />심대기<br />김기현<br />이한승</dd>
                        </dl>
                        <dl>
                            <dt>심사위원</dt>
                            <dd>어민선<br />박영하<br />심대기<br />전채리<br />신동혁</dd>
                        </dl>
                    </div>
                </div>


            </div>
            
        </div>  
    )
}