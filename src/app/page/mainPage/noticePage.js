"use client"

import { fetchContentful } from "@/app/contentful/contentful";
import { useState, useEffect } from "react";

export default function MainPage() {
  const [scrollup, setScrollup] = useState(false);
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const getContentful = async () => {
      try {
        var data = await fetchContentful("notice");

        // 최신 등록순 정렬 후 4개만 선택
        const sortedData = data
          .sort((a, b) => new Date(b.sys.createdAt) - new Date(a.sys.createdAt))
          .slice(0, 4);

        setNotices(sortedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getContentful();

    const aboutTimeout = setTimeout(() => {
      setScrollup(true);
    }, 5000);
    return () => {
      clearTimeout(aboutTimeout);
    };
  }, []);

<<<<<<< HEAD
    return(
        <div className="main-notice"> 
            <h3>공지사항</h3>
            <ul className="notice_list">
              {notices.length > 0 ? (
                notices.map((data, index) => (
                  <li key={index}>
                    <a href={`/page/notice_view/${index}`}>
                      <div className="notice-info">
                      <div
                        className={
                          data.fields.part2.includes("학과")
                            ? "type01"
                            : data.fields.part2.includes("행사")
                            ? "type02"
                            : data.fields.part2.includes("채용")
                            ? "type03"
                            : data.fields.part2.includes("기타")
                            ? "type04"
                            : ""
                        }
                      >{data.fields.part2}</div>
                        <div>{data.fields.title}</div>
                        <div>{data.sys.createdAt.substr(0, 10)}</div>
                      </div>
                    </a>
                  </li>
                ))
              ) : (
                <li>공지사항이 없습니다.</li>
              )}
            </ul>
            <a href="/page/notice" className="more">전체 보기</a> 
        </div>
    )
}
=======
  return (
    <div className="main-notice">
      <h3>공지사항</h3>
      <ul className="notice_list">
        {notices.length > 0 ? (
          notices.map((data, index) => (
            <li key={index}>
              <a href={`/page/notice_view/${index}`}>
                <div className="notice-info">
                  <div
                    className={
                      data.fields.part2.includes("학과")
                        ? "type01"
                        : data.fields.part2.includes("행사")
                        ? "type02"
                        : data.fields.part2.includes("채용")
                        ? "type03"
                        : ""
                    }
                  >{data.fields.part2}</div>
                  <div>{data.fields.title}</div>
                  <div>{data.sys.createdAt.substr(0, 10)}</div>
                </div>
              </a>
            </li>
          ))
        ) : (
          <li>공지사항이 없습니다.</li>
        )}
      </ul>
      <a href="/page/notice" className="more">전체 보기</a>
    </div>
  );
}
>>>>>>> ec04736 (메인->공지사항 수정정)
