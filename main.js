import './style.css';
import imgUrl from './portrait.jpg';
import * as THREE from 'three';

var scene, camera, renderer, sphere, portrait;

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
  sphere = new THREE.Mesh(
    new THREE.IcosahedronGeometry(10, 1),
    new THREE.MeshBasicMaterial({ color: 0xff6347, wireframe: true })
  );
  if (isMobile()) {
    sphere.position.set(0, -10, 20);
  } else {
    sphere.position.set(25, 10, -5);
  }
  scene.add(sphere);

  // Portrait Gemoetry
  const texture = new THREE.TextureLoader().load(imgUrl);
  portrait = new THREE.Mesh(
    new THREE.BoxGeometry(18, 24, 0.25),
    new THREE.MeshBasicMaterial({ map: texture })
  );
  scene.add(portrait);

  // Grid
  const grid = new THREE.GridHelper(250, 50);
  scene.add(grid);

  // Space junk
  Array(800).fill().forEach(() => addCube());

  // Loop
  animate(true);
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

function animate(force) {

  if (force || window.innerWidth != renderer.innerWidth || window.innerHeight != renderer.innerHeight) {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    if (isMobile()) {
      portrait.position.set(0, -window.innerHeight / 6.4, 0);
    } else {
      portrait.position.set(-10, -window.innerHeight / 14, 0);
    }
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
  camera.position.y = 10 + (t * 0.05);
  portrait.rotation.y = t * 0.0015;
}