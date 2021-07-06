import { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "./Header";
import ArenaFooter from "./ArenaFooter";
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
  const [foughtPokemonFirstTrainer, setFoughtPokemonFirstTrainer] = useState(
    []
  );
  const [foughtPokemonSecondTrainer, setFoughtPokemonSecondTrainer] = useState(
    []
  );

  const setPokemon = async (player, pokemonId) => {
    console.log("Player: " + player, "Pokemon: " + pokemonId);
    if (player == 1) {
      const baseInformation = playerOnePokemons.find(
        (pokemon) => pokemon.id == pokemonId
      );
      const newPokemon = {
        baseInfo: baseInformation,
      };
      setFoughtPokemonFirstTrainer((prev) => [...prev, newPokemon]);
      setActivePokemons((oldState) => ({
        1: newPokemon,
        2: oldState[2],
      }));
    } else {
      const baseInformation = playerTwoPokemons.find(
        (pokemon) => pokemon.id == pokemonId
      );
      const newPokemon = {
        baseInfo: baseInformation,
      };
      setFoughtPokemonSecondTrainer((prev) => [...prev, newPokemon]);
      setActivePokemons((oldState) => ({
        1: oldState[1],
        2: newPokemon,
      }));
    }
  };

  const storeResult = (winnerTrainer) => {
    fetch("https://bennoss-pokemon.herokuapp.com/fight/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dateTime: new Date().toUTCString(),
        firstFighter: firstTrainer._id,
        secondFighter: secondTrainer._id,
        winner: winnerTrainer._id,
        pokemonFirstFighter: foughtPokemonFirstTrainer.map(
          (pokemon) => pokemon.baseInfo.id
        ),
        pokemonSecondFighter: foughtPokemonSecondTrainer.map(
          (pokemon) => pokemon.baseInfo.id
        ),
      }),
    })
      .then(
        (result) => {
          if (result.ok) {
            return result.json();
          }
          throw Error("Failed to store the result of the fight.");
        },
        (error) => {
          throw Error("Network Error." + error);
        }
      )
      .then((jsonResult) => {
        // console.log(jsonResult);
        // setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to store the fight result on the server.");
        // setIsLoading(false);
        // setIsError(true);
      });
  };

  const playGame = () => {
    console.log(activePokemons);
    if (!activePokemons || !activePokemons["1"] || !activePokemons["2"]) {
      console.error("Please select two pokemons for the fight.");
      alert("Select both Pokemons to fight.");
    } else {
      const winner = Math.random() > 0.5 ? 1 : 2;
      const looser = winner === 1 ? 2 : 1;

      setActivePokemons((oldState) => ({
        ...oldState,
        [looser]: null,
      }));

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
        storeResult(firstTrainer);
        alert(`Game Over: ${firstTrainer.name} won!`);
      } else if (
        rounds.filter((round) => round.winner === secondTrainer._id).length >=
          2 &&
        winner === 2
      ) {
        storeResult(secondTrainer);
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
        <ArenaFooter playGame={playGame} />
      </>
    );
  }
};

export default Arena;
