import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Hero3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ---- scene setup ----
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // ---- group that holds the cross + rays (rotates together) ----
    const group = new THREE.Group();
    scene.add(group);

    // Cross geometry: two boxes forming a crucifix
    const crossMat = new THREE.MeshStandardMaterial({
      color: 0xc8102e,
      emissive: 0x7a0d1e,
      emissiveIntensity: 0.6,
      metalness: 0.3,
      roughness: 0.35,
    });
    const vertical = new THREE.Mesh(new THREE.BoxGeometry(0.5, 3.2, 0.5), crossMat);
    const horizontal = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.5, 0.5), crossMat);
    horizontal.position.y = 0.75;
    group.add(vertical, horizontal);

    // Radiating rays (thin cylinders shooting outward from the cross center)
    const rayMat = new THREE.MeshBasicMaterial({ color: 0xe3c98a, transparent: true, opacity: 0.16 });
    const rayCount = 42;
    const rays = [];
    for (let i = 0; i < rayCount; i++) {
      const len = 4.2 + Math.random() * 2.6;
      const geo = new THREE.CylinderGeometry(0.008, 0.02, len, 6);
      const ray = new THREE.Mesh(geo, rayMat.clone());
      const theta = (i / rayCount) * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1) * 0.55 + Math.PI / 4;
      ray.position.set(0, 0.6, 0);
      ray.rotation.z = theta;
      ray.rotation.x = phi - Math.PI / 2;
      ray.translateY(len / 2);
      ray.material.opacity = 0.08 + Math.random() * 0.18;
      rays.push(ray);
      group.add(ray);
    }

    // Faint outer ring of points (like distant sparks of light)
    const ptsGeo = new THREE.BufferGeometry();
    const ptsCount = 180;
    const positions = new Float32Array(ptsCount * 3);
    for (let i = 0; i < ptsCount; i++) {
      const r = 6 + Math.random() * 3;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 8;
      positions[i * 3] = Math.cos(theta) * r;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Math.sin(theta) * r - 4;
    }
    ptsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const ptsMat = new THREE.PointsMaterial({ color: 0xf7f4ee, size: 0.045, transparent: true, opacity: 0.35 });
    const points = new THREE.Points(ptsGeo, ptsMat);
    scene.add(points);

    // ---- lighting ----
    const key = new THREE.PointLight(0xe3c98a, 14, 20);
    key.position.set(2, 2, 4);
    scene.add(key);
    const fill = new THREE.PointLight(0xc8102e, 8, 20);
    fill.position.set(-3, -1, 3);
    scene.add(fill);
    scene.add(new THREE.AmbientLight(0x22202a, 1.2));

    // ---- interaction: subtle parallax on mouse move ----
    let mouseX = 0, mouseY = 0;
    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    // ---- resize handling ----
    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // ---- animation loop ----
    let raf;
    const clock = new THREE.Clock();
    const animate = () => {
      const t = clock.getElapsedTime();
      if (!reducedMotion) {
        group.rotation.y = t * 0.12;
        group.rotation.x = Math.sin(t * 0.15) * 0.08;
        points.rotation.y = -t * 0.02;
        camera.position.x += (mouseX * 0.6 - camera.position.x) * 0.02;
        camera.position.y += (-mouseY * 0.4 - camera.position.y) * 0.02;
        camera.lookAt(0, 0.4, 0);
      }
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      renderer.dispose();
      crossMat.dispose();
      rays.forEach((r) => r.geometry.dispose());
      ptsGeo.dispose();
      ptsMat.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div className="hero-canvas" ref={mountRef} aria-hidden="true" />;
}
