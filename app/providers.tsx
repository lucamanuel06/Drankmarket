"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { BarService } from "../services/bar-service"
import { LoginService } from "../services/login-service"
import { DeviceService } from "../services/device-service"
import { DrinkService } from "@/services/drink-service";
import { CategoryService } from "@/services/category-service";
import { OrderService } from "@/services/order-service";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export type ServiceContent = {
  barService: BarService | null
  loginService: LoginService | null
  deviceService: DeviceService | null
  drinkService: DrinkService | null
  categoryService: CategoryService | null
  orderService: OrderService | null
}

export const ServiceContext = React.createContext<ServiceContent>({
  barService: null,
  loginService: null,
  deviceService: null,
  drinkService: null,
  categoryService: null,
  orderService: null,
});

export const useServiceContext = () => React.useContext(ServiceContext)

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();
  const services = {
    barService: new BarService(),
    loginService: new LoginService(),
    deviceService: new DeviceService(),
    drinkService: new DrinkService(),
    categoryService: new CategoryService(),
    orderService: new OrderService(),
  }

  return (
    <NextUIProvider navigate={router.push}>
      <ServiceContext.Provider value={services}>
        <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
      </ServiceContext.Provider>
    </NextUIProvider>
  );
}
