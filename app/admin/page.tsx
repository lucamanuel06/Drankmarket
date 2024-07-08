"use client";
import { Constants } from "@/generic/constants";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useServiceContext } from "../providers";
import React from "react";

export default function Page() {
  const router = useRouter();
  const context = useServiceContext()
  const loginService = context.loginService
  const [isAdmin, setAdmin] = React.useState(false)

  React.useEffect(() => {
    async function checkAdmin() {
      if (await loginService.isAdmin()) setAdmin(true)
    }
    checkAdmin()
  })

  return (
    <main className="min-h-screen container mx-auto">
      { isAdmin &&
        <div className="flex justify-center gap-2">
          <Button
            className="py-16 px-40"
            onPress={() => router.push(Constants.AdminBars)}
          >
            Beheer de barren
          </Button>
        </div>
      }
    </main>
  );
}
