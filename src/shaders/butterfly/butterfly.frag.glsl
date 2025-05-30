precision mediump float;

varying vec3 vColor;
varying float vSeed;

void main() {
  vec2 uv = gl_PointCoord - vec2(0.5);
  float d = length(uv);

  float alpha = smoothstep(0.5, 0.25, d);

  gl_FragColor = vec4(vColor, alpha);
}