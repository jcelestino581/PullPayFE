'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Home, Users, LogIn } from 'lucide-react'
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

export default function AuthSidebar({ children }: { children: React.ReactNode }) {
    const router = useRouter()

    const handleLogout = () => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        router.push('/login')
    }

    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('access_token') != null

    return (
        <SidebarProvider>
            <div className="flex h-screen">
                <Sidebar className="w-64">
                    <SidebarHeader>
                        <h2 className="px-6 text-lg font-semibold">Dashboard</h2>
                    </SidebarHeader>
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupLabel>Menu</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton onClick={() => router.push('/')}>
                                            <Home className="mr-2 h-4 w-4" />
                                            <span>Home</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>

                                    {/* If not authenticated, show "Sign In" and "Register" */}
                                    {!isAuthenticated ? (
                                        <>
                                            <SidebarMenuItem>
                                                <SidebarMenuButton onClick={() => router.push('/login')}>
                                                    <LogIn className="mr-2 h-4 w-4" />
                                                    <span>Sign In</span>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                            <SidebarMenuItem>
                                                <SidebarMenuButton onClick={() => router.push('/register')}>
                                                    <Users className="mr-2 h-4 w-4" />
                                                    <span>Register</span>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        </>
                                    ) : (
                                        // If authenticated, show "Logout"
                                        <SidebarMenuItem>
                                            <SidebarMenuButton onClick={handleLogout}>
                                                <LogIn className="mr-2 h-4 w-4" />
                                                <span>Logout</span>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    )}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                </Sidebar>
                <main className="flex-1 overflow-auto p-6">
                    <SidebarTrigger className="mb-4 lg:hidden" />
                    {children}
                </main>
            </div>
        </SidebarProvider>
    )
}