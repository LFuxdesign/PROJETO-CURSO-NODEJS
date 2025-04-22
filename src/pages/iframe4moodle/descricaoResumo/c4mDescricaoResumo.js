import "./c4mDescricaoResumo.css";
import "../c4m.css"

import Curso from "../../../conteudo/curso.json"


export default function C4mDescricaoResumo() {
    document.title = Curso.urlTitle;
    return (
        <div className="content4moodle modulosResumo flexCenter transition">
            <div className="content flex flexColumn">
                <div id="cta">
                    <div id="title" className="entryAnimation">
                        <h1 dangerouslySetInnerHTML={{ __html: Curso.tituloCurso }} />

                    </div>
                    <div id="subtitle" className="entryAnimation" style={{animationDelay: ".25s"}}>
                        <h2>
                            {Curso.descricao}
                        </h2>
                    </div>
                </div>
            </div>
            <div className="gridCards entryAnimation">
                {
                    Curso.modulos.map((modulo, index) => {
                        return (
                            <div key={index} className="card flexCenter flexColumn entryAnimation" style={{animationDelay: (.10 * (index+1) + "s")}}>
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
        </div>
    );
}
