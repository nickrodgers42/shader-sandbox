let debugFont;
let myShader;


function preload() {
    myShader = loadShader(
        'src/shader.vert',
        'src/bookOfShaders/shaping_functions.frag');
    debugFont = loadFont('assets/FiraCode-Regular.ttf');
}


function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    const gl = canvas.getContext('webgl');
    gl.disable(gl.DEPTH_TEST);
}


function draw_fps() {
    fill('rgba(255, 255, 255, 0.5)');
    rect(
        (-windowWidth / 2) + 20,
        (-windowHeight / 2) + 20,
        280, 30)
    fill(0, 0, 0);
    textAlign(CENTER);
    textFont(debugFont);
    textSize(18);
    fps = Math.round(frameRate())
    text(
        `Frames per second: ${fps.toString()}`,
        (-windowWidth / 2) + 20,
        (-windowHeight / 2) + 20,
        280, 30);
}


function draw() {
    shader(myShader);
    myShader.setUniform('u_time', millis() / 1000.0);
    myShader.setUniform('u_mouse', [mouseX, mouseY]);
    myShader.setUniform('u_resolution', [windowWidth, windowHeight]);
    rect(0, 0, width, height);

    resetShader();
    draw_fps();
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}