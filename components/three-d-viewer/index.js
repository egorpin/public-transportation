import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export class ThreeDViewerComponent {
    constructor(parent, width = 300, height = 200) {
        this.parent = parent;
        this.width = width;
        this.height = height;
        this.renderer = null;
        this.scene = null;
        this.camera = null;
        this.model = null;
        this.animationId = null;
    }

    init(container) {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xf5f5f5);

        this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 1000);
        this.camera.position.set(3, 2, 5);
        this.camera.lookAt(0, 0, 0);

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(this.width, this.height);
        this.renderer.shadowMap.enabled = true;
        container.appendChild(this.renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
        directionalLight.position.set(5, 5, 5);
        directionalLight.castShadow = true;
        this.scene.add(directionalLight);

        const gridHelper = new THREE.GridHelper(10, 10, 0xcccccc, 0xe0e0e0);
        this.scene.add(gridHelper);
    }

    loadModel(modelPath) {
        const loader = new GLTFLoader();
        loader.load(
            modelPath,
            (gltf) => {
                this.model = gltf.scene;

                const box = new THREE.Box3().setFromObject(this.model);
                const size = box.getSize(new THREE.Vector3());
                const center = box.getCenter(new THREE.Vector3());

                const maxDim = Math.max(size.x, size.y, size.z);
                const scale = 2 / maxDim;
                this.model.scale.setScalar(scale);

                this.model.position.x = -center.x * scale;
                this.model.position.y = -center.y * scale + size.y * scale / 2;
                this.model.position.z = -center.z * scale;

                this.model.traverse((child) => {
                    if (child.isMesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });

                this.scene.add(this.model);
                this.animate();
            },
            undefined,
            (error) => {
                console.error('Error loading model:', error);
            }
        );
    }

    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());
        if (this.model) {
            this.model.rotation.y += 0.005;
        }
        this.renderer.render(this.scene, this.camera);
    }

    dispose() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.renderer) {
            this.renderer.dispose();
        }
    }
}