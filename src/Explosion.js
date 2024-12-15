

import gsap from 'gsap'
import Particles from './Particles';
import { getScene } from './SceneManager.js';
// Class: Explosion
class Explosion {
    constructor(explosionType, particles) {
        console.log("sa new exp");
        this.explosionType = explosionType;
        this.particles = particles
        this.elapsedTime = 0
        getScene().unregisterBeforeRender(() => {})
        
    }
    
    /*
    
        crackle yapmak istiuorum crackle bir ana patlama sub patlama birde patlamanın crackle bırakmasıyla oluyor 

        ana ve sub patlama arkalarında kuyruk bırakıyor

        ikisinde de spheric bir patlama oluyor

        sub patlama  daha hızlı sönüyor ve farklı renkte oluyor
    
    */
  

    trigger() {
        let particles = new Particles(this.particles);
        getScene().registerBeforeRender(() => {
            this.elapsedTime += getScene().getEngine().getDeltaTime() / 1000;
            particles.SPS.setParticles()
              
        })
        switch(this.explosionType) {
            default:
                
                let initState = (particle, index) => {
                 
                    // Altın Spiral Yöntemi
                    const phi = Math.acos(1 - 2 * (index + 0.5) / particles.getParticlesCount()); // Kutupsal açı
                    const theta = Math.PI * (1 + Math.sqrt(5)) * (index + 0.5); // Azimutal açı
                    particle.velocity = new BABYLON.Vector3(
                        Math.sin(phi) * Math.cos(theta),
                        Math.sin(phi) * Math.sin(theta),
                        Math.cos(phi)
                    );
                    const speed = 0.2; // Sabit hız
                    particle.velocity.scaleInPlace(speed);

                    particle.scaling.x = 1;
                    particle.scaling.y = 1;
                    particle.scaling.z = 1;
                }
                
                particles.init(initState)
                
                particles.update((particle) => {

                     // Pozisyonu güncelleme
                    particle.position.addInPlace(particle.velocity);
                    
                    let scaleFactor = Math.max(0, 1 - (this.elapsedTime / particle.lifeTime));
                    particle.scaling.x *= scaleFactor;
                    particle.scaling.y *= scaleFactor;
                    particle.scaling.z *= scaleFactor;
                
                    // Parçacık hızını azaltma
                    particle.velocity.scaleInPlace(0.98);
                    if(this.elapsedTime >= particle.lifeTime) {
                        particles.SPS.dispose()
                        console.log(getScene().particleSystems);
                    }
                })
                
                
                
        }   
    }
}

export default Explosion;
