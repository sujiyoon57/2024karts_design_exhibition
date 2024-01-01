"use client"
import HeaderIcon from "/public/asset/headerIcon.svg"
import MenuIcon from "/public/asset/menuIcon.svg" 
import ExitIcon from "/public/asset/exitIcon.svg"
import Link from "next/link"
import { useState } from "react"

export default function Header({exhibitionOn, archiveOn}){

    const [menuOn,setMenuOn]=useState(false);

    
    return(
        <header>
            <div className="header-icon-wrap"><Link href='/'><HeaderIcon/></Link></div>
            <div className="menu-icon-wrap" onClick={()=>setMenuOn(!menuOn)}>
                {menuOn ? (<ExitIcon/>) : (<MenuIcon/>)}
            </div> 
            <nav className="web-nav">
                <Link href="/page/karts" onClick={()=>setMenuOn(false)}><span>k-arts</span></Link>
                {exhibitionOn && <Link href="/page/exhibition" onClick={()=>setMenuOn(false)}><span>exhibition</span></Link>}
                {archiveOn && <Link href="/" onClick={()=>setMenuOn(false)}><span>archive</span></Link>}
            </nav>
            {menuOn&&<nav className="mobile-nav">
                <Link href="/page/karts" onClick={()=>setMenuOn(false)}><span>k-arts</span></Link>
                {exhibitionOn && <Link href="/page/exhibition" onClick={()=>setMenuOn(false)}><span>exhibition</span></Link>}
                {archiveOn && <Link href="/" onClick={()=>setMenuOn(false)}><span>archive</span></Link>}
            </nav>}
        </header>
    )
}