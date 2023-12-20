import Link from "next/link";
import Image from "next/image";
import { fetchContentful } from "@/app/contentful/contentful";
import Footer from "@/app/component/footer";

export default async function Exhibition(){
     
    var data = await fetchContentful('portfolio');
    const portfolio = data;
    data = await fetchContentful('poster');
    const title = data[0].fields.exhibitionTitle;

    return(
      <div className="exhibition">
        <div className="exhibition-title">{title}</div>
        <div className="exhibition-container">
            {portfolio && portfolio.map((data,index)=>(
                <Link href={ `/page/portfolio/${index}`} key={index}>
                    <div className="exhibition-image-container">
                    {data.fields.thumbnail &&<Image src={'https:'+data.fields.thumbnail.fields.file.url} alt=".." width={0} height={0} sizes="100vw"/>}
                        <div className="exhibition-info">
                        <div>{data.fields.projectName}</div>
                        <div className="exhibition-student-name">{data.fields.nameEng}</div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
        <Footer/>
      </div>
    )
}