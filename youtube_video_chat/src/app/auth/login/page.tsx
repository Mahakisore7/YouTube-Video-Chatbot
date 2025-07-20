"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import * as React from "react"
import {Eye,EyeOff} from "lucide-react"

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
import ThemeButton from "@/app/theme-button"
import {signIn} from "next-auth/react"

export default function LoginPage() {
  const [showPassword, setShowPassword] = React.useState(false)

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
    
    // Password validation
    const password = formValues.password as string;
    
    if (!password) {
      alert("Password is required!");
      return;
    }
    
    if (password.length < 6) {
      alert("Password must be at least 6 characters long!");
      return;
    }
  
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center ">
    <ThemeButton/>
    <Card className="p-8 w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
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
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
             <div className="relative">
              <Input 
                id="password" 
                name="password"
                type={showPassword ? "text" : "password"} 
                placeholder="Password" 
                required 
              />
              <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button variant="outline" className="w-full" onClick={() => {
          signIn("google",{callbackUrl: "/home"})
        }}>
          Login with Google
        </Button>
        <div className="mt-4 text-center text-sm">
          Doesn't have an account?{" "}
          <Link href="/auth/register" className="text-blue-400 hover:text-blue-500 underline font-medium">
            Register
          </Link>
        </div>
      </CardFooter>
    </Card>
    </div>
  )
}

