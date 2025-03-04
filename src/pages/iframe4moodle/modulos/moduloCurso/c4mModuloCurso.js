import "./c4mModuloCurso.css";
import "../../c4m.css"

import Curso from "../../../../conteudo/curso.json"

import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";


export default function C4mModuloCurso() {
    const [searchParams] = useSearchParams(); // parametros url

    const [idModulo, setIdModulo] = useState(() => {
        const urlId = parseInt(searchParams.get("id"));
        return isValidIndex(urlId) && urlId >= 1 ? urlId : 1; // Validando se o índice é válido, caso contrário, ajusta para 1
    });

    const [viewedModules, setViewedModules] = useState(() => {
        const LSViewedModules = localStorage.getItem("viewedModules");
        return LSViewedModules ? JSON.parse(LSViewedModules) : Array(Curso.modulos.length).fill(false);
    });

    const [moduloAtual, setModuloAtual] = useState(Curso.modulos[idModulo - 1]);

    function isValidIndex(index) {
        return index >= 1 && index <= Curso.modulos.length;
    }

    function markAsViewed(index) {
        const newViewedModules = [...viewedModules];
        newViewedModules[index] = true;
        setViewedModules(newViewedModules);
        localStorage.setItem("viewedModules", JSON.stringify(newViewedModules));
    }

    useEffect(() => {
        setModuloAtual(Curso.modulos[idModulo - 1]);
        markAsViewed(idModulo - 1);
        // eslint-disable-next-line
    }, [idModulo]);

    useEffect(() => {
        const newId = parseInt(searchParams.get("id"));
        const validId = isValidIndex(newId) ? newId : 1;
        setIdModulo(validId);
    }, [searchParams]);

    return (
        <div className="content4moodle moduloCurso flexCenter">
            <section className="header">
                <div id="title">
                    <h1 dangerouslySetInnerHTML={{ __html: Curso.tituloCurso }} />
                </div>
            </section>
            <div className="cursesList">
                {
                    <div className="card flexCenter flexColumn">
                        <div className="cardHeader flexCenter">
                            <h1 className="num" style={{ color: moduloAtual.colors.main }}>{idModulo}.</h1>
                            <h1 className="titulo" style={{ fontSize: (moduloAtual.titulo).split(" ")[1].length < 11 ? "17px" : "14px" }}> {moduloAtual.titulo} </h1>
                        </div>
                        <span className="descricao"> {moduloAtual.descricao} </span>
                    </div>
                }
            </div>
        </div>
    );
}
