"use client"

import {useState} from "react";

export default function Mobile({archiveNew, info, credit}){
    const [activeTab, setActiveTab] = useState("info");

    return(
        <div>
            <div className="exhibition_tab mo-archive-tab">
                <button
                    className={activeTab === "info" ? "active" : ""}
                    onClick={() => setActiveTab("info")}
                >
                    Info
                </button>
                <button
                    className={activeTab === "credit" ? "active" : ""}
                    onClick={() => setActiveTab("credit")}
                >
                    Credit
                </button>
            </div>

            {/* Info 탭 내용 */}
            {activeTab === "info" && (
                <div className="tab_cont_info">
                    <p className="tit_img tit_img_pc">
                        <img
                            src={archiveNew?.titleimg?.fields?.file?.url ? `https:${archiveNew.titleimg.fields.file.url}` : "/default-image.png"}
                            alt="Title Image"
                        />
                    </p>
                    <p className="tit_img tit_img_mo">
                        <img
                            src={archiveNew?.titleimgMobile?.fields?.file?.url ? `https:${archiveNew.titleimgMobile.fields.file.url}` : "/default-image.png"}
                            alt="Title Image"
                        />
                    </p>
                    {info}
                </div>
            )}

            {/* Credit 탭 내용 */}
            {activeTab === "credit" && (
                <div className="tab_cont_credit">
                    {credit}
                </div>
            )}
        </div >
    );
}