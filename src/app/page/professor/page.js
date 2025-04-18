"use client";

import { fetchContentful } from "@/app/contentful/contentful";
import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/app/component/header";

export default function Karts() {
    const [professor, setProfessor] = useState([]);
    const [menuOn, setMenuOn] = useState(false);

    useEffect(() => {
        const getContentful = async () => {
            try {
                var data = await fetchContentful('professor');
                data.sort((a, b) => a.fields.name.localeCompare(b.fields.name, 'ko-KR'));
                setProfessor(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        getContentful();
    }, []);

    useEffect(() => {
        if (menuOn) {
            document.body.classList.remove("professor-page");
        } else {
            document.body.classList.add("professor-page");
        }
    }, [menuOn]);

    useEffect(() => {
        const getContentful = async () => {
            try {
                var data = await fetchContentful('professor');

                console.log("Fetched Data:", data); // ✅ 데이터 확인용 로그

                // ✅ name 필드 기준으로 가나다 정렬
                data.sort((a, b) => a.fields.name.localeCompare(b.fields.name, 'ko-KR'));

                setProfessor(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        getContentful();

        // ✅ body에 professor-page 클래스 추가
        document.body.classList.add("professor-page");

        // ✅ 페이지 나갈 때 클래스 제거 (안 하면 다른 페이지에서도 적용될 수 있음)
        return () => {
            document.body.classList.remove("professor-page");
        };
    }, []);

    return (
        <div className="container1 professor">
            <Header menuOn={menuOn} setMenuOn={setMenuOn} />
            <div className="container2">
                <div className="exhibition_tab">   
                    <Link href={`/page/karts`}>학과 소개 및 전임교수진</Link>
                    <Link href={`/page/professor`} className="active">겸임 및 강사진</Link>
                </div> 
                 
                <div className="professor_list">
                    {professor && professor.map((data, index) => (
                        <div className="prof_con" key={index}>
                            <div className="prof_name">{data.fields.name}</div>
                            <div className="prof_info">
                                <p><span>전공분야</span> <em>{data.fields.major}</em></p>
                                <p><span>학위정보</span> <em>{data.fields.degree}</em></p>
                                <p><span>이메일</span> <em>{data.fields.email}</em></p>
                            </div> 
                        </div>      
                    ))}
                </div> 
            </div> 
        </div>
    );
}
