import "./PokeInfo.css";
import React, { useState } from "react";
import BaseInfo from "./BaseInfo";

const PokeInfo = ({ activePokemon }) => {
  const [pokeInfo, setPokeInfo] = useState(null);
  console.log(activePokemon);
  // console.log("activePokemon", activePokemon.name.english);

  if (activePokemon) {
    return (
      <div className="pokeInfo">
        <div className="image">
          <img
            src={
              activePokemon &&
              activePokemon.extendedInfo &&
              activePokemon.extendedInfo.sprites.front_default
            }
            alt="pokemon"
          />
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
