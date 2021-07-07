import "./PreArena.css";
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

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
      <h1 className="title">Welcome to the Arena of Würzburg</h1>
      <h2>Select your Trainers</h2>
      <div className="trainerSelection">
        <div className="firstTrainer">
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
        <div className="secondTrainer">
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
      </div>
      <Link to="/arena" className="arenaLink">
        <Button
          variant="contained"
          color="secondary"
          size="large"
          className="playButton"
        >
          Enter Pokemon Arena
        </Button>
      </Link>
      <h2 className="createTrainerTitle">Create a new Trainer</h2>
      <div className="createTrainer">
        <form useRef="createNewTrainerForm" onSubmit={createNewTrainer}>
          <label for="name">Name:</label>
          <br />
          <input type="text" name="name" />
          <br />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            className="createTrainerButton"
          >
            Create Trainer
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PreArena;
