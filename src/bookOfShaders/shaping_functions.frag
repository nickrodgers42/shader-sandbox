#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;

float plot(vec2 st, float pct) {
    return smoothstep(pct - 0.01, pct, st.y) -
        smoothstep(pct, pct + 0.01, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution;

    // float y = st.x;
    // float y = pow(st.x, 5.0);
    // float y = step(0.5, st.x);
    // float y = smoothstep(0.0, 1.0, st.x);
    // float y = smoothstep(0.2, 0.5, st.x) - smoothstep(0.5, 0.8, st.x);
    // float y = 0.5 * sin(st.x + u_time) + 0.5;
    // float y = abs(sin(PI * st.x + u_time));
    // float y = fract(sin(PI * st.x + u_time));

    // float a = sin(PI * st.x + u_time);
    // float y = ceil(a) + floor(a);

    float y = mod(st.x + u_time / 5.0, 0.5);



    vec3 color = vec3(y);

    float pct = plot(st, y);
    color = (1.0 - pct) * color + pct * vec3(0.0, 1.0, 0.0);
    gl_FragColor = vec4(color, 1.0);
}