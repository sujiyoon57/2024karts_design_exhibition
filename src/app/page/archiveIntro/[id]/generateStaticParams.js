import { fetchContentful } from "@/app/contentful/contentful";

export async function generateStaticParams() {
    const data = await fetchContentful("archiveNew");

    if (!data || !Array.isArray(data)) return [];

    return data.map((_, index) => ({
        id: index.toString(),
    }));
}
