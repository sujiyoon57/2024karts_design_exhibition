"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { fetchContentful } from "@/app/contentful/contentful";

export default function Notice() {
  const [notices, setNotices] = useState([]);
  const [filteredNotices, setFilteredNotices] = useState([]);
  const [selectedPart, setSelectedPart] = useState("전체");

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

  // ✅ 카테고리별 클래스 매핑 (색상 적용)
  const categoryClasses = {
    "전체": "type00", // 검정색
    "학과": "type01", // 핑크 (#FF6EA8)
    "행사": "type02", // 초록 (#1DCC60)
    "채용": "type03", // 파랑 (#5B70F5)
    "기타": "type04"  // 주황 (#F6945C)
  };

  return (
    <div className="notice-container">
      <div className="notice_type">
        {["전체", "학과", "행사", "채용", "기타"].map((part) => (
          <button
            key={part}
            className={`${selectedPart === part ? "active" : ""} ${categoryClasses[part]}`}
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
                  <div className={categoryClasses[data.fields.part2] || ""}>
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
