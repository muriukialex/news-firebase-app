"use client"

import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "react-hot-toast"
// import AuthProvider from "@/context/AuthContext"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <title>
        News Aggregator App
      </title>
      <body className={inter.className}>
        <Toaster />
        {children}
      </body>
    </html>
  )
}
