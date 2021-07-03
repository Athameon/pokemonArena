import { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import Fight from "./Fight";

const Arena = ({ playerOnePokemons, playerTwoPokemons, shufflePokemons }) => {
  const [activePokemons, setActivePokemons] = useState({ 1: null, 2: null });

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
      alert(`Player ${winner} won this game!`);
      shufflePokemons();
    }
  };

  return (
    <>
      <Header activePokemons={activePokemons} />
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
};

export default Arena;
