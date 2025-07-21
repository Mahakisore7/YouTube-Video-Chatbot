"use client"

import { Button } from "@/components/ui/button"
import * as React from "react"
import {Eye,EyeOff} from "lucide-react"
import ThemeButton from "@/app/theme-button"
import { useTheme } from "next-themes"
import Link from "next/link"
import {signIn} from "next-auth/react"
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
  const [showPassword, setShowPassword] = React.useState(false)
  const [confirmShowPassword, setConfirmShowPassword] = React.useState(false)



  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    // Handle form submission logic here
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    
    // Convert FormData to object for console logging
    const formValues = Object.fromEntries(formData.entries());
    
    // Email validation
    const email = formValues.email as string;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address!");
      return;
    }
    
    // Password validation logic
    const password = formValues.password as string;
    const confirmPassword = formValues.confirmPassword as string;
    
    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Check password strength (minimum 8 characters, at least one uppercase, one lowercase, one number)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    
    if (!passwordRegex.test(password)) {
      alert("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.");
      return;
    }
    
    
  }

  return (
    <div className="min-h-screen flex items-center justify-center ">
        <ThemeButton />
    <Card className="p-8 w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Register</CardTitle>
        <CardDescription>
         Ready to become part of the exclusive chatbot? Fill in the details below, and let the journey begin!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
              <div className="grid gap-2">
              <Label htmlFor="Username">Username</Label>
              <Input
                id="Username"
                name="username"
                type="text"
                placeholder="Your username"
                required
              />
           
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
              <Input id="password" name="password" type={showPassword ? "text" : "password"} placeholder="Password" required />
              <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <div className="relative">
              <Input id="confirm-password" name="confirmPassword" type={confirmShowPassword ? "text" : "password"} placeholder="Confirm Password" required />
              <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2" onClick={() => setConfirmShowPassword(!confirmShowPassword)}>
                {confirmShowPassword ? <EyeOff /> : <Eye />}
              </button>
              </div>
              </div>
          </div>
          <div className="mt-6">
            <Button type="submit" className="w-full">
              Register
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button variant="outline" className="w-full" onClick={()=>signIn("google",{callbackUrl:"/home"})}>
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

