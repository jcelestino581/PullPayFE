import React from 'react'
import Link from 'next/link'
import { Home, Settings, HelpCircle, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'

const MainSidebar = () => {
    return (
        <aside className="bg-white w-64 min-h-screen p-4 border-r border-gray-200">
            <div className="flex flex-col h-full">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-purple-700">Your Logo</h1>
                </div>
                <nav className="flex-1">
                    <ul className="space-y-2">
                        {[
                            { icon: Home, label: 'Home', href: '/' },
                            { icon: Settings, label: 'Settings', href: '/settings' },
                            { icon: HelpCircle, label: 'Help', href: '/help' },
                        ].map((item, index) => (
                            <li key={index}>
                                <Button
                                    asChild
                                    variant="ghost"
                                    className="w-full justify-start"
                                >
                                    <Link href={item.href}>
                                        <item.icon className="mr-2 h-4 w-4" />
                                        {item.label}
                                    </Link>
                                </Button>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div>
                    <Button variant="outline" className="w-full">
                        <LogOut className="mr-2 h-4 w-4" /> Log Out
                    </Button>
                </div>
            </div>
        </aside>
    )
}

export default MainSidebar
