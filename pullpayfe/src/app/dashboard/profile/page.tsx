'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface User {
    id: number
    first_name: string
    last_name: string
    email: string
    churches: { id: number; name: string }[]
}

export default function ProfilePage() {
    const [user, setUser] = useState<User | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isEditing, setIsEditing] = useState(false)
    const [editedUser, setEditedUser] = useState<Partial<User> | null>(null)

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
                setEditedUser(userData)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred')
            }
        }

        fetchUserData()
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setEditedUser((prev) => prev ? { ...prev, [name]: value } : null)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!editedUser) return

        try {
            const accessToken = localStorage.getItem('access_token')
            if (!accessToken) {
                throw new Error('User is not logged in.')
            }

            const response = await fetch('http://127.0.0.1:8000/user/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(editedUser),
            })

            if (!response.ok) {
                throw new Error('Failed to update profile')
            }

            const updatedUserData = await response.json()
            setUser(updatedUserData)
            setIsEditing(false)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred')
        }
    }

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
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Your personal details</CardDescription>
                </CardHeader>
                <CardContent>
                    {!isEditing ? (
                        <>
                            <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <Button onClick={() => setIsEditing(true)} className="mt-4">
                                Edit Profile
                            </Button>
                        </>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="first_name">First Name</Label>
                                <Input
                                    id="first_name"
                                    name="first_name"
                                    value={editedUser?.first_name || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="last_name">Last Name</Label>
                                <Input
                                    id="last_name"
                                    name="last_name"
                                    value={editedUser?.last_name || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={editedUser?.email || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="space-x-2">
                                <Button type="submit">Save Changes</Button>
                                <Button variant="outline" onClick={() => setIsEditing(false)}>
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Associated Churches</CardTitle>
                    <CardDescription>Churches you're connected with</CardDescription>
                </CardHeader>
                {/* <CardContent>
                    {user.churches.length > 0 ? (
                        <ul className="list-inside list-disc">
                            {user.churches.map((church) => (
                                <li key={church.id}>{church.name}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No churches associated.</p>
                    )}
                </CardContent> */}
            </Card>
        </div>
    )
}

