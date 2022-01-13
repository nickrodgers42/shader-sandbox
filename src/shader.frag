#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution; // Canvas size (width, height)
uniform vec2 u_mouse; // Mouse position in screen pixels
uniform float u_time; // Time in seconds since load


float plot(vec2 st, float pct) {
    return smoothstep(pct - 0.005, pct, st.x) -
        smoothstep(pct, pct + 0.005, st.y);
}

vec3 normal_rgb(vec3 rgb_color) {
    return rgb_color / 255.0;
}

vec3 normal_rgb(float r, float g, float b) {
    return normal_rgb(vec3(r, g, b));
}


void main() {
    vec2 st = gl_FragCoord.xy / u_resolution;
    vec3 color = vec3(0.0);
    vec3 pct = vec3(smoothstep(0.0, 1.0, st.y));
    pct = vec3(sin(u_time + st.y * PI));

    vec3 red = normal_rgb(255.0, 165.0, 44.0);
    vec3 orange = normal_rgb(255.0, 165.0, 44.0);
    vec3 yellow = normal_rgb(255.0, 255.0, 65.0);
    vec3 green = normal_rgb(0.0, 128.0, 24.0);
    vec3 blue = normal_rgb(0.0, 0.0, 249.0);
    vec3 purple = normal_rgb(134.0, 0.0, 125.0);
    vec3 rainbow[6];
    rainbow[0] = red;
    rainbow[1] = orange;
    rainbow[2] = yellow;
    rainbow[3] = green;
    rainbow[4] = blue;
    rainbow[5] = purple;

    // color = mix(color, vec3(1.0, 0.0, 0.0), plot(st, pct.r));
    // color = mix(color, vec3(0.0, 1.0, 0.0), plot(st, pct.g));
    // color = mix(color, vec3(0.0, 0.0, 1.0), plot(st, pct.b));

    gl_FragColor = vec4(color, 1.0);
}