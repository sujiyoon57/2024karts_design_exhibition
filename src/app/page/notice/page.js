"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { fetchContentful } from "@/app/contentful/contentful";

export default function Notice() {
  const [notices, setNotices] = useState([]);
  const [filteredNotices, setFilteredNotices] = useState([]);
  const [selectedPart, setSelectedPart] = useState("전체");

  // ✅ 필터 버튼 순서 유지
  const categoryOrder = ["전체", "학과", "채용", "행사", "기타"];

  // ✅ 카테고리별 컬러 지정 (필터 버튼 + 공지 리스트 분류 스타일 동일하게 유지)
  const categoryColors = {
    전체: "bg-black text-white",
    학과: "bg-[#ff6699] text-white rounded-full px-3 py-1 text-sm",
    채용: "bg-[#66cc66] text-white rounded-full px-3 py-1 text-sm",
    행사: "bg-[#6699ff] text-white rounded-full px-3 py-1 text-sm",
    기타: "bg-[#ffcc66] text-white rounded-full px-3 py-1 text-sm",
  };

  useEffect(() => {
    async function getData() {
      const data = await fetchContentful("notice");
      setNotices(data);
      setFilteredNotices(data);
    }
    getData();
  }, []);

  useEffect(() => {
    if (selectedPart === "전체") {
      setFilteredNotices(notices);
    } else {
      setFilteredNotices(
        notices.filter((item) => item.fields.part2.includes(selectedPart))
      );
    }
  }, [selectedPart, notices]);

  return (
    <div className="notice-container">
      {/* ✅ 필터 버튼 (순서 유지 & 컬러 적용) */}
      <div className="notice_type">
        {categoryOrder.map((part, index) => (
          <button
            key={part}
            className={`filter-btn ${categoryColors[part]} ${
              selectedPart === part ? "active" : ""
            }`}
            onClick={() => setSelectedPart(part)}
          >
            {part}
          </button>
        ))}
      </div>

      <ul className="notice_th">
        <li>분류</li>
        <li>내용</li>
        <li>날짜</li>
      </ul>

      <ul className="notice_list">
        {filteredNotices.length > 0 ? (
          filteredNotices.map((data, index) => (
            <li key={index}>
              <Link href={`/page/notice_view/${index}`}>
                <div className="notice-info">
                  {/* ✅ 리스트의 분류(Label) 부분 - 상단 필터와 동일한 스타일 유지 */}
                  <div className={`${categoryColors[data.fields.part2[0]] || ""}`}>
                    {data.fields.part2.join(", ")}
                  </div>
                  <div>{data.fields.title}</div>
                  <div>{new Date(data.sys.createdAt).toLocaleDateString()}</div>
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
