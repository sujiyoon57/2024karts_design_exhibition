import { fetchContentful } from "@/app/contentful/contentful";
import Link from "next/link";
import Credit from "@/app/page/archiveIntro/Credit";
import Info from "@/app/page/archiveIntro/Info";
import Mobile from "@/app/page/archiveIntro/Mobile";

export default async function ArchiveIntroPage({ params }) {
    const { id } = params; // ✅ 이제 id가 slug 값이 됨

    const data = await fetchContentful("archiveNew");
    const filtered = id
        ? data.find((item) => item.fields.slug===id)
        : data;
    const archiveNew = filtered.fields

    if (!archiveNew) return <p>해당 slug를 가진 데이터를 찾을 수 없습니다.</p>; // ✅ 데이터 없을 경우 예외 처리

    // ✅ exhibitionYear 값 추가 (년도별 페이지 이동 가능하도록 수정)
    const exhibitionYear = archiveNew?.NEWexhibitionYear || (id === "1" ? "2023" : "2024");

    return (
        <div className="archive-container">
            <div>
                {archiveNew.title ? archiveNew.title : "데이터 로딩 중..."} {/* ✅ 상태가 변경되면 자동 업데이트됨 */}
            </div>
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

                <Info archiveNew={archiveNew} id={id}/>
                <Credit archiveNew={archiveNew}/>
            </div>
            <div className="archive_intro archive_intro_mo">
                <Mobile
                    archiveNew={archiveNew}
                    info={<Info archiveNew={archiveNew} id={id}/>}
                    credit={<Credit archiveNew={archiveNew}/>}/>
            </div >
        </div >
    );
}
