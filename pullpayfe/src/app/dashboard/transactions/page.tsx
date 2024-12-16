"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { AlertCircle, DollarSign, Calendar, User, Building, Plus } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

interface Transaction {
    id: string
    amount: number
    date: string
    user_first_name: string
    user_last_name: string
    church: { id: number; name: string }
    church_name: string
}

interface Church {
    id: number
    name: string
}

const ITEMS_PER_PAGE = 9

export default function TransactionsPage() {
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [churches, setChurches] = useState<Church[]>([])
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isCreating, setIsCreating] = useState(false)
    const [newTransaction, setNewTransaction] = useState({
        amount: '',
        church_id: '',
    })
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (typeof window !== 'undefined') {
                    const accessToken = localStorage.getItem('access_token')
                    if (!accessToken) {
                        throw new Error('User is not logged in.')
                    }

                    const [transactionsResponse, churchesResponse] = await Promise.all([
                        fetch('http://127.0.0.1:8000/api/transactions/', {
                            headers: { Authorization: `Bearer ${accessToken}` },
                        }),
                        fetch('http://127.0.0.1:8000/churches/', {
                            headers: { Authorization: `Bearer ${accessToken}` },
                        })
                    ])

                    if (!transactionsResponse.ok || !churchesResponse.ok) {
                        throw new Error('Failed to fetch data')
                    }

                    const [transactionData, churchData] = await Promise.all([
                        transactionsResponse.json(),
                        churchesResponse.json()
                    ])

                    setTransactions(transactionData)
                    setChurches(churchData)
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred')
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [])

    const handleCreateTransaction = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsCreating(true)
        try {
            const accessToken = localStorage.getItem('access_token')
            if (!accessToken) {
                throw new Error('User is not logged in.')
            }

            const response = await fetch('http://127.0.0.1:8000/transactions/create/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: parseFloat(newTransaction.amount),
                    church_id: parseInt(newTransaction.church_id),
                    church: parseInt(newTransaction.church_id),
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to create transaction')
            }

            const createdTransaction = await response.json()
            setTransactions(prev => [createdTransaction, ...prev])
            setNewTransaction({ amount: '', church_id: '' })
            toast({
                title: "Success",
                description: "Transaction created successfully",
            })
        } catch (err) {
            toast({
                title: "Error",
                description: err instanceof Error ? err.message : 'Failed to create transaction',
                variant: "destructive",
            })
        } finally {
            setIsCreating(false)
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

    const totalAmount = transactions.reduce((sum, transaction) => sum + Number(transaction.amount), 0)
    const totalPages = Math.ceil(transactions.length / ITEMS_PER_PAGE)
    const paginatedTransactions = transactions.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    )

    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold">Transactions</CardTitle>
                    <CardDescription>Your financial activity at a glance</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-semibold">
                        Total Amount: ${totalAmount.toFixed(2)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                        {transactions.length} transactions
                    </div>
                </CardContent>
            </Card>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Create New Transaction</CardTitle>
                    <CardDescription>Add a new transaction to your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleCreateTransaction} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="amount">Amount</Label>
                            <Input
                                id="amount"
                                type="number"
                                step="0.01"
                                placeholder="Enter amount"
                                value={newTransaction.amount}
                                onChange={(e) => setNewTransaction(prev => ({ ...prev, amount: e.target.value }))}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="church">Church</Label>
                            <Select
                                value={newTransaction.church_id}
                                onValueChange={(value) => setNewTransaction(prev => ({ ...prev, church_id: value }))}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a church" />
                                </SelectTrigger>
                                <SelectContent>
                                    {churches.map((church) => (
                                        <SelectItem key={church.id} value={church.id.toString()}>
                                            {church.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <Button type="submit" disabled={isCreating}>
                            {isCreating ? 'Creating...' : 'Create Transaction'}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {isLoading ? (
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <Card key={i}>
                            <CardHeader>
                                <Skeleton className="h-4 w-[250px]" />
                                <Skeleton className="h-4 w-[200px]" />
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="h-4 w-[300px]" />
                                <Skeleton className="h-4 w-[250px]" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {paginatedTransactions.map((transaction, index) => (
                            <motion.div
                                key={transaction.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center justify-between">
                                            <span>${Number(transaction.amount).toFixed(2)}</span>
                                            <DollarSign className="h-5 w-5 text-green-500" />
                                        </CardTitle>
                                        <CardDescription>{transaction.church?.name || 'No Church'}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex items-center">
                                                <User className="mr-2 h-4 w-4" />
                                                {transaction.user_first_name} {transaction.user_last_name}
                                            </div>
                                            <div className="flex items-center">
                                                <Calendar className="mr-2 h-4 w-4" />
                                                {new Date(transaction.date).toLocaleString()}
                                            </div>
                                            <div className="flex items-center">
                                                <Building className="mr-2 h-4 w-4" />
                                                {transaction.church_name}
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button variant="outline" size="sm" className="w-full">
                                            View Details
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                    <div className="mt-8">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                    />
                                </PaginationItem>
                                {[...Array(totalPages)].map((_, index) => (
                                    <PaginationItem key={index}>
                                        <PaginationLink
                                            onClick={() => setCurrentPage(index + 1)}
                                            isActive={currentPage === index + 1}
                                        >
                                            {index + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}
                                <PaginationItem>
                                    <PaginationNext
                                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </>
            )}
        </div>
    )
}
