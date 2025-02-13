import { fetchContentful } from "@/app/contentful/contentful";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Credit() {
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
        <div className="tab_cont_credit">
            <div className="credit">
                <h4>졸업준비위원회 Graduation Preparatory Committee</h4>
                <div className="committee">
                    <dl><dt>졸준위원장</dt><dd>윤지수</dd></dl>
                    <dl><dt>커뮤 대표</dt><dd>윤수영</dd></dl>
                    <dl><dt>인터 대표</dt><dd>이승주</dd></dl>
                    <dl><dt>제품 대표</dt><dd>김정인</dd></dl>
                    <dl><dt>운송 대표</dt><dd>박세현</dd></dl>
                </div>
            </div>
        </div>
    );
}