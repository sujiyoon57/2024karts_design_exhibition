import {getEntriesByFilter} from "@/app/contentful/contentful";
import Portfolio from "@/app/page/portfolio/Portfolio";

export default async function PortfolioPage({ params }) {
    const { year, id } = params;

    // 같은 년도 모든 프로젝트
    const data = await getEntriesByFilter("portfolio", 21600, {NEWexhibitionYear: year,}); // 6시간 캐싱
    const projects = data.sort((a, b) => a.fields.nameKr.localeCompare(b.fields.nameKr, "ko-KR"));

    const portfolio = projects?.find((item) => item.sys.id === id).fields;

    if (!portfolio) {
        return <div></div>;
    }

    return (
        <Portfolio portfolio={portfolio} projects={projects} id={id}/>
    );
}