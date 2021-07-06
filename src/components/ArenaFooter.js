import "./ArenaFooter.css";
import React from "react";
import Button from "@material-ui/core/Button";

const ArenaFooter = ({ playGame }) => {
  return (
    <div className="arena_footer">
      <Button
        variant="contained"
        color="secondary"
        size="large"
        onClick={playGame}
        className="playButton"
      >
        Fight
      </Button>
    </div>
  );
};

export default ArenaFooter;
