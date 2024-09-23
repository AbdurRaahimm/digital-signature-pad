import React, { useEffect, useState } from 'react'

export default function App() {
 const [state, setState] = useState({
  painting: false,
  drawStart: false,
 })


  return (
    <>
      <div className='bg-gradient-to-r from-rose-400 to-red-500 h-screen flex flex-col items-center justify-center gap-5'>
        <h1 className='text-4xl text-white font-bold'>Signature Pad</h1>
        <div className="bg-white  w-72 mx-auto rounded-md py-5 px-6">
          <h3 className='text-md font-bold text-center text-black/55 select-none'>Draw here</h3>
          <canvas
          
            className='w-60 border border-dashed border-rose-500 rounded-lg'>
          </canvas>
          <div className="flex justify-center items-center gap-4 mt-5 ">
            <button  className='bg-gradient-to-r from-rose-400 to-red-500 text-white px-4 py-2 rounded-md capitalize font-bold'>save</button>
            <button className='bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-md capitalize font-bold'>clear</button>
          </div>
        </div>
      </div>
    </>
  )
}
