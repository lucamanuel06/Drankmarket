"use client"
import React from "react"
import ProductPage from "@/components/productPage/parentPage"

export default function Page({ params }) {
  return (
    <ProductPage deviceId={params.id} />
  )
}
