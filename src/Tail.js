import Particles from './Particles.js';

// Class: Tail
class Tail {
    constructor(scene, position) {
        this.scene = scene;
        this.position = position;
        this.particles = new Particles(scene, position);
    }

    updatePosition(newPosition) {
        this.position = newPosition;
        this.particles.updateEmitterPosition(newPosition);
    }

    dispose() {
        this.particles.dispose();
    }
}