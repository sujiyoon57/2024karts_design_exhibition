"use client"

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { fetchContentful } from '../../contentful/contentful';

import { useState, useEffect, Children } from "react";
import Link from "next/link";
import KartsLinkLogo from "/public/asset/kartsLinkLogo.svg";
import Image from "next/image";
import Footer from '@/app/component/footer';

export default function Karts(){

    const [karts, setKarts] = useState([]);
    const [selected, setSelected]=useState([]);
    const [aboutButton, setAboutButton]=useState(true);
    const [facultyButton, setFacultyButton]=useState(false);
    const [contactButton, setContactButton]=useState(false);
    const [buttonActive, setButtonActive]=useState(false);
    const [about,setAbout]=useState([]);
    const [faculty,setFaculty]=useState([]);

    useEffect(() => {
      const getContentful=async()=>{
        try{
          var data = await fetchContentful('karts');
          setAbout(data);
          data = await fetchContentful('kartsAboutFaculty');
          setFaculty(data);
        }catch (error) {
          console.error("Error fetching data:", error);
        }
      }
      getContentful();
    }, []);

    // console.log(faculty);

    function handleButtonClick(button){
      if(button==="about"){
        setAboutButton(true);
        setFacultyButton(false);
      }else if(button==="faculty"){
        setAboutButton(false);
        setFacultyButton(true);
      }
    }

    return(
        <div className="karts-container">
            <div className="karts-content-container">
              <div className="karts-link-wraper">
                <Link href="https://www.karts.ac.kr/" passHref>
                  <KartsLinkLogo/>
                </Link>
              </div>
              <section>
                <div className="karts-button-wraper">
                  <button 
                    // onClick={()=>setAboutButton(!aboutButton)}
                    onClick={()=>handleButtonClick("about")}
                    className={aboutButton?'active':'inactive'}
                    >about</button>
                  <button 
                    // onClick={()=>setFacultyButton(!facultyButton)}
                    onClick={()=>handleButtonClick("faculty")}
                    className={facultyButton?'active':'inactive'}
                    >faculty</button>
                    <button 
                    // onClick={()=>setFacultyButton(!facultyButton)}
                    onClick={()=>handleButtonClick("faculty")}
                    className={facultyButton?'active':'inactive'}
                    >faculty</button>
                </div>
                {aboutButton ? (
                  <div className='karts-wrap'>
                   <div className='flex-container karts-description-container'>
                      <p className="flex-item-wraper1" >
                      &quot;문화적 뿌리와 토양을 강화하지 않고서는 결코 산업을 꽃피울 수 없다&quot;는 이념을 바탕으로 설립된 디자인과는 4년제 예술사과정 및 2년제 예술전문사과정을 통해 새로운 시대를 이끌 수 있는 디자인 전문가를 양성하는 국내 유일의 국립 디자인 콘서버토리이다. 끊임없이 변해가는 삶의 환경에 부합하는 새로운 가치와 시스템을 제시하는 것을 디자인의 주된 역할로 여기는 디자인과는, 개념적이고도 실제적 측면에서 디자인 문제를 논리적으로 탐구하여 혁신적 가치를 제시할 수 있는 미래지향형 디자인 전문가 양성을 위해 융합형 교육을 목표로 두고 있다.
                      </p>
                      <p className="flex-item-wraper1">
                      Established based on the idea that &quot;the industry can never blossom without strengthening cultural roots and soil,&quot; the Design Department is the only national design conservatory in Korea that fosters design experts who can lead a new era through a four-year art history course and a two-year art history course. The Design Department, which considers the main role of design to present new values and systems that fit the ever-changing environment of life, aims to foster convergence education to foster future-oriented design experts who can logically explore design issues in both conceptual and practical terms and present innovative values.
                      </p>
                   </div>
                    {/* {about && about.map((data)=>(
                      <div>
                        <div className="flex-container karts-images-container">
                          {data.fields.Images && data.fields.Images.map((img)=>(
                            <div className="flex-item-wraper" key={img.id}>
                              <Image src={'https:'+img.fields.file.url} alt=".." width={0} height={0} sizes="100vw"/>
                            </div>
                          ))}
                        </div>
                        <div className="flex-container karts-description-container">
                          {data.fields.caption && data.fields.caption.content.map((data)=>(
                            <p className="flex-item-wraper" key={data.id}>
                              {documentToReactComponents(data)}</p>
                          ))}
                        </div>
                      </div>
                    ))} */}
                  </div>
                ):(<></>)}
              </section>
              <section>
                <div className="karts-button-wraper">
                  {/* <button 
                    onClick={()=>setFacultyButton(!facultyButton)}
                    className={facultyButton?'active':'inactive'}
                    >faculty</button> */}
                </div>
                {facultyButton ? (
                  <div>
                    <div className='flex-container'>
                    <div className='flex-item-wraper temp faculty'>
                      <img src='/images/양승무.jpeg' alt='..'></img>
                      <div>양승무</div>
                      <div>교수</div>
                      <div></div>
                      <Link href="http://karts.ac.kr/usr/dpt/BBSCTG_0020050000000/professorDetail.do?prfNo=102">
                        상세보기
                      </Link>
                    </div>
                    <div className='flex-item-wraper temp faculty'>
                      <img src='/images/김경균.jpeg' alt='..'></img>
                      <div>김경균</div>
                      <div>교수</div>
                      <div></div>
                      <Link href="http://karts.ac.kr/usr/dpt/BBSCTG_0020050000000/professorDetail.do?prfNo=156">
                        상세보기
                      </Link>
                    </div>
                    <div className='flex-item-wraper temp faculty'>
                      <img src='/images/심규하.jpeg' alt='..'></img>
                      <div>심규하</div>
                      <div>부교수</div>
                      <div></div>
                      <Link href="https://www.karts.ac.kr/usr/dpt/BBSCTG_0020050000000/professorDetail.do?prfNo=577">
                        상세보기
                      </Link>
                    </div>
                    <div className='flex-item-wraper temp faculty'>
                      <img src='/images/김기현.jpeg' alt='..'></img>
                      <div>김기현</div>
                      <div>조교수 (학과장)</div>
                      <div></div>
                      <Link href="https://www.karts.ac.kr/usr/dpt/BBSCTG_0020050000000/professorDetail.do?prfNo=574">
                        상세보기
                      </Link>
                    </div>
                    <div className='flex-item-wraper temp faculty'>
                      <img src='/images/황보형호.png' alt='..'></img>
                      <div>황보형호</div>
                      <div>객원교수</div>
                      <div></div>
                    </div>
                </div>
                    {/* <div className='flex-container'>
                      {faculty && faculty.map((data)=>(
                        <div className="flex-item-wraper">
                          <Image src={'https:'+data?.fields?.image?.fields?.file?.url} alt=".." width={0} height={0} sizes="100vw"/>
                          <p>{documentToReactComponents(data?.fields?.caption)}</p>
                        </div>
                      ))}
                    </div> */}
                  </div>
                ):(<></>)}
              </section>
              {/* <section>
                <div className="karts-button-wraper">
                  <button 
                    onClick={()=>setContactButton(!contactButton)}
                    className={contactButton?'active':'inactive'}
                    >contact</button>
                </div>
                {contactButton ? (
                  <div>
                    <div className="flex-container karts-images-container">
                      <div className="flex-item-wraper"><img></img></div>
                    </div>
                    <div className="flex-container karts-description-container">
                      <p className="flex-item-wraper"></p>
                    </div>
                  </div>
                ):(<></>)}
              </section> */}
            </div>
            <Footer/>
        </div>
    )
}


// {aboutFacultyButton ? (
//   <div>
//   {faculty && faculty.map((data)=>(
//     <div>
//       <div className="flex-container karts-images-container">
//         {data?.fields?.Images && data.fields.Images.map((img)=>(
//           <div className="flex-item-wraper" key={img.id}>
//             <Image src={'https:'+img.fields?.file?.url} alt=".." width={0} height={0} sizes="100vw"/>
//           </div>
//         ))}
//       </div>
//       <div className="flex-container karts-description-container">
//         {data.fields.caption && data.fields.caption.content.map((data)=>(
//           <p className="flex-item-wraper" key={data.id}>
//             {documentToReactComponents(data)}</p>
//         ))}
//       </div>
//     </div>
//   ))}
// </div>
// ):(<></>)}
