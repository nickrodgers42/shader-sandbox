/**
 * Reference: https://webglfundamentals.org/webgl/lessons/webgl-fundamentals.html
 */
export function createShader(gl: WebGLRenderingContext, type: GLenum, source: string): WebGLShader {
    const shader = gl.createShader(type)
    if (shader === null) {
        throw Error("Could not create shader")
    }

    gl.shaderSource(shader, source)
    gl.compileShader(shader)

    const compileSuccess = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
    if (!compileSuccess) {
        const errorMsg = gl.getShaderInfoLog(shader)
        gl.deleteShader(shader)
        throw Error(errorMsg || "Could not compile shader")
    }
    return shader
}

/**
 * Reference: https://webglfundamentals.org/webgl/lessons/webgl-fundamentals.html
 */
export function createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram {
    const program = gl.createProgram()
    if (program === null) {
        throw Error("Could not create program")
    }

    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)

    gl.linkProgram(program)

    const linkSuccess = gl.getProgramParameter(program, gl.LINK_STATUS)
    if (!linkSuccess) {
        gl.deleteProgram(program)
        throw Error("Could not link program")
    }
    return program
}

