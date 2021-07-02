import "./Header.css";
import React from "react";
import PokeInfo from "./PokeInfo";

const Header = ({ activePokemons }) => {
  return (
    <div className="header">
      <h1>Pokemon Arena of Würzburg</h1>
      <div className="pokeWrapper">
        <PokeInfo activePokemon={activePokemons[1]} />
        <PokeInfo activePokemon={activePokemons[2]} />
      </div>
    </div>
  );
};

export default Header;
