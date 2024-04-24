import { redirect } from "next/navigation";
import { Button } from "@nextui-org/react";

export default function Page() {
  const verderButton = () => {
    return redirect("roomLogin/");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl">Welkom</h1>
        <Button onClick={verderButton()} color="success" size="md">Ga verder!</Button>
      </div>
    </div>
  )
}
