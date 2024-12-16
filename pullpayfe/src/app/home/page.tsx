import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import Image from 'next/image'

export default function HomePage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <Image
                                src="/placeholder.svg"
                                alt="Logo"
                                width={40}
                                height={40}
                                className="h-8 w-auto"
                            />
                            <div className="hidden md:block ml-10">
                                <div className="flex space-x-8">
                                    <Link href="/plans" className="text-gray-700 hover:text-gray-900">
                                        PLANS
                                    </Link>
                                    <Link href="/churches" className="text-gray-700 hover:text-gray-900">
                                        FOR CHURCHES
                                    </Link>
                                    <Link href="/parishes" className="text-gray-700 hover:text-gray-900">
                                        FOR PARISHES
                                    </Link>
                                    <Link href="/solutions" className="text-gray-700 hover:text-gray-900">
                                        SOLUTIONS
                                    </Link>
                                    <Link href="/explore" className="text-gray-700 hover:text-gray-900">
                                        EXPLORE
                                    </Link>
                                    <Link href="/company" className="text-gray-700 hover:text-gray-900">
                                        COMPANY
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Button variant="ghost">SIGN IN</Button>
                            <Button variant="ghost">1-844-PUSHPAY</Button>
                            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                                GET STARTED
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-white to-purple-50">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] opacity-10"></div>
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h1 className="text-5xl font-bold text-gray-900 mb-6">
                                Increase giving, build engagement, and fulfill your mission
                            </h1>
                            <p className="text-xl text-gray-600 mb-8">
                                Get the leading digital engagement platform for churches and parishes.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                                    SEE IT IN ACTION
                                </Button>
                                <Button variant="outline" className="border-2">
                                    TAKE A SELF-GUIDED TOUR
                                </Button>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="w-full h-96 bg-purple-100 rounded-lg shadow-lg"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Products Section */}
            <div className="bg-white py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold text-gray-900 mb-16">
                        Products Designed to Support Your Ministry
                    </h2>
                    <div className="inline-flex items-center rounded-full border-2 p-1">
                        <div className="flex items-center space-x-4 px-4">
                            <Label htmlFor="audience-toggle">FOR CHURCHES</Label>
                            <Switch id="audience-toggle" />
                            <Label htmlFor="audience-toggle">FOR PARISHES</Label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Logo Showcase */}
            <div className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                        {[1, 2, 3, 4].map((index) => (
                            <div key={index} className="flex justify-center">
                                <div className="h-12 w-40 bg-gray-200 rounded"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
