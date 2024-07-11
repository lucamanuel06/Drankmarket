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

import { Drink } from "@/models/drink";
import { Category } from "@/models/category";
import { OrderService } from "@/services/order-service"; 

type ManageDrinksProps = {
  drinks: Array<Drink>;
  categories: Array<Category>;
  deviceId: string;
};

const categoryColors: { [key: string]: string } = {
  "Frisdranken": "bg-blue-500",
  "Bier": "bg-yellow-500",
  "Wijn": "bg-blue-700",
};

const POSLayout: React.FC<ManageDrinksProps> = ({ drinks, categories, deviceId }) => {
  const [number, setNumber] = useState("");
  const [itemList, setItemList] = useState<{ name: string; quantity: number; price: number; id: string }[]>([]);
  const [selectedItem, setSelectedItem] = useState<{ name: string; quantity: number; price: number } | null>(null);
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

  const handleProductClick = (productName: string, productPrice: number, productId: string) => {
    const quantity = number ? parseInt(number, 10) : 1;

    setItemList((prevItemList) => {
      const existingItem = prevItemList.find((item) => item.name === productName);

      if (existingItem) {
        return prevItemList.map((item) =>
          item.name === productName ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [...prevItemList, { name: productName, quantity, price: productPrice, id: productId }];
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

  const removeItem = (productName: string) => {
    setItemList((prevItemList) =>
      prevItemList.filter((item) => item.name !== productName)
    );
  };

  const openModal = (item: { name: string; quantity: number; price: number }) => {
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

  const orderService = new OrderService(); 

  const handleCashPayment = async () => {
    try {
      for (const item of itemList) {
        const productId = item.id; 
        const amount = item.quantity;
        const pricePerProduct = item.price;



        await orderService.createOrder(deviceId, productId, amount, pricePerProduct);
      }

      setItemList([]);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#182129] p-4">
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
                            <p>€{item.price.toFixed(2)}</p>
                          </div>
                          <div>
                            <p>€{(item.price * item.quantity).toFixed(2)}</p>
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
                        <button onClick={() => { removeItem(item.name) }} className="bg-red-500 block p-1">
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
                      handleCashPayment(); 
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
        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-4">
          {categories.map((category) => {
            const filteredDrinks = drinks.filter((drink) => drink.categoryId === category.id);

            return (
              <div key={category.id} className={`flex flex-col rounded-md ${categoryColors[category.name] || 'bg-gray-200'} p-4`}>
                <h2 className="text-center text-white">{category.name}</h2>
                <div className="flex flex-col gap-2">
                  {filteredDrinks.map((item) => (
                    <DrinkRow
                      drink={item}
                      key={item.id}
                      onClick={() => handleProductClick(item.name, item.currentPrice, item.id)} // Pass the product id
                    />
                  ))}
                </div>
              </div>
            );
          })}
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

type DrinkRowProps = {
  drink: Drink;
  onClick: () => void;
};

const DrinkRow: React.FC<DrinkRowProps> = ({ drink, onClick }) => {
  return (
    <button className="p-2 bg-[#182129] text-white mt-1 rounded" onClick={onClick}>
      <div>{drink.name}</div>
    </button>
  );
};
