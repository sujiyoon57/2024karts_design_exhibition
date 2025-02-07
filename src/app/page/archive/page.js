import Link from "next/link";
import Image from "next/image";
import { fetchContentful } from "@/app/contentful/contentful"; 

export default async function ArchiveNew(){

    var data = await fetchContentful('archiveNew');
    const archiveNew = data;
    
    return( 
        <div className="archive-container"> 
            <ul className="archive_list"> 
            {archiveNew && archiveNew.map((data, index)=>(     
                <li>
                <Link href={ `/page/archiveIntro/${index}`} key={index}>
                    <div className="archive-info"> 
                        <Image
                                src="/asset/archive2024.png"
                                alt="Archive 2024"
                                width={620} 
                                height={366} 
                                layout="intrinsic" // ✅ 원본 비율 유지
                                objectFit="cover" // ✅ 비율을 유지하면서 잘리는 부분 조절
                        />
                        <div>{data.fields.title}</div>
                        
                    </div> 
                    
                </Link>
                </li>
            ))}
                  
            </ul>
        </div>  
    )
}
