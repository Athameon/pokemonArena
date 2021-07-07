import "./PreArena.css";
import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";

const PreArena = ({
  trainers,
  setTrainers,
  setFirstTrainer,
  setSecondTrainer,
  firstTrainer,
  secondTrainer,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const history = useHistory();

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

  const createNewTrainer = async (event) => {
    event.preventDefault();
    const newTrainerName = event.target[0].value;
    console.log(newTrainerName);
    if (newTrainerName.length < 3) {
      alert("Invalid trainer name");
    }
    const existingTrainerObject = trainers.find(
      (trainer) => trainer.name === newTrainerName
    );
    if (existingTrainerObject) {
      return alert(
        `The trainer with the name ${newTrainerName} already exists.`
      );
    }
    try {
      const data = await fetch(
        "https://bennoss-pokemon.herokuapp.com/trainer/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: newTrainerName }),
        }
      );
      if (!data.ok) {
        throw Error("Failed to create a new trainer");
      }
      const jsonData = await data.json();

      setTrainers((prev) => [...prev, jsonData]);
      // setIsLoading(false);
    } catch (error) {
      console.error(error);
      // setIsLoading(false);
      // setIsError(true);
    }
  };

  const enterArena = () => {
    if (!(firstTrainer && secondTrainer)) {
      alert("Select two trainers to start the fight.");
    } else if (firstTrainer._id === secondTrainer._id) {
      alert("You can't fight against yourself.");
    } else {
      history.push("/arena");
    }
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
      <Button
        variant="contained"
        color="secondary"
        size="large"
        className="playButton"
        onClick={enterArena}
      >
        Enter Pokemon Arena
      </Button>
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
