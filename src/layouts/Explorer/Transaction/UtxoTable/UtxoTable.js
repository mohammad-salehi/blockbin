import React from 'react'
import InputsTable from './InputsTable/InputsTable'
import OutputsTable from './OutputsTable/OutputsTable'

const UtxoTable = () => {
  return (
    <div className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-2 mt-4">
      <div className='ml-2'>
        <InputsTable />
      </div>

      <div className='mr-2'>
        <OutputsTable />
      </div>
    </div>
  )
}

export default UtxoTable
