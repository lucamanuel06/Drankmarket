"use client";
import React from "react";
import { useServiceContext } from "@/app/providers";

export default function LogoutScreen() {
  let loginService = useServiceContext().loginService

  React.useEffect(() => {
    async function logout() {
      await loginService.logout()
      window.location.href = "/"
    }

    logout()
  })

  return (
    <p>Aan het uitloggen</p>
  )
}
