#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform float u_time;

// vec4 gl_FragCoord - position of the current pixel being rendered
// vec4 gl_FragColor - output color of the current pixel
void main() {
    // uv is the position of gl_FragCoord in clip space
    // vec2 uv = gl_FragCoord.xy / u_resolution;

    // // center (0, 0) in the middle of the canvas
    // uv -= 0.5;
    // // re-adjust the clip space to be from -1 to 1
    // uv *= 2.0;
    // uv = (uv - 0.5) * 2.0;
    vec2 uv = (gl_FragCoord.xy / u_resolution) * 2.0 - 1.0;
    // scale width to height so it doesn't distort
    uv.x *= u_resolution.x / u_resolution.y;
    // uv = (gl_FragCoord * 2.0 - u_resolution.xy) / u_resolution.y;

    
    float d = length(uv);
    d = sin(d * 8.0 + u_time * 4.0) / 8.0;
    d = abs(d);
    // d = step (0.05, d);
    d = smoothstep(0.08, 0.1, d);


    gl_FragColor = vec4(0.0, d, d, 1.0);
}
