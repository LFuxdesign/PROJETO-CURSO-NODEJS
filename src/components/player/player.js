import ReactPlayerLazy from "react-player/lazy";
import ReactPlayer from "react-player";

export default function Player({ videoPath, animationDelay = 0, loadingType = "lazy" }) {
    return (
        videoPath && (loadingType === "lazy" ? <ReactPlayerLazy
            className="videoPlayer"
            style={{ animationDelay, animationDuration: "1s", marginBottom: "20px" }}
            url={videoPath}
            width={"100%"}
            controls={true}
            volume={1}
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