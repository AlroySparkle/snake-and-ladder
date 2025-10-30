import React, { useEffect, useState } from "react";

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

export default function Board() {
  const [playerPosition, setPlayerPosition] = useState(-1);
  const [diceValue, setDiceValue] = useState(0);
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
      setPlayerPosition(playerPosition + diceValue);
      setDiceValue(0);
    } else if (transferer[playerPosition]) {
      setPlayerPosition(transferer[playerPosition]);
    }
  }, [diceValue]);
  function Cell({ identifier = 0 }) {
    const squareSize = "80px";
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
    if (identifier == 3) {
      console.log(
        Math.sqrt(
          power2(
            vertical(transferer[identifier]) * 80 - vertical(identifier) * 80
          ) +
            power2(
              horizontal(transferer[identifier]) * 80 -
                horizontal(identifier) * 80
            )
        )
      );
    }
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
            identifier == playerPosition
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
              width: "2px",
              transform: "translate(-50%,-50%)",
              background: identifier > transferer[identifier] ? "red" : "green",
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
