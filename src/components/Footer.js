import "./Footer.css";
import React from "react";
import Button from "@material-ui/core/Button";

const Footer = ({ playGame }) => {
  return (
    <div className="footer">
      <a href="https://github.com/Athameon" target="_blank">
        &copy; Benjamin Nopper
      </a>
      <p></p>
    </div>
  );
};

export default Footer;
