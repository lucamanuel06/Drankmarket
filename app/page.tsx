"use client";
import React from "react";
import { Button } from "@nextui-org/react";

import { siteConfig } from "./cards";

export default function Home() {
  return (
    <main className="flex gap-3">
      {siteConfig.cardItems.map((item) => (
        <Button
          key={item.href}
          className="py-16 px-40 flex flex-col items-start"
          onClick={() => (window.location.href = item.href)}
        >
          {item.label}
        </Button>
      ))}
    </main>
  );
}
