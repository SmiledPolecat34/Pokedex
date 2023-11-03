import React from 'react';
import { Link } from 'react-router-dom';
import './Css/HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="header">
        {/* <h1>Bienvenue dans le Monde Pokémon</h1> */}
        <img src='./Css/pokemon3.png'/> 
      </div>
      <div className="content">
  <p>Partez à l'aventure, capturez des Pokémon, combattez des dresseurs et devenez le meilleur dresseur de tous les temps !</p>
  <Link to="/pokemon-list"> {/* Lien vers la liste de Pokémon */}
    <button>Commencer l'aventure</button>
  </Link>
</div>

    <div className='containerImage'>
    <div className='imageAykiu' > </div>
    <div className='imageFranklin' > </div>
    </div>
    </div>
  );
};

export default HomePage;
