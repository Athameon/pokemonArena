import "./PokeInfo.css";
import React, { useEffect, useState } from "react";
import BaseInfo from "./BaseInfo";

const PokeInfo = ({ activePokemon }) => {
  const [pokeInfo, setPokeInfo] = useState(null);

  useEffect(() => {
    if (activePokemon) {
      fetch(
        "https://pokeapi.co/api/v2/pokemon/" +
          activePokemon.baseInfo.name.english.toLowerCase()
      )
        .then((data) => {
          if (data.ok) {
            return data.json();
          }
          throw new Error("Failed to load the pokemon extended info");
        })
        .then((jsonData) => {
          setPokeInfo(jsonData);
        })
        .catch((error) => {
          console.error(error);
          setPokeInfo(null);
        });
    }
  }, [activePokemon]);

  if (activePokemon) {
    return (
      <div className="pokeInfo">
        <div className="image">
          {pokeInfo ? (
            <img src={pokeInfo.sprites.front_default} alt="pokemon" />
          ) : (
            <p>No Image available</p>
          )}
        </div>
        <div className="pokeData">
          <p>Name: {activePokemon && activePokemon.baseInfo.name.english}</p>
          <p>
            <span>Type: </span>
            {activePokemon &&
              activePokemon.baseInfo.type.map((type) => (
                <span key={type}>{type}</span>
              ))}
          </p>
          {activePokemon && <BaseInfo baseInfo={activePokemon.baseInfo.base} />}
        </div>
      </div>
    );
  } else {
    return <p className="pokeInfo"></p>;
  }
};

export default PokeInfo;
