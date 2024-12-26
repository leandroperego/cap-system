"use client";

import {
  IconButton,
  Drawer,
  Button,
} from "../lib/material-tailwind.config";

import {
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import CardMenu from "./CardMenu";
import { useState } from "react";

export default function MenuNavegacaoMobile() {

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
 
  const openDrawer = () => setIsDrawerOpen(true)
  const closeDrawer = () => setIsDrawerOpen(false)
 
  return (
    <>
      <IconButton variant="text" size="lg" onClick={openDrawer}>
        {isDrawerOpen ? (
          <XMarkIcon className="h-8 w-8 stroke-2" />
        ) : (
          <Bars3Icon className="h-8 w-8 stroke-2" />
        )}
      </IconButton>
      <Drawer open={isDrawerOpen} onClose={closeDrawer}>
        <CardMenu closeCard={closeDrawer}/>
      </Drawer>
    </>
  );
}