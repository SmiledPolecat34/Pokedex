import React, { useState, useEffect } from 'react';
import './Css/PokemonList.css';
import PokemonStats from './PokemonStats';

const PokemonList = ({ addToPokedex }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [sortBy, setSortBy] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');
  const [pokemonToShowStats, setPokemonToShowStats] = useState(null);

  const getPokemonIdFromUrl = (url) => {
    const parts = url.split('/');
    return parts[parts.length - 2];
  };

  const handleShowStats = async (pokemonUrl) => {
    try {
      // Construisez l'URL pour obtenir les statistiques
      const statsUrl = `https://pokeapi.co/api/v2/pokemon/${getPokemonIdFromUrl(pokemonUrl)}`;

      // Utilisez l'URL pour obtenir les statistiques
      const statsResponse = await fetch(statsUrl);
      const statsData = await statsResponse.json();

      console.log(statsData); // Vous pouvez accéder aux statistiques ici

      setPokemonToShowStats(statsData);
    } catch (error) {
      console.error('Error fetching Pokemon stats:', error);
    }
  };

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=1100');
        const data = await response.json();
        setPokemonList(data.results);
      } catch (error) {
        console.error('Error fetching Pokemon list:', error);
      }
    };

    fetchPokemonList();
  }, []);

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

  const searchPokemon = (pokemon) => {
    return (
      pokemon.name.toLowerCase().includes(searchText.toLowerCase()) ||
      pokemon.url.includes(searchText)
    );
  };

  const sortPokemon = (a, b) => {
    if (sortBy === 'id') {
      return sortOrder === 'asc'
        ? getPokemonIdFromUrl(a.url) - getPokemonIdFromUrl(b.url)
        : getPokemonIdFromUrl(b.url) - getPokemonIdFromUrl(a.url);
    // } else if (sortBy === 'type') {
    //   const typeA = a.types[0].type.name;
    //   const typeB = b.types[0].type.name;
    //   return sortOrder === 'asc' ? typeA.localeCompare(typeB) : typeB.localeCompare(typeA);
    } else if (sortBy === 'name') {
      const nameA = a.name;
      const nameB = b.name;
      return sortOrder === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    }
  };

  const handleAddToPokedex = async (pokemonUrl) => {
    const pokemonDetails = await fetchPokemonDetails(pokemonUrl);
    if (pokemonDetails) {
      const types = pokemonDetails.types.map((typeData) => typeData.type.name);
      pokemonDetails.types = types;
      addToPokedex(pokemonDetails);
      let message = `${pokemonDetails.name} ${types} a bien été ajouté au Pokédex !`;
      alert(message);
    }
  };

  return (
    <div>
      <h1>Liste de Pokémons</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Rechercher par nom ou ID"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <label>
          Trier par :
          <select onChange={(e) => setSortBy(e.target.value)}>
            <option value="id">ID</option>
            <option value="name">Nom</option>
          </select>
        </label>
        <label>
          Ordre :
          <select onChange={(e) => setSortOrder(e.target.value)}>
            <option value="asc">Ascendant</option>
            <option value="desc">Descendant</option>
          </select>
        </label>
      </div>
      <ul>
        {pokemonList
          .filter((pokemon) => searchPokemon(pokemon))
          .sort(sortPokemon)
          .map((pokemon, index) => (
            <p key={index}>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPokemonIdFromUrl(pokemon.url)}.png`}
                alt={pokemon.name}
              />
              {pokemon.name} (n°{getPokemonIdFromUrl(pokemon.url)}) -
              <button onClick={() => handleAddToPokedex(pokemon.url)}>
                Ajouter au Pokédex
              </button>
              <button onClick={() => handleShowStats(pokemon.url)}>Voir les statistiques</button>
            </p>
          ))}
      </ul>
      {pokemonToShowStats && <PokemonStats statsUrl={pokemonToShowStats} />}
    </div>
  );
};

export default PokemonList;
