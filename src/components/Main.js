import "./Main.css";
import React from "react";
import Pokemens from "./Pokemons";

const Main = ({
  playerOnePokemons,
  playerTwoPokemons,
  activePokemons,
  setPokemon,
}) => {
  return (
    <div>
      <div className="Arena">
        <div className="FirstPlayer Player">
          <Pokemens
            pokemons={playerOnePokemons}
            player="1"
            setPokemon={setPokemon}
            activePokemonInherit={activePokemons[1]}
          />
        </div>
        <div className="SecondPlayer Player">
          <Pokemens
            pokemons={playerTwoPokemons}
            player="2"
            setPokemon={setPokemon}
            activePokemonInherit={activePokemons[2]}
          />
        </div>
      </div>
    </div>
  );
};

export default Main;
