import { Link } from "react-router-dom";
import "./buttons.css";
import { isAFunction } from "../../scripts/scripts";
import { useEffect, useRef } from "react";

function Icon({ href, className = "" }) {
    return (
        <img src={href} className={"iconButton " + className} alt="" />
    )
}

function LinkButton({ linkAddr, openNewTab, buttonText, needIcon, iconPath, width, height, padding, radius, iconClassName = "", className = "", buttonAction, color, background, fontSize, backgroundHover, colorHover, animationDelay }) {
    return (
        <Link to={linkAddr} target={openNewTab ? "_blank" : undefined} rel="noopener noreferrer" style={{ width: typeof width === "string" ? width : width > 0 ? `${width}px` : "auto" }}>
            <BasicButton
                buttonText={buttonText}
                needIcon={needIcon}
                iconPath={iconPath}
                width={width}
                height={height}
                padding={padding}
                radius={radius}
                iconClassName={iconClassName}
                className={className}
                buttonAction={buttonAction}
                background={background}
                color={color}
                fontSize={fontSize}
                backgroundHover={backgroundHover}
                colorHover={colorHover}
                animationDelay={animationDelay}
            />
        </Link>
    )
}

function BasicButton({ buttonAction, buttonText, needIcon, iconPath, width, height, padding, radius, iconClassName = "", className = "", color, background, fontSize, backgroundHover = "#fff3", colorHover = "#fff", title, animationDelay }) {
    const btnRef = useRef(null)

    useEffect(() => {
        setTimeout(() => {
            if (backgroundHover && typeof backgroundHover === "string" && btnRef?.current) {
                const e = btnRef.current;
                e.style.setProperty("--backgroundHover", backgroundHover);
            }
            if (colorHover && typeof colorHover === "string" && btnRef?.current) {
                const e = btnRef.current;
                e.style.setProperty("--colorHover", colorHover);
            }
        }, 500);

    }, [backgroundHover, colorHover])

    function handleClick() {
        if (isAFunction(buttonAction)) {
            buttonAction();
        }
        setTimeout(() => {
            document.body.style.overflow = "";
        }, 1000);
    }
    return (
        <div
            ref={btnRef}
            title={title ? title : buttonText}
            className={"button flexCenter transition " + className}
            onClick={buttonAction && handleClick}
            style={{
                width: typeof width === "string" ? `calc(${width} - 2* ${typeof padding === "string" ? padding : padding + "px"}` : width > 0 ? `${width - (padding * 2)}px` : "auto",
                height: typeof height === "string" ? height : height > 0 ? `${height}px` : "auto",
                padding: typeof padding === "string" ? padding : padding > 0 ? `${padding}px` : undefined,
                borderRadius: typeof radius === "string" ? radius : radius > 0 ? `${radius}px` : undefined,
                color: color,
                background: background,
                fontSize: fontSize > 0 ? `${fontSize}px` : "16px",
                animationDelay: animationDelay ? typeof animationDelay === "string" ? animationDelay : `${animationDelay}s` : null
            }}
        >
            <div className="content flexCenter transition">
                {needIcon && <Icon href={iconPath} className={iconClassName} />}
                <span className="buttonText transition">{buttonText}</span>
            </div>
        </div>
    )
}

export default function Button({ isLink, linkAddr, openNewTab, buttonAction, buttonText, needIcon, iconHref, width = 0, height = 0, padding = 20, radius = 20, className = "", background = "var(--default-gradient)", color = "#fff", fontSize = 16, backgroundHover, colorHover, animationDelay }) {
    if (isLink) {
        if (!linkAddr) {
            console.error("Link address is required for a link button in Button component");
            return null;
        }
        return (
            <LinkButton
                linkAddr={linkAddr}
                openNewTab={openNewTab}
                buttonAction={buttonAction}
                buttonText={buttonText}
                needIcon={needIcon}
                iconPath={iconHref}
                width={width}
                height={height}
                padding={padding}
                radius={radius}
                className={className}
                color={color}
                background={background}
                backgroundHover={backgroundHover}
                colorHover={colorHover}
                animationDelay={animationDelay}
            />
        );
    } else {
        if (!buttonAction) {
            console.error("A function is required for a button in Button component if it is not a button with link");
            return null;
        }
        return (
            <BasicButton
                buttonAction={buttonAction}
                buttonText={buttonText}
                needIcon={needIcon}
                iconPath={iconHref}
                width={width}
                height={height}
                padding={padding}
                radius={radius}
                className={className}
                color={color}
                background={background}
                fontSize={fontSize}
                backgroundHover={backgroundHover}
                colorHover={colorHover}
                animationDelay={animationDelay}
            />
        );
    }
}
