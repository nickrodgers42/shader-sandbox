import React, { useEffect, useRef } from "react"
import { createProgram, createShader } from "./shaderFunctions"

interface ShaderCanvasProps {
    fragShader: string
    vertShader: string
}

const ShaderCanvas = (props: ShaderCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement|null>(null)
  const canvas = <canvas ref={canvasRef} />

  useEffect(() => {
    if (canvasRef.current !== null) {
      canvasRef.current.width = window.innerWidth
      canvasRef.current.height = window.innerHeight
      const gl = canvasRef.current.getContext("webgl")
      if (gl === null) {
          throw Error('Could not get canvas context')
      }
      const fragShader = createShader(gl, gl?.FRAGMENT_SHADER, props.fragShader)
      const vertShader = createShader(gl, gl?.VERTEX_SHADER, props.vertShader)
      const program = createProgram(gl, vertShader, fragShader)

      
      const positionAttributeLocation = gl.getAttribLocation(program, 'a_position')
      const positionBuffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

      const positions = [
        -1, -1,
        -1, 1,
        1, -1,
        1, 1,
        1, -1,
        -1, 1
      ]
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
      gl.clearColor(1, 1, 1, 1)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.useProgram(program)
      gl.enableVertexAttribArray(positionAttributeLocation)
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

      const resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution")
      gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

      const size = 2
      const type = gl.FLOAT
      const normalize = false
      const stride = 0
      const offset = 0
      gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset)
      const primitiveType = gl.TRIANGLES
      const count = 6
      gl.drawArrays(primitiveType, offset, count)
    }
  })

  return (
    <div>
      {canvas}
    </div>
  )
}

export default ShaderCanvas
