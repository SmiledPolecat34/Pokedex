import React from 'react';
import { Link } from 'react-router-dom';
import './Css/HomePage.css';

const HomePage = () => {
  return (
    <div className='textAccueil'>
    <div className='imageAccueil'> </div>
    <div className="home-page">
      <div className="header">
        {/* <h1>Bienvenue dans le Monde Pokémon</h1> */}
      </div>
      <div className="content">
  <Link to="/pokemon-list"> {/* Lien vers la liste de Pokémon */}
    <button>Commencer l'aventure !</button>
  </Link>
</div>

    <div className='containerImage'>
    <div className='imageAykiu' > </div>
    <div className='imageFranklin' > </div>
    </div>
    </div>
    </div>
  );
};

export default HomePage;
