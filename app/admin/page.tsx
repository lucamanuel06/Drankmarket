"use client"
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <main className="min-h-screen container mx-auto">
      <div className="flex justify-around">
        <Button onPress={() => router.push('admin/producten')}>Beheer de barren</Button>
        <Button onPress={() => router.push('admin/barren')}>Beheer de producten</Button>
        <Button onPress={() => router.push('admin/data')}>Bekijk de data</Button>
      </div>
    </main>
  );
}
