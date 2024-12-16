'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { motion } from 'framer-motion'
import { AlertCircle, User, Mail, Building, Activity, DollarSign, Users } from 'lucide-react'
import Link from 'next/link'

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
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const accessToken = localStorage.getItem('access_token')
                if (!accessToken) {
                    router.push('/login')
                    return
                }

                const response = await fetch('http://127.0.0.1:8000/api/user/', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })

                if (!response.ok) {
                    if (response.status === 401) {
                        localStorage.removeItem('access_token')
                        router.push('/login')
                        return
                    }
                    throw new Error('Failed to fetch user data')
                }

                const userData = await response.json()
                setUser(userData)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred')
            } finally {
                setIsLoading(false)
            }
        }

        fetchUserData()
    }, [router])

    if (error) {
        return (
            <div className="flex-1 flex justify-center items-start pt-8">
                <Alert variant="destructive" className="max-w-md">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className="flex-1 flex justify-center">
                <div className="w-full max-w-xl pt-8 px-4">
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-8 w-[250px]" />
                            <Skeleton className="h-4 w-[200px]" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <Skeleton className="h-4 w-[300px] mt-4" />
                            <Skeleton className="h-4 w-[250px] mt-2" />
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    if (!user) {
        return null
    }

    return (
        <div className="flex-1 flex justify-center">
            <div className="w-full max-w-xl pt-8 px-4 space-y-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Card>
                        <CardHeader>
                            <div className="flex items-center space-x-4">
                                <Avatar className="h-16 w-16 bg-primary">
                                    <AvatarFallback className="text-xl text-primary-foreground">
                                        {user.first_name[0]}{user.last_name[0]}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <CardTitle className="text-2xl">Welcome, {user.first_name}!</CardTitle>
                                    <CardDescription>Here's your dashboard overview</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4">
                                <div className="flex items-center space-x-2">
                                    <User className="h-4 w-4 text-muted-foreground" />
                                    <span>{user.first_name} {user.last_name}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <span>{user.email}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Building className="h-4 w-4 text-muted-foreground" />
                                    <span>{user.churches.length} Associated Churches</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Activity className="h-4 w-4 text-muted-foreground" />
                                    <span>Last login: Today</span>
                                </div>
                            </div>
                            <Button asChild className="w-full">
                                <Link href="/profile">View Full Profile</Link>
                            </Button>
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
                            <div className="flex items-center space-x-2">
                                <Building className="h-5 w-5" />
                                <CardTitle>Associated Churches</CardTitle>
                            </div>
                            <CardDescription>Churches you're connected with</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {user.churches.length > 0 ? (
                                <div className="space-y-2">
                                    {user.churches.map((church) => (
                                        <div key={church.id} className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <Building className="h-4 w-4 text-muted-foreground" />
                                                <span>{church.name}</span>
                                            </div>
                                            <Badge variant="secondary">Active</Badge>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground italic">No churches associated.</p>
                            )}
                            <Button variant="outline" asChild className="w-full">
                                <Link href="/churches">Manage Churches</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <Card>
                        <CardHeader>
                            <div className="flex items-center space-x-2">
                                <Activity className="h-5 w-5" />
                                <CardTitle>Recent Activity</CardTitle>
                            </div>
                            <CardDescription>Your latest actions and updates</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <DollarSign className="h-4 w-4 text-green-500" />
                                        <span>Donation made to St. Mary's Church</span>
                                    </div>
                                    <Badge>2 days ago</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Users className="h-4 w-4 text-blue-500" />
                                        <span>Joined First Baptist Church group</span>
                                    </div>
                                    <Badge>1 week ago</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Activity className="h-4 w-4 text-purple-500" />
                                        <span>Updated profile information</span>
                                    </div>
                                    <Badge>2 weeks ago</Badge>
                                </div>
                            </div>
                            <Button variant="link" className="w-full">View All Activity</Button>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    )
}

