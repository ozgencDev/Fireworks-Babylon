class Bullet {
    constructor() {
        this.active = false;
    }

    fire(position) {
        this.active = true;
        console.log(`Bullet fired from position ${position}`);
    }

    reset() {
        this.active = false;
    }
}

class BulletPool {
    constructor(size) {
        this.pool = Array.from({ length: size }, () => new Bullet());
    }

    getBullet() {
        const bullet = this.pool.find(b => !b.active);
        if (bullet) {
            return bullet;
        }
        console.log("No bullets available!");
        return null;
    }
}

// Kullanım
const pool = new BulletPool(3);
const bullet1 = pool.getBullet();
bullet1.fire(10);

const bullet2 = pool.getBullet();
bullet2.fire(20);

bullet1.reset();
const bullet3 = pool.getBullet();
bullet3.fire(30);
