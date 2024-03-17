import React, { useRef, useEffect } from 'react'
import {
  Box,
} from '@mui/material'

const Canvas = props => {
  
  const canvasRef = useRef(null)
  
  useEffect(() => {
    
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    let frameCount = 0
    let animationFrameId
    
    //Our draw came here
    const render = () => {
      frameCount++
      props.draw(context, frameCount)
      animationFrameId = window.requestAnimationFrame(render)
    }
    render()
    
    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [props.draw])
  
  return (
    <Box
    sx={{overflow: 'hidden',
    m: 0,
    p: 0,}}
    >
        <canvas ref={canvasRef} {...props}/>
    </Box>
  )
}

export default Canvas