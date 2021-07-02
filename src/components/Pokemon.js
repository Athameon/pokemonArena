import "./Pokemon.css";
import React from "react";

const Pokemon = ({ pokemon }) => {
  return (
    <div>
      <h3 className="name">{pokemon.name.english}</h3>
      <div className="type">
        {pokemon.type.map((type) => (
          <div key={type}>{type}</div>
        ))}
      </div>
    </div>
  );
};

export default Pokemon;
