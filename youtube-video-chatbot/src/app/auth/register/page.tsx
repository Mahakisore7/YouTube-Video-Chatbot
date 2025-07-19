"use client"

import { Button } from "@/components/ui/button"
import * as React from "react"
import {Moon, Sun,Eye,EyeOff} from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function RegisterPage() {
  const { setTheme } = useTheme()
  const [showPassword, setShowPassword] = React.useState(false)
  const [confirmShowPassword, setConfirmShowPassword] = React.useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <Button variant="outline" size="icon" className="fixed top-4 right-4 z-50 animate-bounce" onClick={() => setTheme((theme) => theme === "light" ? "dark" : "light")}>
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
    <Card className="p-8 w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Register</CardTitle>
        <CardDescription>
         Ready to become part of the exclusive chatbot? Fill in the details below, and let the journey begin!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
              <div className="grid gap-2">
              <Label htmlFor="Username">Username</Label>
              <Input
                id="Username"
                type="text"
                placeholder="Your username"
                required
              />
           
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
              <Input id="password" type={showPassword ? "text" : "password"} placeholder="Password" required />
              <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <div className="relative">
              <Input id="confirm-password" type={confirmShowPassword ? "text" : "password"} placeholder="Confirm Password" required />
              <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2" onClick={() => setConfirmShowPassword(!confirmShowPassword)}>
                {confirmShowPassword ? <EyeOff /> : <Eye />}
              </button>
              </div>
              </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Register
        </Button>
        <Button variant="outline" className="w-full">
          Register with Google
        </Button>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-blue-400 hover:text-blue-500 underline font-medium">
            Login
          </Link>
        </div>
      </CardFooter>
    </Card>
    </div>
  )
}

