import { useEffect, useState, useCallback, useRef } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./App.css";

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
            {/* <Route exact path="/" Component={Home} />
            <Route exact path="/app" Component={Home} />
            <Route exact path="/nota" Component={Nota} />
            <Route exact path="/novanota" Component={Nota} />
            <Route exact path="/pasta" Component={HomePasta} />
            <Route exact path="/login" Component={Login} />
            <Route exact path="/registro" Component={Register} />
            <Route exact path="/termos" Component={Termos} /> */}
            {/* <Route exact path="*" Component={Pg404} /> */}
          </Routes>
        </div>
        {/* <Footer /> */}
    </>
  );
}

export default App;
