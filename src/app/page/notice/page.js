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

  return (
    <div className="notice-container">
      <div className="notice_type">
        {["전체", "학과", "채용", "행사", "기타"].map((part, index) => (
          <button
            key={part}
            className={`${selectedPart === part ? "active" : ""} type0${index + 1}`}
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
                  {/* ✅ 리스트 내 분류 컬러를 상단과 동일하게 적용 */}
                  <div
                    className={
                      data.fields.part2.includes("학과")
                        ? "type02"
                        : data.fields.part2.includes("채용")
                        ? "type03"
                        : data.fields.part2.includes("행사")
                        ? "type04"
                        : data.fields.part2.includes("기타")
                        ? "type05"
                        : "type01"
                    }
                  >
                    {data.fields.part2}
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
