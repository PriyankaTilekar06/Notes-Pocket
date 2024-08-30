import { useEffect, useState } from "react";
import "./App.css";
import DesktopView from "./pages/Desktopview";
import MobileView from "./pages/MobileView";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "./context/PocketContext";
import usePocketContext from "./hooks/useContextPocket";

function App() {
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const { selected, setSelected } = usePocketContext();

  useEffect(() => {
    setSelected(localStorage.getItem("selected") || "");

    const checkScreenSize = () => {
      setScreenSize(window.innerWidth);
    };

    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, [setSelected]);

  useEffect(() => {
    console.log("Selected value:", selected); 
  }, [selected]);

  return (
    <Provider>
      <div className="App">
        {screenSize > 500 ? (
          <DesktopView selected={selected} /> 
        ) : (
          <Router>
            <Routes>
              <Route path="/" element={<DesktopView selected={selected} />} />
              <Route path="/notes" element={<MobileView />} />
            </Routes>
          </Router>
        )}
      </div>
    </Provider>
  );
}

export default App;