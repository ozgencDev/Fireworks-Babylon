import * as BABYLON from 'babylonjs';
import { getScene } from './SceneManager.js';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

class Particles {
    constructor({count, size, colors, minLifeTime, maxLifeTime}) {
        if(_.some([count, size, colors,minLifeTime,maxLifeTime],_.isNil)){
            alert("Particles Parametreleri Arasında Null var")
            console.error("Particles Parametreleri Arasında Null var");
            throw new Error("Particles Parametreleri Arasında Null var")
        }
        
        this.SPS = new BABYLON.SolidParticleSystem('SELAM', getScene());
        this.colors = colors;
        const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: size });
        this.SPS.addShape(sphere, count);
        
        sphere.dispose(); // Artık gerekmediği için küreyi sahneden kaldır

        // Tek bir materyal oluştur
        const sharedMaterial = new BABYLON.StandardMaterial("sharedMaterial", getScene());
        this.SPS.mesh = this.SPS.buildMesh(); // SPS'den mesh oluştur
        this.SPS.mesh.material = sharedMaterial; // Tek bir materyali tüm partiküllerle paylaş
        this.minLifeTime = minLifeTime;
        this.maxLifeTime = maxLifeTime;
        

        return this;
    }
    
    init(behaviour) {
        this.SPS.initParticles = () => {
            this.SPS.particles.forEach((particle, index) => {
                console.log("sa");
                particle.color = new BABYLON.Color3.FromHexString(_.sample(this.colors));
                console.log("saadsadas");
                particle.position.x = 0;
                particle.position.y = 0;
                particle.position.z = 0;
                //TODO İNCELEEEEEEEEEEEEEEEEEEEE!!!!!!!!!
                if(this.minLifeTime === this.maxLifeTime) {
                    particle.lifeTime = this.minLifeTime
                } else {
                    particle.lifeTime = _.random(this.minLifeTime, this.maxLifeTime)
                }
                behaviour(particle, index)
            });
        };
        this.SPS.initParticles();
        this.SPS.setParticles();
    }
    
    update(behaviour) {
       this.SPS.updateParticle = behaviour;
    }
    
    

    getParticlesCount() {
        return this.SPS.nbParticles;
    }
}

export default Particles;
