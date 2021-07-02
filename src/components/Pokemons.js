import "./Pokemons.css";
import React from "react";
import Pokemon from "./Pokemon";

const Pokemons = ({ pokemons, player, setPokemon }) => {
  return (
    <div className="PomemonList">
      {shuffle(pokemons).map((pokemon) => (
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

function shuffle(array) {
  var currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export default Pokemons;
