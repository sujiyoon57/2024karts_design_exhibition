import { fetchContentful } from "@/app/contentful/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Link from "next/link";

export default async function ArchiveIntroPage({ params }) {
    const { slug } = params; // ✅ URL에서 slug 값 가져오기

    const data = await fetchContentful("archiveNew");
    const archiveNew = data.find(item => item.fields.slug === slug).fields;

    if (!archiveNew) return <p>데이터를 불러올 수 없습니다.</p>; // ✅ 데이터가 없을 때 처리

    return (
        <div className="archive-container">
            <div className="archive_intro archive_intro_web">
                <div className="backtolist">
                    <Link href="/page/archive">⟵<span>Back to Lists</span></Link>
                </div>

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
                    <div className="title">{archiveNew?.title ?? "제목 없음"}</div>
                    <div className="info_txt">
                        {archiveNew?.post ? documentToReactComponents(archiveNew.post) : "내용 없음"}
                    </div>
                    <div className="info_link">
                        <p><Link href={`/page/exhibition?year=${archiveNew?.exhibitionYear}`}>View All Projects</Link></p>
                        {archiveNew?.download?.fields?.file?.url && (
                            <p><a href={`https:${archiveNew.download.fields.file.url}`} download>Download PDF</a></p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
