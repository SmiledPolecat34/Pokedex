import React, { useState } from 'react';
import './Css/PokemonList.css';

const PokemonList = ({ addToPokedex }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [nextPage, setNextPage] = useState('https://pokeapi.co/api/v2/pokemon/');
  const [selectedPokemonDetails, setSelectedPokemonDetails] = useState(null);

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
    return parts[parts.length - 2]; // The ID is the second-to-last part in the URL.
  };

  const handleAddToPokedex = async (pokemonUrl) => {
    const pokemonDetails = await fetchPokemonDetails(pokemonUrl);
    if (pokemonDetails) {
      addToPokedex(pokemonDetails);
      alert("Le Pokémon a bien été ajouté au Pokédex");
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
            <button onClick={async () => {
              const details = await fetchPokemonDetails(pokemon.url);
              handleAddToPokedex(pokemon.url);
            }}>
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
