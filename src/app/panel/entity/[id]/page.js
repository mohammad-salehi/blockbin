'use client'

import React, { useEffect } from 'react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { GetRequest } from '@/functions/GetRequest'
import { serverAddress } from '@/functions/ServerAddress'

const Page = () => {
  const params = useParams()
  const id = params.id

  useEffect(() => {
    GetRequest(`${serverAddress}/entity/${id}/`)
    .then((response) => {
      console.log(response)
    })
    .catch((err) => {
      console.log(err)
    })
  },[])
  return (
    <div>
      id
    </div>
  )
}

export default Page
