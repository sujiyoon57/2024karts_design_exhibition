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

    // ✅ 데이터가 없을 경우 에러 방지
    if (!data || !Array.isArray(data)) {
        console.error("Contentful 데이터가 없습니다!");
        return <div>데이터를 불러오지 못했습니다.</div>;
    }

    const archiveNew = data[id]?.fields || {};
    const sys = data[id]?.sys || {};
    const len = data.length > 0 && data.length;

    // ✅ `id === 1`일 경우 무조건 2023, 나머지는 `NEWexhibitionYear` 값 사용 (없으면 2024)
    const exhibitionYear = archiveNew.NEWexhibitionYear || (id === 1 ? "2023" : "2024");

    return(
        <div className="archive-container"> 
            <div className="archive_intro archive_intro_web"> 
                <div className="backtolist">
                    <Link href="/page/archive">⟵<span>Back to Lists</span></Link>
                </div>
                
                {/* ✅ Contentful에서 가져온 이미지로 변경 */}
                <p className="tit_img">
                    {archiveNew.titleimg ? (
                        <Image 
                            src={`https:${archiveNew.titleimg.fields.file.url}`} 
                            alt={archiveNew.title || "Archive Image"} 
                            width={800} 
                            height={400} 
                            layout="intrinsic"
                        />
                    ) : (
                        <img src="/asset/archiveintro2024.png" alt="Default Archive Image" />
                    )}
                </p>

                <div className="info"> 
                    <div className="info_txt">
                        {/* ✅ Contentful에서 가져온 `post` 값으로 텍스트 변경 */}
                        {archiveNew.post ? (
                            <div>
                                {documentToReactComponents(archiveNew.post)}
                            </div>
                        ) : (
                            <div>
                                <p>데이터를 불러오는 중입니다...</p>
                            </div>
                        )}
                    </div>
                    <div className="info_link">
                        {/* ✅ "View All Projects" 버튼 수정 → 연도를 포함하여 이동하도록 변경 */}
                        <p>
                            <Link href={`/page/exhibition?year=${encodeURIComponent(exhibitionYear)}`}>
                                View All Projects
                            </Link>
                        </p>
                        <p>
                            <Link href="">Download PDF</Link>
                        </p> 
                    </div>    
                </div>

                {/* ✅ 기존 credit 내용 전부 유지 */}
                <div className="credit"> 
                    <h4>졸업준비위원회 Graduation Preparatory Committee</h4>
                    <div className="committee"> 
                        <dl><dt>졸준위원장</dt><dd>윤지수</dd></dl>
                        <dl><dt>커뮤 대표</dt><dd>윤수영</dd></dl>
                        <dl><dt>인터 대표</dt><dd>이승주</dd></dl>
                        <dl><dt>제품 대표</dt><dd>김정인</dd></dl>
                        <dl><dt>운송 대표</dt><dd>박세현</dd></dl>
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
                    <dl><dt>인스타그램</dt><dd>김지영<br />서채연<br />안지수</dd></dl>
                    <dl><dt>web 업로드</dt><dd>김인영<br />박민지<br />이다연</dd></dl>

                    <h4>인쇄 Presswork</h4>
                    <dl>
                        <dt>도록 디자인</dt>
                        <dd>김초희<br />김태은<br />손선우<br />허수린<br />Nguyen Hoang Khanh Thy</dd>
                    </dl>
                    <dl>
                        <dt>발주</dt>
                        <dd>류창현<br />박준범</dd>
                    </dl>

                    <h4>기자재 관리 Material Management</h4>
                    <dl>
                        <dt>설치</dt>
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
    );
}

// ✅ 404 무시하고 Vercel 배포가 가능하도록 설정
export const dynamic = "force-dynamic";
