"use client"
import React from "react";
import ManageCategories from "./categories"
import ManageDrinks from "./drinks"

export default function Page() {
  return (
    <main className="min-h-screen container mx-auto flex space-x-4">
      <ManageCategories />
      <ManageDrinks />
    </main>
  );
}
