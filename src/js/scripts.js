import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import customEffect from './customEffect';
import onlineEffect from './onlineEffect';
import onlineEffect2 from './onlineEffect2';
import lavaEffect from './lavaEffect'
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer'
import * as dat from 'dat.gui';

// const newFileUrl = new URL('../assets/Alpaca.gltf', import.meta.url)

const renderer = new THREE.WebGLRenderer({ antialias: true });
const mouseCoord = new THREE.Vector2()
const mouseTarget = new THREE.Vector2()
const headingText = "Fearless Lawyer"

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.style.clipPath = " polygon(0 0, 100% 0, 100% 30%, 0 100%)"
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);

renderer.setClearColor(0x000000);
const container = document.createElement('div')
container.style.width = "90%"
container.style.height = "100%"
container.style.mixBlendMode = "color-burn"
const h1 = document.createElement("h1")
h1.style.margin = 0
h1.style.lineHeight = '170px'
h1.className = "header"
h1.innerText = headingText

container.appendChild(h1)


const headingContainer = new CSS2DObject(container)

scene.add(headingContainer)
headingContainer.position.set(0, 0, 0)

// const orbit = new OrbitControls(camera, renderer.domElement);
const labelRenderer = new CSS2DRenderer()
labelRenderer.setSize(window.innerWidth, window.innerHeight)
labelRenderer.domElement.style.position = "absolute"
labelRenderer.domElement.style.top = "0px"
labelRenderer.domElement.style.display = "flex"
// labelRenderer.domElement.style.pointerEvents = "none"
document.body.appendChild(labelRenderer.domElement)

camera.position.set(0, 0, 0.3);
// orbit.update();

// const gui = new dat.GUI();

const onlineShaderMaterial = new THREE.ShaderMaterial(lavaEffect)
const planeGeometry = new THREE.PlaneGeometry(2, 1, 100, 100)
const planeMesh = new THREE.Mesh(planeGeometry, onlineShaderMaterial)
scene.add(planeMesh)

function animate() {
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera)
  onlineShaderMaterial.uniforms.time.value += .0005;
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  labelRenderer.setSize(window.innerWidth, this.window.innerHeight)
});

window.addEventListener('mousemove', function (e) {
  mouseCoord.x = e.clientX
  mouseCoord.y = e.clientY

  mouseTarget.lerp(mouseCoord, 0.1)

  h1.position.y = mouseTarget.y
})