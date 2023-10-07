#ifdef GL_ES
precision mediump float;
#endif

// a_position is the position of the current vertex
attribute vec2 a_position;
uniform vec2 u_resolution;

void main() {
    gl_Position = vec4(a_position, 0, 1);
}
