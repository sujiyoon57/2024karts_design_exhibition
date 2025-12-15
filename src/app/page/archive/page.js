import Link from "next/link";
import Image from "next/image";
import { fetchContentful } from "@/app/contentful/contentful";

export default async function ArchiveNew({searchParams}) {
  // const router = useRouter(); // todo : 용도?

  // // 현재 URL에서 필터링할 카테고리 가져오기
  const currentCategory = searchParams?.category;

  const data = await fetchContentful("archiveNew");

  const archiveNew = currentCategory
      ? data.filter((item) => item.fields.category?.includes(currentCategory))
      : data;

  return (
    <div className="archive-container">
      {/*<Header menuOn={menuOn} setMenuOn={setMenuOn} />*/}

      <ul className="archive_list">
        {archiveNew.length > 0 ? (
          archiveNew.map((data) => (
            <li key={data.sys.id}>  {/* ✅ index 대신 Contentful의 ID 사용 */}
              <Link href={`/page/archiveIntro/${data.fields.slug}`}>  {/* ✅ Slug를 기반으로 URL 생성 */}
                <div className="archive-info">
                  {/* ✅ titleimg 필드에서 이미지 동적 로드 */}
                  {data?.fields?.titleimg?.fields?.file?.url ? (
                    <p>
                      <Image
                        src={`https:${data.fields.titleimg.fields.file.url}`}
                        alt={data.fields.title || "No title"}
                        width={620}
                        height={366}
                        style={{ objectFit: "cover", width: "100%", height: "auto" }} 
                        priority // ✅ 추가!// ✅ 새로운 방식 적용
                      />

                    </p>
                  ) : (
                    <div>No Image</div> // 이미지가 없을 경우
                  )}
                  <div>{data.fields.title || "Untitled"}</div>
                </div>
              </Link>
            </li>
          ))
        ) : (
          <li>게시글이 없습니다.</li>
        )}
      </ul>
    </div>
  );
}
