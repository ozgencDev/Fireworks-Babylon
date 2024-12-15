
import * as BABYLON from 'babylonjs';

let scene = null;

export function createScene(engine, canvas) {
    if (!scene) {
        scene = new BABYLON.Scene(engine);
        // Kamera ekle
        const camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene);
        camera.attachControl(canvas, true);

        // Işık ekle
        const light = new BABYLON.HemisphericLight("Light", new BABYLON.Vector3(0, 1, 0), scene);

    }

    return scene;
}

export function getScene() {
    if (!scene) {
        throw new Error("Sahne henüz oluşturulmadı. Önce createScene()'i çağırın.");
    }
    return scene;
}
