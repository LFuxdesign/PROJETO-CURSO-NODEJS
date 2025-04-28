import { useEffect, useRef, useState } from "react"
import Curso from "../../conteudo/curso.json"
import "./header.css"
import { Link, useLocation } from "react-router-dom";
import { cpuThreads } from "../../scripts/scripts";
export default function Header({ windowSize }) {
    const location = useLocation();
    const refHeader = useRef(null);
    const [heightofHeader, setHeightOfHeader] = useState(0);


    useEffect(() => {
        const element = refHeader.current;
        if (!element) return;

        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                if (entry.contentRect) {
                    setHeightOfHeader(entry.contentRect.height);
                }
            }
        });
        resizeObserver.observe(element);

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    useEffect(() => {
        const content4moodle = document.querySelector(".content4moodle");
        if (content4moodle) {
            if ((windowSize && windowSize.height < 660) || location.pathname === "/view") {
                content4moodle.style.marginTop = `${heightofHeader + 70}px`;
            } else {
                content4moodle.style.marginTop = "";
            }
        }
    }, [heightofHeader, windowSize, location.pathname])

    // Checa se o usuário esta offline ou online
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    useEffect(() => {
        const handleOnline = () => navigator.onLine ? setIsOnline(true) : setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOnline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.addEventListener('offline', handleOnline);
        };
    }, []);

    useEffect(() => {
        isOnline ? turnHeaderLeftItemTo(0) : turnHeaderLeftItemTo(1)
    }, [isOnline])

    // Checa se o usuário esta offline ou online


    // Alterna o texto do header
    const [currentHeaderItemIndex, setCurrentHeaderItemIndex] = useState(0);
    const [animating, setAnimating] = useState(true);

    const leftItems = [
        <Link to={"/"}><h4 className="tituloCurso" style={{ fontSize: "18px" }} dangerouslySetInnerHTML={{ __html: Curso.tituloCurso }} /></Link>,
        <h4 className="alerts flexCenter" style={{gap: "10px"}}><svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10.5" r="10" fill="#FF9D00"></circle><path d="M10.0013 14.5C9.84 14.5 9.70433 14.4487 9.59433 14.346C9.49167 14.236 9.44033 14.1003 9.44033 13.939V9.044C9.44033 8.87533 9.49167 8.73967 9.59433 8.637C9.70433 8.53433 9.84 8.483 10.0013 8.483C10.17 8.483 10.3057 8.53433 10.4083 8.637C10.511 8.73967 10.5623 8.87533 10.5623 9.044V13.939C10.5623 14.1003 10.511 14.236 10.4083 14.346C10.3057 14.4487 10.17 14.5 10.0013 14.5ZM10.0013 7.504C9.80333 7.504 9.631 7.43433 9.48433 7.295C9.345 7.14833 9.27533 6.976 9.27533 6.778C9.27533 6.58 9.345 6.41133 9.48433 6.272C9.631 6.12533 9.80333 6.052 10.0013 6.052C10.1993 6.052 10.368 6.12533 10.5073 6.272C10.654 6.41133 10.7273 6.58 10.7273 6.778C10.7273 6.976 10.654 7.14833 10.5073 7.295C10.368 7.43433 10.1993 7.504 10.0013 7.504Z" fill="white"></path></svg><h4>Você está offline.</h4> A maior parte do site funciona normalmente, mas alguns conteúdos externos podem não carregar.</h4>
    ];

    function turnHeaderLeftItemTo(index) {
        setAnimating(true);
        setTimeout(() => {
            setCurrentHeaderItemIndex(index);
            setAnimating(false);
        }, 270);
    }
    useEffect(() => {
        turnHeaderLeftItemTo(currentHeaderItemIndex);
    }, [currentHeaderItemIndex]);
    // Alterna o texto do header
    return (
        <header ref={refHeader} className={`flexCenter ${cpuThreads < 4 ? "noBlur" : ""}`}>
            <div className="container flex" style={{ justifyContent: "space-between", width: "100%", gap: "20px" }}>
                <div className="leftItems flexCenter">
                    <div className={`containerLeftAni ${animating ? 'animating' : ''}`}>
                        {leftItems[currentHeaderItemIndex]}
                    </div>
                </div>
                {/* <div className="rightItems flexCenter" style={{gap: "40px"}}>
                    <div className="profile flexCenter" style={{gap: "20px"}}>
                        <span>[Username]</span>
                        <div className="profilePicture flexCenter">
                            <h4 className="usernameFirstLetter">U</h4>
                            <img src="" alt="" />
                        </div>
                    </div>
                    <div className="hamburgerMenu">
                        <div/>
                        <div/>
                        <div/>
                    </div>
                </div> */}
            </div>
        </header>
    )
}
