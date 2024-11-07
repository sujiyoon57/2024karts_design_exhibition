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
            <div className="header-icon-wrap"><Link href='/'><HeaderIcon onClick={()=>setMenuOn(false)}/></Link></div>
            <div className="menu-icon-wrap" onClick={()=>setMenuOn(!menuOn)}>
                {menuOn ? (<ExitIcon/>) : (<MenuIcon/>)}
            </div> 
            <nav className="web-nav">
                <Link href="/page/karts" onClick={()=>setMenuOn(false)}><span>About</span></Link>
                {exhibitionOn && <Link href="/page/exhibition" onClick={()=>setMenuOn(false)}><span>2024 Exhibition</span></Link>}
                {archiveOn && <Link href="/" onClick={()=>setMenuOn(false)}><span>Archive</span></Link>} 
                <div>
                    <span>PDF</span>
                    <p>
                        <Link href=""><span>2023</span></Link>
                        <Link href=""><span>2022</span></Link>
                    </p>
                </div> 
                <Link href="" onClick={()=>setMenuOn(false)}><span>Instagram</span></Link>
            </nav>
            {<nav className={`mobile-nav ${menuOn?'menuActive' : 'menuInactive'}`}>
                <Link href="/page/karts" onClick={()=>setMenuOn(false)}><span>About</span></Link>
                {exhibitionOn && <Link href="/page/exhibition" onClick={()=>setMenuOn(false)}><span>Exhibition 2024</span></Link>}
                {archiveOn && <Link href="/" onClick={()=>setMenuOn(false)}><span>Archive</span></Link>}
                <div>
                    <span>Archive</span>
                    <p>
                        <Link href=""><span>2023</span></Link>
                        <Link href=""><span>2022</span></Link>
                        <Link href=""><span>2021</span></Link>
                    </p>
                </div> 
            </nav>}
        </header>
    )
}