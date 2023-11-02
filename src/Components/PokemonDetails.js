import React from 'react';

const PokemonDetails = ({ details, onAddToPokedex }) => {
  const baseUrl = '/images/pokemon/';

  return (
    <div>
      <p>Nom: {details.name}</p>
      <p>Numéro: {details.id}</p>
      <p>Types: {details.types.map((type) => type.type.name).join(', ')}</p>
      <img src={baseUrl + details.sprites.front_default} alt={details.name} />
      <button onClick={() => onAddToPokedex(details)}>
        Ajouter au Pokédex
      </button>
    </div>
  );
};

export default PokemonDetails;