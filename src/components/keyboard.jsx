"use client";

import * as React from "react";
import { Toggle } from "./ui/toggle";
import { Trash } from "lucide-react"; // Importa el ícono de papelera

const numberRow = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const letterRows = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
];

const Keyboard = () => {
  const [activeKeys, setActiveKeys] = React.useState(new Set());
  const [typedText, setTypedText] = React.useState("");

  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key.length === 1 || event.key === " ") {
        const key = event.key === " " ? "Space" : event.key;
        setTypedText((prev) => prev + (key === "Space" ? " " : key));
        setActiveKeys((prevKeys) => new Set(prevKeys).add(key));
      } else if (event.key === "Backspace") {
        setTypedText((prev) => prev.slice(0, -1));
      }
    };

    const handleKeyUp = (event) => {
      const key = event.key === " " ? "Space" : event.key;
      setActiveKeys((prevKeys) => {
        const newKeys = new Set(prevKeys);
        newKeys.delete(key);
        return newKeys;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const isKeyPressed = (key) => activeKeys.has(key);

  const handleClearText = () => {
    setTypedText("");
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-full text-center mb-4 flex justify-center items-center max-w-screen-sm border rounded-xl p-10 overflow-hidden text-ellipsis overflow-y-visible scrollbar-custom">
        <div className="flex flex-col items-center">
          {/* MENSAJE */}
          <p className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-4xl my-4 h-40 max-w-screen-sm ">
            {typedText.split("").map((char, index) => (
              <span key={index}>{char}</span>
            ))}
          </p>
        </div>
      </div>
      <button className="flex items-end py-5 gap-2" onClick={handleClearText}>
        <Trash className="h-7 w-7 text-orange-300" />
        <span>Borrar</span>
      </button>
      <div className="flex gap-2">
        {numberRow.map((key) => (
          <Toggle
            key={key}
            keyChar={key}
            pressed={isKeyPressed(key)}
            onPressedChange={() =>
              setActiveKeys((prevKeys) => {
                const newKeys = new Set(prevKeys);
                if (newKeys.has(key)) {
                  newKeys.delete(key);
                } else {
                  newKeys.add(key);
                }
                return newKeys;
              })
            }
            aria-label={`Toggle ${key}`}
            className="border rounded w-10 h-10 flex items-center justify-center"
          >
            <div className="h-5 w-5">{key}</div>
          </Toggle>
        ))}
      </div>

      {letterRows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-2">
          {row.map((key) => (
            <Toggle
              key={key}
              keyChar={key}
              pressed={isKeyPressed(key)}
              onPressedChange={() =>
                setActiveKeys((prevKeys) => {
                  const newKeys = new Set(prevKeys);
                  if (newKeys.has(key)) {
                    newKeys.delete(key);
                  } else {
                    newKeys.add(key);
                  }
                  return newKeys;
                })
              }
              aria-label={`Toggle ${key}`}
              className="border rounded w-10 h-10 flex items-center justify-center"
            >
              <div className="h-5 w-5">{key.toUpperCase()}</div>
            </Toggle>
          ))}
        </div>
      ))}

      <div className="flex justify-center items-end mt-10">
        <Toggle
          key="Space"
          keyChar="Space"
          pressed={isKeyPressed("Space")}
          onPressedChange={() =>
            setActiveKeys((prevKeys) => {
              const newKeys = new Set(prevKeys);
              if (newKeys.has("Space")) {
                newKeys.delete("Space");
              } else {
                newKeys.add("Space");
              }
              return newKeys;
            })
          }
          aria-label="Toggle Space"
          className="border rounded w-80 h-10 flex items-center justify-center"
        >
          <div className="h-5 w-5">Space</div>
        </Toggle>
      </div>
    </div>
  );
};

export default Keyboard;
