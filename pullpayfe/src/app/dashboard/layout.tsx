'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Home, Users, Church, LogOut } from 'lucide-react'
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter()

    const handleLogout = () => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        router.push('/login')
    }

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
                                        <SidebarMenuButton onClick={() => router.push('/dashboard')}>
                                            <Home className="mr-2 h-4 w-4" />
                                            <span>Home</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton onClick={() => router.push('/dashboard/profile')}>
                                            <Users className="mr-2 h-4 w-4" />
                                            <span>Profile</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton onClick={() => router.push('/dashboard/churches')}>
                                            <Church className="mr-2 h-4 w-4" />
                                            <span>Churches</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton onClick={handleLogout}>
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <span>Logout</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
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

