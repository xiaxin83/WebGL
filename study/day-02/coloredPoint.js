// 顶点着色器

const VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'void main() {\n' +
  '  gl_Position = a_Position;\n' +
  '  gl_PointSize = 10.0;\n' +
  '}\n';
// 片着色器
var FSHADER_SOURCE =
  'precision mediump float;\n' +
  'uniform vec4 u_FragColor;\n' + //uniform变量
  'void main() {\n' +
  '  gl_FragColor = u_FragColor;\n' +
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
  const u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  if (u_FragColor < 0) {
    console.log('Failed to get the storage location of u_FragColor');
    return;
  }
  canvas.onmousedown = function (ev) {
    click(ev, gl, canvas, a_Position, u_FragColor)
  }
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
}
const g_points = [];
const g_color = [];
function click(ev, gl, canvas, a_Position, u_FragColor) {
  console.log(ev);
  let x = ev.clientX;
  let y = ev.clientY;
  let rect = ev.target.getBoundingClientRect();
  console.log(rect);
  x = ((x - rect.left) - canvas.width / 2) / (canvas.width / 2);
  y = (canvas.width / 2 - (y - rect.top)) / (canvas.width / 2);
  g_points.push([x, y]);
  if (x >= 0.0 && y >= 0.0) {
    g_color.push([1.0, 0.0, 0.0, 1.0])
  } else if (x < 0.0 && y < 0.0) {
    g_color.push([0.0, 1.0, 0.0, 10])
  } else {
    g_color.push([1.0, 1.0, 1.0, 1.0])
  }
  // g_points.push(y)
  gl.clear(gl.COLOR_BUFFER_BIT);
  console.log(g_points);
  const L = g_points.length
  for (let i = 0; i < L; i++) {
    let xy = g_points[i]
    const rgba = g_color[i]
    gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3])
    gl.drawArrays(gl.POINTS, 0, 2)
  }
}
main()