'use client'
import React from 'react'
import chectMetav2 from './chectMetav2'

export default function ConnectBtn() {
  const { isConnected, shownText, account, gasfee , checkConnection } = chectMetav2();  
  return (
    <>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={() => checkConnection()}
        >
          {shownText} 
        </button>
    </>
  )
}

