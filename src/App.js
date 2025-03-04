import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import C4mSobre from "./pages/iframe4moodle/sobre/c4mSobre";
import "./App.css";
import C4mDescricaoResumo from "./pages/iframe4moodle/descricaoResumo/c4mDescricaoResumo";
import C4mModuloCurso from "./pages/iframe4moodle/modulos/moduloCurso/c4mModuloCurso";


function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
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
    }, 2000);

    return () => clearTimeout(counter);
  }, [location]);

  return (
    <> 
        <div id="main">
          <Routes>
            <Route exact path="/c4m/sobre" Component={C4mSobre} />
            <Route exact path="/c4m/descricaoResumo" Component={C4mDescricaoResumo} />
            <Route exact path="/c4m/moduloCurso" Component={C4mModuloCurso} />

            {/* <Route exact path="/" Component={Home} />
            <Route exact path="/app" Component={Home} />
            */}
          </Routes>
        </div>
        {/* <Footer /> */}
    </>
  );
}

export default App;
