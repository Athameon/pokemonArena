import "./Header.css";
import React from "react";
import PokeInfo from "./PokeInfo";
import { Link } from "react-router-dom";

const Header = ({ activePokemons, firstTrainer, secondTrainer }) => {
  return (
    <div className="header">
      <div className="topHeader">
        <h2 className="player firstPlayer">{firstTrainer.name}</h2>
        <Link to="/">
          <h1>Pokemon Arena of Würzburg</h1>
        </Link>
        <h2 className="player secondPlayer">{secondTrainer.name}</h2>
      </div>
      <div className="pokeWrapper">
        <PokeInfo activePokemon={activePokemons[1]} />
        <PokeInfo activePokemon={activePokemons[2]} />
      </div>
    </div>
  );
};

export default Header;
