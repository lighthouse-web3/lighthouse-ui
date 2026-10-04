import { useEffect, useRef } from "react";
import { createLighthouseModel } from "../lib/createLighthouseModel";

const clamp = (n) => Math.max(0, Math.min(1, n));
const ease = (n) => {
  const t = clamp(n);
  return t * t * (3 - 2 * t);
};

/** One continuous WebGL scene. Scroll changes the camera, never the model scale. */
export default function TokenLighthouse3D({
  root,
  intro,
  tour,
  disabled,
  reduced,
}) {
  const host = useRef(null);
  const settings = useRef({ disabled, reduced });
  const wakeScene = useRef(() => {});
  settings.current = { disabled, reduced };
  useEffect(() => {
    wakeScene.current();
  }, [disabled, reduced]);

  useEffect(() => {
    let disposed = false,
      release = () => {};
    async function create() {
      try {
        const [THREE, { RoomEnvironment }] = await Promise.all([
          import("three"),
          import("three/addons/environments/RoomEnvironment.js"),
        ]);
        if (disposed) return;
        const page = root.current;
        const mount = host.current;
        const mobile = () => window.innerWidth < 700;
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("webgl2", {
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        });
        const renderer = context
          ? new THREE.WebGLRenderer({
              canvas,
              context,
              alpha: true,
              antialias: true,
            })
          : (
              await import("../lib/tokenSoftwareRenderer")
            ).createSoftwareRenderer(THREE);
        if (disposed) {
          renderer.dispose();
          return;
        }
        renderer.setPixelRatio(
          Math.min(window.devicePixelRatio, mobile() ? 1.25 : 1.6),
        );
        renderer.setClearColor(0x101012, 0);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.0;
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        mount.appendChild(renderer.domElement);
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x101012, 0.008);
        let environment;
        if (!renderer.software) {
          const pmrem = new THREE.PMREMGenerator(renderer);
          const room = new RoomEnvironment();
          environment = pmrem.fromScene(room, 0.04);
          scene.environment = environment.texture;
          room.dispose();
          pmrem.dispose();
        }
        const camera = new THREE.PerspectiveCamera(40, 1, 0.04, 150);
        const {
          turns,
          travellerLight,
          lanternGlass,
          beaconGlow,
          disposeModel,
        } = createLighthouseModel(THREE, scene);

        const entrance = new THREE.CatmullRomCurve3(
          [
            new THREE.Vector3(14, 14.8, 35),
            new THREE.Vector3(10, 17, 25),
            new THREE.Vector3(4.2, 18.2, 13),
            new THREE.Vector3(0.5, 17.9, 5.2),
            new THREE.Vector3(0, 16.78, 1.62),
          ],
          false,
          "centripetal",
        );
        const focus = new THREE.CatmullRomCurve3([
          new THREE.Vector3(0, 10, 0),
          new THREE.Vector3(0, 14, 0),
          new THREE.Vector3(0, 16.8, 0),
          new THREE.Vector3(0, 17, 0),
          new THREE.Vector3(-0.78, 16.1, 1.28),
        ]);
        const position = new THREE.Vector3(),
          target = new THREE.Vector3(),
          interiorPosition = new THREE.Vector3(),
          interiorTarget = new THREE.Vector3();
        let width = 0,
          height = 0,
          raf = 0,
          last = 0,
          currentEntry = 0,
          currentDepth = 0;
        let start = 0,
          entryRange = 1,
          tourStart = 1,
          tourRange = 1,
          tourEnd = 1;
        let isVisible = true,
          resizePending = true,
          lastMode = null;
        const resize = () => {
          resizePending = true;
          wake();
        };
        const measure = () => {
          width = mount.clientWidth;
          height = mount.clientHeight;
          if (!width || !height) return;
          renderer.setSize(width, height, false);
          camera.aspect = width / height;
          const y = window.scrollY;
          start = intro.current.getBoundingClientRect().top + y;
          entryRange = Math.max(1, intro.current.offsetHeight - height);
          tourStart = tour.current.getBoundingClientRect().top + y;
          tourEnd = tourStart + tour.current.offsetHeight;
          tourRange = Math.max(
            height,
            tourEnd - height * 0.8 - (start + entryRange),
          );
          resizePending = false;
        };
        function render(now) {
          raf = 0;
          if (disposed || !isVisible || document.hidden) return;
          if (renderer.software && now - last < 32) {
            raf = requestAnimationFrame(render);
            return;
          }
          if (resizePending || lastMode !== settings.current.disabled) {
            measure();
            lastMode = settings.current.disabled;
          }
          const dt = Math.min((now - last) / 1000 || 1 / 60, 0.05);
          last = now;
          const frozen = settings.current.disabled;
          const scroll = window.scrollY;
          const entryGoal = settings.current.reduced
            ? 0
            : frozen
              ? currentEntry
              : clamp((scroll - start) / entryRange);
          const depthGoal = settings.current.reduced
            ? 0
            : frozen
              ? currentDepth
              : clamp((scroll - start - entryRange) / tourRange);
          const smoothing = 1 - Math.exp(-dt * 6.5);
          currentEntry += (entryGoal - currentEntry) * smoothing;
          currentDepth += (depthGoal - currentDepth) * smoothing;
          if (Math.abs(currentEntry - entryGoal) < 0.0001)
            currentEntry = entryGoal;
          if (Math.abs(currentDepth - depthGoal) < 0.0001)
            currentDepth = depthGoal;
          const entry = currentEntry,
            depth = currentDepth;
          const entered = ease((entry - 0.8) / 0.2);
          const blend = ease(depth * 18) * entered;
          const angle = Math.PI / 2 + depth * turns;
          entrance.getPoint(ease(entry), position);
          focus.getPoint(ease(entry), target);
          if (depth > 0) {
            interiorPosition.set(
              Math.cos(angle) * 1.62,
              16.78 - depth * 15,
              Math.sin(angle) * 1.62,
            );
            interiorTarget.set(
              Math.cos(angle + 0.55) * 1.5,
              16.1 - depth * 15,
              Math.sin(angle + 0.55) * 1.5,
            );
            position.lerp(interiorPosition, entered);
            target.lerp(interiorTarget, entered);
          }
          // Wide exterior framing gives way to a natural interior lens.
          if (mobile() && entry < 0.4)
            position.multiplyScalar(1 + 0.95 * (1 - ease(entry / 0.4)));
          camera.position.copy(position);
          camera.lookAt(target);
          camera.fov = THREE.MathUtils.lerp(
            mobile() ? 46 : 40,
            67,
            ease((entry - 0.4) / 0.6),
          );
          const offset = mobile()
            ? 0
            : THREE.MathUtils.lerp(-0.24 * (1 - ease(entry * 2)), 0.22, blend);
          camera.setViewOffset(
            width,
            height,
            width * offset,
            mobile() ? -height * 0.22 * (1 - entry) : 0,
            width,
            height,
          );
          camera.updateProjectionMatrix();
          travellerLight.position.copy(position);
          travellerLight.intensity = 1.5 + 3.8 * ease(entry);
          lanternGlass.opacity = 0.19 * (1 - ease((entry - 0.65) / 0.25));
          beaconGlow.material.opacity = 0.78 - 0.4 * ease((entry - 0.6) / 0.3);
          const endFade =
            1 - ease((scroll - tourEnd + height * 0.5) / (height * 0.7));
          mount.style.opacity = endFade;
          page.style.setProperty("--entry-progress", entry.toFixed(4));
          page.style.setProperty(
            "--hero-copy-opacity",
            (1 - ease((entry - 0.15) / 0.055)).toFixed(4),
          );
          page.style.setProperty(
            "--inside-opacity",
            ease((entry - 0.25) / 0.28).toFixed(4),
          );
          // Bring the reading surface in as the first chapter enters the view.
          const chapterTop = tourStart - scroll;
          const handoff = ease((height * 0.85 - chapterTop) / (height * 0.65));
          page.style.setProperty(
            "--scene-shade",
            Math.max(blend, handoff).toFixed(4),
          );
          page.dataset.handoff =
            chapterTop < height * 0.85 ? "details" : "scene";
          const phase =
            entry < 0.3 ? "outside" : entry < 0.85 ? "lantern" : "inside";
          if (page.dataset.camera !== phase) page.dataset.camera = phase;
          mount.dataset.position = `${entry.toFixed(2)}:${depth.toFixed(2)}`;
          renderer.render(scene, camera);
          const moving =
            Math.abs(entry - entryGoal) > 0.0001 ||
            Math.abs(depth - depthGoal) > 0.0001;
          // No background rendering after the journey, when hidden, or with motion off.
          if (moving && endFade > 0) raf = requestAnimationFrame(render);
        }
        function wake() {
          if (!raf && !disposed) raf = requestAnimationFrame(render);
        }
        wakeScene.current = wake;
        const onVisibility = () => {
          if (!document.hidden) wake();
        };
        const lost = (event) => {
          event.preventDefault();
          page.dataset.scene = "fallback";
        };
        const observer = new IntersectionObserver(
          ([entry]) => {
            isVisible = entry.isIntersecting;
            if (isVisible) wake();
          },
          { threshold: 0 },
        );
        observer.observe(page);
        const sizeObserver = new ResizeObserver(resize);
        sizeObserver.observe(intro.current);
        sizeObserver.observe(tour.current);
        window.addEventListener("scroll", wake, { passive: true });
        window.addEventListener("resize", resize);
        document.addEventListener("visibilitychange", onVisibility);
        renderer.domElement.addEventListener("webglcontextlost", lost);
        page.dataset.scene = "ready";
        page.dataset.renderer = renderer.software ? "software" : "webgl";
        measure();
        wake();
        release = () => {
          wakeScene.current = () => {};
          cancelAnimationFrame(raf);
          observer.disconnect();
          sizeObserver.disconnect();
          window.removeEventListener("scroll", wake);
          window.removeEventListener("resize", resize);
          document.removeEventListener("visibilitychange", onVisibility);
          renderer.domElement.removeEventListener("webglcontextlost", lost);
          const geometries = new Set(),
            materials = new Set();
          scene.traverse((node) => {
            if (node.geometry) geometries.add(node.geometry);
            if (node.material)
              (Array.isArray(node.material)
                ? node.material
                : [node.material]
              ).forEach((m) => materials.add(m));
          });
          geometries.forEach((g) => g.dispose());
          materials.forEach((m) => m.dispose());
          disposeModel();
          environment?.dispose();
          renderer.dispose();
          renderer.domElement.remove();
        };
      } catch (error) {
        if (!disposed && root.current) root.current.dataset.scene = "fallback";
        console.warn(
          "Lighthouse 3D scene unavailable; readable token page retained.",
          error,
        );
      }
    }
    create();
    return () => {
      disposed = true;
      release();
    };
  }, [root, intro, tour]);

  return <div className="tp-webgl-scene" ref={host} aria-hidden="true" />;
}
