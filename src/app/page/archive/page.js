"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Query Parameter 사용
import Image from "next/image";
import { fetchContentful } from "@/app/contentful/contentful";
import Header from "@/app/component/header";

export default function ArchiveNew() {
  const [archiveNew, setArchiveNew] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuOn, setMenuOn] = useState(false);
  const router = useRouter();

  // 현재 URL에서 필터링할 카테고리 가져오기
  const currentCategory =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("category")
      : null;

  useEffect(() => {
    async function getData() {
      try {
        const data = await fetchContentful("archiveNew");

        // ✅ category 필드를 기반으로 학과전시 & 졸업전시 필터링
        if (currentCategory) {
          const filteredData = data.filter((item) =>
            item.fields.category?.includes(currentCategory)
          );
          setArchiveNew(filteredData);
        } else {
          setArchiveNew(data); // 기본적으로 모든 데이터 로드
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [currentCategory]); // ✅ 카테고리가 변경될 때마다 다시 데이터 필터링

  if (loading) {
    return <p>Loading...</p>; // 로딩 중 표시
  }

  return (
    <div className="archive-container">
      <Header menuOn={menuOn} setMenuOn={setMenuOn} />

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
