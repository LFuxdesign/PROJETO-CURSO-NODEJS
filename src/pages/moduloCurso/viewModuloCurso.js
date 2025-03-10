import "./viewModuloCurso.css";

import Curso from "../../conteudo/curso.json"

import { useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Player from "../../components/player";


export default function ViewModuloCurso() {
    const [searchParams] = useSearchParams(); // parametros url

    const [idModulo, setIdModulo] = useState(() => {
        const urlModuleId = parseInt(searchParams.get("m"));
        return isModuleIndexValid(urlModuleId) && urlModuleId >= 1 ? urlModuleId : 1; // Validando se o índice é válido, caso contrário, ajusta para 1
    });

    const [viewedModules, setViewedModules] = useState(() => {
        const LSViewedModules = localStorage.getItem("viewedModules");
        const parsedModules = LSViewedModules ? JSON.parse(LSViewedModules) : [];

        // Verifica se o número de módulos e sessões é igual entre o localStorage e o JSON
        if (
            parsedModules.length !== Curso.modulos.length || // Checa se o número de módulos é diferente
            parsedModules.some((modulo, index) => {
                return modulo.sessoes.length !== Curso.modulos[index].conteudos.sessoes.length; // Checa se o número de sessões é diferente
            })
        ) {
            // Se a estrutura não coincidir, recria a estrutura com o número de módulos e sessões corretos
            return Curso.modulos.map(modulo => ({
                sessoes: modulo.conteudos.sessoes.map(() => ({
                    viewed: false,
                    timestamp: null,
                }))
            }));
        }

        // Caso a estrutura seja válida, retorna a estrutura do localStorage
        return parsedModules;
    });


    const [moduloAtual, setModuloAtual] = useState(Curso.modulos[idModulo - 1]);

    function isModuleIndexValid(index) {
        return index >= 1 && index <= Curso.modulos.length;
    }

    function isSectionIndexValid(index) {
        return index >= 1 && index <= moduloAtual.conteudos.sessoes.length;
    }


    function markAsViewed(moduloIndex, sessaoIndex) {
        const newViewedModules = [...viewedModules];
        const timestamp = Date.now();

        if (!newViewedModules[moduloIndex].sessoes[sessaoIndex].viewed) {

            newViewedModules[moduloIndex].sessoes[sessaoIndex] = {
                viewed: true,
                timestamp: timestamp,
            };

            setViewedModules(newViewedModules);
            localStorage.setItem("viewedModules", JSON.stringify(newViewedModules));
        }
    }

    useEffect(() => {
        const urlSectionId = isSectionIndexValid(parseInt(searchParams.get("s"))) ? parseInt(searchParams.get("s")) - 1 : 0;

        setModuloAtual(Curso.modulos[idModulo - 1]);
        markAsViewed(idModulo - 1, urlSectionId);
        // eslint-disable-next-line
    }, [idModulo]);

    useEffect(() => {
        const newUrlModuleId = parseInt(searchParams.get("m"));
        const validId = isModuleIndexValid(newUrlModuleId) ? newUrlModuleId : 1;
        setIdModulo(validId);
    }, [searchParams]);



    useEffect(() => {
        setTimeout(() => {
            document.addEventListener("DOMContentLoaded", function () {
                const videos = document.querySelectorAll("video");

                videos.forEach((video) => {
                    video.setAttribute("controlsList", "nodownload");

                    video.addEventListener("contextmenu", (e) => e.preventDefault());

                    window.addEventListener("keydown", (e) => {
                        if (
                            e.ctrlKey &&
                            (e.key === "s" || e.key === "S" || e.key === "u" || e.key === "U" || e.key === "i" || e.key === "I" || e.key === "j" || e.key === "J")
                        ) {
                            e.preventDefault();
                        }
                    });
                });
            });
        }, 500);
    }, [])


    function getContrastColor(hexaBackgroundColor, whiteTarget = "rgba(255,255,255,.85)") { //ajustar para contraste de no minimo 4,5:1
        hexaBackgroundColor = hexaBackgroundColor.replace("#", "");
        let r = parseInt(hexaBackgroundColor.substring(0, 2), 16);
        let g = parseInt(hexaBackgroundColor.substring(2, 4), 16);
        let b = parseInt(hexaBackgroundColor.substring(4, 6), 16);

        let brightness = (r * 299 + g * 587 + b * 114) / 1000;

        return brightness > 128 ? "#000" : whiteTarget; // Se for claro, retorna preto, se for escuro, retorna branco
    }

    const [animationTimeout, setAnimationTimeout] = useState(false);

    setTimeout(() => {
        setAnimationTimeout(true)
    }, 50);

    const [screenWidth, setScreenWidth] = useState(window.innerWidth)

    useEffect(() => {
        const atualizarLargura = () => setScreenWidth(window.innerWidth);

        window.addEventListener("resize", atualizarLargura);

        return () => window.removeEventListener("resize", atualizarLargura);
    }, []);


    const refDisclaimer = useRef();
    const [expandOnDisclaimerHide, setExpandOnDisclaimerHide] = useState(false);
    const [firstRender, setFirstRender] = useState(true);

    useEffect(() => {

    }, [])

    useEffect(() => {
        if (firstRender) {
            setFirstRender(false)
            setTimeout(() => {
                refDisclaimer?.current?.classList.add("disclaimerOutAnimation")
                setTimeout(() => {
                    refDisclaimer?.current?.classList.add("disclaimerHide")
                }, 50);
                if (screenWidth <= 500) {
                    setExpandOnDisclaimerHide(true)
                } else {
                    setExpandOnDisclaimerHide(false)
                }
            }, 10000);
        } else {
            refDisclaimer?.current?.classList.add("disclaimerOutAnimation")
            setTimeout(() => {
                refDisclaimer?.current?.classList.add("disclaimerHide")
            }, 50);
            if (screenWidth <= 500) {
                setExpandOnDisclaimerHide(true)
            } else {
                setExpandOnDisclaimerHide(false)
            }
        }
        // eslint-disable-next-line
    }, [screenWidth])

    useEffect(() => {
        setTimeout(() => {
            if (screenWidth <= 500) {
                setExpandOnDisclaimerHide(true)
            } else {
                setExpandOnDisclaimerHide(false)
            }
        }, 10000);
        // eslint-disable-next-line
    }, [])

    return (
        <div className="content4moodle moduloCurso flex flexColumn" >
            <section className="header entryAnimation opacityAni">
                <div id="title">
                    <h1 dangerouslySetInnerHTML={{ __html: Curso.tituloCurso }} />
                </div>
            </section>
            <section className="content flex transition">
                <div className="runningCourses flex flexColumn entryAnimation transition">
                    <span style={{ fontSize: "22px" }}>{moduloAtual.titulo}</span>
                    {
                        moduloAtual.conteudos.sessoes.map((sessao, index) => {
                            return (
                                <div key={index} className="cardCurso flexCenter entryAnimation" style={{ animationDuration: "1s", animationDelay: (.25 * (index + 1) + "s"), background: sessao.highlightColor, filter: (viewedModules[idModulo - 1].sessoes[index].viewed && animationTimeout) && "saturate(.9)" }}>
                                    <div className="details">
                                        <h1 className="titulo" style={{ color: getContrastColor(sessao.highlightColor, "#fff") }}>{sessao.titulo}</h1>
                                        <span className="subTitulo" style={{ color: getContrastColor(sessao.highlightColor) }}>{sessao.descricao}</span>
                                    </div>
                                    <div className="info flex flexColumn" style={{ gap: "10px" }}>
                                        <p style={{ color: getContrastColor(sessao.highlightColor) }}>{viewedModules[idModulo - 1].sessoes[index].viewed ? "visto dia" : "não iniciado"}</p>
                                        <div className="dia flexCenter">
                                            {
                                                (() => {
                                                    const timestamp = viewedModules[idModulo - 1].sessoes[index].timestamp
                                                    if (timestamp) {
                                                        const viewedDate = new Date(timestamp);
                                                        const viewedDay = viewedDate.getDate().toString().padStart(2, '0');
                                                        return (
                                                            <h1>
                                                                {viewedDay}
                                                            </h1>
                                                        );
                                                    }
                                                    return (<h1>-</h1>)
                                                })()
                                            }
                                        </div>
                                        {
                                            (() => {
                                                const sectionDataViewed = viewedModules[idModulo - 1].sessoes[index];
                                                if (sectionDataViewed.timestamp) {
                                                    const viewedDate = new Date(sectionDataViewed.timestamp);
                                                    const viewedDay = viewedDate.getDate().toString().padStart(2, '0');
                                                    const viewedMonth = (viewedDate.getMonth() + 1).toString().padStart(2, '0');
                                                    const viewedYear = viewedDate.getFullYear().toString().slice(-2);
                                                    return (
                                                        <p style={{ color: getContrastColor(sessao.highlightColor) }}>
                                                            {viewedDay + "/" + viewedMonth + "/" + viewedYear}
                                                        </p>
                                                    );
                                                }
                                            })()
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                {
                    (() => {
                        var urlSectionId = searchParams.get("s");
                        var sessao = isSectionIndexValid(parseInt(urlSectionId)) ? moduloAtual.conteudos.sessoes[parseInt(urlSectionId) - 1] : moduloAtual.conteudos.sessoes[0];

                        return (
                            <div className="conteudoSessao flexCenter flexColumn">
                                <div className="medias flex flexColumn transition">
                                    <div className="infos flexCenter">
                                        <div className="disclaimer flexCenter entryAnimation transition" ref={refDisclaimer}>
                                            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="10" cy="10.5" r="10" fill="#FF9D00" />
                                                <path d="M10.0013 14.5C9.84 14.5 9.70433 14.4487 9.59433 14.346C9.49167 14.236 9.44033 14.1003 9.44033 13.939V9.044C9.44033 8.87533 9.49167 8.73967 9.59433 8.637C9.70433 8.53433 9.84 8.483 10.0013 8.483C10.17 8.483 10.3057 8.53433 10.4083 8.637C10.511 8.73967 10.5623 8.87533 10.5623 9.044V13.939C10.5623 14.1003 10.511 14.236 10.4083 14.346C10.3057 14.4487 10.17 14.5 10.0013 14.5ZM10.0013 7.504C9.80333 7.504 9.631 7.43433 9.48433 7.295C9.345 7.14833 9.27533 6.976 9.27533 6.778C9.27533 6.58 9.345 6.41133 9.48433 6.272C9.631 6.12533 9.80333 6.052 10.0013 6.052C10.1993 6.052 10.368 6.12533 10.5073 6.272C10.654 6.41133 10.7273 6.58 10.7273 6.778C10.7273 6.976 10.654 7.14833 10.5073 7.295C10.368 7.43433 10.1993 7.504 10.0013 7.504Z" fill="white" />
                                            </svg>

                                            <span>as informações de progresso são armazenadas  localmente no seu navegador somente para indicação, limpeza de cache do navegador ou historico irão apagar essas informações mas, se você ja finalizou o modulo no moodle, esta tudo certo!</span>
                                        </div>
                                        <div className={"progressbar entryAnimation transition" + (expandOnDisclaimerHide ? " expand" : "")} style={{ animationDelay: ".25s" }}>
                                            {(() => {
                                                let totalSessoes = 0;
                                                let viewedCount = 0;

                                                viewedModules.forEach(modulos => {
                                                    modulos.sessoes.forEach(sessao => {
                                                        totalSessoes++;
                                                        if (sessao.viewed) {
                                                            viewedCount++;
                                                        }
                                                    });
                                                });

                                                const percent = (viewedCount / totalSessoes) * 100
                                                return (
                                                    <>
                                                        <div style={{ width: animationTimeout && percent + "%" }} className="highlightProgressBar" />
                                                        <span>
                                                            {(percent.toFixed(2) % 1 !== 0 ? percent.toFixed(2) : percent.toFixed(0)) + (screenWidth >= 1080 || expandOnDisclaimerHide ? "% concluido" : "%")}
                                                        </span>
                                                    </>
                                                )
                                            })()}
                                        </div>
                                    </div>
                                    {sessao.pathVideoSessao ? (
                                        <Player
                                            videoPath={sessao.pathVideoSessao}
                                            animationDelay={".7s"}
                                        />
                                    ) : sessao.pathImgSessao ? <img className="imgSessao" src={sessao.pathImgSessao} alt="" /> : null}
                                </div>
                                <div className="textContent flex flexColumn entryAnimation transition" style={{ animationDelay: ".95s", animationDuration: "1s" }}>
                                    <h1 className="title">{sessao.titulo}</h1>
                                    <div className="paragrafos">
                                        {sessao.paragrafos.map((paragrafo) => {
                                            return (
                                                <>
                                                    {paragrafo.pathVideoSuperior ? (<>
                                                        <Player
                                                            videoPath={sessao.pathVideoSuperior}
                                                            animationDelay={".7s"}
                                                        />
                                                        <br /><br />
                                                    </>) : paragrafo.pathImgSuperior ? <><img className="imgSessao" src={paragrafo.pathImgSuperior} style={{ maxHeight: "unset!important" }} alt="" /><br /><br /></> : null}



                                                    <p>{paragrafo.texto}</p><br />



                                                    {paragrafo.pathVideoInferior ? (<>
                                                        <Player
                                                            videoPath={sessao.pathVideoInferior}
                                                            animationDelay={".7s"}
                                                        />
                                                        <br /><br />
                                                    </>) : paragrafo.pathImgInferior ? <><img className="imgSessao" src={paragrafo.pathImgInferior} style={{ maxHeight: "unset!important" }} alt="" /><br /></> : null}
                                                </>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        );
                    })()
                }


            </section>
        </div>
    );
}
