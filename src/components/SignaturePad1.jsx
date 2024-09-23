import React, { useEffect, useState, useRef } from 'react'

export default function SignaturePad1() {
    const canvasRef = useRef(null) // create a reference to the canvas
    useEffect(() => {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
    , []) // run only once when the component
  
  
    const [isDrawing, setIsDrawing] = useState(false)
    const [startX, setStartX] = useState(0)
    const [startY, setStartY] = useState(0)
  
    const handleMouseDown = (e) => {
      setIsDrawing(true)
      setStartX(e.nativeEvent.offsetX)
      setStartY(e.nativeEvent.offsetY)
    }
  
    const handleMouseMove = (e) => {
      if (!isDrawing) return
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      ctx.strokeStyle = 'black'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(startX, startY)
      ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
      ctx.stroke()
      setStartX(e.nativeEvent.offsetX)
      setStartY(e.nativeEvent.offsetY)
    }
  
    const handleMouseUp = () => {
      setIsDrawing(false)
    }
  
    const handleMouseLeave = () => {
      setIsDrawing(false)
    }
  
    const handleClear = () => {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
  
    return (
        <div className='bg-gradient-to-r from-rose-400 to-red-500 h-screen flex flex-col items-center justify-center gap-5'>
            <h1 className='text-4xl text-white font-bold'>Signature Pad</h1>
            <div className="bg-white  w-72 mx-auto rounded-md py-5 px-6">
                <h3 className='text-md font-bold text-center text-black/55 select-none'>Draw here</h3>
                <canvas
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}
                    ref={canvasRef}
                    className='w-60 border border-dashed border-rose-500 rounded-lg'>
                </canvas>
                <div className="flex justify-center items-center gap-4 mt-5 ">
                    <button className='bg-gradient-to-r from-rose-400 to-red-500 text-white px-4 py-2 rounded-md capitalize font-bold'>save</button>
                    <button onClick={handleClear} className='bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-md capitalize font-bold'>clear</button>
                </div>
            </div>
        </div>
    )
}
