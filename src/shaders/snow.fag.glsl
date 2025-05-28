precision mediump float;
varying float vAlpha;

void main() {
  float d = distance(gl_PointCoord, vec2(0.5));
  if (d > 0.5) discard;

  gl_FragColor = vec4(1.0, 1.0, 1.0, vAlpha); // 白い雪＋透過
}