/** Low-detail perspective renderer for browsers without WebGL.
 * It projects the same Three.js meshes and camera, rather than swapping to a flat image.
 * Static mesh transforms and lighting are cached; only the camera projection changes.
 */
export function createSoftwareRenderer(THREE) {
  const domElement = document.createElement("canvas");
  const context = domElement.getContext("2d", { alpha: true });
  if (!context) throw new Error("Canvas is unavailable");
  let width = 1,
    height = 1,
    ratio = 1,
    cached = null;
  const view = new THREE.Matrix4();
  const matrix = new THREE.Matrix4();
  const instance = new THREE.Matrix4();
  const a = new THREE.Vector3(),
    b = new THREE.Vector3(),
    c = new THREE.Vector3();
  const normal = new THREE.Vector3(),
    edge = new THREE.Vector3();
  const light = new THREE.Vector3(0.5, 0.85, 0.8).normalize();
  const colour = new THREE.Color();
  const hex = (value) => Math.round(Math.max(0, Math.min(255, value)));

  function cache(scene) {
    scene.updateMatrixWorld(true);
    const faces = [],
      sprites = [];
    scene.traverse((mesh) => {
      if (mesh.isSprite) {
        sprites.push(mesh);
        return;
      }
      if (!mesh.isMesh || !mesh.visible || mesh.material?.isShaderMaterial)
        return;
      const material = Array.isArray(mesh.material)
        ? mesh.material[0]
        : mesh.material;
      if (!material || material.opacity < 0.8) return;
      const geometry = mesh.geometry;
      const vertices = geometry.getAttribute("position");
      const indices = geometry.index;
      const count = indices ? indices.count : vertices.count;
      const copies = mesh.isInstancedMesh ? mesh.count : 1;
      for (let copy = 0; copy < copies; copy++) {
        if (mesh.isInstancedMesh) {
          mesh.getMatrixAt(copy, instance);
          matrix.multiplyMatrices(mesh.matrixWorld, instance);
        } else matrix.copy(mesh.matrixWorld);
        for (let i = 0; i < count; i += 3) {
          a.fromBufferAttribute(
            vertices,
            indices ? indices.getX(i) : i,
          ).applyMatrix4(matrix);
          b.fromBufferAttribute(
            vertices,
            indices ? indices.getX(i + 1) : i + 1,
          ).applyMatrix4(matrix);
          c.fromBufferAttribute(
            vertices,
            indices ? indices.getX(i + 2) : i + 2,
          ).applyMatrix4(matrix);
          normal.subVectors(b, a).cross(edge.subVectors(c, a)).normalize();
          if (material.side === THREE.BackSide) normal.negate();
          const emissive =
            material.emissive?.getHex() > 0 && material.emissiveIntensity >= 1;
          const studio =
            Math.pow(Math.max(0, normal.x * 0.65 + normal.z * 0.76), 20) *
            (material.metalness || 0) *
            0.46;
          const lambert = 0.35 + Math.max(0, normal.dot(light)) * 0.65 + studio;
          colour
            .copy(material.color || new THREE.Color(0xceb4fb))
            .convertLinearToSRGB();
          const shade = emissive ? 1.16 : lambert;
          faces.push({
            points: [
              [a.x, a.y, a.z],
              [b.x, b.y, b.z],
              [c.x, c.y, c.z],
            ],
            n: [normal.x, normal.y, normal.z],
            double: material.side === THREE.DoubleSide,
            colour: `rgb(${hex(colour.r * 255 * shade)},${hex(colour.g * 255 * shade)},${hex(colour.b * 255 * shade)})`,
          });
        }
      }
    });
    return { faces, sprites };
  }
  function clipNear(points) {
    const result = [];
    for (let i = 0; i < points.length; i++) {
      const p = points[i],
        q = points[(i + 1) % points.length];
      const pIn = p[2] < -0.08,
        qIn = q[2] < -0.08;
      if (pIn) result.push(p);
      if (pIn !== qIn) {
        const t = (-0.08 - p[2]) / (q[2] - p[2]);
        result.push([
          p[0] + t * (q[0] - p[0]),
          p[1] + t * (q[1] - p[1]),
          -0.08,
        ]);
      }
    }
    return result;
  }
  return {
    domElement,
    software: true,
    setPixelRatio(value) {
      ratio = Math.min(value, 1.3);
    },
    setClearColor() {},
    setSize(w, h) {
      width = w;
      height = h;
      domElement.width = Math.round(w * ratio);
      domElement.height = Math.round(h * ratio);
    },
    render(scene, camera) {
      if (!cached) cached = cache(scene);
      camera.updateMatrixWorld();
      view.copy(camera.matrixWorldInverse);
      const e = view.elements,
        p = camera.projectionMatrix.elements;
      const eye = camera.position;
      const transform = (v) => [
        e[0] * v[0] + e[4] * v[1] + e[8] * v[2] + e[12],
        e[1] * v[0] + e[5] * v[1] + e[9] * v[2] + e[13],
        e[2] * v[0] + e[6] * v[1] + e[10] * v[2] + e[14],
      ];
      const project = (v) => [
        ((1 + (p[0] * v[0] + p[8] * v[2]) / -v[2]) * width) / 2,
        ((1 - (p[5] * v[1] + p[9] * v[2]) / -v[2]) * height) / 2,
      ];
      const draw = [];
      for (const face of cached.faces) {
        const v = face.points[0],
          n = face.n;
        if (
          !face.double &&
          n[0] * (eye.x - v[0]) +
            n[1] * (eye.y - v[1]) +
            n[2] * (eye.z - v[2]) <=
            0
        )
          continue;
        const transformed = face.points.map(transform);
        if (transformed.every((v) => v[2] >= -0.08)) continue;
        const clipped = transformed.some((v) => v[2] >= -0.08)
          ? clipNear(transformed)
          : transformed;
        const points = clipped.map(project);
        if (
          !points.length ||
          points.every((v) => v[0] < 0) ||
          points.every((v) => v[0] > width) ||
          points.every((v) => v[1] < 0) ||
          points.every((v) => v[1] > height)
        )
          continue;
        draw.push({
          points,
          colour: face.colour,
          depth: transformed.reduce((s, v) => s + v[2], 0) / 3,
        });
      }
      draw.sort((a, b) => a.depth - b.depth);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);
      for (const face of draw) {
        context.beginPath();
        face.points.forEach((p, i) =>
          i ? context.lineTo(p[0], p[1]) : context.moveTo(p[0], p[1]),
        );
        context.closePath();
        context.fillStyle = face.colour;
        context.fill();
        context.strokeStyle = face.colour;
        context.lineWidth = 0.4;
        context.stroke();
      }
      // The same lantern halo remains visible when graphics acceleration is unavailable.
      for (const sprite of cached.sprites) {
        const world = sprite.getWorldPosition(new THREE.Vector3());
        const pos = transform([world.x, world.y, world.z]);
        if (pos[2] > -0.15) continue;
        const centre = project(pos);
        const size = Math.min(
          width * 1.5,
          (sprite.scale.x * p[5] * height) / -pos[2] / 2,
        );
        context.globalCompositeOperation = "screen";
        context.globalAlpha = sprite.material.opacity;
        context.drawImage(
          sprite.material.map.image,
          centre[0] - size / 2,
          centre[1] - size / 2,
          size,
          size,
        );
      }
      context.globalAlpha = 1;
      context.globalCompositeOperation = "source-over";
    },
    dispose() {
      cached = null;
      domElement.remove();
    },
  };
}
