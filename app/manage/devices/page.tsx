"use client"
import React from "react"
import { useServiceContext } from "@/app/providers"

export default function Page() {
  const context = useServiceContext()
  const deviceService = context.deviceService

  return (
    <main className="min-h-screen container mx-auto"></main>
  )
}
