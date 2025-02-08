"use client"
import Link from "next/link"

export default function ArchiveIntro() {
    return (
        <div className="archive-intro-container">
            <h2>Archive Intro</h2>
            <ul>
                <li><Link href="/page/archiveIntro/archiveIntro0">Archive Intro 0</Link></li>
                <li><Link href="/page/archiveIntro/archiveIntro1">Archive Intro 1</Link></li>
            </ul>
        </div>
    );
}
