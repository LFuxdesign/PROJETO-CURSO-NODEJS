import { useEffect, useRef, useState } from "react";
import Player from "../player/player";
import "./modal.css";
import html2canvas from "html2canvas";
import { canvasRGB } from "stackblur-canvas";

function ResourceSwitcher({
    path,
    mode,
    alt,
    className = "",
    animationDelay = "0s",
}) {
    const imagesFormats = [".jpg", ".jpeg", ".png", ".svg", ".webp"];
    const videoFormats = [".mp4", ".wav", ".mov", ".avi", ".webm"];
    const videoPlatforms = [
        "https://youtube.com",
        "youtube.com",
        "https://www.youtube.com",
        "www.youtube.com",
        "https://youtu.be",
        "youtu.be",
        "https://vimeo.com",
        "vimeo.com",
        "https://www.vimeo.com",
        "www.vimeo.com",
    ];

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

    useEffect(() => {
        function captureBlurredBackground() {
            const mainElement = document.querySelector("#main");
            const rect = mainElement.getBoundingClientRect();

            // Offsets relativos: se o elemento estiver parcialmente fora da viewport
            const offsetX = rect.left < 0 ? -rect.left : 0;
            const offsetY = rect.top < 0 ? -rect.top : 0;

            // Calcula a largura e altura visíveis
            const visibleWidth = Math.min(rect.width, window.innerWidth - Math.max(rect.left, 0));
            const visibleHeight = Math.min(rect.height, window.innerHeight - Math.max(rect.top, 0));

            html2canvas(mainElement, {
                useCORS: false,
                x: offsetX,
                y: offsetY,
                width: visibleWidth,
                height: visibleHeight,
                windowWidth: document.documentElement.clientWidth,
                windowHeight: document.documentElement.clientHeight,
            }).then((canvas) => {
                const blurCanvas = document.createElement("canvas");
                const blurCtx = blurCanvas.getContext("2d");
                blurCanvas.width = canvas.width;
                blurCanvas.height = canvas.height;

                blurCtx.drawImage(canvas, 0, 0);


                // Aplica o desfoque com canvasRGB
                canvasRGB(
                    blurCanvas,
                    0,
                    0,
                    blurCanvas.width,
                    blurCanvas.height,
                    100 // valor do raio de desfoque
                );

                modalRef.current.style.backgroundImage = `url(${blurCanvas.toDataURL("image/png")})`;
                modalRef.current.style.backdropFilter = "none";
            }).catch((err) => {
                console.error("Erro ao capturar a imagem do fundo:", err);
            });
        }

        setTimeout(() => {
            captureBlurredBackground();
        }, 800);
    }, []);

    function closeModal() {
        refLoader?.current?.classList.add("outAnimation");
        setVisibilityController(false); setTimeout(() => showStatus(false), 500)
    }
    const refLoader = useRef(null)

    return (<>
        <div id="modalLoading" ref={refLoader} className={"entryAnimation flexCenter"}>
            <div id="bgContainer">
                <div className="loader1"/>
            </div>
        </div>
        <div id="modal" ref={modalRef} className={`flexCenter ${visibilityController ? "entryAnimation" : "outAnimation out"}`}>
            <div onClick={closeModal}
                className="closeModal flexCenter transition">
                <div className="line transition" />
                <div className="line transition" />
            </div>
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
