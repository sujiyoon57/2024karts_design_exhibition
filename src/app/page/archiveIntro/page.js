"use client"
import Link from "next/link"

export default function ArchiveIntroPage() {
    return (
        <div className="archive-intro-container">
            <h1>Archive Intro Pages</h1>
            <p>Choose an archive introduction page:</p>
            <ul>
                <li><Link href="/page/archiveIntro/archiveIntro0">Go to Archive Intro 0</Link></li>
                <li><Link href="/page/archiveIntro/archiveIntro1">Go to Archive Intro 1</Link></li>
            </ul>
        </div>
    );
}
