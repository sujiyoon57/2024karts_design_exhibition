"use client" 

import MenuIcon from "/public/asset/menuIcon2.svg" 
import ExitIcon from "/public/asset/exitIcon.svg"
import LinkIcon from "/public/asset/linkIcon.svg"
import Link from "next/link"

export default function Header({exhibitionOn, archiveOn, menuOn, setMenuOn}){

    return(
        <header>
            <div className="header-icon-wrap">
                <Link href='/'>
                Korea National University of Arts<span> Design Department</span>
                </Link>
            </div>
            <div className="menu-icon-wrap" onClick={() => {
                    //console.log("메뉴 아이콘 클릭됨!"); // ⬅️ 클릭 확인용
                     setMenuOn(!menuOn);
                 }}>
                {menuOn ? (<ExitIcon/>) : (<MenuIcon/>)}
            </div> 
            <nav className="web-nav">
                <Link href="/page/karts" onClick={()=>setMenuOn(false)}><span>About</span></Link>
                <Link href="/page/notice" onClick={()=>setMenuOn(false)}><span>Notice</span></Link>
                <Link href="/page/archive" onClick={()=>setMenuOn(false)}><span>Archive</span></Link>   
                <Link href="https://www.karts.ac.kr/" onClick={()=>setMenuOn(false)}  target="_blank"><span>K-Arts<LinkIcon /></span></Link>
            </nav>
            {<nav className={`mobile-nav ${menuOn?'menuActive' : 'menuInactive'}`}>
                <dl>
                    <dt>About</dt>
                    <dd><Link href="/page/karts" onClick={()=>setMenuOn(false)}><span>학과 소개</span></Link></dd>
                    <dd><Link href="/page/professor" onClick={()=>setMenuOn(false)}><span>교강사 및 커리큘럼</span></Link></dd>
                </dl> 
                <Link href="/page/notice" onClick={()=>setMenuOn(false)}>Notice</Link>
                <dl>
                    <dt><Link href="/page/archive">Archive</Link></dt>
                    <dd><Link href="#" onClick={()=>setMenuOn(false)}><span>학과 전시</span></Link></dd>
                    <dd><Link href="/page/archive" onClick={()=>setMenuOn(false)}><span>졸업 전시</span></Link></dd>
                </dl> 
                <Link href="https://www.karts.ac.kr/" onClick={()=>setMenuOn(false)}  target="_blank"><span>KNUA<LinkIcon /></span></Link> 
            </nav>}
        </header>
    )
}