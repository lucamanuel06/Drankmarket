"use client";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <main className="min-h-screen container mx-auto">
      <div className="flex justify-center gap-2">
        <Button
          className="py-16 px-40"
          onPress={() => router.push("admin/bars")}
        >
          Beheer de barren
        </Button>
        <Button
          className="py-16 px-40"
          onPress={() => router.push("admin/products")}
        >
          Beheer de producten
        </Button>
        <Button
          className="py-16 px-40"
          onPress={() => router.push("admin/data")}
        >
          Bekijk de data
        </Button>
      </div>
    </main>
  );
}
