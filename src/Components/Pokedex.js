import React from 'react';
const Pokedex = ({ pokedex, removeFromPokedex, clearPokedex }) => {
  return (
    <div>
      <h1>Mon Pokédex</h1>
      <button onClick={clearPokedex}>Vider le Pokédex</button>
      <ul>
        {pokedex.map((pokemon, index) => (
          <li key={index}>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} alt={pokemon.name} />
            {pokemon.name} - <button onClick={() => removeFromPokedex(pokemon)}>Libérer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pokedex;
