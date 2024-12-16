"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import axios from "axios"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
    first_name: z.string().min(2, {
        message: "First name must be at least 2 characters.",
    }),
    last_name: z.string().min(2, {
        message: "Last name must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
})

export default function RegistrationForm() {
    const router = useRouter(); // Initialize router
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
        },
    })

    // Handle form submission
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            // Step 1: Send the form data to your backend API for registration
            const registrationResponse = await axios.post("http://127.0.0.1:8000/api/register/", {
                first_name: values.first_name,
                last_name: values.last_name,
                email: values.email,
                password: values.password,
            });

            // Handle successful registration
            if (registrationResponse.status === 201) {
                toast({
                    title: "Registration Successful",
                    description: "Your account has been created.",
                });

                // Step 2: Automatically log in the user by sending login request
                const loginResponse = await axios.post("http://127.0.0.1:8000/api/login/", {
                    email: values.email,
                    password: values.password,
                });

                if (loginResponse.status === 200) {
                    // Store the authentication token in localStorage (or a secure cookie)
                    const token = loginResponse.data.token;
                    localStorage.setItem("authToken", token); // Store the token securely

                    // Step 3: Redirect to the login page after successful registration
                    router.push("/login"); // Change here from '/dashboard' to '/login'
                } else {
                    toast({
                        title: "Login Error",
                        description: "Failed to log in after registration. Please try again.",
                        variant: "destructive",
                    });
                }
            }
        } catch (error) {
            // Handle errors (registration or login failures)
            console.error("Registration or login failed", error);
            toast({
                title: "Error",
                description: "There was an error during registration or login. Please try again.",
                variant: "destructive",
            });
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-[400px] max-w-[90%]">
                <CardHeader>
                    <CardTitle>Register</CardTitle>
                    <CardDescription>Create a new account</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="first_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="John" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="last_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Doe" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="john@example.com" {...field} />
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
                                            <Input type="password" placeholder="********" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Must be at least 8 characters long.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full">Register</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
