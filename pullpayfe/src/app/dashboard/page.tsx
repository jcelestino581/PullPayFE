'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface User {
    id: number
    first_name: string
    last_name: string
    email: string
    churches: { id: number; name: string }[]
}

export default function Dashboard() {
    const [user, setUser] = useState<User | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const accessToken = localStorage.getItem('access_token')
                if (!accessToken) {
                    throw new Error('User is not logged in.')
                }

                const response = await fetch('http://127.0.0.1:8000/api/user/', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })

                if (!response.ok) {
                    throw new Error('Failed to fetch user data')
                }

                const userData = await response.json()
                setUser(userData)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred')
            }
        }

        fetchUserData()
    }, [])

    if (error) {
        return (
            <Card className="mx-auto mt-8 max-w-md">
                <CardHeader>
                    <CardTitle className="text-center text-red-500">Error</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-center">{error}</p>
                </CardContent>
            </Card>
        )
    }

    if (!user) {
        return (
            <div className="flex h-full items-center justify-center">
                <p className="text-xl">Loading...</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>User Information</CardTitle>
                    <CardDescription>Your personal details</CardDescription>
                </CardHeader>
                <CardContent>
                    <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Associated Churches</CardTitle>
                    <CardDescription>Churches you're connected with</CardDescription>
                </CardHeader>
                <CardContent>
                    {user.churches.length > 0 ? (
                        <ul className="list-inside list-disc">
                            {user.churches.map((church) => (
                                <li key={church.id}>{church.name}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No churches associated.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
