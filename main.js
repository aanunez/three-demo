import './style.css'
import * as THREE from 'three';

var scene, camera, renderer, sphere;

init();

function init() {

  // Basic Setup
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#canvas'),
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.position.set(10, 10, 30);
  camera.lookAt(0, 0, 0)

  // Sphere Gemometry
  const geometry = new THREE.IcosahedronGeometry(10, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0xff6347, wireframe: true });
  sphere = new THREE.Mesh(geometry, material);
  if (isMobile()) {
    sphere.position.set(25, 10, -5);
  } else {
    sphere.position.set(0, -10, 20);
  }

  scene.add(sphere);

  // Grid
  const grid = new THREE.GridHelper(250, 50);
  scene.add(grid);

  // Space junk
  Array(800).fill().forEach(() => addCube());

  // Loop
  animate();
  document.body.onscroll = moveCamera;

}

function addCube() {
  const geometry = new THREE.BoxGeometry(10, 10, 10);
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
  const cube = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(2000));
  cube.position.set(x * 1.1, y * 1.1, z * 1.1);
  cube.rotation.set(x, y, z);

  scene.add(cube);
}

function animate() {

  if (window.innerWidth != renderer.innerWidth || window.innerHeight != renderer.innerHeight) {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }

  sphere.rotation.x -= 0.001;
  sphere.rotation.y -= 0.005;
  sphere.rotation.z += 0.01;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

function isMobile() {
  return [/Android/i, /iPhone/i].some((t) => {
    return navigator.userAgent.match(t);
  });
}

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  //camera.position.z = 30 + (t * 0.1);
  //camera.position.x = 10 + (t * 0.01);
  camera.position.y = 10 + (t * 0.05);
}