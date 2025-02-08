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

  // ✅ 필터 버튼 및 리스트 분류의 색상 정의 (활성화 & 비활성화 구분)
  const categoryStyles = {
    전체: {
      default: "border border-black text-black rounded-full px-4 py-1 text-sm",
      active: "bg-black text-white rounded-full px-4 py-1 text-sm",
    },
    학과: {
      default: "border border-[#ff6699] text-[#ff6699] rounded-full px-4 py-1 text-sm",
      active: "bg-[#ff6699] text-white rounded-full px-4 py-1 text-sm",
    },
    채용: {
      default: "border border-[#3366ff] text-[#3366ff] rounded-full px-4 py-1 text-sm",
      active: "bg-[#3366ff] text-white rounded-full px-4 py-1 text-sm",
    },
    행사: {
      default: "border border-[#33aa33] text-[#33aa33] rounded-full px-4 py-1 text-sm",
      active: "bg-[#33aa33] text-white rounded-full px-4 py-1 text-sm",
    },
    기타: {
      default: "border border-[#dd8844] text-[#dd8844] rounded-full px-4 py-1 text-sm",
      active: "bg-[#dd8844] text-white rounded-full px-4 py-1 text-sm",
    },
  };

  return (
    <div className="notice-container">
      {/* ✅ 필터 버튼 색상 & 클릭 시 배경 변경 적용 */}
      <div className="notice_type">
        {["전체", "학과", "채용", "행사", "기타"].map((part) => (
          <button
            key={part}
            className={`filter-btn ${
              selectedPart === part ? categoryStyles[part].active : categoryStyles[part].default
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
                  {/* ✅ 리스트의 분류(Label)도 필터와 동일한 스타일 적용 */}
                  <div className={categoryStyles[data.fields.part2[0]]?.active || ""}>
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
