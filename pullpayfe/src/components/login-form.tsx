'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Eye, EyeOff } from 'lucide-react'
import axios from 'axios'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
  rememberMe: z.boolean().default(false),
})

export function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('') // To show error message

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setErrorMessage('') // Reset error message

    try {
      // Send login request to the API
      const response = await axios.post('http://127.0.0.1:8000/api/login/', {
        email: values.email,
        password: values.password,
      })

      if (response.status === 200) {
        // Store the authentication token securely (e.g., in localStorage or cookies)
        const token = response.data.token
        localStorage.setItem('authToken', token) // Store token in localStorage

        // Optionally, set expiration of token for "Remember me"
        if (values.rememberMe) {
          // Example: Store token in cookies with expiration date (using js-cookie or similar package)
        }

        // Send the token with the request headers for subsequent requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

        // Redirect to dashboard
        router.push('/dashboard')
      } else {
        // Handle unexpected API response
        setErrorMessage('Login failed. Please check your credentials and try again.')
      }
    } catch (error: any) { // Typing the error
      // Handle login errors
      console.error('Login failed', error)
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.detail || 'An error occurred. Please try again.')
      } else {
        setErrorMessage('An error occurred. Please check your network connection and try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your email and password to access your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Remember me
                    </FormLabel>
                    <FormDescription>
                      Stay logged in on this device
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>} {/* Show error message */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Log in"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant="link" className="px-0 font-normal">
          Forgot password?
        </Button>
      </CardFooter>
    </Card>
  )
}
