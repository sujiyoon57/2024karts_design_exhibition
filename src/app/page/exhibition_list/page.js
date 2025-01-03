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
            <Link href={ `/page/exhibition`} >Projects</Link>
            <Link href={ `/page/exhibition_list`} className="active">Designers</Link>
        </div>
        <div className="exhibition_listtype">
            <div className="listtype_hd"> 
                <div>학생명  Student Name</div>
                <div>작품이름 Project Name</div>
                <div>전공 이름 </div>
            </div>
            {portfolio && portfolio.map((data,index)=>(
                <Link href={ `/page/portfolio/${index}`} key={index}>
                    
                    <div className={`exhibition-info-list ${data.fields.thumbnailBlack ? 'whiteFont':''}`}>
                        <div className={`exhibition-student-name ${data.fields.thumbnailBlack ? 'whiteFont':''}`}>{data.fields.nameKr} {data.fields.nameEng}</div>
                        <div>{data.fields.projectName}</div>
                        
                        <div>{data.fields.major}</div>
                    </div>
                    <div className="exhibition-image-container-list">
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
                </Link>
            ))}
        </div> 
      </div>
    )
}