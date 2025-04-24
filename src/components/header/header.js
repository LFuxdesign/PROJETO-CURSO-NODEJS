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

    return (
        <header ref={refHeader} className={`flexCenter ${cpuThreads < 4 ? "noBlur" : ""}`}>
            <div className="container flex" style={{ justifyContent: "space-between", width: "100%", gap: "20px" }}>
                <div className="leftItems flexCenter">
                    <div>
                        <Link to={"/"}><h4 className="tituloCurso" style={{ fontSize: "18px" }} dangerouslySetInnerHTML={{ __html: Curso.tituloCurso }} /></Link>
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
