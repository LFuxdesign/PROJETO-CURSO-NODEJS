import ReactPlayerLazy from "react-player/lazy";
import ReactPlayer from "react-player";

const PlayerIcon = () => {
    return (
        <div className="flexCenter playerIcon" title="Reproduzir vídeo">
            <svg width="249" height="284" viewBox="0 0 249 284" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M241.5 129.01C251.5 134.783 251.5 149.217 241.5 154.99L22.5 281.43C12.5 287.204 1.67928e-05 279.987 1.72975e-05 268.44L2.83512e-05 15.5603C2.8856e-05 4.01331 12.5 -3.2036 22.5 2.5699L241.5 129.01Z" fill="url(#paint0_linear_330_346)" />
                <defs>
                    <linearGradient id="paint0_linear_330_346" x1="1295.8" y1="-86.2971" x2="1176.65" y2="559.455" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#2C65A3" />
                        <stop offset="1" stopColor="#6E67DF" />
                    </linearGradient>
                </defs>
            </svg>

        </div>
    )
}

export default function Player({ videoPath, animationDelay = 0, loadingType = "lazy" }) {
    return (
        videoPath && (loadingType === "lazy" ? <ReactPlayerLazy
            className="videoPlayer"
            style={{ animationDelay, animationDuration: "1s", marginBottom: "20px" }}
            url={videoPath}
            width={"100%"}
            controls={true}
            volume={1}
            light={<img className="thumb" src='/assets/webp/THUMB.webp' alt='' />}
            playIcon={<PlayerIcon />}
            config={{
                file: {
                    attributes: {
                        controlsList: 'nodownload',
                        onContextMenu: e => e.preventDefault()
                    }
                }
            }}
        /> : loadingType === "default" && <ReactPlayer
            className="videoPlayer"
            style={{ animationDelay, animationDuration: "1s", marginBottom: "20px" }}
            url={videoPath}
            width={"100%"}
            controls={true}
            volume={1}
            light={<img className="thumb" src='/assets/webp/THUMB.webp' alt='' />}
            playIcon={<PlayerIcon />}
            config={{
                file: {
                    attributes: {
                        controlsList: 'nodownload',
                        onContextMenu: e => e.preventDefault()
                    }
                }
            }}
        />)
    )
}