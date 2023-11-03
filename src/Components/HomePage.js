import React from 'react';
import { Link } from 'react-router-dom';
import './Css/HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="header">
        <h1>Bienvenue dans le Monde Pokémon</h1>
      </div>
      <div className="content">
  <p>Partez à l'aventure, capturez des Pokémon, combattez des dresseurs et devenez le meilleur dresseur de tous les temps !</p>
  <Link to="/pokemon-list"> {/* Lien vers la liste de Pokémon */}
    <button>Commencer l'aventure</button>
  </Link>
</div>
    </div>
  );
};

export default HomePage;
