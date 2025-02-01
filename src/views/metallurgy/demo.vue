<template lang="html">
  <div>
    <router-link to="/">
      <circle-button class="home-button">
        arrow_back
      </circle-button>
    </router-link>
    <div class="container">
      <canvas ref="canvas" class="full-screen-canvas"></canvas>
      <div class="controller">
        <circle-button v-on:click.native="run">play_arrow</circle-button>
        <circle-button v-on:click.native="restart">replay</circle-button>
        <circle-button v-on:click.native="toggleModal(true)">settings</circle-button>
      </div>
      <transition name="fade">
        <base-modal v-if="modal">
          <div class="row">
            <div class="six columns">
              <label for="initialTemp">Initial Temperature (°C)</label>
              <input name="initialTemp" type="number" v-model.number="initialTemp" min="100" max="1500">
            </div>
            <div class="six columns">
              <label for="coolingRate">Cooling Rate</label>
              <input name="coolingRate" type="number" v-model.number="coolingRate" step="0.01" min="0.01" max="1">
            </div>
          </div>
          <label for="speed">Simulation Speed</label>
          <input name="speed" type="number" v-model.number="speed" min="1" max="100">
          <hr>
          <button v-on:click="toggleModal(false)" style="width: 100%;">Done</button>
        </base-modal>
      </transition>
    </div>
  </div>
</template>

<script>
import CircleButton from '../../components/CircleButton.vue';
/* eslint-disable vue/no-unused-components */
import BaseModal from '../../components/modal.vue';
import app from './js/main';

export default {
  name: 'MetallurgyDemo',
  components: {
    CircleButton,
    BaseModal
  },
  data () {
    return {
      // Colors
      backgroundHillColor: '#2C0A0A',  // Darker red
      hillColor: '#1A0505',           // Very dark red
      backgroundColor: '#3D0C0C',     // Medium dark red
      particleColor: '#FFD700',       // Bright gold for particles
      // UI
      modal: true,
      // Initial values
      initialTemp: 1000,
      coolingRate: 0.95,
      speed: 50
    }
  },
  computed: {
    keyFrame () {
      const RANGE = 100
      const MAX_KEYFRAME = 100
      const MIN_KEYFRAME = 1
      let keyFrame = ((MAX_KEYFRAME - MIN_KEYFRAME) *
      (RANGE - parseInt(this.speed, 10)) / RANGE) + 1
      return Math.round(keyFrame)
    }
  },
  methods: {
    setCanvasSize () {
      app.setCanvasSize(this.$refs.canvas)
      this.render()
    },
    render () {
      app.render(this.$refs.canvas, {
        backgroundColor: this.backgroundColor,
        backgroundHillColor: this.backgroundHillColor,
        hillColor: this.hillColor,
        particleColor: this.particleColor
      })
    },
    initialize () {
      app.initialize(this.$refs.canvas, {
        backgroundColor: this.backgroundColor,
        backgroundHillColor: this.backgroundHillColor,
        hillColor: this.hillColor,
        particleColor: this.particleColor
      })
    },
    run () {
      app.run({
        initialTemp: this.initialTemp,
        coolingRate: this.coolingRate,
        keyframe: this.keyFrame
      })
    },
    restart () {
      app.terminate()
      this.initialize()
    },
    toggleModal (force) {
      this.modal = force || !this.modal
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initialize()
      window.addEventListener('resize', this.setCanvasSize)
    })
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.setCanvasSize)
    app.terminate()
  }
}
</script>

<style scoped lang="css">
.fade-enter-active, .fade-leave-active {
  transition: opacity .25s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.full-screen-canvas {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
}
.controller {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
}
.home-button {
  position: fixed;
  top: 20px;
  left: 20px;
}
</style> 