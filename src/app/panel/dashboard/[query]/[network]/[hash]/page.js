'use client'

import React, { useState } from 'react'
import { useParams, usePathname, useRouter } from 'next/navigation'

import AddressPage from '@/layouts/Explorer/Address/AddressPage'
const page = () => {

  const params = useParams()

  const  query  = params.query
  const  network = params.network
  const  hash = params.hash

  return (
    <div>
      {
        query === 'address' ?
          <AddressPage />
          :
          null
      }
    </div>
  )
}

export default page
