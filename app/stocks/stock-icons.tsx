"use client"
import React from "react"
import { Constants } from "@/generic/constants"

type StockIconProps = {
  height: string
  width: string
}

export function RiseIcon({ height, width }: StockIconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 51 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.350239" y="34.9493" width="35.2836" height="7.05672" transform="rotate(-45 0.350239 34.9493)" fill={Constants.RiseColor}/>
      <rect x="25.2995" y="10" width="35.2836" height="7.05672" transform="rotate(45 25.2995 10)" fill={Constants.RiseColor}/>
    </svg>
  )
}

export function DropIcon({ height, width }: StockIconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 51 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="50.2488" y="14.9493" width="35.2836" height="7.05672" transform="rotate(135 50.2488 14.9493)" fill={Constants.DropColor}/>
      <rect x="25.2995" y="39.8986" width="35.2836" height="7.05672" transform="rotate(-135 25.2995 39.8986)" fill={Constants.DropColor}/>
    </svg>
  )
}

export function EqualIcon({ height, width }: StockIconProps) {
    return (
      <svg width={width} height={height} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="7" y="15" width="35.2836" height="7.05672" fill={Constants.EqualColor}/>
        <rect x="7" y="27" width="35.2836" height="7.05672" fill={Constants.EqualColor}/>
      </svg>
    )
}
