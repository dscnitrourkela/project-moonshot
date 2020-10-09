import React from 'react'
import Sketch from 'react-p5'

function P5({width, height}) {
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(width, height).parent(canvasParentRef)
  }

  const draw = (p5) => {
    p5.background(7, 37, 64)
    p5.stroke(255)
    p5.line(100, 200, 300, 400)
  }

  return (
    <Sketch setup={setup} draw={draw} />
  )
}

export default P5