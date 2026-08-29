import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Hero3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ---- Scene Setup ----
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // ---- Main Group ----
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Responsive scale
    const updateScale = () => {
      const isMobile = window.innerWidth < 600;
      mainGroup.scale.setScalar(isMobile ? 0.75 : 1);
    };
    updateScale();

    // ---- 1. Metallic Gold Outer Frame & Ruby Core Cross ----
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.9,
      roughness: 0.25,
      emissive: 0x3a2e0e,
      emissiveIntensity: 0.2,
    });

    const rubyCoreMat = new THREE.MeshStandardMaterial({
      color: 0xc8102e,
      emissive: 0x990d24,
      emissiveIntensity: 0.85,
      metalness: 0.4,
      roughness: 0.3,
    });

    const crossGroup = new THREE.Group();

    // Outer Gold Vertical & Horizontal
    const vertGold = new THREE.Mesh(new THREE.BoxGeometry(0.52, 3.32, 0.52), goldMat);
    const horizGold = new THREE.Mesh(new THREE.BoxGeometry(2.02, 0.52, 0.52), goldMat);
    horizGold.position.y = 0.75;
    crossGroup.add(vertGold, horizGold);

    // Inner Glowing Ruby Core (slightly protruded)
    const vertCore = new THREE.Mesh(new THREE.BoxGeometry(0.42, 3.22, 0.56), rubyCoreMat);
    const horizCore = new THREE.Mesh(new THREE.BoxGeometry(1.92, 0.42, 0.56), rubyCoreMat);
    horizCore.position.y = 0.75;
    crossGroup.add(vertCore, horizCore);

    // ---- 2. Floating Radiant Halo Ring ----
    const haloGeo = new THREE.TorusGeometry(1.25, 0.035, 16, 100);
    const haloMat = new THREE.MeshStandardMaterial({
      color: 0xe3c98a,
      emissive: 0xc9a24a,
      emissiveIntensity: 0.6,
      metalness: 0.8,
      roughness: 0.2,
    });
    const haloRing = new THREE.Mesh(haloGeo, haloMat);
    haloRing.position.set(0, 0.75, 0);
    haloRing.rotation.x = Math.PI / 2.3;
    haloRing.rotation.y = Math.PI / 8;
    crossGroup.add(haloRing);

    mainGroup.add(crossGroup);

    // ---- 3. Radiating Sunburst Light Rays ----
    const rayMat = new THREE.MeshBasicMaterial({
      color: 0xe3c98a,
      transparent: true,
      opacity: 0.14,
      blending: THREE.AdditiveBlending,
    });
    const rayCount = 48;
    const rays = [];
    for (let i = 0; i < rayCount; i++) {
      const len = 3.8 + Math.random() * 3.2;
      const geo = new THREE.CylinderGeometry(0.005, 0.035, len, 6);
      const ray = new THREE.Mesh(geo, rayMat.clone());
      const angle = (i / rayCount) * Math.PI * 2;
      const tilt = (Math.random() - 0.5) * 0.4;
      ray.position.set(0, 0.75, 0);
      ray.rotation.z = angle;
      ray.rotation.x = tilt;
      ray.translateY(len / 2);
      ray.material.opacity = 0.06 + Math.random() * 0.16;
      rays.push(ray);
      mainGroup.add(ray);
    }

    // ---- 4. Swirling Golden Spark Particle System ----
    const particleCount = 240;
    const ptsGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const initialY = new Float32Array(particleCount);
    const speedY = new Float32Array(particleCount);
    const radiusArr = new Float32Array(particleCount);
    const angleArr = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const r = 1.2 + Math.random() * 4.5;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 7;

      radiusArr[i] = r;
      angleArr[i] = angle;
      initialY[i] = y;
      speedY[i] = 0.003 + Math.random() * 0.006;

      positions[i * 3] = Math.cos(angle) * r;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Math.sin(angle) * r - 1.5;
    }

    ptsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const ptsMat = new THREE.PointsMaterial({
      color: 0xf7e8c3,
      size: 0.065,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(ptsGeo, ptsMat);
    mainGroup.add(particleSystem);

    // ---- 5. Dynamic Lighting ----
    const centerGlow = new THREE.PointLight(0xe3c98a, 18, 12);
    centerGlow.position.set(0, 0.75, 2);
    scene.add(centerGlow);

    const sacredRedLight = new THREE.PointLight(0xc8102e, 12, 14);
    sacredRedLight.position.set(-2.5, -1, 3);
    scene.add(sacredRedLight);

    const rimLight = new THREE.PointLight(0xffffff, 8, 12);
    rimLight.position.set(2.5, 3, 2);
    scene.add(rimLight);

    scene.add(new THREE.AmbientLight(0x201c26, 1.4));

    // ---- Mouse / Touch Parallax Interaction ----
    let targetX = 0, targetY = 0;
    const onPointerMove = (e) => {
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      const y = e.touches ? e.touches[0].clientY : e.clientY;
      targetX = (x / window.innerWidth - 0.5) * 2;
      targetY = (y / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('touchmove', onPointerMove, { passive: true });

    // ---- Window Resize ----
    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      updateScale();
    };
    window.addEventListener('resize', onResize);

    // ---- Animation Loop ----
    let raf;
    const clock = new THREE.Clock();
    const posAttr = ptsGeo.attributes.position;

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      if (!reducedMotion) {
        // Floating motion & rotation
        crossGroup.rotation.y = elapsed * 0.18;
        crossGroup.rotation.x = Math.sin(elapsed * 0.3) * 0.08;
        crossGroup.position.y = Math.sin(elapsed * 0.8) * 0.12;

        // Rotating halo ring around core
        haloRing.rotation.z = elapsed * 0.4;

        // Pulse light intensity
        centerGlow.intensity = 16 + Math.sin(elapsed * 2) * 5;
        rubyCoreMat.emissiveIntensity = 0.75 + Math.sin(elapsed * 2.5) * 0.25;

        // Upward floating particle spiral
        for (let i = 0; i < particleCount; i++) {
          angleArr[i] += 0.003;
          let y = posAttr.getY(i) + speedY[i];
          if (y > 4) y = -4;

          const r = radiusArr[i];
          posAttr.setX(i, Math.cos(angleArr[i]) * r);
          posAttr.setY(i, y);
          posAttr.setZ(i, Math.sin(angleArr[i]) * r - 1.5);
        }
        posAttr.needsUpdate = true;

        // Camera parallax smoothing
        camera.position.x += (targetX * 0.7 - camera.position.x) * 0.03;
        camera.position.y += (-targetY * 0.5 - camera.position.y) * 0.03;
        camera.lookAt(0, 0.3, 0);
      }

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    // ---- Cleanup ----
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('touchmove', onPointerMove);
      renderer.dispose();
      goldMat.dispose();
      rubyCoreMat.dispose();
      haloGeo.dispose();
      haloMat.dispose();
      rayMat.dispose();
      ptsGeo.dispose();
      ptsMat.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div className="hero-canvas" ref={mountRef} aria-hidden="true" />;
}
