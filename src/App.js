import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import PokemonList from './Components/PokemonList';
import Pokedex from './Components/Pokedex';

function App() {
  const [pokedex, setPokedex] = useState([]);

  const addToPokedex = (pokemon) => {
    setPokedex([...pokedex, pokemon]);
  };

  const removeFromPokedex = (pokemon) => {
    setPokedex(pokedex.filter((p) => p !== pokemon));
  };

  const clearPokedex = () => {
    setPokedex([]);
  };

  return (
    <div className="App">
      <Router>
        <nav>
          <ul>
            <>
              <Link to="/pokemon-list">Liste Pokémons</Link>
            </>
            <>
              <Link to="/pokedex">Mon Pokédex</Link>
            </>
          </ul>
        </nav>

        <Routes>
          <Route
            path="/pokemon-list"
            element={<PokemonList addToPokedex={addToPokedex} />}
          />
          <Route
            path="/pokedex"
            element={<Pokedex pokedex={pokedex} removeFromPokedex={removeFromPokedex} clearPokedex={clearPokedex} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
