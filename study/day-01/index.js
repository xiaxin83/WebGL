/**
 * 绘制矩形
 */
// (function main() {
//     const canvas = document.getElementById("example");
//     if (!canvas) {
//         console.log('Failed to retrieve the <canvas>element');
//         return false
//     }
//     const ctx = canvas.getContext('2d');
//     ctx.fillStyle = 'rgba(0,0,255,1.0)';
//     ctx.fillRect(120,10,150,150)
// })()

/**
 * 绘制三角形
 */
(function main() {
    const canvas = document.getElementById("example");
  const gl = getWebGLContext(canvas);
  if (!gl) {
    console.log("Failed to get the rendering context for WebGL");
  }
//   gl.clearColor(0.0, 0.0, 1.0, 1.0);
//     gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawColor(1.0, 0.0, 0.0, 1.0)
    gl.drawPoint(0,0,0,10)
})();