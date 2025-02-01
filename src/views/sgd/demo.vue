/* eslint-disable */
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
        <circle-button v-on:click.native="run">
          <span class="material-icons">play_arrow</span>
        </circle-button>
        <circle-button v-on:click.native="restart">
          <span class="material-icons">replay</span>
        </circle-button>
        <circle-button v-on:click.native="toggleModal(true)">
          <span class="material-icons">settings</span>
        </circle-button>
      </div>
      <transition name="fade">
        <base-modal v-if="modal">
          <div class="row">
            <div class="six columns">
              <label for="learningRate">Learning Rate</label>
              <input name="learningRate" type="number" v-model.number="learningRate" step="0.01" min="0.01" max="1">
            </div>
            <div class="six columns">
              <label for="momentum">Momentum</label>
              <input name="momentum" type="number" v-model.number="momentum" step="0.1" min="0" max="1">
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
import app from './js/main';

export default {
  name: 'SgdDemo',
  components: {
    CircleButton
  },
  data () {
    return {
      // Colors
      backgroundHillColor: '#1050C0',
      hillColor: '#071A39',
      backgroundColor: '#2D6ED6',
      ballColor: '#F9E880',
      // UI
      modal: true,
      // Initial values
      learningRate: 0.1,
      momentum: 0.9,
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
        ballColor: this.ballColor
      })
    },
    initialize () {
      app.initialize(this.$refs.canvas, {
        backgroundColor: this.backgroundColor,
        backgroundHillColor: this.backgroundHillColor,
        hillColor: this.hillColor,
        ballColor: this.ballColor
      })
    },
    run () {
      app.run({
        learningRate: parseFloat(this.learningRate),
        momentum: parseFloat(this.momentum),
        algorithm: 'sgd',
        keyframe: this.keyFrame,
        stepSize: 50
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