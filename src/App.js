import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import c4mSobre from "./pages/iframe4moodle/sobre/c4mSobre";
import "./App.css";
import c4mModulosResumo from "./pages/iframe4moodle/modulos/c4mModulosResumo";

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
            <Route exact path="/c4m/sobre" Component={c4mSobre} />
            <Route exact path="/c4m/modulosResumo" Component={c4mModulosResumo} />
            
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
