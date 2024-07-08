"use client";
import { Button, Popover, PopoverContent, PopoverTrigger, useDisclosure } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "@nextui-org/react";
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
  const [itemList, setItemList] = useState<{ name: string; quantity: number }[]>([]);
  const [selectedItem, setSelectedItem] = useState<{ name: string; quantity: number } | null>(null);
  const [modalQuantity, setModalQuantity] = useState<string>("");

  const handleButtonClick = (value: string) => {
    if (value === "Backspace") {
      setNumber(number.slice(0, -1));
    } else {
      setNumber(number + value);
    }
  };

  const handleModalButtonClick = (value: string) => {
    if (value === "Backspace") {
      setModalQuantity(modalQuantity.slice(0, -1));
    } else {
      setModalQuantity(modalQuantity + value);
    }
  };

  const handleProductClick = (productName: string) => {
    const quantity = number ? parseInt(number, 10) : 1;

    setItemList((prevItemList) => {
      const existingItem = prevItemList.find((item) => item.name === productName);

      if (existingItem) {
        return prevItemList.map((item) =>
          item.name === productName ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [...prevItemList, { name: productName, quantity }];
      }
    });
    setNumber("");
  };

  const increaseQuantity = (productName: string) => {
    setItemList((prevItemList) =>
      prevItemList.map((item) =>
        item.name === productName ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (productName: string) => {
    setItemList((prevItemList) =>
      prevItemList.map((item) =>
        item.name === productName && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const openModal = (item: { name: string; quantity: number }) => {
    setSelectedItem(item);
    setModalQuantity(item.quantity.toString());
    onOpen();
  };

  const handleModalSave = () => {
    if (selectedItem) {
      const quantity = parseInt(modalQuantity, 10);

      if (!isNaN(quantity)) {
        setItemList((prevItemList) =>
          prevItemList.map((item) =>
            item.name === selectedItem.name ? { ...item, quantity } : item
          )
        );
      }
    }
    onOpenChange();
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
              <ul className="w-full">
                {itemList.map((item, index) => (
                  <li key={index}>
                    <Popover placement="bottom" radius="none" className="bg-gray-500">
                      <PopoverTrigger>
                        <button className="grid grid-cols-4 w-full border-b-3 p-4">
                          <div>
                            <p>{item.name}</p>
                          </div>
                          <div>
                            <p>{item.quantity + `x`}</p>
                          </div>
                          <div>
                            <p>€</p>
                          </div>
                          <div>
                            <p>€</p>
                          </div>
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="flex flex-row gap-2 p-0 justify-between w-56">
                        <button onClick={() => increaseQuantity(item.name)}>
                          +
                          <div className="p-1">
                            Meer
                          </div>
                        </button>
                        <button onClick={() => decreaseQuantity(item.name)}>
                          -
                          <div>
                            <p>Minder</p>
                          </div>
                        </button>
                        <button onClick={() => openModal(item)} className="block">
                          ±
                          <div>
                            <p>Wijzig</p>
                          </div>
                        </button>
                        <button className="bg-red-500 block p-1">
                          🗑️
                          <div>
                            <p>verwijder</p>
                          </div>
                        </button>
                      </PopoverContent>
                    </Popover>
                  </li>
                ))}
              </ul>
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
                    <Button
                      key={item}
                      radius="none"
                      className="p-2 bg-white text-black mt-1"
                      onClick={() => handleProductClick(item)}
                    >
                      {item}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {selectedItem && (
        <Modal backdrop="opaque" isDismissable radius="none" isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>Wijzig aantal</ModalHeader>
                <ModalBody>
                  <div className="flex flex-col gap-4">
                    <div className="text-center text-lg mb-4">{selectedItem.name}</div>
                    <div className="text-center text-lg mb-4">{modalQuantity}</div>
                    <div className="grid grid-cols-4 gap-2 md:gap-4 p-4">
                      {["7", "8", "9", "0", "4", "5", "6", "00", "1", "2", "3", "Backspace"].map((num) => (
                        <Button
                          key={num}
                          className="p-2 md:p-4 bg-gray-700 text-white rounded w-full"
                          onClick={() => handleModalButtonClick(num)}
                        >
                          {num === "Backspace" ? "⌫" : num}
                        </Button>
                      ))}
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button className="text-blue-500" variant="light" onPress={onClose}>
                    Annuleren
                  </Button>
                  <Button className="text-blue-500" variant="light" onPress={handleModalSave}>
                    Opslaan
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default POSLayout;
