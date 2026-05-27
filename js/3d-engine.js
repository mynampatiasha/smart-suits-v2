// We need a dummy model until the user provides a real .glb file
let scene, camera, renderer, controls;
let suitMaterial; // We save the material so we can change its color later

function init3D() {
    const container = document.getElementById('canvas-container');

    // 1. Scene Setup
    scene = new THREE.Scene();

    // 2. Camera Setup
    camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 5); // Stand back to see the object

    // 3. Renderer Setup
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(renderer.domElement);

    // 4. Lighting (Crucial for fabrics)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);

    // 5. Controls (Allow user to spin)
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false;
    controls.minDistance = 2;
    controls.maxDistance = 8;

    // 6. Load Model (Using a Dummy shape for now until you add a .glb file)
    createDummySuit();

    // 7. Handle Window Resize
    window.addEventListener('resize', onWindowResize, false);

    // Start Animation Loop
    animate();

    // Hide Loading Screen
    setTimeout(() => {
        document.getElementById('loading-overlay').classList.add('hidden');
    }, 1000);
}

// --- DUMMY SUIT SETUP ---
// This is a placeholder so you can test the color changing right away.
// In the final version, we will replace this with a GLTFLoader to load a real 3D suit model.
function createDummySuit() {
    // We create a sophisticated looking material
    suitMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#1a1a24'), // Default Navy
        roughness: 0.8, // Fabric isn't shiny
        metalness: 0.1 
    });

    // Create a stylized torso shape
    const geometry = new THREE.CylinderGeometry(1, 0.8, 3, 32);
    const suitMesh = new THREE.Mesh(geometry, suitMaterial);
    
    // Tilt it slightly for dynamic look
    suitMesh.rotation.x = 0.1;
    
    scene.add(suitMesh);
}

// --- PUBLIC FUNCTION TO CHANGE COLOR FROM UI ---
window.changeSuitColor = function(hexColor) {
    if (suitMaterial) {
        // Smoothly animate to new color (requires GSAP normally, but we do instant for now)
        suitMaterial.color.set(hexColor);
    }
}

function onWindowResize() {
    const container = document.getElementById('canvas-container');
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update(); // required if damping enabled
    renderer.render(scene, camera);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init3D);
