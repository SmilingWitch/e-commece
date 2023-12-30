
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import { AuthProvider } from '../contexts/AuthProvider';


export default function RootLayout({
  children, // will be a page or nested layout
}) {
  return (
    <html lang="en">
      <AuthProvider>
        <body>{children}</body>
      </AuthProvider>
      
    </html>
  )
}

