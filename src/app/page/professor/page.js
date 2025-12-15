import { fetchContentful } from "@/app/contentful/contentful";
import Link from "next/link";

export default async function Professor() {

    const data = await fetchContentful('professor');
    const professor = data.sort((a, b) => a.fields.name.localeCompare(b.fields.name, 'ko-KR'));

    return (
        <div className="container1 professor">
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
