import { fetchContentful } from "@/app/contentful/contentful";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Info() {
    const router = useRouter();
    const { id } = router.query;  // URL에서 id 추출
    const [archiveNew, setArchiveNew] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                const data = await fetchContentful("archiveNew");
                if (data && data[id]) {
                    setArchiveNew(data[id].fields);
                }
            }
        };
        fetchData();
    }, [id]);

    if (!archiveNew) return <p>Loading...</p>;

    return (
        <div className="tab_cont_info">
            <p className="tit_img"><img src="/asset/archiveintro2024.png" /></p>
            <div className="info">
                <div className="title">전시이름</div>
                <div className="info_txt">
                    <p>{archiveNew.description}</p>
                </div>
            </div>
        </div>
    );
}