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


// object declaration
const systemObjects = [];
let sun, earth, moon;

/*const baseGeometry = new THREE.SphereGeometry(1, 8, 8);

const sunMaterial = new THREE.MeshStandardMaterial();
const earthMaterial = new THREE.MeshStandardMaterial({color: "#1a5e82"});
const moonMaterial = new THREE.MeshStandardMaterial();

const sun = new THREE.Mesh(baseGeometry, sunMaterial);
const earth = new THREE.Mesh(baseGeometry, earthMaterial);
const moon = new THREE.Mesh(baseGeometry, moonMaterial);*/



// texture loading

objectLoader(sun, "model/sun_pumpkin/scene.gltf", 5, new THREE.Vector3(0, 0, 0));
objectLoader(earth, "model/earth/scene.gltf", 2, new THREE.Vector3(2, 0, 0));
objectLoader(moon, "model/zelda_moon/scene.gltf", 1, new THREE.Vector3(6, 0, 0));


/*function loadModelAsync() {

}

Promise.all([
    loadModelAsync(sun, "model/sun_pumpkin/scene.gltf", 2)
]).then(() => {
    renderer.setAnimationLoop(animate);
});*/


function objectLoader(object, url, size, position) {
    loader.load(url, (gltf) => {
        object = gltf.scene;
        object.scale.set(size, size, size);
        object.position.set(position);
        scene.add(object);
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
    // set everything that needs to change here

    systemObjects.forEach((o) => {
        if (o !== undefined)
            o.rotateX(0.03 * deltaTime);
    });
    renderer.render(scene, camera);
}