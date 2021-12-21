import React from 'react'
import { Header } from './Header'

export default function Layout({ children }) {
  return (
    <div>
      <div className="bg-gray-100 min-h-screen">

        <Header />
        {children}
      </div>
    </div>
  )
}
