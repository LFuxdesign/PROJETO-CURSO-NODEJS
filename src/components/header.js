import React, { useEffect, useState } from "react";
import { Link, Route, Router } from "react-router-dom";
import imgExemplo from "../assets/stephanie-liverani-Zz5LQe-VSMY-unsplash.jpg";
import { isFunction } from "../scripts/scripts";

function Header(props) {
    const [online, setOnline] = useState(navigator.onLine);
    useEffect(() => {
        setOnline(navigator.onLine);
    }, [navigator.onLine]);

    return (
        <header className={props?.animate ? "flex entryAnimation" : "flex"}>
            <Link to={"/"}>
                <svg
                    width="30"
                    height="48"
                    viewBox="0 0 30 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M25.7898 8.53326V37.126H21.98L7.58547 15.0727V37.126H3.79536V8.53326H7.58547L22.0389 30.6455V8.53326H25.7898Z"
                        fill="#0D0D0D"
                    />
                    <path
                        d="M5.76758 43.6056L7.65724 38.6925H3.87793L5.76758 43.6056Z"
                        fill="#0D0D0D"
                        stroke="#0D0D0D"
                        strokeWidth="0.773429"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M2.36621 22.9908V13.7315L4.6338 11.6528"
                        stroke="#0D0D0D"
                        strokeWidth="1.54686"
                        strokeLinecap="round"
                    />
                </svg>
            </Link>

            <div id="search" className={props.loggedIn ? "flex" : "flex unlogged"}>
                <input
                    className="inputTxt"
                    id="searchInput"
                    placeholder=""
                    type="text"
                />
                <label htmlFor="searchInput">Procure por uma nota</label>
            </div>
            <div
                id="actions"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1.5vw",
                }}
            >
                {props.loggedIn ? (
                    <>
                        <div style={{ cursor: "pointer", visibility: props.showMenu ? "hidden" : "visible" }} id="profile">
                            <img src={props.profilePicture} style={{opacity: props.showMenu ? "0" : "1", transition: "all var(--animation-menu-duration) cubic-bezier(0.69, -0.07, 0.35, 1.07)", pointerEvents: "none"}} />
                        </div>
                        <div
                            id="menu" 
                            onClick={() => {
                                    props.showMenu
                                    ? document.querySelectorAll("#menu div").forEach((e) => {
                                        e.classList.remove("active");
                                        if (isFunction(props.closeFunction)) {
                                            props.closeFunction();
                                        }
                                    })
                                    : document.querySelectorAll("#menu div").forEach((e) => {
                                        e.classList.add("active");
                                        if (isFunction(props.openFunction)) {
                                            props.openFunction();
                                        }
                                    });
                            }}
                            style={{
                                cursor: "pointer",
                                width: "40px",
                                height: "60px",
                                display: "flex",
                                justifyContent: "center",
                                flexDirection: "column",
                                padding: "0 5px",
                            }}
                        >
                            <div />
                            <div />
                            <div />
                        </div>
                    </>
                ) : (
                    <Link to={"/login"} id="loginBtn">
                        Entrar
                    </Link>
                )}
            </div>
        </header>
    );
}

export default Header;
