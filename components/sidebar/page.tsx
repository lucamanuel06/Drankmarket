"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { Constants } from "@/generic/constants";

import { siteConfig } from "./site";
import { useServiceContext } from "@/app/providers";

export default function TemporaryDrawer() {
  let context = useServiceContext();
  let drinkService = context.drinkService;
  let crashService = context.crashService;
  let loginService = context.loginService;

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [open, setOpen] = React.useState(false);
  const [isAdmin, setAdmin] = React.useState(
    loginService.user?.isAdmin === true
  );
  const [loadingFailed, setLoadingFailed] = React.useState(false);
  const [barId, setBarId] = React.useState<string | null>(null);
  const [isLoaded, setLoaded] = React.useState(false);
  const [Drinks, setDrinks] = React.useState([] as any);
  const [selectedDrinks, setSelectedDrinks] = React.useState<string[]>([]);
  const [dropPercentage, setDropPercentage] = React.useState<string>("");

  console.log(Drinks);

  React.useEffect(() => {
    async function getDrinks(bar: string) {
      try {
        console.log("Fetching drinks for bar:", bar);
        let newDrinks = await drinkService.getDrinks(bar);
        console.log("Fetched Drinks:", newDrinks);
        setDrinks(newDrinks);
      } catch (error) {
        console.error("Failed to fetch drinks:", error);
        setLoadingFailed(true);
      }
    }

    setBarId(loginService.getBarId() ?? localStorage.getItem(Constants.BarId));
    setTimeout(() => {
      if (barId !== null) {
        getDrinks(barId);
        setLoaded(true);
        console.log("Refreshed the stocks");
      }
    }, isLoaded ? Constants.StocksRefreshInterval : 0);
  }, [barId, drinkService, isLoaded, loginService]);

  React.useEffect(() => {
    async function checkIfAdmin() {
      setAdmin(await loginService.isAdmin());
    }

    checkIfAdmin();
  }, [loginService]);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleCrashMarket = async () => {
    try {
      console.log("Selected Drinks:", selectedDrinks);
      console.log("Drop Percentage:", dropPercentage);

      if (selectedDrinks.length === 0 || !dropPercentage) {
        alert("Select drinks and enter a drop percentage.");
        return;
      }

      const payload = {
        ids: selectedDrinks,
        drop_percentage: parseFloat(dropPercentage),
      };

      const response = await crashService.crashMarket(payload.ids, payload.drop_percentage);

      console.log("Crash Response:", response);
      alert(`Market crashed successfully for: ${response.updated.join(", ")}`);
      onOpenChange(false); // Close modal
    } catch (error) {
      console.error("Failed to crash the market:", error);
      alert("An error occurred while crashing the market.");
    }
  };

  const handleSelectAll = () => {
    setSelectedDrinks(Drinks.map((drink) => drink.id));
  };

  const handleDeselectAll = () => {
    setSelectedDrinks([]);
  };

  const DrawerList = (
    <Box role="presentation" sx={{ width: 250 }} onClick={toggleDrawer(false)}>
      <List>
        {siteConfig.navItems.map((item) => (
          <ListItem key={item.href} disablePadding>
            <ListItemButton href={item.href}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {siteConfig.managementItems.map((item) => (
          <ListItem key={item.href} disablePadding>
            <ListItemButton href={item.href}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {isAdmin && (
        <>
          <Divider />
          <List>
            {siteConfig.adminItems.map((item) => (
              <ListItem key={item.href} disablePadding>
                <ListItemButton href={item.href}>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </>
      )}
      <List>
        <ListItem>
          <ListItemButton href="">
            <ListItemText onClick={onOpen} primary="MARKET CRASH" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      {loadingFailed && (
        <p className="text-red-600">Beurs ophalen is mislukt</p>
      )}
      <Button
        className="bg-blue-200 hover:bg-blue-300"
        onClick={toggleDrawer(true)}
      >
        <svg
          className="size-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                CRASH THE MARKET
              </ModalHeader>
              <ModalBody>
                <div className="flex justify-between mb-2">
                  <Button onClick={handleSelectAll}>Select All</Button>
                  <Button onClick={handleDeselectAll}>Deselect All</Button>
                </div>
                <Select
                  className="w-full"
                  label="Drinks"
                  placeholder="Selecteer drinks"
                  selectionMode="multiple"
                  onSelectionChange={(keys) => {
                    console.log("Selected Keys:", keys);
                    setSelectedDrinks([...keys]);
                  }}
                  selectedKeys={selectedDrinks}
                >
                  {Drinks.map((drink) => (
                    <SelectItem key={drink.id} value={drink.id}>
                      {drink.name}
                    </SelectItem>
                  ))}
                </Select>
                <Input
                  label="Percentage"
                  placeholder="Vul percentage in"
                  variant="bordered"
                  value={dropPercentage}
                  onChange={(e) => setDropPercentage(e.target.value)}
                  type="number"
                />
              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose}>Sluit</Button>
                <Button color="error" onClick={handleCrashMarket}>CRASH</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
