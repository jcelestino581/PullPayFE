'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { AlertCircle, Mail, User, Building } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { motion } from 'framer-motion'

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
            <Alert variant="destructive" className="mx-auto mt-8 max-w-md">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
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
        <div className="container mx-auto px-4 py-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Card className="mb-8">
                    <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.first_name} ${user.last_name}`} alt={`${user.first_name} ${user.last_name}`} />
                            <AvatarFallback>{user.first_name[0]}{user.last_name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-3xl">{user.first_name} {user.last_name}</CardTitle>
                            <CardDescription>{user.email}</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {!isEditing ? (
                            <div className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <User className="h-5 w-5 text-gray-500" />
                                    <span>{user.first_name} {user.last_name}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Mail className="h-5 w-5 text-gray-500" />
                                    <span>{user.email}</span>
                                </div>
                                <Button onClick={() => setIsEditing(true)} className="mt-4">
                                    Edit Profile
                                </Button>
                            </div>
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
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <Building className="h-6 w-6" />
                            <span>Associated Churches</span>
                        </CardTitle>
                        <CardDescription>Churches you're connected with</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {user.churches && user.churches.length > 0 ? (
                            <ul className="space-y-2">
                                {user.churches.map((church) => (
                                    <li key={church.id} className="flex items-center space-x-2">
                                        <Building className="h-4 w-4 text-gray-500" />
                                        <span>{church.name}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500 italic">No churches associated.</p>
                        )}
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}

