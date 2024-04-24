import { redirect } from "next/navigation";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";

export default function Page() {
    const roomButton = () => {
        return redirect("/src/app/roomLogin/page.tsx");
    }

    return (
        <div>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <Input type="text" label='RoomID' placeholder="Vul hier je RoomID in" />
            </div>
            <Button></Button>
        </div>
    )
}