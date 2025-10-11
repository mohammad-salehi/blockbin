'use client'

import React, { useState } from 'react'
import { useParams, usePathname, useRouter } from 'next/navigation'

import AddressPage from '@/layouts/Explorer/Address/AddressPage'
import TransactionPage from '@/layouts/Explorer/Transaction/TransactionPage'
const page = () => {

  const params = useParams()

  const query = params.query
  const network = params.network
  const hash = params.hash

  return (
    <div>
      {
        query === 'address' ?
          <AddressPage />
          :
          null
      }
      {
        query === 'transaction' ?
          <TransactionPage />
          :
          null
      }
    </div>
  )
}

export default page
