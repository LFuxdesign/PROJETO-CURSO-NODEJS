import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import "./404.css";
import Button from "../../../components/buttons/buttons";
import { useState } from "react";

export default function NotFoundPage() {
    const [dotLottie, setDotLottie] = useState(null);

  const dotLottieRefCallback = (dotLottie) => {
    setDotLottie(dotLottie);
  };

    return (
        <div className="notFoundPage flexCenter flexColumn entryAnimation" style={{animationDelay: .25*1 + "s"}}>
            <div className="flexCenter" style={{height: "250px", overflow: "hidden", maxWidth: "90vw", marginTop: "40px"}}>
                <DotLottieReact
                    src="/assets/lottie/404.lottie"
                    speed={2}
                    style={{ width: "400px", height: "400px",transform: "translateZ(0)", willChange: "transform, transition" }}
                    loop
                    autoplay
                    renderConfig={{
                        autoResize: true
                    }}
                />
            </div>

            <div className="flexCenter flexColumn entryAnimation" style={{ gap: "20px", maxWidth: "90vw", animationDelay: .25*2 + "s" }}>
                <h1>Página não encontrada</h1>
                
                <Button className="button" width={"100%"} background="#11324d" isLink linkAddr={"/"} buttonText={"Voltar para o inicio"} />
            </div>

            <span id="span" className="entryAnimation opacityAni" style={{animationDelay: .25*4+ "s"}}>Essa página saiu pra dar uma volta... ou foi o gato que tirou ela do ar. Vai saber.</span>

            <div className="containerAni flexCenter entryAnimation" style={{animationDelay: .25*3 + "s"}}>
            <DotLottieReact
                    src="/assets/lottie/404 sec.lottie"
                    speed={1.5}
                    width={"100%"}
                    height={"100%"}
                    style={{ width: "100%", height: "100%", transform: "translateZ(0)", willChange: "transform, transition" }}
                    loop
                    autoplay
                    onMouseEnter={()=>dotLottie?.pause()}
                    onMouseLeave={()=>dotLottie?.play()}
                    dotLottieRefCallback={dotLottieRefCallback}
                    renderConfig={{
                        autoResize: true
                    }}
                />
            </div>
        </div>
    );
}