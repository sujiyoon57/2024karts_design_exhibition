"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { fetchContentful } from "@/app/contentful/contentful";
import Header from "@/app/component/header";

export default function ArchiveNew() {
  const [archiveNew, setArchiveNew] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuOn, setMenuOn] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        const data = await fetchContentful("archiveNew");
        setArchiveNew(data); // 데이터를 상태에 저장
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // 데이터 로딩 완료
      }
    }
    getData();
  }, []); // 빈 배열로 한 번만 실행되도록 설정

  if (loading) {
    return <p>Loading...</p>; // 로딩 중 표시
  }

  return (
    <div className="archive-container">
      <Header menuOn={menuOn} setMenuOn={setMenuOn} />
      <ul className="archive_list">
        {archiveNew.length > 0 ? (
          archiveNew.map((data, index) => (
            <li key={index}>
              <Link href={`/page/archiveIntro/${index}`}>
                <div className="archive-info">
                  {/* titleimg 필드에서 이미지 URL을 동적으로 가져오기 */}
                  {data?.fields?.titleimg?.fields?.file?.url ? (
                    <p>
                    <Image
                      src={`https:${data.fields.titleimg.fields.file.url}`} // 'https:' 추가
                      alt={data.fields.title || "No title"} // 이미지의 alt 텍스트를 제목으로 설정
                      width={620}
                      height={366}
                      layout="intrinsic" // 원본 비율 유지
                      objectFit="cover" // 비율을 유지하면서 잘리는 부분 조절
                      style={{objectFit: "cover"}}
                    />
                    </p>
                  ) : (
                    <div>No Image</div> // 이미지가 없을 경우 표시
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
