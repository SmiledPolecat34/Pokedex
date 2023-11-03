import React, { useState, useEffect } from 'react';

const PokemonStats = ({ statsUrl }) => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchPokemonStats = async () => {
      try {
        const response = await fetch(statsUrl);
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching Pokemon stats:', error);
      }
    };

    fetchPokemonStats();
  }, [statsUrl]);

  if (!stats) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Statistiques du Pokémon</h2>
      <ul>
        {stats.stats.map((stat) => (
          <li key={stat.stat.name}>
            {stat.stat.name}: {stat.base_stat}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonStats;
