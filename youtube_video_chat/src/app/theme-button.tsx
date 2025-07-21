"use client"

import { Button } from "@/components/ui/button";
import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeButton() {
  const { setTheme } = useTheme();

  return (
     <Button variant="outline" size="icon" className="fixed top-4 right-4 z-50 animate-bounce" onClick={() => setTheme((theme) => theme === "light" ? "dark" : "light")}>
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
  );
}