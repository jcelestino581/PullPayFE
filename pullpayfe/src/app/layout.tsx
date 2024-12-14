"use client"
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

import "./globals.css";
import { useState } from "react";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Set to true or false as needed

  return (
    <html lang="en">
      <body>
        {isLoggedIn ? (
          <SidebarProvider>
            <AppSidebar />
            {children}
          </SidebarProvider>
        ) : (
          <>{children}</>
        )}
      </body>
    </html>
  );
}
