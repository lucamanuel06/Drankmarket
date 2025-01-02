"use client";
import React from "react";
import { Button } from "@nextui-org/react";
import { useServiceContext } from "./providers";
import { LoginService } from "@/services/login-service";
import { LoginType } from "@/models/login";
import { Device } from "@/models/device";
import { useRouter } from "next/navigation";
import { Constants } from "@/generic/constants";

import "core-js/stable";
import "regenerator-runtime/runtime";

export default function Home() {
  const router = useRouter();
  const context = useServiceContext();
  const loginService = context.loginService;
  const deviceService = context.deviceService;

  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const [devices, setDevices] = React.useState<Device[]>([]);
  const [loaded, setLoaded] = React.useState(false);
  const [loadingFailed, setLoadingFailed] = React.useState(false);

  React.useEffect(() => {
    const getDevices = async (bar: string) => {
      if (deviceService.devices) {
        setDevices(deviceService.devices);
        setLoaded(true);
      } else {
        try {
          const result = await deviceService.getDevices(bar);
          setDevices(result);
          setLoaded(true);
        } catch {
          setLoadingFailed(true);
        }
      }
    };

    const storedBarId = localStorage.getItem(Constants.BarId);
    if (!loaded && storedBarId) {
      setLoggedIn(true);
      getDevices(storedBarId);
    }
  }, [deviceService, loaded]);

  return (
    <main className="flex flex-wrap gap-3 p-9 min-h-screen">
      {isLoggedIn && loadingFailed && (
        <p className="p-2 text-red-600">Terminals ophalen is mislukt</p>
      )}
      {isLoggedIn &&
        devices.map((item) => (
          <Button
            key={item.id}
            className="py-16 px-40 flex flex-col items-start"
            onClick={() => router.push(`/device/${item.id}`)}
          >
            {item.name}
          </Button>
        ))}
      {!isLoggedIn && (
        <LoginBox loginService={loginService} setLoggedIn={setLoggedIn} />
      )}
    </main>
  );
}

const LoginBox: React.FC<LoginInputProps> = ({ loginService, setLoggedIn }) => {
  const [userName, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loginFailed, setLoginFailed] = React.useState(false);

  const tryLogin = async () => {
    let loginState = LoginType.Loading;

    try {
      loginState = await loginService.login(userName, password);
    } catch {
      setLoginFailed(true);
      return;
    }

    switch (loginState) {
      case LoginType.Rejected:
        setLoginFailed(true);
        break;
      case LoginType.LoggedIn:
        setLoggedIn(true);
        break;
    }
  };

  return (
    <div className="self-center w-full flex justify-center">
      <div className="flex-col bg-gray-800 w-fit space-y-2 p-8 rounded-xl">
        <h3 className="text-white">Login</h3>
        <div>
          <label htmlFor="input-username" className="text-white">
            Naam
          </label>
          <div>
            <input
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              id="input-username"
              className="bg-gray-400 text-black w-full p-2 rounded"
            />
          </div>
        </div>
        <div>
          <label htmlFor="input-password" className="text-white">
            Wachtwoord
          </label>
          <div>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="input-password"
              className="bg-gray-400 text-black w-full p-2 rounded"
            />
          </div>
        </div>
        <button
          onClick={tryLogin}
          className="bg-slate-500 p-2 rounded text-white w-full mt-4"
        >
          Bevestig
        </button>
        {loginFailed && (
          <p className="text-red-600 mt-2">Inloggen mislukt</p>
        )}
      </div>
    </div>
  );
};

type LoginInputProps = {
  loginService: LoginService;
  setLoggedIn: (newValue: boolean) => void;
};
