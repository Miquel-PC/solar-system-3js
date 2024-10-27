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
camera.translateZ(15);
camera.translateY(15);


// object declaration & initialization
const systemObjects = [];

const solarSystem = new THREE.Object3D();
const sunOrbit = new THREE.Object3D();
const earthOrbit = new THREE.Object3D();
const moonOrbit = new THREE.Object3D();

scene.add(sunOrbit);
scene.add(earthOrbit);
scene.add(moonOrbit);



objectLoader(
    "model/pumpkin/scene.gltf",
    new THREE.Vector3(2, 2, 2),
    new THREE.Vector3(0, 200, 0),
    sunOrbit
);

objectLoader(
    "model/earth/scene.gltf",
    new THREE.Vector3(1, 1, 1),
    new THREE.Vector3(0, 0, 0),
    earthOrbit
);

objectLoader(
    "model/zelda_moon/scene.gltf",
    new THREE.Vector3(0.1, 0.1, 0.1),
    new THREE.Vector3(0, 0, 0),
    moonOrbit
);



// texture loading

/*objectLoader(sun, "model/sun_pumpkin/scene.gltf", 5, new THREE.Vector3(0, 0, 0));
objectLoader(earth, "model/earth/scene.gltf", 2, new THREE.Vector3(2, 0, 0));
objectLoader(moon, "model/zelda_moon/scene.gltf", 1, new THREE.Vector3(6, 0, 0));*/


/*function loadModelAsync() {

}

Promise.all([
    loadModelAsync(sun, "model/sun_pumpkin/scene.gltf", 2)
]).then(() => {
    renderer.setAnimationLoop(animate);
});*/


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

window.moon = moonOrbit;

document.querySelector("body").appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
    const currentTime = Date.now();
    const deltaTime = currentTime - time;
    time = currentTime;
    // set everything that needs to change here

    systemObjects.forEach((o) => {
        if (o !== undefined)
            o.rotateY(0.0001 * deltaTime);
    });
    renderer.render(scene, camera);
}