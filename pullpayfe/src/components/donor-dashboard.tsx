"use client"
import { useEffect, useState } from 'react'
import { AppSidebar } from './dashboard-sidebar'
import { DonorInfo } from './donor-info'
import { TransactionList } from './transaction-list'
import { ChurchList } from './church-list'
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import axios from 'axios'

// Simple Alert component to show error messages
const SimpleAlert = ({ message }: { message: string }) => (
    <div className="alert alert-error">{message}</div>
)

interface DonorInfoProps {
    firstName: string
    lastName: string
    email: string
}

interface Transaction {
    id: number
    amount: number
    date: string
    church: string
}

interface Church {
    id: number
    name: string
    lastDonation: string
}

export function DonorDashboard() {
    const [activeView, setActiveView] = useState<'overview' | 'transactions' | 'churches'>('overview')
    const [donorData, setDonorData] = useState<DonorInfoProps | null>(null)
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [churches, setChurches] = useState<Church[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const fetchData = async () => {
        try {
            const token = localStorage.getItem("authToken")
            if (!token) {
                throw new Error("Authentication token is missing")
            }

            const userResponse = await axios.get("http://127.0.0.1:8000/api/current_user/", {
                withCredentials: true,
                headers: {
                    Authorization: `Token ${token}`,
                },
            })
            const user = userResponse.data

            const [transactionsResponse, churchesResponse] = await Promise.all([
                axios.get("http://127.0.0.1:8000/api/transactions/", {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }),
                axios.get("http://127.0.0.1:8000/api/churches/", {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }),
            ])

            setDonorData({
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
            })
            setTransactions(transactionsResponse.data)
            setChurches(churchesResponse.data)
        } catch (err) {
            console.error("Error fetching data:", err)
            setError("Failed to load dashboard data.")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        // Call fetchData on mount
        fetchData()
    }, [])

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()

        setLoading(true)
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/token/', {
                email,
                password,
            })
            const token = response.data.token
            localStorage.setItem('authToken', token)
            setError(null)
            // Fetch data after login
            fetchData()
        } catch (err) {
            console.error("Login failed", err)
            setError('Login failed. Please check your credentials.')
        } finally {
            setLoading(false)
        }
    }

    if (loading) return <p>Loading...</p>
    if (error) return <p className="text-red-500">{error}</p>

    return (
        <SidebarProvider>
            <div className="flex h-screen">
                <AppSidebar activeView={activeView} setActiveView={setActiveView} />
                <SidebarInset className="flex-1">
                    <header className="flex h-16 items-center gap-4 border-b px-6">
                        <SidebarTrigger />
                        <h1 className="text-2xl font-bold">Donor Dashboard</h1>
                    </header>
                    <main className="flex-1 overflow-auto p-6">
                        {donorData ? (
                            <div>
                                {activeView === 'overview' && (
                                    <>
                                        <DonorInfo
                                            first_name={donorData.firstName}
                                            last_name={donorData.lastName}
                                            email={donorData.email}
                                        />
                                        <Separator className="my-6" />
                                        <TransactionList transactions={transactions.slice(0, 3)} />
                                        <Separator className="my-6" />
                                        <ChurchList churches={churches.slice(0, 3)} />
                                    </>
                                )}
                                {activeView === 'transactions' && <TransactionList transactions={transactions} />}
                                {activeView === 'churches' && <ChurchList churches={churches} />}
                            </div>
                        ) : (
                            <Card>
                                <CardHeader>
                                    <h2 className="text-xl font-bold">Login to Dashboard</h2>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleLogin} className="space-y-4">
                                        {error && <SimpleAlert message={error} />}
                                        <Input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Email"
                                            required
                                        />
                                        <Input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Password"
                                            required
                                        />
                                        <Button type="submit" className="w-full" disabled={loading}>
                                            {loading ? 'Logging in...' : 'Login'}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        )}
                    </main>
                </SidebarInset>
            </div>
        </SidebarProvider>
    )
}
