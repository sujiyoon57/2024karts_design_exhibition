"use client";

import Link from "next/link";
import Image from "next/image";
import { fetchContentful } from "@/app/contentful/contentful";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ArchiveIntroPage({ params }) {
  const router = useRouter();
  const { id } = params; // URL에서 id 값 가져오기
  const [archiveData, setArchiveData] = useState(null);

  useEffect(() => {
    async function getData() {
      if (id === undefined) return; // id가 없을 경우 실행 방지
      const data = await fetchContentful("archiveNew");
      setArchiveData(data[id]?.fields); // id에 맞는 데이터 가져오기
    }

    getData();
  }, [id]);

  if (!archiveData) return <p>Loading...</p>;

  // ✅ id 값에 따라 설명을 변경
  const descriptionText = id == 0
    ? `‘Loop to Leap’는 반복적인 과정과 순환을 통해 완성도를 높이며, 이를 기반으로 새로운 차원으로 도약하는 한국예술종합학교 디자인 철학을 상징합니다. ...` // 2024 설명
    : `The 21 waves maintain their own tremors and freely cross each other, share new movements and tremors. Our own waves are creating their own trajectories ...`; // 2023 설명

  return (
    <div className="archive-container">
      <div className="archive_intro archive_intro_web">
        <div className="backtolist">
          <Link href="/page/archive">⟵<span>Back to Lists</span></Link>
        </div>

        <p className="tit_img">
          <img src={id == 0 ? "/asset/archiveintro2024.png" : "/asset/archiveintro2023.png"} />
        </p>

        <div className="info">
          <div className="info_txt">
            <p>{descriptionText}</p> {/* ✅ 여기에 동적 설명 표시 */}
          </div>

          <div className="info_link">
            <p><Link href={archiveData?.link}>View All Projects</Link></p>
            <p><Link href="">Download PDF</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}
