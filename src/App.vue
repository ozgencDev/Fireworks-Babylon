<template>
  <div>
    <div class="w-full max-w-md mb-6 absolute">
      <button
        @click="toggleSettings"
        class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg text-left flex justify-between items-center"
      >
        <span>Settings</span>
        <span>{{ isSettingsOpen ? "▲" : "▼" }}</span>
      </button>
      <div
        v-if="isSettingsOpen"
        class="mt-4 bg-white shadow-md rounded-lg p-4"
      >
        <!-- Particle Count -->
        <div class="mb-4">
          <label class="block text-gray-700 font-medium mb-2">Particle Count</label>
          <input
            type="range"
            min="10"
            max="300"
            v-model="particleCount"
            class="w-full"
          />
          <p class="text-gray-600 mt-1 text-sm">Count: {{ particleCount }}</p>
        </div>

        <!-- Particle Size -->
        <div class="mb-4">
          <label class="block text-gray-700 font-medium mb-2">Particle Size</label>
          <input
            type="range"
            min="1"
            max="10"
            step="0.5"
            v-model="particleSize"
            class="w-full"
          />
          <p class="text-gray-600 mt-1 text-sm">Size: {{ particleSize }}</p>
        </div>
        
        <!-- Particle Min Life Time -->
        
        <div class="mb-4">
          <label class="block text-gray-700 font-medium mb-2">Particle Min Life Time</label>
          <input
            type="range"
            min="0.1"
            max="10"
            step="0.1"
            v-model="particleMinLifeTime"
            class="w-full"
          />
          <p class="text-gray-600 mt-1 text-sm">Min Life: {{ particleMinLifeTime }}</p>
        </div>
        
        <!-- Particle Max Life Time -->
        
        <div class="mb-4">
          <label class="block text-gray-700 font-medium mb-2">Particle Min Life Time</label>
          <input
            type="range"
            min="0.1"
            max="10"
            step="0.1"
            v-model="particleMaxLifeTime"
            class="w-full"
          />
          <p class="text-gray-600 mt-1 text-sm">Max Life: {{ particleMaxLifeTime }}</p>
        </div>

        <!-- Particle Colors -->
        <div class="mb-4">
          <label class="block text-gray-700 font-medium mb-2">Particle Colors</label>
          <div class="flex items-center space-x-4">
            <input
              type="color"
              v-model="selectedColor"
              class="w-12 h-12 border-2 border-gray-400 cursor-pointer"
            />
            <button
              @click="addColor"
              class="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600"
            >
              Add Color
            </button>
          </div>
          <div class="flex items-center space-x-4 mt-4">
            <div
              v-for="(color, index) in particleColors"
              :key="index"
              class="w-12 h-12 rounded-full"
              :style="{ backgroundColor: color }"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <canvas ref="canvas" @click="explosion"></canvas>
  </div>
</template>

<script>
import * as BABYLON from 'babylonjs';
import {createScene} from './SceneManager.js';
import Explosion from './Explosion.js'

export default {
  name: "App",
  data() {
    return {
      isSettingsOpen: false, // Ayarlar menüsünün açık olup olmadığını kontrol eder
      particleCount: 50, // Varsayılan partikül sayısı
      particleSize: 3, // Varsayılan partikül boyutu
      selectedColor: "#ff0000", // Varsayılan olarak kırmızı
      particleColors: [], // Seçilen renklerin tutulduğu array
      particleMinLifeTime: 1,
      particleMaxLifeTime: 1
    }
  },
  mounted() {
    const engine = new BABYLON.Engine(this.$refs.canvas,true);
    //Singleton Scene
    const scene = createScene(engine,this.$refs.canvas);
    // Render döngüsü
    engine.runRenderLoop(() => {
        scene.render();
    });

  
  },
  methods: {
    toggleSettings() {
      this.isSettingsOpen = !this.isSettingsOpen; // Ayarlar menüsünü aç/kapat
    },
    addColor() {
      // Seçilen rengi daha önce eklenmediyse listeye ekle
      if (!this.particleColors.includes(this.selectedColor)) {
        this.particleColors.push(this.selectedColor);
      }
    },
    explosion() {
      const particles = {
        count: this.particleCount,
        size: this.particleSize, 
        colors: this.particleColors, 
        minLifeTime: this.particleMinLifeTime, 
        maxLifeTime: this.particleMaxLifeTime
      };
      const exp = new Explosion(null, particles)
      exp.trigger();
    }
  }
}
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  text-align: center;
}

canvas {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
