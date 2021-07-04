import { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import Fight from "./Fight";

const Arena = ({
  playerOnePokemons,
  playerTwoPokemons,
  shufflePokemons,
  firstTrainer,
  secondTrainer,
}) => {
  const [activePokemons, setActivePokemons] = useState({ 1: null, 2: null });
  const [rounds, setRounds] = useState([]); //[ { winner: trainerId, pokemonOneId, pokemonTwoId}, { winner: trainerId, pokemonOneId, pokemonTwoId}, ...]

  const setPokemon = async (player, pokemonId) => {
    console.log("Player: " + player, "Pokemon: " + pokemonId);
    if (player == 1) {
      const baseInformation = playerOnePokemons.find(
        (pokemon) => pokemon.id == pokemonId
      );
      const extendedInformation = await getExtendedInfo(baseInformation);
      setActivePokemons((oldState) => ({
        1: {
          baseInfo: baseInformation,
          extendedInfo: extendedInformation,
        },
        2: oldState[2],
      }));
    } else {
      const baseInformation = playerTwoPokemons.find(
        (pokemon) => pokemon.id == pokemonId
      );
      const extendedInformation = await getExtendedInfo(baseInformation);
      setActivePokemons((oldState) => ({
        1: oldState[1],
        2: {
          baseInfo: baseInformation,
          extendedInfo: extendedInformation,
        },
      }));
    }
  };

  const getExtendedInfo = async (pokemon) => {
    try {
      const data = await fetch(
        "https://pokeapi.co/api/v2/pokemon/" +
          pokemon.name.english.toLowerCase()
      );
      const jsonData = await data.json();

      return jsonData;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const playGame = () => {
    console.log(activePokemons);
    if (!activePokemons || !activePokemons["1"] || !activePokemons["2"]) {
      console.error("Please select two pokemons for the fight.");
      alert("Select both Pokemons to fight.");
    } else {
      const winner = Math.random() > 0.5 ? 1 : 2;
      setActivePokemons({ 1: null, 2: null });

      setRounds((prev) => [
        ...prev,
        {
          winner: winner === 1 ? firstTrainer._id : secondTrainer._id,
          "Player One Pokemon": activePokemons["1"].baseInfo.id,
          "Player Two Pokemon": activePokemons["2"].baseInfo.id,
        },
      ]);

      alert(
        `${
          winner === 1 ? firstTrainer.name : secondTrainer.name
        } won this fight with ${
          winner === 1
            ? activePokemons["1"].baseInfo.name.english
            : activePokemons["2"].baseInfo.name.english
        }`
      );

      if (
        rounds.filter((round) => round.winner === firstTrainer._id).length >=
          2 &&
        winner === 1
      ) {
        alert(`Game Over: ${firstTrainer.name} won!`);
      } else if (
        rounds.filter((round) => round.winner === secondTrainer._id).length >=
          2 &&
        winner === 2
      ) {
        alert(`Game Over: ${secondTrainer.name} won!`);
      }

      console.log(rounds);

      shufflePokemons();
    }
  };

  if (!firstTrainer || !secondTrainer) {
    return <Redirect to="/" />;
  } else {
    return (
      <>
        <Header
          activePokemons={activePokemons}
          firstTrainer={firstTrainer}
          secondTrainer={secondTrainer}
          rounds={rounds}
        />
        <Switch>
          <Route path="/arena/fight">
            <Fight activePokemons={activePokemons} />
          </Route>
          <Route path="/arena/">
            <Main
              playerOnePokemons={playerOnePokemons}
              playerTwoPokemons={playerTwoPokemons}
              activePokemons={activePokemons}
              setPokemon={setPokemon}
            />
          </Route>
        </Switch>
        <Footer playGame={playGame} />
      </>
    );
  }
};

export default Arena;
