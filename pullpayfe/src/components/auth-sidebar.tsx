'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Home, Users, LogIn, Settings, HelpCircle, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarFooter } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export default function AuthSidebar() {
    const router = useRouter()
    const { theme, setTheme } = useTheme()

    const handleLogout = () => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        router.push('/login')
    }

    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('access_token') != null

    const menuItems = [
        { icon: Home, label: 'Home', onClick: () => router.push('/') },
        { icon: Settings, label: 'Settings', onClick: () => router.push('/settings') },
        { icon: HelpCircle, label: 'Help', onClick: () => router.push('/help') },
    ]

    const sidebarAnimation = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
    }

    return (
        <SidebarProvider>
            <Sidebar className="w-64 border-r">
                <motion.div
                    className="flex flex-col h-full"
                    initial="hidden"
                    animate="visible"
                    variants={sidebarAnimation}
                >
                    <SidebarHeader className="p-4 border-b">
                        <div className="flex items-center space-x-2">
                            <Avatar>
                                <AvatarImage src="/logo.png" alt="Logo" />
                                <AvatarFallback>Logo</AvatarFallback>
                            </Avatar>
                            <h2 className="text-lg font-semibold">Cool Dashboard</h2>
                        </div>
                    </SidebarHeader>
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupLabel>Menu</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {menuItems.map((item, index) => (
                                        <SidebarMenuItem key={index}>
                                            <SidebarMenuButton
                                                onClick={item.onClick}
                                                className="w-full justify-start hover:bg-accent hover:text-accent-foreground"
                                            >
                                                <item.icon className="mr-2 h-4 w-4" />
                                                <span>{item.label}</span>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                    <SidebarFooter className="mt-auto p-4 border-t">
                        {!isAuthenticated ? (
                            <>
                                <Button
                                    variant="outline"
                                    className="w-full mb-2"
                                    onClick={() => router.push('/login')}
                                >
                                    <LogIn className="mr-2 h-4 w-4" />
                                    Sign In
                                </Button>
                                <Button
                                    variant="default"
                                    className="w-full"
                                    onClick={() => router.push('/register')}
                                >
                                    <Users className="mr-2 h-4 w-4" />
                                    Register
                                </Button>
                            </>
                        ) : (
                            <Button
                                variant="destructive"
                                className="w-full"
                                onClick={handleLogout}
                            >
                                <LogIn className="mr-2 h-4 w-4" />
                                Logout
                            </Button>
                        )}
                        <div className="mt-4 flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">
                                {isAuthenticated ? 'Logged In' : 'Guest'}
                            </span>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                        >
                                            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                            <span className="sr-only">Toggle theme</span>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Toggle theme</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </SidebarFooter>
                </motion.div>
            </Sidebar>
        </SidebarProvider>

        
    )
}