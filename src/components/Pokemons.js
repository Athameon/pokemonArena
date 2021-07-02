import "./Pokemons.css";
import React, { useState } from "react";
import Pokemon from "./Pokemon";

const Pokemons = ({ pokemons, player, setPokemon, activePokemonInherit }) => {
  const [activePokemon, setActivePokemon] = useState(null);
  const selectedPokemon = (pokemon) => {
    setPokemon(player, pokemon.id);
    setActivePokemon(pokemon.id);
  };
  return (
    <div className="PomemonList">
      {pokemons.map((pokemon) => (
        <div
          onClick={() => selectedPokemon(pokemon)}
          className={`Pokemon ${player == "1" ? "red" : "green"} ${
            activePokemonInherit && activePokemon == pokemon.id && "active"
          }`}
          key={pokemon.id}
        >
          <Pokemon pokemon={pokemon} />
        </div>
      ))}
    </div>
  );
};

export default Pokemons;
