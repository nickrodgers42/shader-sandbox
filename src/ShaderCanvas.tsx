import React, { useEffect, useRef, useState } from "react"
import { createProgram, createShader } from "./shaderFunctions"

interface ShaderCanvasProps {
  fragShader: string
  vertShader: string
}

const ShaderCanvas = (props: ShaderCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const canvas = <canvas ref={canvasRef} />
  const [previousTime, setPreviousTime] = useState(0)

  const loop = (time: number) => {
    // const elapesdTime = time - previousTime
    // setPreviousTime(time)
    // update()
    render(time)
    requestAnimationFrame(loop)
  }

  const setCanvasSize = (canvas: HTMLCanvasElement) => {
    canvas.height = window.innerHeight
    canvas.width = window.innerWidth
  }

  const compileShader = (gl: WebGLRenderingContext): WebGLProgram => {
    const fragShader = createShader(gl, gl?.FRAGMENT_SHADER, props.fragShader)
    const vertShader = createShader(gl, gl?.VERTEX_SHADER, props.vertShader)
    return createProgram(gl, vertShader, fragShader)
  }

  const setUTime = (gl: WebGLRenderingContext, program: WebGLProgram, time: number): void => {
    const timeUniformLocation = gl.getUniformLocation(program, "u_time")
    gl.uniform1f(timeUniformLocation, time / 1000)
  }

  const setUResolution = (gl: WebGLRenderingContext, program: WebGLProgram): void => {
    const resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution")
    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height)
  }

  const setUniforms = (gl: WebGLRenderingContext, program: WebGLProgram, time: number): void => {
    setUTime(gl, program, time)
    setUResolution(gl, program)
    // TODO: setUMouse()
  }

  const render = (time: number): void => {
    if (canvasRef.current === null) {
      return
    }

    setCanvasSize(canvasRef.current)

    const gl = canvasRef.current.getContext("webgl")
    if (gl === null) {
      throw Error('Could not get canvas context')
    }

    const program = compileShader(gl)

    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position')
    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

    // We have to draw two traingles to cover the canvas
    const positions = [
      // Triangle 1
      -1, -1,
      -1, 1,
      1, -1,
      // Triangle 2
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

    setUniforms(gl, program, time)

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

  useEffect(() => {
    requestAnimationFrame(loop)
  }, [])

  return (
    <div>
      {canvas}
    </div>
  )
}

export default ShaderCanvas
