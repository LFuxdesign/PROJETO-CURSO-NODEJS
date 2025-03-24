import { useEffect, useRef, useState } from "react";
import Player from "../player/player";
import "./modal.css";
import { imagesFormats, videoFormats, videoPlatforms } from "../../scripts/scripts";
import { CloseModalBtn } from "./closeModalBtn";

function ResourceSwitcher({
    path,
    mode,
    alt,
    className = "",
    animationDelay = "0s",
}) {

    function checkValidExtension(mode) {
        return mode === "img"
            ? imagesFormats.some((ext) => path.endsWith(ext))
            : mode === "video" &&
            (videoFormats.some((ext) => path.endsWith(ext)) ||
                videoPlatforms.some((plataforms) => path.startsWith(plataforms)));
    }

    if ((mode === "img" || mode === "video") && checkValidExtension(mode)) {
        return mode === "img" ? (
            <img
                className={`img ${className}`}
                style={{ animationDelay: animationDelay }}
                src={path}
                alt={alt}
                loading="lazy"
                onDragStart={(e) => {
                    e.preventDefault();
                }}
            />
        ) : (
            <Player videoPath={path} animationDelay loadingType="default" />
        );
    } else {
        throw new Error(
            `The media format does not match the type ("${mode}") in the 'Modal' component`
        );
    }
}

export default function Modal({ path, showControl = false, type, alt = "", className = "", animationDelay, showStatus }) {
    const [visibilityController, setVisibilityController] = useState();
    useEffect(() => setVisibilityController(showControl), [showControl])
    if (!path) {
        throw new Error(
            "The 'path' parameter is required for the component 'Modal'!"
        );
    } else if (!type) {
        throw new Error(
            "The 'type' parameter is required for the component 'Modal'!"
        );
    } else if (type !== "img" && type !== "video") {
        throw new Error(
            "The 'type' parameter must be equal to 'img' or 'video' for the 'Modal' component!"
        );
    }

    if (visibilityController) {
        document.querySelector("body").style.overflow = "hidden";
    } else {
        document.querySelector("body").style.overflow = "";
    }
    const modalRef = useRef(null);

    function pauseAnimationsForPerformance(status=true) {
        const selector = document.querySelectorAll("*:not(#modal, #modal *)");
        status ? selector.forEach(e=>e.classList.add("pauseAnimations")) : selector.forEach(e=>e.classList.remove("pauseAnimations"))
    }
    
    useEffect(() => {
            pauseAnimationsForPerformance(true);
    }, []);

    function closeModal() {
        setVisibilityController(false); setTimeout(() => showStatus(false), 500)
        pauseAnimationsForPerformance(false)
    }

    return (<>
        <div id="modal" ref={modalRef} className={`flexCenter ${visibilityController ? "entryAnimation" : "outAnimation out"}`}>
            <CloseModalBtn action={closeModal} />
            <div onClick={(e) => e.preventDefault()} className="container flexCenter entryAnimation transition">
                <ResourceSwitcher
                    className={className}
                    animationDelay={animationDelay}
                    path={path}
                    mode={type}
                    alt={alt}
                />
            </div>
            <div id="closeActionArea" onClick={closeModal} />
        </div>
    </>);
}
