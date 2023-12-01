
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'



export default function RootLayout({
  children, // will be a page or nested layout
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

