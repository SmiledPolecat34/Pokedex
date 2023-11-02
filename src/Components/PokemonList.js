import React, { useState } from 'react';

const PokemonList = ({ addToPokedex }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [nextPage, setNextPage] = useState('https://pokeapi.co/api/v2/pokemon/');

  const fetchPokemonList = async () => {
    try {
      const response = await fetch(nextPage);
      const data = await response.json();
      setPokemonList((prevList) => [...prevList, ...data.results]);
      setNextPage(data.next);
    } catch (error) {
      console.error('Error fetching Pokemon list:', error);
    }
  };

  const fetchPokemonDetails = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Pokemon details:', error);
      return null;
    }
  };

  const getPokemonIdFromUrl = (url) => {
    const parts = url.split('/');
    return parts[parts.length - 2];
  };

  const handleAddToPokedex = async (pokemonUrl) => {
    const pokemonDetails = await fetchPokemonDetails(pokemonUrl);
    if (pokemonDetails) {
      // Récupérez les types du Pokémon
      const types = pokemonDetails.types.map((typeData) => typeData.type.name);
      pokemonDetails.types = types;

      addToPokedex(pokemonDetails);
      let message = `${pokemonDetails.name} ${types} a bien été ajouté au Pokédex !`;
      alert(message);
    }
  };

  const loadMorePokemon = () => {
    fetchPokemonList();
  };

  return (
    <div>
      <h1>Liste de Pokémons</h1>
      <ul>
        {pokemonList.map((pokemon, index) => (
          <li key={index}>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPokemonIdFromUrl(pokemon.url)}.png`} alt={pokemon.name} />
            {pokemon.name} (n°{getPokemonIdFromUrl(pokemon.url)}) -
            {/* code de la Var du Type du Pokemon */}
            (type(s)) - 
            

            <button onClick={() => handleAddToPokedex(pokemon.url)}>
              Ajouter au Pokédex
            </button>
          </li>
        ))}
      </ul>
      {nextPage && (
        <button onClick={loadMorePokemon}>Page suivante</button>
      )}
    </div>
  );
};

export default PokemonList;
