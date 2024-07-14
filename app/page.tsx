"use client";
import React from "react";
import { Button } from "@nextui-org/react";
import { useServiceContext } from "./providers";
import { LoginService } from "@/services/login-service";
import { LoginType } from "@/models/login";
import { Device } from "@/models/device"
import { useRouter } from "next/navigation";
import { Constants } from "@/generic/constants";

export default function Home() {
  const router = useRouter()
  let context = useServiceContext()
  let loginService = context.loginService
  let deviceService = context.deviceService
  const [isLoggedIn, setLoggedIn] = React.useState(false)

  const [devices, setDevices] = React.useState([] as Device[])
  const [loaded, setLoaded] = React.useState(false)
  const [loadingFailed, setLoadingFailed] = React.useState(false)

  React.useEffect(() => {
    async function getDevices(bar: string) {
      if (deviceService.devices !== null) {
        setDevices(deviceService.devices)
        setLoaded(true)
      } else {
        try {
          let result = await deviceService.getDevices(bar)
          setDevices(result)
          setLoaded(true)
        } catch {
          setLoadingFailed(true)
        }
      }
    }

    let storedBarId = localStorage.getItem(Constants.BarId)
    if (!loaded && storedBarId !== null) {
      setLoggedIn(true)
      getDevices(storedBarId)
    }
  })

  return (
    <main className="flex gap-3 p-9 min-h-screen">
      { isLoggedIn && loadingFailed &&
        <p className="p-2 text-red-600">Terminals ophalen is mislukt</p>
      }
      { isLoggedIn && devices.map((item) => (
        <Button
          key={item.id}
          className="py-16 px-40 flex flex-col items-start"
          onClick={() => router.push(`/device/${item.id}`)}
        >
          {item.name}
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
