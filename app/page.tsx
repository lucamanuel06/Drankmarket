"use client";
import React from "react";
import { Button } from "@nextui-org/react";
import { siteConfig } from "./cards";
import { useServiceContext } from "./providers";
import { Constants } from "@/generic/constants";
import { LoginService } from "@/services/login-service";
import { LoginType } from "@/models/login";

export default function Home() {
  let loginService = useServiceContext().loginService
  let storedBarId = localStorage.getItem(Constants.BarId)
  const [isLoggedIn, setLoggedIn] = React.useState(storedBarId !== null)

  return (
    <main className="flex gap-3 p-9 min-h-screen">
      {isLoggedIn && siteConfig.cardItems.map((item) => (
        <Button
          key={item.href}
          className="py-16 px-40 flex flex-col items-start"
          onClick={() => (window.location.href = item.href)}
        >
          {item.label}
        </Button>
      ))}
      {!isLoggedIn &&
        <LoginBox loginService={loginService} setLoggedIn={setLoggedIn} />
      }
    </main>
  );
}

const LoginBox: React.FC<LoginInputProps> = ({ loginService, setLoggedIn }) => {
  const [userName, setUsername] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [loginFailed, setLoginFailed] = React.useState(false)

  async function tryLogin() {
    let loginState = LoginType.Loading

    try {
      loginState = await loginService.login(userName, password)
    } catch {
      setLoginFailed(true)
    }

    switch (loginState) {
      case LoginType.Rejected:
        setLoginFailed(true)
        break
      case LoginType.LoggedIn:
        setLoggedIn(true)
        break
    }
  }

  return (
    <div className="self-center w-full flex justify-center">
      <div className="flex-col bg-gray-800 w-fit space-y-2 p-8 rounded-xl">
        <h3>Login</h3>
        <div>
          <label htmlFor="input-username">Naam</label>
          <div>
            <input 
              value={userName} 
              onChange={(e) => setUsername(e.target.value)} 
              type="text" 
              id="input-username"
              className="bg-gray-400 text-black"
            />
          </div>
        </div>
        <div>
          <label htmlFor="input-password">Wachtwoord</label>
          <div>
            <input 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              type="password" 
              id="input-password"
              className="bg-gray-400 text-black"
            />
          </div>
        </div>
        <input 
          value="Bevestig"
          onClick={async () => tryLogin()}
          className="bg-slate-500 p-1 rounded"
          type="button"
        />
        { loginFailed &&
          <p className="text-red-600">Inloggen mislukt</p>
        }
      </div>
    </div>
  )
}

type LoginInputProps = {
  loginService: LoginService
  setLoggedIn: (newValue: boolean) => void
}
