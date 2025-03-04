import "./viewModuloCurso.css";

import Curso from "../../conteudo/curso.json"

import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player/lazy";


export default function ViewModuloCurso() {
    const [searchParams] = useSearchParams(); // parametros url

    const [idModulo, setIdModulo] = useState(() => {
        const urlModuleId = parseInt(searchParams.get("modulo"));
        return isValidIndex(urlModuleId) && urlModuleId >= 1 ? urlModuleId : 1; // Validando se o índice é válido, caso contrário, ajusta para 1
    });

    const [viewedModules, setViewedModules] = useState(() => {
        const LSViewedModules = localStorage.getItem("viewedModules");
        const parsedModules = JSON.parse(LSViewedModules);

        if (LSViewedModules && Array.isArray(parsedModules) && parsedModules.length === Curso.modulos.length) {
            return parsedModules;
        }

        return Curso.modulos.map(modulo => ({
            sessoes: modulo.conteudos.sessoes.map(() => ({
                viewed: false,
                timestamp: null,
            }))
        }));
    });

    const [moduloAtual, setModuloAtual] = useState(Curso.modulos[idModulo - 1]);

    function isValidIndex(index) {
        return index >= 1 && index <= Curso.modulos.length;
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
        const urlSectionId = parseInt(searchParams.get("sessao")) >= 1 ? parseInt(searchParams.get("sessao")) - 1 : 0;
        setModuloAtual(Curso.modulos[idModulo - 1]);
        markAsViewed(idModulo - 1, urlSectionId);
        // eslint-disable-next-line
    }, [idModulo]);

    useEffect(() => {
        const newUrlModuleId = parseInt(searchParams.get("modulo"));
        const validId = isValidIndex(newUrlModuleId) ? newUrlModuleId : 1;
        setIdModulo(validId);
    }, [searchParams]);



    useEffect(() => {
        setTimeout(() => {
            document.addEventListener("DOMContentLoaded", function () {
                // Seleciona todos os elementos <video> na página
                const videos = document.querySelectorAll("video");

                videos.forEach((video) => {
                    // Remove o atributo "controlsList" para evitar que o usuário baixe o vídeo
                    video.setAttribute("controlsList", "nodownload");

                    // Bloqueia o botão direito apenas no vídeo
                    video.addEventListener("contextmenu", (e) => e.preventDefault());

                    // Intercepta e remove atalhos de desenvolvedor
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


    return (
        <div className="content4moodle moduloCurso flex flexColumn">
            <section className="header">
                <div id="title">
                    <h1 dangerouslySetInnerHTML={{ __html: Curso.tituloCurso }} />
                </div>
            </section>
            <section className="content flex">
                <div className="runningCourses flex flexColumn">
                    <span style={{ fontSize: "22px" }}>{moduloAtual.titulo}</span>
                    {
                        moduloAtual.conteudos.sessoes.map((sessao, index) => {
                            const sessaoAtual = moduloAtual.conteudos.sessoes[index];
                            return (
                                <div key={index} className="cardCurso flexCenter" style={{ background: sessaoAtual.highlightColor }}>
                                    <div className="details">
                                        <h1 className="titulo" style={{ color: getContrastColor(sessaoAtual.highlightColor, "#fff") }}>{sessao.titulo}</h1>
                                        <span className="subTitulo" style={{ color: getContrastColor(sessaoAtual.highlightColor) }}>{sessao.descricao}</span>
                                    </div>
                                    <div className="info flex flexColumn" style={{ gap: "10px" }}>
                                        <p style={{ color: getContrastColor(sessaoAtual.highlightColor) }}>{viewedModules[idModulo - 1].sessoes[index].viewed ? "iniciado dia" : "não iniciado"}</p>
                                        <div className="dia flexCenter">
                                            {
                                                (() => {
                                                    if (viewedModules[idModulo - 1].sessoes[index].timestamp) {
                                                        const viewedDate = new Date(viewedModules[idModulo - 1].sessoes[index].timestamp);
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
                                                if (viewedModules[idModulo - 1].sessoes[index].timestamp) {
                                                    const viewedDate = new Date(viewedModules[idModulo - 1].sessoes[index].timestamp);
                                                    const viewedDay = viewedDate.getDate().toString().padStart(2, '0');
                                                    const viewedMonth = (viewedDate.getMonth() + 1).toString().padStart(2, '0');
                                                    const viewedYear = viewedDate.getFullYear().toString().slice(-2);
                                                    return (
                                                        <p style={{ color: getContrastColor(sessaoAtual.highlightColor) }}>
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
                <div className="conteudoSessao flexCenter flexColumn">
                    {(() => {
                        if (moduloAtual.conteudos.sessoes[0].pathVideoSessao) {
                            return (
                                <ReactPlayer
                                    id="videoSessao"
                                    url={moduloAtual.conteudos.sessoes[0].pathVideoSessao}
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
                    })()
                    }

                </div>
            </section>
            {/* <div className="cursesList">
                {
                    <div className="card">
                        <div className="cardHeader">
                            <h1 className="num" style={{ color: moduloAtual.colors.main }}>{idModulo}.</h1>
                            <h1 className="titulo" style={{ fontSize: (moduloAtual.titulo).split(" ")[1].length < 11 ? "17px" : "14px" }}> {moduloAtual.titulo} </h1>
                        </div>
                        <span className="descricao"> {moduloAtual.descricao} </span>
                    </div>
                }
            </div> */}
        </div>
    );
}
