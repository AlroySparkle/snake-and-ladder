import React, { useEffect, useState } from "react";

/******************
 ****needed math****
 ******************/
const power2 = (value) => {
  return value * value;
};

const vertical = (identifier) => {
  return Math.floor(identifier / 10);
};

const horizontal = (identifier) => {
  return Math.floor(identifier / 10) % 2 == 0
    ? identifier % 10
    : 9 - (identifier % 10);
};

const playerPositioning = (index) => {
  if (index < 0) {
    return { bottom: "40px", left: "-40px" };
  }
  return {
    bottom: vertical(index * 80 - 40 + "px"),
    left: horizontal(index) * 80 - 40 + "px",
  };
};

/******************
 ********map********
 ******************/

export default function Board() {
  //states values
  const [playerIndex, setPlayerIndex] = useState(-1);
  const [playerPosition, setPlayerPosition] = useState({
    left: "-40px",
    bottom: "40px",
  });
  const [diceValue, setDiceValue] = useState(0);

  useEffect(() => {
    setPlayerPosition(playerPositioning(playerIndex));
  }, [playerIndex]);
  //fixed values needed
  const squareSize = "80px";
  const transferer = {
    0: 37,
    3: 13,
    7: 29,
    27: 75,
    20: 41,
    49: 66,
    70: 91,
    79: 98,
    35: 5,
    31: 9,
    47: 25,
    61: 17,
    87: 23,
    94: 55,
    96: 77,
  };
  const rotation = {
    37: 34,
    41: 28,
    13: 72,
    29: 45,
    75: -32,
    66: -55,
    91: -28,
    98: 25,
    5: 162,
    9: 162,
    25: -135,
    17: 170,
    23: -147,
    55: -165,
    77: -153,
  };
  useEffect(() => {
    if (diceValue > 0) {
      setPlayerIndex(playerIndex + diceValue);
      setDiceValue(0);
    } else if (transferer[playerIndex]) {
      setPlayerIndex(transferer[playerIndex]);
    }
  }, [diceValue]);
  function Cell({ identifier = 0 }) {
    const lineSize = transferer[identifier]
      ? Math.sqrt(
          power2(
            vertical(transferer[identifier]) * 80 - vertical(identifier) * 80
          ) +
            power2(
              horizontal(transferer[identifier]) * 80 -
                horizontal(identifier) * 80
            )
        )
      : 0;

    return (
      <div
        id={identifier + ""}
        style={{
          display: "flex",
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "18px",
          fontWeight: "bold",
          border: "solid black 1px",
          height: squareSize,
          width: squareSize,
          background:
            identifier == playerIndex
              ? "blue"
              : identifier % 2 == 0
              ? "#7be2ff"
              : "#f4f4f4",
        }}
      >
        {identifier + 1}
        {transferer[identifier] ? (
          <div
            style={{
              rotate: transferer[identifier]
                ? `${rotation[transferer[identifier]]}deg`
                : 0,

              position: "absolute",
              height: `${lineSize}px`,
              width: "5px",
              transform: "translate(-50%,-50%)",
              background: identifier > transferer[identifier] ? "red" : "green",
              zIndex: 9999,
            }}
          ></div>
        ) : undefined}
        {transferer[identifier] ? (
          <div
            style={{
              height: "1rem",
              width: "1rem",
              background: identifier > transferer[identifier] ? "red" : "green",
              borderRadius: "100%",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              zIndex: 9999,
            }}
          ></div>
        ) : undefined}
      </div>
    );
  }
  return (
    <div>
      <div
        style={{
          border: "1px solid black",
          display: "flex",
          flexDirection: "column-reverse",
          position: "relative",
        }}
      >
        {Array(10)
          .fill([])
          .map((currentRow, rowIndex) => {
            return (
              <div
                key={rowIndex}
                style={{
                  display: "flex",
                  flexDirection: rowIndex % 2 == 0 ? "row" : "row-reverse",
                }}
              >
                {Array(10)
                  .fill(undefined)
                  .map((cell, columnIndex) => {
                    return (
                      <Cell
                        key={columnIndex}
                        identifier={rowIndex * 10 + columnIndex}
                      />
                    );
                  })}
              </div>
            );
          })}
        <div
          style={{
            height: "10px",
            width: "10px",
            position: "absolute",
            background: "blue",
            left: playerPosition.left,
            bottom: playerPosition.bottom,
            transition: ".3s",
            zIndex: 9999,
          }}
        ></div>
      </div>
      <button
        onClick={() => {
          setDiceValue(Math.floor(Math.random() * 6) + 1);
        }}
      >
        play
      </button>
    </div>
  );
}
