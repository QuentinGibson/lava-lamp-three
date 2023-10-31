import * as THREE from 'three';
import frag from '../assets/shaders/lava.frag'
import vert from '../assets/shaders/lava.vert'
import * as colors from 'nice-color-palettes'
let mathseed = Math.floor(Math.random() * colors.length)
// mathseed = 6
let pallete = colors[mathseed];


pallete = pallete.map(color => new THREE.Color(color))
console.log(pallete)
console.log(`seed: ${mathseed}`)

const lavaEffect = {
  uniforms: {
    time: { value: 0.0 },
    mouse: { value: new THREE.Vector2() },
    resolution: {
      value: new THREE.Vector2(window.innerWidth, window.innerHeight)
    },
    uColor: { value: pallete }
  },
  side: THREE.DoubleSide,
  vertexShader: vert,
  fragmentShader: frag,
}

export default lavaEffect