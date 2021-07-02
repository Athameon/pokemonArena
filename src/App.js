import "./App.css";
import { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [activePokemons, setActivePokemons] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const setPokemon = (player, pokemonId) => {
    console.log("Player: " + player, "Pokemon: " + pokemonId);
    setActivePokemons((oldState) => ({
      ...oldState,
      [player]: pokemonId,
    }));
  };

  const playGame = () => {
    console.log(activePokemons);
    if (!activePokemons || !activePokemons["1"] || !activePokemons["2"]) {
      console.error("Please select two pokemons for the fight.");
      alert("Select both Pokemons to fight.");
    } else {
      const winner = Math.random() > 0.5 ? 1 : 2;
      setActivePokemons(null);
      alert(`Player ${winner} won this game!`);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    fetch("https://bennoss-pokemon.herokuapp.com/pokemon/")
      .then(
        (result) => {
          if (result.ok) {
            return result.json();
          }
          throw Error("Failed to load the data.");
        },
        (error) => {
          throw Error("Network Error." + error);
        }
      )
      .then((jsonResult) => {
        setPokemons(jsonResult);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);
      });
  }, []);

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/">
          <Main pokemons={pokemons} setPokemon={setPokemon} />
        </Route>
      </Switch>
      <Footer playGame={playGame} />
    </div>
  );
}

export default App;
