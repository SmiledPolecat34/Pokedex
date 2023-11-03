import React from 'react';
import './Css/PokemonList.css';

const Pokedex = ({ pokedex, removeFromPokedex, clearPokedex }) => {
  
  if(!localStorage.getItem('pokedex')) {
    localStorage.setItem('pokedex', JSON.stringify([]));
  }


  const [searchText, setSearchText] = useState(''); // État pour la valeur de recherche

  // Fonction de recherche pour filtrer les Pokémon par nom ou ID
  const searchPokemon = (pokemon) => {
    return (
      pokemon.name.toLowerCase().includes(searchText.toLowerCase()) ||
      pokemon.id.toString().includes(searchText)
    );
  };

  return (
    <div className="container">
      <h1 className="header">Mon Pokédex</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Rechercher par nom ou ID"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <button className="button" onClick={clearPokedex}>Vider le Pokédex</button>
      <ul>
        {pokedex
          .filter((pokemon) => searchPokemon(pokemon)) // Filtrer les Pokémon en fonction de la recherche
          .map((pokemon, index) => (
            <li key={index}>
              <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} alt={pokemon.name} />
              {pokemon.name} - Type(s): {pokemon.types.join(', ')}
              <button onClick={() => removeFromPokedex(pokemon)}>Libérer</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Pokedex;
