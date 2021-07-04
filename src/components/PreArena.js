import "./PreArena.css";
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

const PreArena = ({
  trainers,
  setTrainers,
  setFirstTrainer,
  setSecondTrainer,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  console.log(trainers);

  const setTrainer = (event) => {
    if (event.target.id === "firstTrainer") {
      const firstTrainer = trainers.find(
        (trainer) => trainer._id === event.target.value
      );
      console.log(firstTrainer);
      setFirstTrainer(firstTrainer);
    } else {
      const secondTrainer = trainers.find(
        (trainer) => trainer._id === event.target.value
      );
      setSecondTrainer(secondTrainer);
    }
  };

  const createNewTrainer = (event) => {
    event.preventDefault();
    const newTrainerName = event.target[0].value;
    console.log(newTrainerName);

    fetch("https://bennoss-pokemon.herokuapp.com/trainer/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newTrainerName }),
    })
      .then(
        (result) => {
          if (result.ok) {
            return result.json();
          }
          throw Error("Failed to create a new trainer");
        },
        (error) => {
          throw Error("Network Error." + error);
        }
      )
      .then((jsonResult) => {
        setTrainers((prev) => [...prev, jsonResult]);
        console.log(jsonResult);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);
      });
  };

  return (
    <div>
      <h1>Welcome to the Arena of Würzburg</h1>
      <h2>Please Select your Trainers:</h2>
      <div>
        <h3>First Trainer:</h3>
        <select onChange={setTrainer} name="firstTrainer" id="firstTrainer">
          <option value="-">-</option>
          {trainers &&
            trainers.map((trainer) => {
              return (
                <option key={"frist_" + trainer._id} value={trainer._id}>
                  {trainer.name}
                </option>
              );
            })}
        </select>
      </div>
      <div>
        <h3>Second Trainer:</h3>
        <select onChange={setTrainer} name="secondTrainer" id="secondTrainer">
          <option value="-">-</option>
          {trainers &&
            trainers.map((trainer) => {
              return (
                <option key={"second_" + trainer._id} value={trainer._id}>
                  {trainer.name}
                </option>
              );
            })}
        </select>
      </div>
      <form useRef="createNewTrainerForm" onSubmit={createNewTrainer}>
        <label for="name">New Trainer Name:</label>
        <input type="text" name="name" />
        <input type="submit" value="Create Trainer" />
      </form>
      <Link to="/arena">Start Arena Fight</Link>;
    </div>
  );
};

export default PreArena;
