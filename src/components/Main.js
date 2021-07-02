import "./Main.css";
import React from "react";
import Pokemens from "./Pokemons";

const Main = ({ pokemons, setPokemon, playGame }) => {
  return (
    <div>
      <div className="Arena">
        <div className="FirstPlayer Player">
          <Pokemens pokemons={pokemons} player="1" setPokemon={setPokemon} />
        </div>
        <div className="SecondPlayer Player">
          <Pokemens pokemons={pokemons} player="2" setPokemon={setPokemon} />
        </div>
      </div>
    </div>
  );
};

export default Main;
