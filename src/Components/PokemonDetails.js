import React from 'react';

const PokemonDetails = ({ details, onAddToPokedex }) => {
  const baseUrl = '/images/pokemon/'; // Assurez-vous que cela correspond au chemin de votre répertoire d'images.

  return (
    <div>
      <p>Nom: {details.name}</p>
      <p>Numéro: {details.id}</p>
      <p>Types: {details.types.map((type) => type.type.name).join(', ')}</p>
      {/* Construisez l'URL de l'image en utilisant l'URL de base. */}
      <img src={baseUrl + details.sprites.front_default} alt={details.name} />
      <button onClick={() => onAddToPokedex(details)}>
        Ajouter au Pokédex
      </button>
    </div>
  );
};

export default PokemonDetails;