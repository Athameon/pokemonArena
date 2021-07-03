import "./App.css";
import { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import Fight from "./components/Fight";
import Arena from "./components/Arena";
import PreArena from "./components/PreArena";

function App() {
  const [playerOnePokemons, setPlayerOnePokemons] = useState([]);
  const [playerTwoPokemons, setPlayerTwoPokemons] = useState([]);
  const [activePokemons, setActivePokemons] = useState({ 1: null, 2: null });

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const shufflePokemons = () => {
    setPlayerOnePokemons(shuffle(playerOnePokemons));
    setPlayerTwoPokemons(shuffle(playerTwoPokemons));
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
        setPlayerOnePokemons(shuffle([...jsonResult]));
        setPlayerTwoPokemons(shuffle([...jsonResult]));
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);
      });
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route path="/arena">
          <Arena
            playerOnePokemons={playerOnePokemons}
            playerTwoPokemons={playerTwoPokemons}
            shufflePokemons={shufflePokemons}
          />
        </Route>
        <Route path="/">
          <PreArena />
        </Route>
      </Switch>
    </div>
  );
}

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

export default App;
