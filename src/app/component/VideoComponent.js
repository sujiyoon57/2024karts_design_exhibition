"use client";

import React from "react";

const VideoComponent = ({ fileUrl, fileType }) => {
    return (
        <video controls width="100%" preload="metadata" poster={`${fileUrl}#t=0.1`}>
            <source src={fileUrl} type={fileType} />
            브라우저가 비디오 태그를 지원하지 않습니다.
        </video>
    );
};

export default VideoComponent;
