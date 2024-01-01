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

    function buttonClick(button){
        if(button==="about"){
            setAboutButton(true);
            setFacultyButton(false);
        }else if(button==="faculty"){
            setAboutButton(false);
            setFacultyButton(true);
        }
    }

    return(
        <div className="container1">
            <div className="container2">
                <Link href="https://www.karts.ac.kr/" passHref className="link-wraper">
                <KartsLinkLogo/>
                </Link>
                <div className="button-wrap">
                    <button 
                        onClick={()=>buttonClick("about")}
                        className={aboutButton ? '' : 'inactive'}>
                        about
                    </button>
                    <button 
                        onClick={()=>buttonClick("faculty")}
                        className={facultyButton ? '' : 'inactive'}>
                        faculty
                    </button>
                </div>
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
                {facultyButton &&
                    <div className="flex-box">
                        {faculty && faculty.map((data, index)=>(
                        <div key={index} className="faculty-flex-item">
                            <Image src={'https:'+data.fields.image.fields.file.url} alt=".." width={0} height={0} sizes="100vw"/>
                            {data.fields.name && <div>{data.fields.name}</div>}
                            {data.fields.position && <div>{data.fields.position}</div>}
                            {data.fields.link && <div><Link href={data.fields.link}>상세보기</Link></div>}
                        </div>
                        ))}
                    </div> 
                }
            </div>
            <Footer/>
        </div>
    );
}