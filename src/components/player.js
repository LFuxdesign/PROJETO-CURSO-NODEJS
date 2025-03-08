import ReactPlayer from "react-player/lazy";

export default function Player({ videoPath, animationDelay = 0 }) {
    return (
        videoPath && <ReactPlayer
            className="entryAnimation videoPlayer"
            style={{ animationDelay: ".7s", animationDuration: "1s" }}
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
        />
    )
}