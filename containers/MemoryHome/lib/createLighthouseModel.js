/** Architectural lighthouse with an enclosed, camera-accessible spiral interior. */
export function createLighthouseModel(THREE, scene) {
  const structure = new THREE.Group();
  scene.add(structure);
  const body = new THREE.MeshPhysicalMaterial({
    color: 0x968aa9,
    metalness: 0.67,
    roughness: 0.31,
    clearcoat: 0.55,
    clearcoatRoughness: 0.23,
  });
  const graphite = new THREE.MeshStandardMaterial({
    color: 0x2c2736,
    metalness: 0.8,
    roughness: 0.28,
  });
  const silver = new THREE.MeshStandardMaterial({
    color: 0xe6def0,
    metalness: 0.9,
    roughness: 0.2,
  });
  const innerWall = new THREE.MeshStandardMaterial({
    color: 0x211c28,
    metalness: 0.22,
    roughness: 0.65,
    side: THREE.BackSide,
  });
  const stairs = new THREE.MeshStandardMaterial({
    color: 0x8a7e9d,
    metalness: 0.58,
    roughness: 0.34,
  });
  const edgeMetal = new THREE.MeshStandardMaterial({
    color: 0x9e91b1,
    metalness: 0.82,
    roughness: 0.3,
  });
  const lightRibbon = new THREE.MeshStandardMaterial({
    color: 0xceb4fb,
    emissive: 0xceb4fb,
    emissiveIntensity: 0.7,
    metalness: 0.2,
    roughness: 0.35,
  });
  const glass = new THREE.MeshPhysicalMaterial({
    color: 0xc4b6e3,
    metalness: 0.12,
    roughness: 0.09,
    clearcoat: 1,
    transparent: true,
    opacity: 0.19,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const add = (geometry, material, x = 0, y = 0, z = 0) => {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    structure.add(mesh);
    return mesh;
  };
  const ring = (r, thickness, y, material = silver) => {
    const mesh = add(
      new THREE.TorusGeometry(r, thickness, 10, 96),
      material,
      0,
      y,
    );
    mesh.rotation.x = Math.PI / 2;
    return mesh;
  };
  const lathe = (profile, material) => {
    const ordered =
      profile[0][1] > profile.at(-1)[1] ? [...profile].reverse() : profile;
    return add(
      new THREE.LatheGeometry(
        ordered.map(([r, y]) => new THREE.Vector2(r, y)),
        96,
      ),
      material,
    );
  };
  const strut = (start, end, radius, material = silver) => {
    const a = new THREE.Vector3(...start),
      b = new THREE.Vector3(...end);
    const mesh = add(
      new THREE.CylinderGeometry(radius, radius, a.distanceTo(b), 6),
      material,
    );
    mesh.position.copy(a).add(b).multiplyScalar(0.5);
    mesh.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      b.sub(a).normalize(),
    );
    return mesh;
  };

  // One turned, bevelled plinth instead of the stacked oversized discs.
  lathe(
    [
      [0, -0.25],
      [3.56, -0.25],
      [3.75, -0.16],
      [3.82, -0.04],
      [3.79, 0.09],
      [3.64, 0.16],
      [3.42, 0.2],
      [3.28, 0.38],
      [3.23, 0.54],
      [0, 0.54],
    ],
    graphite,
  );
  ring(3.68, 0.017, 0.15);
  ring(3.76, 0.012, -0.025, edgeMetal);
  ring(3.48, 0.014, 0.18, lightRibbon);
  lathe(
    [
      [3.18, 0.45],
      [3.23, 0.51],
      [3.23, 0.63],
      [3.17, 0.7],
      [3.12, 0.73],
    ],
    body,
  );
  ring(3.22, 0.021, 0.63, silver);

  // A smooth tapered shell with genuine openings, not a transparent wire cylinder.
  const radiusAt = (y) =>
    2.59 +
    0.53 * Math.pow(1 - Math.min(1, Math.max(0, (y - 0.65) / 14.85)), 1.5);
  const windowHeights = [3.05, 7.45, 11.85];
  const windowAngles = [Math.PI / 2, Math.PI, Math.PI * 1.5, Math.PI * 2];
  const levels = [0.66, 1.2, 2.0, 5.5, 9.5, 14, 14.8, 15.42];
  windowHeights.forEach((y) =>
    [-0.68, -0.64, 0.52, 0.62, 0.72, 0.82, 0.92, 1.01, 1.05].forEach((d) =>
      levels.push(y + d),
    ),
  );
  levels.sort((a, b) => a - b);
  const segments = 160,
    vertices = [],
    indices = [];
  for (const y of levels) {
    const r = radiusAt(y);
    for (let i = 0; i <= segments; i++) {
      const a = (i / segments) * Math.PI * 2;
      vertices.push(Math.cos(a) * r, y, Math.sin(a) * r);
    }
  }
  function inWindow(y, a) {
    return windowHeights.some((wy) => {
      const dy = y - wy;
      if (dy < -0.65 || dy > 1.02) return false;
      const halfWidth =
        dy <= 0.62
          ? 0.43
          : Math.sqrt(Math.max(0, 0.43 ** 2 - (dy - 0.62) ** 2));
      return windowAngles.some(
        (wa) =>
          Math.abs(Math.atan2(Math.sin(a - wa), Math.cos(a - wa))) *
            radiusAt(y) <
          halfWidth,
      );
    });
  }
  for (let row = 0; row < levels.length - 1; row++) {
    const y = (levels[row] + levels[row + 1]) / 2;
    for (let col = 0; col < segments; col++) {
      const a = ((col + 0.5) / segments) * Math.PI * 2;
      if (inWindow(y, a)) continue;
      const p = row * (segments + 1) + col,
        q = p + segments + 1;
      indices.push(p, q, p + 1, p + 1, q, q + 1);
    }
  }
  const shellGeometry = new THREE.BufferGeometry();
  shellGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3),
  );
  shellGeometry.setIndex(indices);
  shellGeometry.computeVertexNormals();
  add(shellGeometry, body);
  const interior = add(shellGeometry, innerWall);
  interior.scale.set(0.984, 1, 0.984);

  // Fine horizontal reveals separate the tapered metal shell into three courses.
  for (const y of [5.8, 10.2]) {
    ring(radiusAt(y) + 0.006, 0.018, y, graphite);
    ring(radiusAt(y) + 0.006, 0.009, y + 0.04, silver);
  }
  // Standing seams follow the taper, between the window bays.
  for (let i = 0; i < 16; i++) {
    const a = ((i + 0.5) / 16) * Math.PI * 2;
    const seam = [];
    for (let j = 0; j <= 30; j++) {
      const y = 0.78 + (j / 30) * 14.39;
      const r = radiusAt(y) + 0.01;
      seam.push(new THREE.Vector3(Math.cos(a) * r, y, Math.sin(a) * r));
    }
    add(
      new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3(seam),
        30,
        0.011,
        4,
        false,
      ),
      edgeMetal,
    );
  }

  // Recessed arched window reveals with fine gunmetal surrounds.
  for (const wy of windowHeights)
    for (const wa of windowAngles) {
      const path = [];
      const point = (x, y, inset = 0) => {
        const r = radiusAt(y) + 0.018 - inset,
          a = wa + x / r;
        return new THREE.Vector3(Math.cos(a) * r, y, Math.sin(a) * r);
      };
      path.push(point(-0.43, wy - 0.65), point(-0.43, wy + 0.62));
      for (let i = 0; i <= 16; i++) {
        const a = Math.PI - (i / 16) * Math.PI;
        path.push(point(Math.cos(a) * 0.43, wy + 0.62 + Math.sin(a) * 0.43));
      }
      path.push(point(0.43, wy - 0.65), point(-0.43, wy - 0.65));
      const curve = new THREE.CatmullRomCurve3(path, false, "chordal", 0.1);
      add(new THREE.TubeGeometry(curve, 44, 0.045, 6, false), graphite);
      const innerCurve = new THREE.CatmullRomCurve3(
        path.map((p) => new THREE.Vector3(p.x * 0.985, p.y, p.z * 0.985)),
        false,
        "chordal",
        0.1,
      );
      add(new THREE.TubeGeometry(innerCurve, 44, 0.012, 5, false), silver);
      const centre = point(0, wy + 0.1, 0.11);
      const pane = add(
        new THREE.PlaneGeometry(0.74, 1.46),
        glass,
        centre.x,
        centre.y,
        centre.z,
      );
      pane.rotation.y = Math.PI / 2 - wa;
      const crossA = point(-0.36, wy + 0.08, 0.07),
        crossB = point(0.36, wy + 0.08, 0.07);
      strut(crossA.toArray(), crossB.toArray(), 0.018, graphite);
      // One small inset light at the sill, rather than floating blocks in the tower.
      const sill = point(0, wy - 0.6, 0.12);
      const led = add(
        new THREE.BoxGeometry(0.5, 0.018, 0.08),
        lightRibbon,
        sill.x,
        sill.y,
        sill.z,
      );
      led.rotation.y = -wa + Math.PI / 2;
    }
  lathe(
    [
      [2.59, 15.23],
      [2.69, 15.3],
      [2.81, 15.36],
      [2.92, 15.46],
      [2.94, 15.6],
      [2.83, 15.67],
      [2.55, 15.67],
    ],
    graphite,
  );
  ring(2.91, 0.019, 15.52, silver);
  ring(2.67, 0.015, 15.28, silver);
  // A walkable gallery, machined rim and slender balustrade below the lantern.
  lathe(
    [
      [2.62, 15.43],
      [3.24, 15.43],
      [3.34, 15.5],
      [3.34, 15.57],
      [3.28, 15.63],
      [2.62, 15.63],
    ],
    graphite,
  );
  ring(3.31, 0.023, 15.59, silver);
  ring(3.29, 0.03, 16.42, silver);
  ring(3.29, 0.017, 16.05, edgeMetal);
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2;
    const c = Math.cos(a),
      s = Math.sin(a);
    strut(
      [c * 3.29, 15.62, s * 3.29],
      [c * 3.29, 16.42, s * 3.29],
      0.022,
      silver,
    );
    if (i % 2 === 0)
      strut(
        [c * 2.6, 14.88, s * 2.6],
        [c * 3.22, 15.43, s * 3.22],
        0.034,
        graphite,
      );
  }

  // The central spindle and actual solid stairs remain navigable in three dimensions.
  add(new THREE.CylinderGeometry(0.26, 0.36, 15, 48), graphite, 0, 8);
  const turns = Math.PI * 4,
    steps = 160;
  const shape = new THREE.Shape();
  const angle = (turns / steps) * 0.96;
  shape.absarc(0, 0, 2.38, 0, angle, false);
  shape.lineTo(Math.cos(angle) * 0.45, Math.sin(angle) * 0.45);
  shape.absarc(0, 0, 0.45, angle, 0, true);
  shape.closePath();
  const stepGeometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.1,
    bevelEnabled: true,
    bevelSegments: 1,
    steps: 1,
    bevelSize: 0.015,
    bevelThickness: 0.012,
    curveSegments: 3,
  });
  stepGeometry.rotateX(Math.PI / 2);
  const treads = new THREE.InstancedMesh(stepGeometry, stairs, steps);
  const treadEdges = new THREE.InstancedMesh(
    new THREE.BoxGeometry(1.9, 0.012, 0.025),
    edgeMetal,
    steps,
  );
  const posts = new THREE.InstancedMesh(
    new THREE.CylinderGeometry(0.022, 0.022, 0.88, 6),
    graphite,
    steps / 4,
  );
  const dummy = new THREE.Object3D();
  for (let i = 0; i < steps; i++) {
    const a = Math.PI / 2 + (i / steps) * turns,
      y = 15.5 - (i / steps) * 15;
    dummy.position.set(0, y, 0);
    dummy.rotation.set(0, -a, 0);
    dummy.updateMatrix();
    treads.setMatrixAt(i, dummy.matrix);
    dummy.position.set(Math.cos(a) * 1.42, y + 0.015, Math.sin(a) * 1.42);
    dummy.updateMatrix();
    treadEdges.setMatrixAt(i, dummy.matrix);
    if (i % 4 === 0) {
      dummy.position.set(Math.cos(a) * 2.36, y + 0.45, Math.sin(a) * 2.36);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      posts.setMatrixAt(i / 4, dummy.matrix);
    }
  }
  structure.add(treads, treadEdges, posts);
  for (const radius of [0.49, 2.36]) {
    const points = [];
    for (let i = 0; i <= 240; i++) {
      const p = i / 240,
        a = Math.PI / 2 + p * turns;
      points.push(
        new THREE.Vector3(
          Math.cos(a) * radius,
          16.42 - p * 15,
          Math.sin(a) * radius,
        ),
      );
    }
    const curve = new THREE.CatmullRomCurve3(points);
    add(new THREE.TubeGeometry(curve, 320, 0.041, 6, false), silver);
    const ribbon = add(
      new THREE.TubeGeometry(curve, 320, 0.012, 5, false),
      lightRibbon,
    );
    ribbon.position.y = -0.065;
  }

  // A substantial octagonal lantern frame, smoked glass and a spun-metal roof.
  const gallery = add(
    new THREE.RingGeometry(2.43, 2.9, 96),
    graphite,
    0,
    15.66,
  );
  gallery.rotation.x = -Math.PI / 2;
  ring(2.64, 0.065, 15.69, graphite);
  ring(2.64, 0.06, 18.4, graphite);
  ring(2.69, 0.012, 15.78, lightRibbon);
  ring(2.67, 0.018, 18.32, silver);
  for (let i = 0; i < 8; i++) {
    const a = ((i + 0.25) / 8) * Math.PI * 2;
    const post = add(
      new THREE.BoxGeometry(0.095, 2.72, 0.14),
      graphite,
      Math.cos(a) * 2.59,
      17.04,
      Math.sin(a) * 2.59,
    );
    post.rotation.y = -a;
  }
  const lanternGlass = glass.clone();
  add(
    new THREE.CylinderGeometry(2.57, 2.57, 2.7, 96, 1, true),
    lanternGlass,
    0,
    17.04,
  );
  lathe(
    [
      [0, 20.32],
      [0.08, 20.3],
      [0.11, 20.02],
      [0.24, 19.8],
      [0.45, 19.58],
      [0.8, 19.45],
      [1.2, 19.34],
      [1.62, 19.2],
      [2.05, 19.02],
      [2.45, 18.81],
      [2.79, 18.64],
      [2.96, 18.57],
      [2.98, 18.49],
      [2.9, 18.42],
      [0, 18.42],
    ],
    graphite,
  );
  ring(2.95, 0.025, 18.49, silver);
  ring(0.135, 0.025, 20.0, silver);
  const roofProfile = [
    [0.14, 20.0],
    [0.26, 19.8],
    [0.47, 19.59],
    [0.82, 19.46],
    [1.22, 19.35],
    [1.64, 19.21],
    [2.07, 19.03],
    [2.47, 18.82],
    [2.81, 18.65],
    [2.97, 18.58],
  ];
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2;
    const points = roofProfile.map(
      ([r, y]) =>
        new THREE.Vector3(Math.cos(a) * r, y + 0.015, Math.sin(a) * r),
    );
    add(
      new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3(points),
        24,
        0.015,
        5,
        false,
      ),
      edgeMetal,
    );
  }
  ring(2.84, 0.015, 18.43, lightRibbon);

  // The lantern is the focal point. Everything else reflects its restrained lavender light.
  lathe(
    [
      [0, 15.5],
      [0.54, 15.5],
      [0.57, 15.58],
      [0.5, 15.68],
      [0.26, 15.82],
      [0.22, 16.43],
      [0.48, 16.55],
      [0.51, 16.65],
      [0, 16.65],
    ],
    graphite,
  );
  const lensGlass = new THREE.MeshPhysicalMaterial({
    color: 0xeee5fc,
    roughness: 0.08,
    metalness: 0.08,
    transparent: true,
    opacity: 0.27,
    depthWrite: false,
    clearcoat: 1,
  });
  const lens = add(new THREE.SphereGeometry(0.49, 40, 24), lensGlass, 0, 17.08);
  lens.scale.set(1, 1.3, 1);
  const core = add(
    new THREE.SphereGeometry(0.22, 28, 18),
    new THREE.MeshBasicMaterial({ color: 0xede1ff }),
    0,
    17.08,
  );
  core.scale.y = 1.7;
  for (let i = 0; i < 13; i++) {
    const y = 16.63 + i * 0.075,
      dy = (y - 17.08) / 0.64;
    ring(Math.sqrt(Math.max(0.05, 1 - dy * dy)) * 0.53, 0.013, y, silver);
  }
  ring(0.52, 0.034, 16.53, graphite);
  ring(0.5, 0.032, 17.67, graphite);
  const glowCanvas = document.createElement("canvas");
  glowCanvas.width = 128;
  glowCanvas.height = 128;
  const ctx = glowCanvas.getContext("2d");
  const gradient = ctx.createRadialGradient(64, 64, 1, 64, 64, 64);
  gradient.addColorStop(0, "rgba(245,235,255,.85)");
  gradient.addColorStop(0.17, "rgba(222,200,250,.38)");
  gradient.addColorStop(0.48, "rgba(206,180,251,.08)");
  gradient.addColorStop(1, "rgba(206,180,251,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 128, 128);
  const glowTexture = new THREE.CanvasTexture(glowCanvas);
  const glowMaterial = new THREE.SpriteMaterial({
    map: glowTexture,
    color: 0xffffff,
    transparent: true,
    opacity: 0.78,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const beaconGlow = new THREE.Sprite(glowMaterial);
  beaconGlow.position.set(0, 17.08, 0);
  beaconGlow.scale.set(4.4, 4.4, 1);
  structure.add(beaconGlow);
  const beacon = new THREE.PointLight(0xdec9fa, 11, 9, 1.65);
  beacon.position.set(0, 17.08, 0);
  scene.add(beacon);
  scene.add(new THREE.HemisphereLight(0xe9e4f1, 0x14101c, 0.85));
  const key = new THREE.DirectionalLight(0xf4eefb, 3.1);
  key.position.set(7, 20, 10);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xbda4df, 2.2);
  rim.position.set(-7, 13, -5);
  scene.add(rim);
  const fill = new THREE.DirectionalLight(0xb7c5ee, 0.65);
  fill.position.set(5, 8, -7);
  scene.add(fill);
  const travellerLight = new THREE.PointLight(0xe3d1f8, 3.8, 9, 1.5);
  scene.add(travellerLight);
  return {
    structure,
    turns,
    travellerLight,
    lanternGlass,
    beaconGlow,
    disposeModel: () => glowTexture.dispose(),
  };
}
