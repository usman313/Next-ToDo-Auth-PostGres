import { Navbar } from '@/components'
import React from 'react'
import Script from 'next/script'

function ProtectedLayout({
  children
}) {
  return (
    <>
      <div className=' w-full'>
        <Navbar/>
        {children}
      </div>
      <Script src="https://accounts.google.com/gsi/client" async defer />
    </>
  )
}

export default ProtectedLayout