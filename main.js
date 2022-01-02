import './style.css'
import * as THREE from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#canvas'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

const geometry = new THREE.IcosahedronGeometry(10, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff6347, wireframe: true });
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

function animate() {
  requestAnimationFrame(animate);

  mesh.rotation.x += 0.001;
  mesh.rotation.y += 0.005;
  mesh.rotation.z += 0.01;

  renderer.render(scene, camera);
}

animate();