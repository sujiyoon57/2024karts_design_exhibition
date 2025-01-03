import Link from "next/link";
import Image from "next/image";
import { fetchContentful } from "@/app/contentful/contentful";
import Footer from "@/app/component/footer";

export default async function Exhibition(){

    var data = await fetchContentful('portfolio');
    const portfolio = data;
    
    return(
      <div className="exhibition">
        {/* <div className="exhibition-title">{title}</div> */}
        <div className="exhibition_tab">   
            <Link href={ `/page/exhibition`} className="active">Projects</Link>
            <Link href={ `/page/exhibition_list`}>Designers</Link>
        </div>
        <div className="exhibition-container">
            {portfolio && portfolio.map((data,index)=>(
                <Link href={ `/page/portfolio/${index}`} key={index}>
                    <div className="exhibition-image-container">
                        {data.fields.thumbnail.fields.file.url &&
                            <Image 
                                src={'https:'+data.fields.thumbnail.fields.file.url} 
                                alt=".." 
                                width={0} height={0} 
                                sizes="100vw"
                                className={data.fields.thumbnail.fields.file.details.image.height > data.fields.thumbnail.fields.file.details.image.width ? 'isVertical' : ''}
                                />
                        }
                        {/* <div className="blackback"></div> */}
                        
                    </div>
                    <div className={`exhibition-info ${data.fields.thumbnailBlack ? 'whiteFont':''}`}>
                        <div>{data.fields.projectName}</div>
                        <div className={`exhibition-student-name ${data.fields.thumbnailBlack ? 'whiteFont':''}`}>{data.fields.nameEng}</div>
                    </div>
                    
                </Link>
            ))}
        </div> 
      </div>
    )
}