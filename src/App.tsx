import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CharacterProvider } from "./context/character-context";
import CharacterList from "./components/CharacterList/CharacterList";
import CharacterDetails from "./components/CharacterDetails/CharacterDetails";
import "./styles/styles.css";

const App: React.FC = () => {
  return (
    <Router>
      <CharacterProvider>
        <Routes>
          <Route path="/" element={<CharacterList />} />
          <Route path="/character/:id" element={<CharacterDetails />} />
        </Routes>
      </CharacterProvider>
    </Router>
  );
};

export default App;
