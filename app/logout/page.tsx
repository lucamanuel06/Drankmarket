"use client";
import React from "react";
import { useServiceContext } from "@/app/providers";

export default function LogoutScreen() {
  let loginService = useServiceContext().loginService

  React.useEffect(() => {
    loginService.logout()
    window.location.href = "/"
  })

  return (
    <p>Aan het uitloggen</p>
  )
}
