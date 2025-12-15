import { fetchContentful } from "@/app/contentful/contentful";
import Portfolio from "@/app/page/portfolio/Portfolio";

export default async function PortfolioPage({ params }) {
    const { id } = params;

    const allProjects = await fetchContentful("portfolio");
    const portfolio = allProjects?.find((item) => item.sys.id === id).fields;

    if (!portfolio) {
        return <div></div>;
    }

    return (
        <Portfolio portfolio={portfolio} allProjects={allProjects} id={id}/>
    );
}