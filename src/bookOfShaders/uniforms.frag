#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;

void main() {
    // gl_FragColor = vec4(abs(sin(u_time)), 0.0, 0.0, 1.0);

    // vec2 st = gl_FragCoord.xy / u_resolution;
    // gl_FragColor = vec4(st.x, st.y, 0.0, 1.0);

    // vec2 st = u_mouse.xy / u_resolution;
    // gl_FragColor = vec4(st.x, st.y, 0.0, 1.0);

    vec2 st = u_mouse.xy / u_resolution;
    gl_FragColor = vec4(st.x, st.y, abs(sin(u_time)), 1.0);

}