"use client"
import Image from "next/image"
import { fetchContentful } from "@/app/contentful/contentful"
import ScrollDown from "@/app/component/scrollDown"
import About from "@/app/component/about";
import { useSearchParams } from "next/navigation";
import { useState,useEffect } from "react";

export default function MainPage(){
    const [title, setTitle] = useState();
    const [title2, setTitle2] = useState();
    const [title3, setTitle3] = useState();
    const [title4, setTitle4] = useState();

    const [date, setDate] = useState();
    const [date2, setDate2] = useState();
    const [date3, setDate3] = useState();
    const [date4, setDate4] = useState();

    useEffect(() => {
        const getContentful=async()=>{
            try {
                var data = await fetchContentful('notice');
                setTitle(data[0].fields.title);
                setDate((data[0].sys.createdAt).substr(0, 10));
            } catch (error) {
                console.error("Error fetching data:", error);
            }

            try {
                var data = await fetchContentful('notice2');
                setTitle2(data[0].fields.title);
                setDate2((data[0].sys.createdAt).substr(0, 10));
            } catch (error) {
                console.error("Error fetching data:", error);
            }

            try {
                var data = await fetchContentful('notice3');
                setTitle3(data[0].fields.title);
                setDate3((data[0].sys.createdAt).substr(0, 10));
            } catch (error) {
                console.error("Error fetching data:", error);
            }

            try {
                var data = await fetchContentful('notice4'); 
                setTitle4(data[0].fields.title);
                setDate4((data[0].sys.createdAt).substr(0, 10));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        getContentful();
    }, []);

    return(
        <div className="main-notice"> 
            <h3>공지사항</h3>
            <ul className="notice_list">
               {title && (
                <li>
                  <a href={ `/page/notice_view/0`}>
                    <div className="notice-info">
                      <div className="type01">학과</div>  {/* 학과 (핑크) */}
                      <div>{title}</div> 
                      <div>{date}</div>
                    </div>
                  </a>
                </li>
                )}

               {title2 && (
                <li>
                  <a href={ `/page/notice2_view/0`}>
                    <div className="notice-info">
                      <div className="type02">행사</div>  {/* 행사 (그린) */}
                      <div>{title2}</div> 
                      <div>{date2}</div>
                    </div>
                  </a>
                </li>
                )}

                {title3 && (
                <li>
                  <a href={ `/page/notice3_view/0`}>
                    <div className="notice-info">
                      <div className="type03">채용</div>  {/* 채용 (블루) */}
                      <div>{title3}</div> 
                      <div>{date3}</div>
                    </div>
                  </a>
                </li>
                )}

                {title4 && (
                <li>
                  <a href={ `/page/notice4_view/0`}>
                    <div className="notice-info">
                      <div className="type04">기타</div>  {/* 기타 (오렌지) */}
                      <div>{title4}</div> 
                      <div>{date4}</div>
                    </div>
                  </a>
                </li> 
                 )}      

            </ul>
            <a href="/page/notice" className="more">전체 보기</a> 
        </div>
    )
}
