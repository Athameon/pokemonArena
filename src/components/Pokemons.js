import "./Pokemons.css";
import React from "react";
import Pokemon from "./Pokemon";

const Pokemons = ({ pokemons, player, setPokemon }) => {
  return (
    <div className="PomemonList">
      {pokemons.map((pokemon) => (
        <div
          onClick={() => setPokemon(player, pokemon.id)}
          className={player == "1" ? "Pokemon red" : "Pokemon green"}
          key={pokemon.id}
        >
          <Pokemon pokemon={pokemon} />
        </div>
      ))}
    </div>
  );
};

export default Pokemons;
