import "./viewModuloCurso.css";

import Curso from "../../conteudo/curso.json"

import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";


export default function ViewModuloCurso() {
    const [searchParams] = useSearchParams(); // parametros url

    const [idModulo, setIdModulo] = useState(() => {
        const urlId = parseInt(searchParams.get("modulo"));
        return isValidIndex(urlId) && urlId >= 1 ? urlId : 1; // Validando se o índice é válido, caso contrário, ajusta para 1
    });

    const [viewedModules, setViewedModules] = useState(() => {
        const LSViewedModules = localStorage.getItem("viewedModules");
        const parsedModules = JSON.parse(LSViewedModules);

        if (LSViewedModules && Array.isArray(parsedModules) && parsedModules.length === Curso.modulos.length) {
            return parsedModules;
        }

        return Array(Curso.modulos.length).fill({ viewed: false, timestamp: null });
    });

    const [moduloAtual, setModuloAtual] = useState(Curso.modulos[idModulo - 1]);

    function isValidIndex(index) {
        return index >= 1 && index <= Curso.modulos.length;
    }

    function markAsViewed(index) {
        const newViewedModules = [...viewedModules];
        const timestamp = Date.now();

        if (!newViewedModules[index].viewed) {
            newViewedModules[index] = { viewed: true, timestamp };
            setViewedModules(newViewedModules);
            localStorage.setItem("viewedModules", JSON.stringify(newViewedModules));
        }
    }

    useEffect(() => {
        setModuloAtual(Curso.modulos[idModulo - 1]);
        markAsViewed(idModulo - 1);
        // eslint-disable-next-line
    }, [idModulo]);

    useEffect(() => {
        const newId = parseInt(searchParams.get("modulo"));
        const validId = isValidIndex(newId) ? newId : 1;
        setIdModulo(validId);
    }, [searchParams]);

    return (
        <div className="content4moodle moduloCurso">
            <section className="header">
                <div id="title">
                    <h1 dangerouslySetInnerHTML={{ __html: Curso.tituloCurso }} />
                </div>
            </section>
            <section className="content">
                <div className="runningCourses">
                    {
                        Curso.modulos.map((modulo, index) => {
                            return (
                                <div key={index} className="cardCurso" style={{ background: modulo.colors.highlight }}>
                                    <div className="details">
                                        <h1 className="titulo">{modulo.titulo}</h1>
                                        <span className="subTitulo">{modulo.descricao}</span>
                                    </div>
                                    <div className="info">
                                        <span>{viewedModules[index].viewed ? "iniciado dia" : "não iniciado"}</span>
                                        <div className="dia">
                                            {
                                                (() => {
                                                    if (viewedModules[index].timestamp) {
                                                        const viewedDate = new Date(viewedModules[index].timestamp);
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
                                                if (viewedModules[index].timestamp) {
                                                    const viewedDate = new Date(viewedModules[index].timestamp);
                                                    const viewedDay = viewedDate.getDate().toString().padStart(2, '0');
                                                    const viewedMonth = (viewedDate.getMonth() + 1).toString().padStart(2, '0');
                                                    const viewedYear = viewedDate.getFullYear().toString().slice(-2);
                                                    return (
                                                        <span>
                                                            {viewedDay + "/" + viewedMonth + "/" + viewedYear}
                                                        </span>
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
