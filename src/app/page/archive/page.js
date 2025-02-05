import Link from "next/link";
import Image from "next/image";
import { fetchContentful } from "@/app/contentful/contentful"; 

export default async function Notice(){
    var data = await fetchContentful('notice');
    const notice = data;
    
    return( 
        <div className="archive-container"> 
             
            <ul className="archive_list"> 
                <li>
                    <a href="/page/archiveIntro"> 
                        <div className="archive-info">
                           <Image
                                src="/asset/archive2024.png"
                                alt="Archive 2024"
                                width={300}
                                height={177} // ✅ 비율 유지 적용
                            />
                            <div>2024</div>
                        </div> 
                    </a>
                </li>
                <li>
                    <a href="/page/exhibition"> 
                        <div className="archive-info">
                            <Image
                                src="/asset/archive2023.png"
                                alt="Archive 2023"
                                width={300}
                                height={177} // ✅ 비율 유지 적용
                            />
                            <div>2023</div>
                        </div> 
                    </a>
                </li>  
            </ul>
        </div>  
    )
}
