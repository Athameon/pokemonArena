import "./Fight.css";
import React from "react";

const Fight = ({ activePokemons }) => {
  console.log("activePokemons", activePokemons);
  return (
    <div className="fight">
      <h1>The fight is going on...</h1>
    </div>
  );
};

export default Fight;
