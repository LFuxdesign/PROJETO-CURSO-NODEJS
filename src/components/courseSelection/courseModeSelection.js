import { useEffect, useRef, useState } from "react";
import Button from "../buttons/buttons";
import { CloseModalBtn } from "../modal/closeModalBtn";
import "./courseModeSelection.css";

export default function CourseModeSelection({showControl, showStatus}) {
    const refModal = useRef(null);
    const [show, setShow] = useState(showControl);
    useEffect(()=>{
        setShow(showControl)
    }, [showControl])

    useEffect(()=>{
        setTimeout(() => {
            refModal?.current?.classList.add("entry")
        }, 50);
        
    })
    function close(){
        setShow(false); setTimeout(() => showStatus(false), 500)
    }
    if (show) {
        document.querySelector("body").style.overflow = "hidden";
    } else {
        document.querySelector("body").style.overflow = "";
    }
    return (
        <div ref={refModal} className={`modeSelection flexCenter transition ${!show ? "outAnimation": ""}`}>
            <CloseModalBtn action={()=>close()} className={"entryAnimation"} animationDelay={ `${.25*4}s`}/>
            <div id="closeActionArea" onClick={close} />
            <div className="container flexCenter entryAnimation transition" style={{animationDelay: `${.25*1}s`}}>
                <h1 className="title entryAnimation" style={{animationDelay: `${.25*2}s`, fontSize: "x-large"}}>Como você deseja realizar esse curso?</h1>
                <div className="cardsOptions flexCenter entryAnimation" style={{animationDelay: `${.25*3}s`}}>
                    <div className="card">
                        <div className="content flexCenter">
                            <div className="img" style={{background: "rgb(255 153 0 / 46%)"}} alt=""/>
                            <h2 style={{fontSize: "large"}}>Moodle Cursos IC - UFMT</h2>
                            <span>Plataforma de cursos online do IC-UFMT, você poderá realizar este e outros cursos da plataforma</span>
                            <Button 
                                buttonText={"Acessar portal"}
                                isLink={true}
                                linkAddr={"https://moodlecursos.ic.ufmt.br/enrol/index.php?id=25"}
                                width={"100%"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}