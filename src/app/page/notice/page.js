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

  // ✅ 필터별 색상 적용을 위한 클래스 매핑 함수
  const getCategoryClass = (category) => {
    if (category.includes("학과")) return "type01";
    if (category.includes("행사")) return "type02";
    if (category.includes("채용")) return "type03";
    if (category.includes("기타")) return "type04";
    return "";
  };

  return (
    <div className="notice-container">
      {/* ✅ 필터 버튼에도 색상이 적용되도록 클래스 추가 */}
      <div className="notice_type">
        {["전체", "학과", "행사", "채용", "기타"].map((part, index) => (
          <button
            key={part}
            className={`${selectedPart === part ? "active" : ""} ${getCategoryClass([part])}`}
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
                  {/* ✅ 리스트 내 공지 항목에도 색상 적용 */}
                  <div className={getCategoryClass(data.fields.part2)}>
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
