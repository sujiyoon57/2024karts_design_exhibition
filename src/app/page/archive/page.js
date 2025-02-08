"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { fetchContentful } from "@/app/contentful/contentful";

export default function ArchiveNew() {
  const [archiveNew, setArchiveNew] = useState([]); // 데이터를 저장할 상태

  useEffect(() => {
    async function getData() {
      const data = await fetchContentful("archiveNew");
      setArchiveNew(data); // 데이터를 상태에 저장
    }
    getData();
  }, []); // 빈 배열로 한 번만 실행되도록 설정

  return (
    <div className="archive-container">
      <ul className="archive_list">
        {archiveNew.length > 0 ? (
          archiveNew.map((data, index) => (
            <li key={index}>
              <Link href={`/page/archiveIntro/${index}`}>
                <div className="archive-info">
                  {/* titleimg 필드에서 이미지 URL을 동적으로 가져오기 */}
                  {data.fields.titleimg && (
                    <Image
                      src={`https:${data.fields.titleimg.fields.file.url}`} // 'https:' 추가
                      alt={data.fields.title} // 이미지의 alt 텍스트를 제목으로 설정
                      width={620}
                      height={366}
                      layout="intrinsic" // 원본 비율 유지
                      objectFit="cover" // 비율을 유지하면서 잘리는 부분 조절
                    />
                  )}
                  <div>{data.fields.title}</div>
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