import { useEffect } from "react";
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


function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  useIntersectionObserver({ threshold: 0.05,});
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

  return (
    <> 
        <div id="main">
          <Routes>
            <Route exact path="/" element={<Sobre content4HomePage={true} />} />
            <Route exact path="/c4m/sobre" Component={Sobre} />
            <Route exact path="/c4m/descricaoResumo" Component={C4mDescricaoResumo} />
            <Route exact path="/moduloCurso" Component={ViewModuloCurso} />
            <Route exact path="/c4m/moduloCurso" Component={ViewModuloCurso} />
          </Routes>
        </div>
        <Footer />
    </>
  );
}

export default App;
