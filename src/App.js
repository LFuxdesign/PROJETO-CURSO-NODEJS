import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Sobre from "./pages/sobre/Sobre";
import "./App.css";
import C4mDescricaoResumo from "./pages/iframe4moodle/descricaoResumo/c4mDescricaoResumo";
import ViewModuloCurso from "./pages/moduloCurso/viewModuloCurso";
import Footer from "./components/footer/footer";
import { useIntersectionObserver } from "./scripts/scripts";
import Header from "./components/header/header";


function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  useIntersectionObserver({ threshold: 0.1, });
  const location = useLocation();
  useEffect(() => {
    const counter = setTimeout(() => {
      try {
        document.querySelectorAll(".entryAnimation").forEach((e) => {
          e.style.animationDelay = "";
        });
      } catch (error) {
        console.warn(
          "erro ao limpar delay da animação de entrada dos elementos"
        );
      }
    }, 10000);

    return () => clearTimeout(counter);
  }, [location]);


  const [windowSize, setWindowSize] = useState([]);
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  const [showHeader, setShowHeader] = useState(false)
  const pathsToShowHeader = [
    "/view",
    "/moduloCurso",
    "/viewModuloCurso"
  ]

  useEffect(()=>{
    if(pathsToShowHeader.includes(location.pathname)) {
      setShowHeader(true)
    }else{
      setShowHeader(false)
    }
    
  // eslint-disable-next-line
  }, [location.pathname])

  return (
    <>
      <div id="main">
        { showHeader && <Header windowSize={windowSize} />}
        <Routes>
          {/*Rotas normais para acesso em site*/}
          <Route exact path="/" element={<Sobre content4website={true} />} />
          <Route exact path="/view" element={<ViewModuloCurso content4website={true} />} />

          {/*Rotas para Iframe Moodle*/}
          <Route exact path="/c4m/sobre" Component={Sobre} />
          <Route exact path="/c4m/descricaoResumo" Component={C4mDescricaoResumo} />
          <Route exact path="/c4m/moduloCurso" Component={ViewModuloCurso} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
