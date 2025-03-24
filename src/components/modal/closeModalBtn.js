import "./closeModalBtn.css"

export function CloseModalBtn({ action, className, animationDelay }) {
    if (!action || typeof action !== "function")
        throw new Error("A function is required for the 'action' parameter in the 'CloseModalBtn' component");
    return (
        <div onClick={action}
            className={`closeModal flexCenter transition ${className && className}`}
            style={{animationDelay: animationDelay ? typeof animationDelay === "string" ? animationDelay : `${animationDelay}s`: null}}
            >
            <div className="line transition" />
            <div className="line transition" />
        </div>
    )
}