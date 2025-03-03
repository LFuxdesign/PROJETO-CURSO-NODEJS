import "./c4mModulosResumo.css";
import "../c4m.css"

import Curso from "../../../conteudo/curso.json"


export default function c4mDescricaoResumo() {
    return (
        <div className="content4moodle modulosResumo flexCenter">
            <div className="content flex flexColumn">
                <div id="cta">
                    <div id="title">
                        <h1 dangerouslySetInnerHTML={{ __html: Curso.tituloCurso }} />

                    </div>
                    <div id="subtitle">
                        <h2>
                            {Curso.descricao}
                        </h2>
                    </div>
                    <a href="https://moodlecursos.ic.ufmt.br/course/view.php?id=25#section-1" target="_top" className="btnLink linkDesk">
                        <div className="flexCenter">
                            <span>Iniciar</span>
                        </div>
                    </a>
                </div>
            </div>
            <div className="gridCards">
                {
                    Curso.modulos.map((modulo, index) => {
                        return (
                            <div className="card flexCenter flexColumn">
                                <div className="cardHeader flexCenter">
                                    <h1 className="num" style={{ color: modulo.colors.main }}>{index + 1}.</h1>
                                    <h1 className="titulo" style={{ fontSize: (modulo.titulo).split(" ")[1].length < 11 ? "17px" : "14px" }}> {modulo.titulo} </h1>
                                </div>
                                <span className="descricao"> {modulo.descricao} </span>
                            </div>
                        )
                    })
                }
            </div>
            <a href="https://moodlecursos.ic.ufmt.br/course/view.php?id=25#section-1" target="_top" className="btnLink linkMobile flexCenter">
                <div className="flexCenter">
                    <span>Iniciar</span>
                </div>
            </a>
        </div>
    );
}
