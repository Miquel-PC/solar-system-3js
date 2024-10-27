import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const width = window.innerWidth;
const height = window.innerHeight;

const renderer = new THREE.WebGLRenderer();
const loader = new GLTFLoader();


renderer.shadowMap.enabled = true;
const camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000);
const scene = new THREE.Scene();

const light = new THREE.DirectionalLight(0xffffff, 10);
const ambient = new THREE.AmbientLight(0xf04040, 1);

let time = Date.now();

scene.add(ambient);
scene.add(light);
light.castShadow = true;


// CAMERA
camera.translateZ(150);
camera.translateY(50);


// object declaration & initialization
const systemObjects = [];

const solarSystem = new THREE.Object3D();
const earthOrbit = new THREE.Object3D();
const moonOrbit = new THREE.Object3D();

systemObjects.push(solarSystem);
systemObjects.push(earthOrbit);
systemObjects.push(moonOrbit);


// solar system setup
solarSystem.add(earthOrbit);
earthOrbit.position.x = 200;
earthOrbit.position.y = 30;

earthOrbit.add(moonOrbit);
moonOrbit.position.x = 30;

scene.add(solarSystem);



// texture loading
objectLoader(
    "model/pumpkin/scene.gltf",
    new THREE.Vector3(0.5, 0.5, 0.5),
    new THREE.Vector3(0, 0, 0),
    solarSystem
);

objectLoader(
    "model/earth/scene.gltf",
    new THREE.Vector3(2, 2, 2),
    new THREE.Vector3(0, 0, 0),
    earthOrbit
);

objectLoader(
    "model/zelda_moon/scene.gltf",
    new THREE.Vector3(0.005, 0.005, 0.005),
    new THREE.Vector3(0, 0, 0),
    moonOrbit
);


function objectLoader(url, size, position, orbit) {
    loader.load(url, (gltf) => {
        const object = gltf.scene;
        object.scale.set(size.x, size.y, size.z);
        object.position.set(position.x, position.y, position.z);
        orbit.add(object);
        systemObjects.push(object);
    });
}


renderer.setSize(width, height);
renderer.setAnimationLoop(animate);

document.querySelector("body").appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
    const currentTime = Date.now();
    const deltaTime = currentTime - time;
    time = currentTime;

    solarSystem.rotation.y += 0.001 * deltaTime;
    earthOrbit.rotation.y += 0.002 * deltaTime;
    moonOrbit.rotation.y += 0.003 * deltaTime;
    renderer.render(scene, camera);
}