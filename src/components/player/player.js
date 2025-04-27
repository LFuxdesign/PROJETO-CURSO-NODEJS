import ReactPlayerLazy from "react-player/lazy";
import ReactPlayer from "react-player";
import { useEffect, useRef, useState } from "react";

export default function Player({ videoPath, animationDelay = 0, loadingType = "lazy" }) {
    const refSkeleton = useRef(null);
    const [delay, setDelay] = useState(true)
    const [showSkeleton, setShowSkeleton] = useState(true);

    useEffect(() => {
        const delayToLoad = setTimeout(() => {
            setDelay(false)
        }, 500);
        const timer = setTimeout(() => {
            refSkeleton.current?.classList.add("hideSkeleton");
            secondTimer = setTimeout(() => {
                setShowSkeleton(false);
            }, 550);
        }, 1700);
        let secondTimer;


        return () => {
            clearTimeout(delayToLoad);
            clearTimeout(timer);
            clearTimeout(secondTimer);
        };
    }, []);

    return (
        videoPath && (loadingType === "lazy" ? <>
            {showSkeleton ? <div ref={refSkeleton} className="skeleton" style={{ position: "absolute" }} /> : false}
            <ReactPlayerLazy
                className="videoPlayer"
                style={{ animationDelay, animationDuration: "1s", marginBottom: "20px" }}
                url={videoPath}
                width={"100%"}
                controls={true}
                volume={1}
                light={delay ? <div /> : false}
                config={{
                    file: {
                        attributes: {
                            controlsList: 'nodownload',
                            onContextMenu: e => e.preventDefault()
                        }
                    }
                }}
            /></> : loadingType === "default" && <>
                {showSkeleton ? <div ref={refSkeleton} className="skeleton" style={{ position: "absolute" }} /> : false}
                <ReactPlayer
                    className="videoPlayer"
                    style={{ animationDelay, animationDuration: "1s", marginBottom: "20px" }}
                    url={videoPath}
                    width={"100%"}
                    controls={true}
                    volume={1}
                    light={delay ? <div /> : false}
                    config={{
                        file: {
                            attributes: {
                                controlsList: 'nodownload',
                                onContextMenu: e => e.preventDefault()
                            }
                        }
                    }}
                /></>)
    )
}