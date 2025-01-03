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
                    <Link href={ `/page/karts`} className="active">학과 및 교수 소개</Link>
                    <Link href={ `/page/professor`}>겸임 · 강사</Link>
                </div> 
                <div class="kart_tit">학과소개</div>
                {aboutButton && about && about.map((data)=>(
                    
                    <div key={data.id} className="flex-box">
                        {data.fields.Images && data.fields.Images.map((img)=>(
                            <div key={img.id} className="about-flex-item">
                              <Image src={'https:'+img.fields.file.url} alt=".." width={0} height={0} sizes="100vw"/>
                            </div>
                        ))}
                        {data.fields.caption && data.fields.caption.content.map((data)=>(
                            <p key={data.id} className="about-flex-item">
                              {documentToReactComponents(data)}</p>
                        ))}
                    </div>
                ))}
                
                <div class="kart_tit">교수진</div>
                    <div className="flex-box">
                        {faculty && faculty.map((data, index)=>(
                        <div key={index} className="faculty-flex-item">
                            <Image src={'https:'+data.fields.image.fields.file.url} alt=".." width={0} height={0} sizes="100vw"/>
                            <div className="faculty-info">
                                {data.fields.name && <div>{data.fields.name}</div>}
                                <div>nameEng</div>
                                <div>디자인과</div>
                                <div>학력</div> 
                            </div>
                        </div>
                        ))}
                    </div> 
              
            </div> 
        </div>
    );
}