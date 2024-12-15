import Tail from './Tail.js';
import Explosion from './Explosion.js';
import gsap from 'gsap';

class Fireworks {
    constructor(scene) {
        this.scene = scene;
        this.explosions = [];
        this.tails = [];
    }

    launch(position) {
        const tail = new Tail(this.scene, position);
        this.tails.push(tail);

        gsap.to(position, {
            y: 10,
            duration: 2,
            onUpdate: () => {
                tail.updatePosition(position);
            },
            onComplete: () => {
                tail.dispose();
                const explosion = new Explosion(this.scene, position);
                explosion.trigger();
                this.explosions.push(explosion);
            }
        });
    }

    disposeAll() {
        this.tails.forEach(tail => tail.dispose());
        this.explosions.forEach(explosion => explosion.dispose());
        this.tails = [];
        this.explosions = [];
    }
}