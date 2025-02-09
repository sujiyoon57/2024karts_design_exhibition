import { fetchContentful } from "@/app/contentful/contentful";

export async function generateStaticParams() {
    const data = await fetchContentful("archiveNew");

    if (!data || !Array.isArray(data)) return [];

    return data.map((item) => ({
        id: item.sys.id, // ✅ Contentful의 sys.id를 사용하여 고유한 경로 생성
    }));
}
