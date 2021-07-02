import React from "react";

const BaseInfo = ({ baseInfo }) => {
  console.log("baseInfo", baseInfo);
  return (
    <div className="base">
      <span>Base:: </span>
      <span>HP: {baseInfo.HP}</span>
      <span>Attack: {baseInfo.Attack}</span>
      <span>Defense: {baseInfo.Defense}</span>
      <span>Sp. Attack: {baseInfo["Sp. Attack"]}</span>
      <span>Sp. Defense: {baseInfo["Sp. Defense"]}</span>
      <span>Speed: {baseInfo.Speed}</span>
    </div>
  );
};

export default BaseInfo;
