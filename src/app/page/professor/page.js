"use client"

import { fetchContentful } from "@/app/contentful/contentful";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from '@/app/component/footer';
import KartsLinkLogo from "/public/asset/kartsLinkLogo.svg";

export default function Karts(){

    const [about, setAbout]=useState();
    const [faculty, setFaculty] =useState();
    const [aboutButton, setAboutButton] = useState(true);
    const [facultyButton, setFacultyButton] =useState(false);

    useEffect(() => {
        const getContentful=async()=>{
          try{
            var data = await fetchContentful('karts');
            setAbout(data);
            data = await fetchContentful('kartsAboutFaculty');
            setFaculty(data);
            console.log(data);
          }catch (error) {
            console.error("Error fetching data:", error);
          }
        }
        getContentful();
      }, []);

    

    return(
        <div className="container1">
            <div className="container2">
                <div className="exhibition_tab">   
                    <Link href={ `/page/karts`}>학과 및 교수 소개</Link>
                    <Link href={ `/page/professor`} className="active">겸임 · 강사</Link>
                </div> 
                 
                 
                <div className="professor_list">
                    <div className="prof_con">
                        <div className="prof_name">고베드로 강사</div>
                        <div className="prof_info">
                            <p><span>전공분야</span> <em>인터랙션 디자인</em></p>
                            <p><span>학위정보</span> <em>전공분야</em></p>
                            <p><span>이메일</span> <em>bedro_ko@naver.com</em></p>
                        </div> 
                    </div>         
                    <div className="prof_con">
                        <div className="prof_name">고베드로 강사</div>
                        <div className="prof_info">
                            <p><span>전공분야</span> <em>인터랙션 디자인</em></p>
                            <p><span>학위정보</span> <em>전공분야</em></p>
                            <p><span>이메일</span> <em>bedro_ko@naver.com</em></p>
                        </div> 
                    </div>         
                    <div className="prof_con">
                        <div className="prof_name">고베드로 강사</div>
                        <div className="prof_info">
                            <p><span>전공분야</span> <em>인터랙션 디자인</em></p>
                            <p><span>학위정보</span> <em>전공분야</em></p>
                            <p><span>이메일</span> <em>bedro_ko@naver.com</em></p>
                        </div> 
                    </div>         
                    <div className="prof_con">
                        <div className="prof_name">고베드로 강사</div>
                        <div className="prof_info">
                            <p><span>전공분야</span> <em>인터랙션 디자인</em></p>
                            <p><span>학위정보</span> <em>전공분야</em></p>
                            <p><span>이메일</span> <em>bedro_ko@naver.com</em></p>
                        </div> 
                    </div>         
                </div> 
              
            </div> 
        </div>
    );
}