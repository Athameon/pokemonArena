import "./Header.css";
import React from "react";
import PokeInfo from "./PokeInfo";
import { Link } from "react-router-dom";

const Header = ({ activePokemons, firstTrainer, secondTrainer, rounds }) => {
  const trainerOneWins = rounds.filter(
    (round) => round.winner === firstTrainer._id
  );
  const trainerTwoWins = rounds.filter(
    (round) => round.winner === secondTrainer._id
  );
  return (
    <div className="header">
      <div className="topHeader">
        <div className="player firstPlayer">
          <h2 className="playerName firstPlayerBackground">
            {firstTrainer.name}
          </h2>
          <h2 className="firstPlayerBackground point">
            {trainerOneWins.map(() => (
              <span key={Math.random()}>X</span>
            ))}
          </h2>
        </div>

        <Link to="/">
          <h1>Pokemon Arena of Würzburg</h1>
        </Link>
        <div className="player secondPlayer">
          <h2 className="secondPlayerBackground point">
            {trainerTwoWins.map(() => (
              <span key={Math.random()}>X</span>
            ))}
          </h2>
          <h2 className="playerName secondPlayerBackground">
            {secondTrainer.name}
          </h2>
        </div>
      </div>
      <div className="pokeWrapper">
        <PokeInfo activePokemon={activePokemons[1]} />
        <PokeInfo activePokemon={activePokemons[2]} />
      </div>
    </div>
  );
};

export default Header;
