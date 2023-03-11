/**
 * 顶点着色器(指定点的位置和尺寸)
 */
const VSHADER_SOURCE =
  "void main() {\n" +
  "  gl_Position = vec4(0.5, 0.5, 0.0, 1.0);\n" + // Set the vertex coordinates of the point
  "  gl_PointSize = 10.0;\n" + // Set the point size
  "}\n";
  /**
 * 片元着色器
 */
const FSHADER_SOURCE =
    "void main() {\n" +
    "gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n" + // Set the point color
    "}\n";

(function main() {
  const canvas = document.getElementById("webgl");
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log("Failed to get the rendering context for WebGL");
    return;
  }

  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log("Failed to intialize shaders.");
    return;
  }
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  gl.clear(gl.COLOR_BUFFER_BIT);
  // Draw a point
    gl.drawArrays(gl.POINTS, 0, 1);
    
})();