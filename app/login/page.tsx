"use client";
import { Button, Input } from "@nextui-org/react";

export default function Page() {
  return (
    <main className="flex justify-center items-center text-center min-h-screen flex-col gap-3">
      <h1 className="text-2xl text-center">Vul login code in</h1>
      <Input className="w-64" label="Code" type="text" />
      <Button color="primary">Login</Button>
    </main>
  );
}
