import React from 'react'
import SellItem from '../components/SellItem'
import SellItem2 from '../components/SellItem2'

export default function page() {
  return (
    <main className='w-sreen relative grid justify-items-center'>
        <div className='w-4/5 lg:w-2/3'>
            {/* <SellItem/> */}
            <SellItem2/>
        </div>
    </main>
  )
}
