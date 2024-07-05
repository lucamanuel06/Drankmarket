"use client";
import { Button } from "@nextui-org/react";
import React, { useState } from "react";

const categories = [
  { name: "Bieren", color: "bg-yellow-500", items: ["Bokbier", "Fluitje bier", "Leffe blond", "Leffe dubbel", "Palm", "Pitcher bier", "Pul bier"] },
  {
    name: "Frisdranken",
    color: "bg-red-500",
    items: ["Cola", "Cola light", "Sisi", "7-Up", "Bitter lemon", "Cassis", "Cristal clear lemon"],
  },
  { name: "Wijnen", color: "bg-blue-700", items: ["Item4", "Item5", "Item6"] },
  { name: "Mixdranken", color: "bg-teal-500", items: ["Item19", "Item20", "Item21"] },
];

const POSLayout: React.FC = () => {
  const [number, setNumber] = useState("");

  const handleButtonClick = (value: string) => {
    if (value === "Backspace") {
      setNumber(number.slice(0, -1));
    } else {
      setNumber(number + value);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 p-4">
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        {/* Left Panel */}
        <div
          className="flex p-4 bg-gray-800 flex-col space-y-4 flex-shrink-0"
          style={{ height: "calc(100vh - 100px)" }}
        >
          <div className="bg-white flex justify-between flex-col text-black p-4 shadow-md flex-1">
            <div className="flex items-center mb-4">
              <div className="text-xl">Item List</div>
            </div>
            <div className="border-3 flex flex-row justify-between items-center p-4">
              <div className="relative flex justify-center items-center w-full">
                <p className="flex-grow">{number}</p>
                <button
                  className="p-2 text-black rounded absolute block top-50 left-50"
                  onClick={() => handleButtonClick("Backspace")}
                >
                  ⌫
                </button>
              </div>
              <div>price</div>
            </div>
          </div>
          <div className="bg-gray-800 shadow-md flex justify-center">
            <div className="grid grid-cols-4 gap-2 md:gap-4 p-4">
              {["7", "8", "9", "+", "4", "5", "6", "-", "1", "2", "3", "Pin", "0", "00", ",", "Contant"].map((num) => (
                <Button
                  key={num}
                  className="p-2 md:p-4 bg-gray-700 text-white rounded w-full"
                  onClick={() => {
                    if (num === "Pin") {
                      // Pin functionality
                    } else if (num === "Contant") {
                      // Contant functionality
                    } else {
                      handleButtonClick(num);
                    }
                  }}
                >
                  {num}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full">
          <div className="bg-white p-4 shadow-md grid grid-cols-1 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <div key={category.name} className="flex flex-col">
                <div className={`p-4 text-center text-white ${category.color}`}>
                  {category.name}
                </div>
                <div className="flex flex-col bg-gray-200 p-2">
                  {category.items.map((item) => (
                    <Button key={item} radius="none" className="p-2 bg-white text-black  mt-1">
                      {item}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default POSLayout;
