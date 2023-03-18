// 顶点着色器

const VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'void main() {\n' +
  '  gl_Position = a_Position;\n' +
  '  gl_PointSize = 10.0;\n' +
  '}\n';
// 片着色器
var FSHADER_SOURCE =
  'void main() {\n' +
  '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
  '}\n';

function main(params) {
  const canvas = document.getElementById('webgl');
  const gl = getWebGLContext(canvas)
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }
  //初始化着色器
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }
  const a_Position = gl.getAttribLocation(gl.program, 'a_Position')
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }
  canvas.onmousedown = function (ev) {
    click(ev, gl, canvas, a_Position)
  }
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
}
const g_points = []
function click(ev, gl, canvas, a_Position) {
  console.log(ev);
  let x = ev.clientX;
  let y = ev.clientY;
  let rect = ev.target.getBoundingClientRect();
  console.log(rect);
  x = ((x - rect.left) - canvas.width / 2) / (canvas.width / 2);
  y = (canvas.width / 2 - (y - rect.top)) / (canvas.width / 2);
  g_points.push([x, y]);
  // g_points.push(y)
  gl.clear(gl.COLOR_BUFFER_BIT);
  console.log(g_points);
  const L = g_points.length
  for (let i = 0; i < L; i++) {
    let xy = g_points[i]
    gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);
    gl.drawArrays(gl.POINTS, 0, 1)
  }
}
main()