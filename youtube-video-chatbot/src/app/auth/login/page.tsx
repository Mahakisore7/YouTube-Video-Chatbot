"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import * as React from "react"
import {Moon, Sun,Eye,EyeOff} from "lucide-react"
import { useTheme } from "next-themes"
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

export default function LoginPage() {
  const { setTheme } = useTheme()
  const [showPassword, setShowPassword] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const [formData, setFormData] = React.useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = React.useState({
    email: '',
    password: ''
  })
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  // Ensure component is mounted to prevent hydration issues
  React.useEffect(() => {
    setMounted(true)
  }, [])

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) return 'Email is required'
    if (!emailRegex.test(email)) return 'Please enter a valid email address'
    return ''
  }

  const validatePassword = (password: string) => {
    if (!password) return 'Password is required'
    if (password.length < 6) return 'Password must be at least 6 characters'
    return ''
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate all fields
    const emailError = validateEmail(formData.email)
    const passwordError = validatePassword(formData.password)

    setErrors({
      email: emailError,
      password: passwordError
    })

    // If no errors, proceed with login
    if (!emailError && !passwordError) {
      try {
        // TODO: Add actual login logic here
        console.log('Login attempt:', formData)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Reset form on success
        setFormData({ email: '', password: '' })
        alert('Login successful!') // Replace with proper success handling
      } catch (error) {
        console.error('Login error:', error)
        alert('Login failed. Please try again.') // Replace with proper error handling
      }
    }
    
    setIsSubmitting(false)
  }

  // Prevent rendering until component is mounted to avoid hydration issues
  if (!mounted) {
    return null
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <Button variant="outline" size="icon" className="fixed top-4 right-4 z-50 animate-bounce" onClick={() => setTheme((theme) => theme === "light" ? "dark" : "light")}>
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
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
                type="email"
                placeholder="m@example.com"
                value={formData.email || ''}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={errors.email ? 'border-red-500 focus:border-red-500' : ''}
                required
              />
              {errors.email && (
                <span className="text-sm text-red-500">{errors.email}</span>
              )}
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
                type={showPassword ? "text" : "password"} 
                placeholder="Password" 
                value={formData.password || ''}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={errors.password ? 'border-red-500 focus:border-red-500' : ''}
                required 
              />
              <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
              </div>
              {errors.password && (
                <span className="text-sm text-red-500">{errors.password}</span>
              )}
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full" disabled={isSubmitting} onClick={handleSubmit}>
          {isSubmitting ? 'Logging in...' : 'Login'}
        </Button>
        <Button variant="outline" className="w-full">
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

