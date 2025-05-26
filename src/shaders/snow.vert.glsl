uniform float uTime;
attribute float aScale;
varying float vAlpha;

void main() {
  vec3 pos = position;

  // 落下アニメーション（時間で Y を下げる）
  pos.y -= mod(uTime * 2.0 * aScale, 20.0); // 高さ20でループ

  // カメラ方向ビルボード
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = aScale * 10.0 / -mvPosition.z;
  gl_Position = projectionMatrix * mvPosition;

  vAlpha = 1.0 - (mod(uTime * aScale, 20.0) / 20.0); // フェードアウト
}