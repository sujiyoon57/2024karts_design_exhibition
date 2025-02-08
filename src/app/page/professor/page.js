"use client";

import { fetchContentful } from "@/app/contentful/contentful";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from '@/app/component/footer';

export default function Karts() {
    const [professor, setProfessor] = useState([]);

    useEffect(() => {
        const getContentful = async () => {
            try {
                var data = await fetchContentful('professor');

                // ✅ 가나다순 정렬 추가
                data.sort((a, b) => a.fields["강사이름"].localeCompare(b.fields["강사이름"], 'ko-KR'));

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
            <div className="container2">
                <div className="exhibition_tab">   
                    <Link href={`/page/karts`}>학과 및 교수 소개</Link>
                    <Link href={`/page/professor`} className="active">겸임 · 강사</Link>
                </div> 
                 
                <div className="professor_list">
                    {professor && professor.map((data, index) => (
                        <div className="prof_con" key={index}>
                            <div className="prof_name">{data.fields["강사이름"]}</div>
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
