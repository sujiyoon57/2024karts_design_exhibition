"use client"

// import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { fetchContentful } from '../../contentful/contentful';

import { useState, useEffect, Children } from "react";
import Link from "next/link";
import KartsLinkLogo from "/public/asset/kartsLinkLogo.svg";
import Image from "next/image";
import Footer from '@/app/component/footer';

export default function Karts(){

    const [karts, setKarts] = useState([]);
    const [selected, setSelected]=useState([]);
    const [aboutButton, setAboutButton]=useState(false);
    const [aboutFacultyButton, setAboutFacultyButton]=useState(false);
    const [contactButton, setContactButton]=useState(false);
    const [buttonActive, setButtonActive]=useState(false);
    const [about,setAbout]=useState([]);
    const [faculty,setFaculty]=useState([]);

    const ko="한국예술종합학교 디자인과 졸업전시 2023 <졸전>은 어쩌구를 위한 어쩌구이다. 어쩌구 몇 인은 모여서 어쩌구한 결과물을 내었다. 우리는 어쩌구저쩌구를 위한 웹사이트를 디자인중이다. 이 웨사이트는 새로운 졸업자들을 위해 학교가 고안한 어쩌구 저쩌구이다. 졸업자들의 졸전은 12월이다. 여기에 생각하는 졸업 컨셉과 내용을 설명하고 한글로 작성해주시면 됩니다. 한글 폰트는 SUIT를 사용했는데 바뀔 수도 있을 것 같다. 지금은 영문 18, 한글 16이다. 마우스를 호버하면 위에 이렇게 텍스트가 뜨게 되어 졸업자들의 졸업 설명을 볼 수 있게 된다. 한국예술종합학교 디자인과 졸업전시 2023 <졸전>은 어쩌구를 위한 어쩌구이다.<br/>어쩌구 몇 인은 모여서 어쩌구한 결과물을 내었다. 이제부터 그 졸전을 시작하도록 하겠다. 인조이.한국예술종합학교 디자인과 졸업전시 2023 <졸전>은 어쩌구를 위한 어쩌구이다. 어쩌구 몇 인은 모여서 어쩌구한 결과물을 내었다. 우리는 어쩌구저쩌구를 위한 웹사이트를 디자인중이다. 이 웨사이트는 새로운 졸업자들을 위해 학교가 고안한 어쩌구 저쩌구이다. 졸업자들의 졸전은 12월이다. 여기에 생각하는 졸업 컨셉과 내용을 설명하고 한글로 작성해주시면 됩니다. 한글 폰트는 SUIT를 사용했는데 바뀔 수도 있을 것 같다. 지금은 영문 18, 한글 16이다. 마우스를 호버하면 위에 이렇게 텍스트가 뜨게 되어 졸업자들의 졸업 설명을 볼 수 있게 된다. 한국예술종합학교 디자인과 졸업전시 2023 <졸전>은 어쩌구를 위한 어쩌구이다. 어쩌구 몇 인은 모여서 어쩌구한 결과물을 내었다. "
    const eng = "The 2023 Graduation Exhibition of the Design Department at the Korea National University of Arts, known as 졸전 (Joljeon), is dedicated to showcasing the achievements of a group of individuals who have come together for a common purpose. We are currently in the process of designing a website for this event, tailored to the needs of the new graduates as envisioned by the school. The graduation projects of the students will be unveiled in December. The website, designed for the purpose of introducing the graduating class and their projects, is adorned with the SUIT Korean font, although there may be potential changes. The current font size is set at 18 for English and 16 for Korean. When hovering over elements on the website, text will appear, providing insights into the concepts and contents of the graduates' projects. The Korea National University of Arts, Design Department, Graduation Exhibition 2023 <졸전>, serves as a platform for the realization of certain objectives by a collective of individuals. Let the commencement of this graduation exhibition mark the beginning of a new journey. Enjoy. appear, providing insights into the concepts and contents of the graduates' projects. The Korea National University of Arts, Design Department, Graduation Exhibition 2023 <졸전>, serves as a platform for the realization of certain objectives by a collective of individuals. Let the commencement of this graduation exhibition mark the beginning of a new journey. Enjoy. English .  "

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
                    onClick={()=>setAboutButton(!aboutButton)}
                    className={aboutButton?'active':'inactive'}
                    >about</button>
                </div>
                {aboutButton ? (
                  <div className='karts-wrap'>
                    <p>
                    “문화적 뿌리와 토양을 강화하지 않고서는 결코 산업을 꽃피울 수 없다”는 이념을 바탕으로 설립된 디자인과는 4년제 예술사과정 및 2년제 예술전문사과정을 통해 새로운 시대를 이끌 수 있는 디자인 전문가를 양성하는 국내 유일의 국립 디자인 콘서버토리이다. 끊임없이 변해가는 삶의 환경에 부합하는 새로운 가치와 시스템을 제시하는 것을 디자인의 주된 역할로 여기는 디자인과는, 개념적이고도 실제적 측면에서 디자인 문제를 논리적으로 탐구하여 혁신적 가치를 제시할 수 있는 미래지향형 디자인 전문가 양성을 위해 융합형 교육을 목표로 두고 있다.
                    </p>
                    <p>
                    Established based on the idea that "the industry can never blossom without strengthening cultural roots and soil," the Design Department is the only national design conservatory in Korea that fosters design experts who can lead a new era through a four-year art history course and a two-year art history course. The Design Department, which considers the main role of design to present new values and systems that fit the ever-changing environment of life, aims to foster convergence education to foster future-oriented design experts who can logically explore design issues in both conceptual and practical terms and present innovative values.
                    </p>
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
              {/* <section>
                <div className="karts-button-wraper">
                  <button 
                    onClick={()=>setAboutFacultyButton(!aboutFacultyButton)}
                    className={aboutFacultyButton?'active':'inactive'}
                    >faculty</button>
                </div>
                {aboutFacultyButton ? (
                  <div>
                  {faculty && faculty.map((data)=>(
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
                  ))}
                </div>
                ):(<></>)}
              </section>
              <section>
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
