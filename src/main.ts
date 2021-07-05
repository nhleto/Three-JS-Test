import './style.css'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,
    window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGL1Renderer({
// @ts-ignore
  canvas: document.querySelector(".bg")
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)

camera.position.set(0, 30, 40)

const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshStandardMaterial({color: 0xFF6347})
const torus = new THREE.Mesh(geometry, material)

const pointlight = new THREE.PointLight(0xffffff)
pointlight.position.set(10, -10, 5)
const ambientlight = new THREE.AmbientLight(0xffffff)
const helper = new THREE.PointLightHelper(pointlight)
const gridHelper = new THREE.GridHelper(200, 50)
const controls = new OrbitControls(camera, renderer.domElement)

scene.add(torus, pointlight, ambientlight, helper, gridHelper)

function addStar(){
  const geometry = new THREE.SphereGeometry(.25, 24, 24)
  const material = new THREE.MeshStandardMaterial({color: 0xffffff})
  const star = new THREE.Mesh(geometry, material)

  // @ts-ignore
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z)
  scene.add(star)
}
// @ts-ignore
Array(200).fill().forEach(addStar);

function animate(){
  requestAnimationFrame(animate)
  torus.rotation.x += 0.01
  torus.rotation.y += 0.005
  torus.rotation.z += 0.01
  controls.update()
  renderer.render(scene, camera)
}
animate()
