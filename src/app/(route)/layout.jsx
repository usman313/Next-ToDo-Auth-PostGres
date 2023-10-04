import { Navbar } from '@/components'
import React from 'react'

function ProtectedLayout({
  children
}) {
  return (
    <div className=' w-full'>
      <Navbar/>
      {children}
    </div>
  )
}

export default ProtectedLayout