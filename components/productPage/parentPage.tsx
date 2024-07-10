"use client";
import React, { useEffect, useState } from "react";
import POSLayout from "./page";
import { Drink } from "@/models/drink";
import { Category } from "@/models/category";
import { useServiceContext } from "@/app/providers";

type ProductPageProps = {
  deviceId: string
}

const ParentComponent = ({ deviceId }: ProductPageProps) => {
  let context = useServiceContext();
  let loginService = context.loginService;
  let categoryService = context.categoryService;
  let drinkService = context.drinkService;
  let barId = loginService.getBarId();

  const [categories, setCategories] = useState([] as Array<Category>);
  const [categoriesFailed, setCategoriesFailed] = useState(false);

  const [drinks, setDrinks] = useState([] as Array<Drink>);
  const [drinksFailed, setDrinksFailed] = useState(false);

  useEffect(() => {
    const fetchCategories = async (barId: string) => {
      if (categoryService.categories !== null) {
        setCategories(categoryService.categories);
        return;
      }

      try {
        const categories = await categoryService.getCategories(barId);
        setCategories(categories);
        console.log("Fetched categories:", categories);
      } catch {
        setCategoriesFailed(true);
      }
    };

    const fetchDrinks = async (barId: string) => {
      if (drinkService.drinks !== null) {
        setDrinks(drinkService.drinks);
        return;
      }

      try {
        const drinks = await drinkService.getDrinks(barId);
        setDrinks(drinks);
        console.log("Fetched drinks from API:", drinks);
      } catch {
        setDrinksFailed(true);
      }
    };

    if (barId !== null) {
      fetchCategories(barId);
      fetchDrinks(barId);
    }
  }, [barId, categoryService, drinkService]);

  return <POSLayout drinks={drinks} categories={categories} deviceId={deviceId} barId={barId} />;
};

export default ParentComponent;