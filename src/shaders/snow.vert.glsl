uniform float uTime;
attribute float aScale;
attribute float aSeed;
varying float vAlpha;

void main() {
  vec3 pos = position;

  // 落下距離（ループさせる）
  float fall = mod(uTime * 1.0 * aScale, 20.0);
  pos.y -= fall;

  // 横揺れ
  pos.x += sin(uTime * 2.5 + aSeed * 10.0) * 0.5;
  pos.z += cos(uTime * 2.5 + aSeed * 15.0) * 0.3;

  // ビルボード表示
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = aScale * 10.0 / -mvPosition.z;
  gl_Position = projectionMatrix * mvPosition;

  // 高い位置でフェードイン（y = position.y - fall が fadeStart の時に透明）
  float fadeStart = 0.0;
  float fadeEnd = 20.0;
  float alpha = 1.0 - clamp((fall - fadeStart) / (fadeEnd - fadeStart), 0.0, 1.0);
  vAlpha = alpha;
}