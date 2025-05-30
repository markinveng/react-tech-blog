uniform float uTime;
attribute float aSeed;
varying vec3 vColor;
varying float vSeed;

void main() {
  vec3 pos = position;

  // 揺らぎ
  pos.x += sin(uTime * 2.0 + aSeed * 10.0) * 0.1;
  pos.y += cos(uTime * 1.5 + aSeed * 5.0) * 0.1;

  vColor = vec3(0.6, 0.8, 1.0); // 発光色
  vSeed = aSeed; // フラグメント側に渡す（必要なら）

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = 5.0;
  gl_Position = projectionMatrix * mvPosition;
}

