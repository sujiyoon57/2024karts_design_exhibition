import { fetchContentful } from "@/app/contentful/contentful";

export async function generateStaticParams() {
    const data = await fetchContentful("archiveNew");

    if (!data || !Array.isArray(data)) return [];

    return data
        .filter((item) => item.fields.slug) // slug가 있는 항목만 필터링
        .map((item) => ({
            id: item.fields.slug, // ✅ slug를 사용하여 고유한 경로 생성
        }));
}
