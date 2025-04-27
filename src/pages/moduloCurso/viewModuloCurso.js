import "./viewModuloCurso.css";

import Curso from "../../conteudo/curso.json"

import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Player from "../../components/player/player";
import { capFirstLetter, cleanHtml } from "../../scripts/scripts";
import Modal from "../../components/modal/modal";
import ImgWithText from "../../components/imgWithText/imgWithText";


export default function ViewModuloCurso({ content4website }) {
    const location = useLocation();
    const [searchParams] = useSearchParams(); // parametros url
    const navigate = useNavigate();

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
        return index >= 1 && index <= Curso.modulos[idModulo - 1].conteudos.sessoes.length;
    }


    function markAsViewed(moduloIndex, sessaoIndex) {
        if (
            moduloIndex >= 0 && moduloIndex < viewedModules.length &&
            sessaoIndex >= 0 && sessaoIndex < viewedModules[moduloIndex].sessoes.length
        ) {
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
    }
    useEffect(() => {
        if (moduloAtual) {
            const urlSectionId = parseInt(searchParams.get("s"));
            const validSectionId = isSectionIndexValid(urlSectionId) ? urlSectionId - 1 : 0;
            markAsViewed(idModulo - 1, validSectionId);
        }
        // eslint-disable-next-line
    }, [idModulo, moduloAtual, searchParams]);

    useEffect(() => {
        const newUrlModuleId = parseInt(searchParams.get("m") || 1);
        const validId = isModuleIndexValid(newUrlModuleId) ? newUrlModuleId : 1;
        setIdModulo(validId);
        setModuloAtual(Curso.modulos[validId - 1]);

        // eslint-disable-next-line
    }, [searchParams]);

    useEffect(() => {
        localStorage.setItem("viewedModules", JSON.stringify(viewedModules));
    }, [viewedModules]);

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

    const [modalAnimationController, setModalAnimationController] = useState(false);
    const [showModalController, setShowModalController] = useState(false);
    const [modalData, setModalData] = useState({ path: "", type: "" })

    function modalController(status, path, type) {
        if (path !== "" && type !== "") {
            setModalData({ path, type });

            setShowModalController(status)
            setModalAnimationController(true)
        }
    }

    function ExpandIcon({ path, type }) {
        return (
            <div onClick={() => modalController(true, path, type)} className={`expandIcon flexCenter transition ${type === "img" && "img"}`} title="Expandir">
                <svg width="25" height="25" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 100C1.34314 100 0 98.6569 0 97V60.1429C0 58.486 1.34315 57.1429 3 57.1429H11.2857C12.9426 57.1429 14.2857 58.486 14.2857 60.1429V82.7143C14.2857 84.3711 15.6289 85.7143 17.2857 85.7143H39.8571C41.514 85.7143 42.8571 87.0574 42.8571 88.7143V97C42.8571 98.6569 41.514 100 39.8571 100H3ZM88.7143 42.8571C87.0574 42.8571 85.7143 41.514 85.7143 39.8571V17.2857C85.7143 15.6289 84.3711 14.2857 82.7143 14.2857H60.1429C58.486 14.2857 57.1429 12.9426 57.1429 11.2857V3C57.1429 1.34315 58.486 0 60.1429 0H97C98.6569 0 100 1.34315 100 3V39.8571C100 41.514 98.6569 42.8571 97 42.8571H88.7143Z" fill="black" />
                </svg>
            </div>
        )
    }

    // useEffect que controla o estado do botão de avançar e voltar a cada renderização, alterando o estado inicial
    // que é desativado, isso é necessário para ativar somente o botão conveniente ao carregar a pagina
    const refBtnNext = useRef(null)
    const refBtnPrev = useRef(null)
    useEffect(() => {
        if (!content4website) return;

        const btnNext = refBtnNext.current;
        const btnPrev = refBtnPrev.current;
        const actualSectionId = parseInt(searchParams.get("s")) || 1;
        const actualModuleId = parseInt(searchParams.get("m")) || 1;
        const modulesLenght = Curso.modulos.length;
        const sectionsLength = Curso.modulos[actualModuleId - 1]?.conteudos.sessoes.length || 0;

        function deactivateButton(element, status) {
            if (!element) return;
            status ? element.classList.add("disabled") : element.classList.remove("disabled");
        }

        function checkOnload() {
            if (actualModuleId === 1 && actualSectionId === 1) {
                deactivateButton(btnNext, false);
            } else if (actualModuleId === modulesLenght && actualSectionId === sectionsLength) {
                deactivateButton(btnPrev, false);
            } else {
                deactivateButton(btnPrev, false);
                deactivateButton(btnNext, false);
            }
        }

        checkOnload();
    }, [content4website, refBtnNext, refBtnPrev, searchParams]);
    // useEffect que controla o estado do botão de avançar e voltar a cada renderização, alterando o estado inicial
    // que é desativado, isso é necessário para ativar somente o botão conveniente ao carregar a pagina



    const [showScrollToTopBtn, setShowScrollToTopBtn] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            window.scrollY > 200 ? setShowScrollToTopBtn(true) : setShowScrollToTopBtn(false);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="content4moodle moduloCurso flex flexColumn" >
            <div className={"scrollToTopBtn flexCenter" + (!showScrollToTopBtn ? " hide" : "")} title="Ir para o topo" onClick={() => { window.scrollTo(0, 0) }}>
                <svg width="34" height="18" viewBox="0 0 34 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 17L16.2929 1.70711C16.6834 1.31658 17.3166 1.31658 17.7071 1.70711L33 17" stroke="#212529" strokeWidth="2" strokeLinecap="round" />
                </svg>
            </div>
            {
                showModalController && <Modal path={modalData.path} type={modalData.type} className="entryAnimation" animationDelay={".5s"} showControl={modalAnimationController} showStatus={(status) => { setModalAnimationController(status); setTimeout(() => setShowModalController(status), 100) }} />
            }
            <section className="header entryAnimation opacityAni">
                {
                    !content4website && <div id="title">
                        <h1 dangerouslySetInnerHTML={{ __html: Curso.tituloCurso }} />
                    </div>
                }
            </section>
            <section className="content flex transition">
                <div className={"runningCourses flex flexColumn entryAnimation transition" + (location.pathname === "/view" ? " isOnViewPage" : "")}>
                    <span style={{ fontSize: "22px" }}>{moduloAtual.titulo}</span>
                    {
                        moduloAtual.conteudos.sessoes.map((sessao, index) => {
                            const moduloData = viewedModules[idModulo - 1];
                            const sessaoData = moduloData?.sessoes[index];
                            
                            
                            return (
                                location.pathname === "/view" ? <Link key={index} to={`/view?m=${idModulo}&s=${index + 1}`} onClick={() => window.scrollTo(0, 0)} title="Acessar">
                                    <div
                                        className="cardCurso flexCenter entryAnimation"
                                        style={{
                                            animationDuration: "1s",
                                            animationDelay: `${0.25 * (index + 1)}s`,
                                            background: sessao.highlightColor,
                                            filter: sessaoData?.viewed && animationTimeout ? "saturate(.9)" : undefined,
                                        }}
                                    >
                                        <div className="details">
                                            <h1 className="titulo" style={{ color: getContrastColor(sessao.highlightColor, "#fff") }}>
                                                {sessao.titulo}
                                            </h1>
                                            <span className="subTitulo" style={{ color: getContrastColor(sessao.highlightColor) }}>
                                                {sessao.descricao}
                                            </span>
                                        </div>
                                        <div className="info flex flexColumn" style={{ gap: "10px" }}>
                                            <p style={{ color: getContrastColor(sessao.highlightColor) }}>
                                                {sessaoData?.viewed ? "visto dia" : "não iniciado"}
                                            </p>
                                            <div className="dia flexCenter">
                                                {sessaoData?.timestamp ? (
                                                    <h1>{new Date(sessaoData.timestamp).getDate().toString().padStart(2, "0")}</h1>
                                                ) : (
                                                    <h1>-</h1>
                                                )}
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
                                </Link>
                                    : <div key={index} className="cardCurso flexCenter entryAnimation" style={{
                                        animationDuration: "1s",
                                        animationDelay: `${0.25 * (index + 1)}s`,
                                        background: sessao.highlightColor,
                                        filter: sessaoData?.viewed && animationTimeout ? "saturate(.9)" : undefined,
                                    }}
                                    >
                                        <div className="details">
                                            <h1 className="titulo" style={{ color: getContrastColor(sessao.highlightColor, "#fff") }}>
                                                {sessao.titulo}
                                            </h1>
                                            <span className="subTitulo" style={{ color: getContrastColor(sessao.highlightColor) }}>
                                                {sessao.descricao}
                                            </span>
                                        </div>
                                        <div className="info flex flexColumn" style={{ gap: "10px" }}>
                                            <p style={{ color: getContrastColor(sessao.highlightColor) }}>
                                                {sessaoData?.viewed ? "visto dia" : "não iniciado"}
                                            </p>
                                            <div className="dia flexCenter">
                                                {sessaoData?.timestamp ? (
                                                    <h1>{new Date(sessaoData.timestamp).getDate().toString().padStart(2, "0")}</h1>
                                                ) : (
                                                    <h1>-</h1>
                                                )}
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
                            );

                        })
                    }
                </div>
                {
                    (() => {
                        var urlSectionId = searchParams.get("s");
                        var sessao = isSectionIndexValid(parseInt(urlSectionId)) ? moduloAtual.conteudos.sessoes[parseInt(urlSectionId) - 1] : moduloAtual.conteudos.sessoes[0];
                        document.title = `${sessao.titulo} - ${Curso.urlTitle}`;
                        return (
                            <div className="conteudoSessao flexCenter flexColumn">
                                <div className="medias flex flexColumn transition">
                                    <div className={"infos flexCenter" + (expandOnDisclaimerHide ? " expand" : "")}>
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
                                                            {percent.toFixed(0) + (screenWidth >= 1080 || expandOnDisclaimerHide ? "% concluido" : "%")}
                                                        </span>
                                                        <span className="highlightText" style={{clipPath: (animationTimeout && percent - 12.9889 > 0) ? `inset(0 ${100 -percent}% 0 0)` : "0%"}}>
                                                            {percent.toFixed(0) + (screenWidth >= 1080 || expandOnDisclaimerHide ? "% concluido" : "%")}
                                                        </span>
                                                    </>
                                                )
                                            })()}
                                        </div>
                                    </div>
                                    {
                                        (() => {
                                            if (sessao.pathVideoSessao) {
                                                return (<>
                                                    <div className="media entryAnimation" style={{ animationDelay: ".25s"}}>
                                                        <ExpandIcon path={sessao.pathVideoSessao} type={"video"} />
                                                        <Player
                                                            videoPath={sessao.pathVideoSessao}
                                                            animationDelay={".7s"}
                                                        />
                                                    </div>
                                                </>)
                                            } else if (sessao.pathImgSessao.path) {
                                                return (<>
                                                    <div className="media entryAnimation flexCenter flexColumn" style={{ animationDelay: ".25s" }}>
                                                        <ExpandIcon path={sessao.pathImgSessao?.path} type={"img"} />
                                                        <ImgWithText classNam={"imgSessao"} isSectionImage={true} text={sessao.pathImgSessao.description} onClick={() => modalController(true, sessao.pathImgSessao.path, "img")} path={sessao.pathImgSessao.path} />
                                                    </div>
                                                </>)
                                            }
                                        })()
                                    }
                                </div>
                                <div className="textContent flex flexColumn entryAnimation transition" style={{ animationDelay: ".95s", animationDuration: "1s" }}>
                                    <h1 className="title">{capFirstLetter(sessao.titulo)}</h1>
                                    <div className="paragrafos">
                                        {sessao.paragrafos.map((paragrafo, index) => {
                                            return (
                                                <div key={index}>
                                                    {
                                                        paragrafo.subtitulo && <><br /><br /><h1 style={{ fontSize: "25px" }} className="useObserver" dangerouslySetInnerHTML={{ __html: capFirstLetter(cleanHtml(paragrafo.subtitulo)) }} /><br /></>
                                                    }
                                                    {
                                                        (() => {
                                                            if (paragrafo.pathVideoSuperior) {
                                                                return (<>
                                                                    <div className="media useObserver" >
                                                                        <ExpandIcon path={paragrafo.pathVideoSuperior} type={"video"} />
                                                                        <Player
                                                                            videoPath={paragrafo.pathVideoSuperior}
                                                                            animationDelay={".7s"}
                                                                        />
                                                                    </div>
                                                                </>)
                                                            } else if (paragrafo.pathImgSuperior?.path) {
                                                                return (<>
                                                                    <div className="media useObserver flexCenter flexColumn">
                                                                        <ExpandIcon path={paragrafo.pathImgSuperior.path} type={"img"} />
                                                                        <ImgWithText key={index} text={paragrafo.pathImgSuperior.description} onClick={() => modalController(true, paragrafo.pathImgSuperior.path, "img")} path={paragrafo.pathImgSuperior.path} />
                                                                    </div>
                                                                </>)
                                                            }
                                                        })()
                                                    }



                                                    <p key={index} className="useObserver textParagraph" dangerouslySetInnerHTML={{ __html: capFirstLetter(cleanHtml(paragrafo.texto)) }} /><br />



                                                    {
                                                        (() => {
                                                            if (paragrafo.pathVideoInferior) {
                                                                return (<>
                                                                    <div className="media useObserver" >
                                                                        <ExpandIcon path={paragrafo.pathVideoInferior} type={"video"} />
                                                                        <Player
                                                                            videoPath={paragrafo.pathVideoInferior}
                                                                            animationDelay={".7s"}
                                                                        />
                                                                    </div>
                                                                </>)
                                                            } else if (paragrafo.pathImgInferior?.path) {
                                                                return (<>
                                                                    <div className="media useObserver flexCenter flexColumn">
                                                                        <ExpandIcon path={paragrafo.pathImgInferior.path} type={"img"} />
                                                                        <ImgWithText key={index} text={paragrafo.pathImgInferior.description} onClick={() => modalController(true, paragrafo.pathImgInferior.path, "img")} path={paragrafo.pathImgInferior.path} />                                                                    </div>
                                                                </>)
                                                            }
                                                        })()
                                                    }
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                {
                                    content4website && (() => {
                                        const btnNext = refBtnNext.current;
                                        const btnPrev = refBtnPrev.current;
                                        const actualSectionId = parseInt(searchParams.get("s")) || 1;
                                        const actualModuleId = parseInt(searchParams.get("m")) || 1;
                                        const prevSectionId = actualSectionId - 1;
                                        const prevModuleId = actualModuleId - 1;
                                        const nextSectionId = actualSectionId + 1;
                                        const nextModuleId = actualModuleId + 1;
                                        const modulesLenght = Curso.modulos.length;
                                        const sectionsLength = Curso.modulos[actualModuleId - 1]?.conteudos.sessoes.length || 0;

                                        function checkUrlValidDataForPageControl() {
                                            return !(nextSectionId > sectionsLength + 1 || nextModuleId > modulesLenght + 1 || actualModuleId <= 0 || actualSectionId <= 0)
                                        }
                                        function deactivateButton(element, status) {
                                            status ? element.classList.add("disabled") : element.classList.remove("disabled")
                                        }

                                        function goToNextPage() {
                                            if (checkUrlValidDataForPageControl()) {
                                                if (actualModuleId === modulesLenght && sectionsLength === actualSectionId + 1) {
                                                    deactivateButton(btnNext, true)
                                                } else {
                                                    deactivateButton(btnNext, false)
                                                }

                                                if (isSectionIndexValid(nextSectionId)) {
                                                    window.scrollTo(0, 0)

                                                    navigate(`/view?m=${actualModuleId}&s=${nextSectionId}`)

                                                } else if (isModuleIndexValid(nextModuleId)) {
                                                    window.scrollTo(0, 0)

                                                    navigate(`/view?m=${nextModuleId}`)
                                                } else {
                                                    deactivateButton(btnNext, true)
                                                }
                                            } else {
                                                navigate(`/view?m=${1}&s=${2}`)
                                            }

                                        }
                                        function goToPrevPage() {
                                            if (checkUrlValidDataForPageControl()) {
                                                if (actualModuleId === 1 && actualSectionId === 2) {
                                                    deactivateButton(btnPrev, true)
                                                } else {
                                                    deactivateButton(btnPrev, false)
                                                }

                                                if (isSectionIndexValid(prevSectionId)) {

                                                    window.scrollTo(0, 0);

                                                    navigate(`/view?m=${actualModuleId}&s=${prevSectionId}`);

                                                } else if (isModuleIndexValid(prevModuleId)) {
                                                    const lastSessionIndex = Curso.modulos[prevModuleId - 1].conteudos.sessoes.length;

                                                    window.scrollTo(0, 0);

                                                    navigate(`/view?m=${prevModuleId}&s=${lastSessionIndex}`);
                                                } else {
                                                    deactivateButton(btnPrev, true)
                                                }
                                            } else {
                                                navigate(`/view?m=${1}&s=${1}`)
                                            }

                                        }
                                        return (
                                            <div className="pageControlButton flex useObserver">
                                                <div className="btn disabled flexCenter" ref={refBtnPrev} onClick={goToPrevPage}>
                                                    <svg style={{ transform: "rotate(-180deg)" }} width="54" height="31" viewBox="0 0 54 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M2 13.593C0.89543 13.593 -9.65645e-08 14.4884 0 15.593C9.65645e-08 16.6976 0.895431 17.593 2 17.593L2 13.593ZM53.4142 17.0072C54.1953 16.2262 54.1953 14.9598 53.4142 14.1788L40.6863 1.45088C39.9052 0.66983 38.6389 0.66983 37.8579 1.45088C37.0768 2.23193 37.0768 3.49826 37.8579 4.27931L49.1716 15.593L37.8579 26.9067C37.0768 27.6878 37.0768 28.9541 37.8579 29.7352C38.6389 30.5162 39.9052 30.5162 40.6863 29.7351L53.4142 17.0072ZM2 17.593L52 17.593L52 13.593L2 13.593L2 17.593Z" fill="white" />
                                                    </svg>
                                                    <span>Voltar</span>
                                                </div>
                                                <div className="btn disabled flexCenter" ref={refBtnNext} onClick={goToNextPage}>
                                                    <span>Avançar</span>
                                                    <svg width="54" height="31" viewBox="0 0 54 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M2 13.593C0.89543 13.593 -9.65645e-08 14.4884 0 15.593C9.65645e-08 16.6976 0.895431 17.593 2 17.593L2 13.593ZM53.4142 17.0072C54.1953 16.2262 54.1953 14.9598 53.4142 14.1788L40.6863 1.45088C39.9052 0.66983 38.6389 0.66983 37.8579 1.45088C37.0768 2.23193 37.0768 3.49826 37.8579 4.27931L49.1716 15.593L37.8579 26.9067C37.0768 27.6878 37.0768 28.9541 37.8579 29.7352C38.6389 30.5162 39.9052 30.5162 40.6863 29.7351L53.4142 17.0072ZM2 17.593L52 17.593L52 13.593L2 13.593L2 17.593Z" fill="white" />
                                                    </svg>
                                                </div>
                                            </div>
                                        )
                                    })()
                                }
                            </div>
                        );
                    })()
                }
            </section>
        </div>
    );
}