import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const width = window.innerWidth;
const height = window.innerHeight;

// scene
const renderer = new THREE.WebGLRenderer();
const scene = new THREE.Scene();
const loader = new GLTFLoader();

const camera = new THREE.PerspectiveCamera(90, width/height, 0.1, 3000);
const light = new THREE.DirectionalLight(0xffffff, 10);
const ambient = new THREE.AmbientLight(0xf04040, 1);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

let time = Date.now();

renderer.setSize(width, height);
renderer.shadowMap.enabled = true;
light.castShadow = true;

scene.add(ambient);
scene.add(light);

camera.translateZ(700);
camera.translateY(250);

document.querySelector("body").appendChild(renderer.domElement);


// object declaration & initialization
const systemObjects = []; // unused

const solarSystem = new THREE.Object3D();

const earthOrbit = new THREE.Object3D();
const earthOrbit2 = new THREE.Object3D();

const moonOrbit = new THREE.Object3D();
const moonOrbit2 = new THREE.Object3D();
const moonOrbit3 = new THREE.Object3D();

systemObjects.push(solarSystem);
systemObjects.push(earthOrbit);
systemObjects.push(moonOrbit);


// solar system setup
solarSystem.add(earthOrbit);
solarSystem.add(earthOrbit2);

earthOrbit.position.set(150, 30, 0);
earthOrbit.add(moonOrbit);
moonOrbit.position.x = 30;

earthOrbit2.position.set(80, 30, 300);
earthOrbit2.add(moonOrbit2);
earthOrbit2.add(moonOrbit3);
moonOrbit2.position.x = 30;
moonOrbit3.position.set(50, 0, 50);

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
    "model/earth/scene.gltf",
    new THREE.Vector3(2, 2, 2),
    new THREE.Vector3(0, 0, 0),
    earthOrbit2
);

objectLoader(
    "model/zelda_moon/scene.gltf",
    new THREE.Vector3(0.005, 0.005, 0.005),
    new THREE.Vector3(0, 0, 0),
    moonOrbit
);

objectLoader(
    "model/zelda_moon/scene.gltf",
    new THREE.Vector3(0.005, 0.005, 0.005),
    new THREE.Vector3(0, 0, 0),
    moonOrbit2
);

objectLoader(
    "model/zelda_moon/scene.gltf",
    new THREE.Vector3(0.005, 0.005, 0.005),
    new THREE.Vector3(0, 0, 0),
    moonOrbit3
);

renderer.setAnimationLoop(animate);

function objectLoader(url, size, position, orbit) {
    loader.load(url, (gltf) => {
        const object = gltf.scene;
        object.scale.set(size.x, size.y, size.z);
        object.position.set(position.x, position.y, position.z);
        orbit.add(object);
        systemObjects.push(object);
    });
}

function animate() {
    const currentTime = Date.now();
    const deltaTime = currentTime - time;
    time = currentTime;

    solarSystem.rotation.y += 0.001 * deltaTime;
    earthOrbit.rotation.y += 0.004 * deltaTime;
    moonOrbit.rotation.y += 0.003 * deltaTime;

    earthOrbit2.rotation.y += 0.001 * deltaTime;
    moonOrbit2.rotation.y += 0.004 * deltaTime;
    moonOrbit3.rotation.y += 0.003 * deltaTime;

    renderer.render(scene, camera);
}