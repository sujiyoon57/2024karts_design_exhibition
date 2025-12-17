import { getEntries } from "@/app/contentful/contentful";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from "@contentful/rich-text-types";
import Image from "next/image";
import Link from "next/link";

export default async function Karts() {
    /*
    * 2025.12
    * aboutButton, facultyButton 는 사용되지 않고있음.
    * -> 주석처리
    * */
    // const [aboutButton, setAboutButton] = useState(true);
    // const [facultyButton, setFacultyButton] = useState(false);

    const about = await getEntries("karts", 21600); //6시간 캐싱
    const faculty = await getEntries("kartsAboutFaculty", 86400); //24시간 캐싱

    // ✅ 학과 소개 본문에 font-weight 400 적용하는 옵션 추가
    const options = {
        renderNode: {
            [BLOCKS.PARAGRAPH]: (node, children) => (
                <p style={{ fontWeight: 400 }}>{children}</p>
            ),
        },
    };

    return (
        <div className="container1">
            <div className="container2">
                <div className="exhibition_tab">
                    <Link href={`/page/karts`} className="active">학과 소개 및 전임교수진</Link>
                    <Link href={`/page/professor`}>겸임 및 강사진</Link>
                </div>
                <div className="kart_tit">학과소개</div>

                {about && about.map((data, index) => (
                    <div key={data.id || index} className="flex-box"> {/* ✅ key 값 추가 */}
                        {data.fields.Images && data.fields.Images.map((img, imgIndex) => (
                            <div key={img.id || imgIndex} className="about-flex-item"> {/* ✅ key 값 추가 */}
                                <Image
                                    src={'https:' + img.fields.file.url}
                                    alt="이미지"
                                    width={432}
                                    height={240}
                                    sizes="100vw"
                                    style={{ width: "100%", height: "auto" }} // 새로운 방식 적용
                                />
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
                        <div key={data.id || index} className="faculty-flex-item"> {/* ✅ key 값 추가 */}
                            <Image
                                src={'https:' + data.fields.image.fields.file.url}
                                alt="교수 이미지"
                                className="faculty-image"
                                width={150}
                                height={150}
                                sizes="100vw"
                                style={{ width: "20%", height: "auto" }} // 새로운 방식 적용
                            />
                            <div className="faculty-info">
                                {data.fields.name && <div>{data.fields.name}</div>}
                                <div>{data.fields.nameEn}</div>
                                <div>{data.fields.major}</div>
                                <div></div>
                                <div className="education-text" // ✅ 새로운 class 추가
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
    );
}