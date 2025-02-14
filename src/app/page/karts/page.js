"use client"

import { fetchContentful } from "@/app/contentful/contentful";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from "@contentful/rich-text-types";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/app/component/header";

export default function Karts() {
    const [about, setAbout] = useState();
    const [faculty, setFaculty] = useState();
    const [aboutButton, setAboutButton] = useState(true);
    const [facultyButton, setFacultyButton] = useState(false);
    const [menuOn, setMenuOn] = useState(false);

    useEffect(() => {
        const getContentful = async () => {
            try {
                var data = await fetchContentful("karts");
                setAbout(data);
                data = await fetchContentful("kartsAboutFaculty");
                setFaculty(data);
                console.log(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        getContentful();
    }, []);

    // ✅ 학과 소개 본문에 font-weight 400 적용하는 옵션 추가
    const options = {
        renderNode: {
            [BLOCKS.PARAGRAPH]: (node, children) => (
                <p style={{ fontWeight: 400 }}>{children}</p>
            ),
        },
    };

    return (
        <>
        <Header menuOn={menuOn} setMenuOn={setMenuOn} />
        <div className="container1">
            <div className="container2">
                <div className="exhibition_tab">
                    <Link href={`/page/karts`} className="active">학과 및 교수 소개</Link>
                    <Link href={`/page/professor`}>겸임 · 강사</Link>
                </div>
                <div className="kart_tit">학과소개</div>
                
                {aboutButton && about && about.map((data) => (
                    <div key={data.id} className="flex-box">
                        {data.fields.Images && data.fields.Images.map((img) => (
                            <div key={img.id} className="about-flex-item">
                                <Image src={'https:' + img.fields.file.url} alt=".." width={0} height={0} sizes="100vw" />
                            </div>
                        ))}
                        {data.fields.caption && (
                            <div className="about-flex-item">
                                {documentToReactComponents(data.fields.caption, options)}
                            </div>
                        )}
                    </div>
                ))}

                <div className="kart_tit">교수진</div>
                <div className="flex-box">
                    {faculty && faculty.map((data, index) => (
                        <div key={index} className="faculty-flex-item">
                            <Image src={'https:' + data.fields.image.fields.file.url} alt=".." width={0} height={0} sizes="100vw" />
                            <div className="faculty-info">
                                {data.fields.name && <div>{data.fields.name}</div>}
                                <div>{data.fields.nameEn}</div>
                                <div>{data.fields.major}</div>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: (data.fields.education3 || "").replace(/\n/g, "<br />"),
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </>
    );
}
