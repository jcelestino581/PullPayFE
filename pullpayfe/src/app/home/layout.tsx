import React from 'react'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import AuthSidebar from '@/components/auth-sidebar'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex h-screen bg-background">
            <AuthSidebar />
            <main className="flex-1 overflow-auto p-6">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
