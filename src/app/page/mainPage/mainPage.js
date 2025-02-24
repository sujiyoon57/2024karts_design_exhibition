"use client"
import Image from "next/image"
import { fetchContentful } from "@/app/contentful/contentful"
import ScrollDown from "@/app/component/scrollDown"
import About from "@/app/component/about";
import { useSearchParams } from "next/navigation";
import { useState,useEffect } from "react";

export default function MainPage(){
    const [poster ,setPoster]=useState();
    const [mobilePoster,setMobilePoster]=useState();
    const [embedLink, setEmbedLink]=useState();
    const [scrollup, setScrollup] = useState(false);
    // const [counter, setCounter] = useState(0);

    
}

