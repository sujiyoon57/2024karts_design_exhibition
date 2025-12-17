import {getEntries} from "@/app/contentful/contentful";
import DesignerContents from "@/app/page/designer/DesignerContents";

export default async function Page(){
    const portfolio = await getEntries('portfolio', 21600); //6시간 캐싱

    return(
        <DesignerContents portfolio={portfolio}/>
    );
}