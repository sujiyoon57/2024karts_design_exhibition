
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
                            <img src="/asset/archive2024.png" />
                            <div>2024</div>
                        </div> 
                    </a>
                </li>
                <li>
                    <a href="/page/exhibition"> 
                        <div className="archive-info">
                            <img src="/asset/archive2023.png" />
                            <div>2023</div>
                        </div> 
                    </a>
                </li>  
            </ul>
        </div>  
    )
}