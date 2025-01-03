"use client";
import React, { useEffect, useState } from "react";
import POSLayout from "./page";
import { Drink } from "@/models/drink";
import { Category } from "@/models/category";
import { useServiceContext } from "@/app/providers";
import { Constants } from "@/generic/constants";

type ProductPageProps = {
  deviceId: string
}

const ParentComponent = ({ deviceId }: ProductPageProps) => {
  let context = useServiceContext();
  let loginService = context.loginService;
  let categoryService = context.categoryService;
  let drinkService = context.drinkService;

  const [categories, setCategories] = useState([] as Array<Category>);
  const [categoriesFailed, setCategoriesFailed] = useState(false);

  const [drinks, setDrinks] = useState([] as Array<Drink>);
  const [drinksFailed, setDrinksFailed] = useState(false);

  const [lastDate, setLastDate] = useState<Date | null>(null)

  useEffect(() => {
    const fetchCategories = async (barId: string) => {
      try {
        const categories = await categoryService.getCategories(barId);
        setCategories(categories);
        console.log("Fetched categories:", categories);
      } catch {
        setCategoriesFailed(true);
      }
    };

    const fetchDrinks = async (barId: string) => {
      try {
        const drinks = await drinkService.getDrinks(barId);
        setDrinks(drinks);
        console.log("Fetched drinks from API:", drinks);
      } catch {
        setDrinksFailed(true);
      }
    };

    let barId = loginService.getBarId() ?? localStorage.getItem(Constants.BarId)
    setTimeout(() => {
      let currentDate = new Date()
      console.log(`Minutes`)
      if (barId != null && currentDate.getMinutes() != lastDate?.getMinutes()) {
        console.log("refriesh")
        fetchCategories(barId);
        fetchDrinks(barId);
      }
      setLastDate(currentDate)
    }, lastDate !== null ? Constants.StocksRefreshInterval : 0)
  });

  return <POSLayout drinks={drinks} categories={categories} deviceId={deviceId} />;
};

export default ParentComponent;
