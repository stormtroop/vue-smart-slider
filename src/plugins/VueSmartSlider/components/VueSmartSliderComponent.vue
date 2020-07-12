<template>
  <div class="vue-smart-slider-container" ref="VueSmartContainer">
    <input type="number" v-model="value">

    <div class="vue-smart-slider" v-bind:style="{ 'max-width': propWidth.toString().concat('px') }" ref="VueSmartSlider">
      <div class="vue-smart-slider-rail" ref="VueSmartRail">
        <vue-smart-slider-process v-if="this.propProcess"
                                  v-bind:transition="this.transition"
                                  v-bind:height="propRailHeight"
                                  v-bind:left="left"></vue-smart-slider-process>

        <div class="vue-smart-slider-control" ref="VueSmartControl"
             v-bind:style="{ left: left + 'px', top: controlState.top, transition: transition }"
             v-on:mouseup="onControlMouseUp"
             v-on:mousedown="onControlMouseDown"
             v-on:touchend="onControlMouseUp"
             v-on:touchstart="onControlMouseDown"></div>

        <vue-smart-slider-marks
          v-if="propMarks.length"
          v-bind:prop-marks="propMarks"
          v-bind:prop-width="propWidth"
          v-bind:prop-max="propMax"></vue-smart-slider-marks>

        <vue-smart-slider-pips
          v-if="propPips.length"
          v-bind:prop-pips="propPips"
          v-bind:prop-width="propWidth"
          v-bind:prop-max="propMax"></vue-smart-slider-pips>
      </div>

      <vue-smart-slider-debug v-bind:debug-object="debug"></vue-smart-slider-debug>
    </div>
  </div>
</template>

<script>
import VueSmartSliderDebug from './VueSmartSliderDebug.vue'
import VueSmartSliderMarks from './VueSmartSliderMarks.vue'
import VueSmartSliderPips from './VueSmartSliderPips.vue'
import VueSmartSliderProcess from './VueSmartSliderProcess.vue'

export default {
  name: 'VueSmartSliderComponent',
  components: {
    VueSmartSliderDebug,
    VueSmartSliderMarks,
    VueSmartSliderPips,
    VueSmartSliderProcess
  },
  props: {
    propProcess: {
      type: Boolean,
      required: false,
      default: true
    },
    propMin: {
      type: Number,
      required: false,
      default: 0
    },
    propMax: {
      type: Number,
      required: false,
      default: 100
    },
    propDefaultValue: {
      type: Number,
      required: false,
      default: 10
    },
    propWidth: {
      type: Number,
      required: false,
      default: 100
    },
    propRailColor: {
      type: String,
      required: false,
      default: '#ccc'
    },
    propRailHeight: {
      type: Number,
      required: false,
      default: 18
    },
    propLabel: {
      type: Boolean,
      required: false,
      default: true
    },
    propFloatingValues: {
      type: Boolean,
      required: false,
      default: true
    },
    propTransition: {
      type: String,
      required: false,
      default: 'left 500ms ease-in, width 500ms ease-in'
    },
    propMarks: {
      type: Array,
      required: false,
      default: function () {
        return []
      }
    },
    propPips: {
      type: Array,
      required: false,
      default: function () {
        return []
      }
    }
  },
  created: function () {
    this.$nextTick(() => {
      this.onResize()
      window.addEventListener('resize', this.onResize)
    })
  },
  destroyed: function () {
    window.removeEventListener('resize', this.onResize)
  },
  data: function () {
    return {
      transition: '',
      railWidth: 0,
      controlState: {
        moving: false,
        left: 0,
        right: 0
      },
      debug: {
        cursorPosition: 0,
        cursorPositionRelativeToElement: 0,
        cursorPercentageToElement: 0,
        value: 0
      },
      options: {
        width: 200
      },
      isMounted: false,
      value: 50
    }
  },
  computed: {
    rail: function () {
      return this.$refs.VueSmartRail
    },
    control: function () {
      return this.$refs.VueSmartControl
    },
    left: function () {
      let leftPosition = 0

      if (this.isMounted) {
        if (this.propPips && this.propPips.length) {
          const pips = this.propPips
          const value = this.value

          pips.forEach((pip, index) => {
            let nextPip = pip
            if (index + 1 in pips) {
              nextPip = pips[index + 1]
            }

            if (value >= pip.value && value <= nextPip.value) {
              const increment = (nextPip.value - pip.value) / (nextPip.percentage - pip.percentage)
              leftPosition = this.railWidth / 100 * (pip.percentage + (value - pip.value) / increment) - (this.control.getBoundingClientRect().width / 2)
            }
          })
        } else {
          leftPosition = this.value / this.propMax * this.railWidth - (this.control.getBoundingClientRect().width / 2)
        }
      }
      // console.log(`leftPosition ${leftPosition}`)
      return leftPosition
    }
  },
  methods: {
    onResize: function () {
      this.railWidth = this.rail.getBoundingClientRect().width
    },
    getMinPip: function () {
      let minPip = null
      for (let i = 0; i < this.propPips.length; i++) {
        if (!minPip || minPip.value > this.propPips[i].value) {
          minPip = this.propPips[i]
        }
      }
      return minPip
    },
    getMaxPip: function () {
      let maxPip = null
      for (let i = 0; i < this.propPips.length; i++) {
        if (!maxPip || maxPip.value < this.propPips[i].value) {
          maxPip = this.propPips[i]
        }
      }
      return maxPip
    },
    onChange: function (event) {
      this.value = Number(this.$refs.VueSmartSlider.value)
    },
    onControlMouseDown: function (event) {
      this.controlState.moving = true
      console.log(this.controlState.moving)
      document.body.style.cursor = 'pointer'
    },
    onControlMouseUp: function () {
      this.controlState.moving = false
      document.body.style.cursor = 'auto'
    },
    onRailClick: function (event) {
      // const relativeX = event.clientX - this.rail.getBoundingClientRect().left
      this.transition = this.propTransition
      const value = this.calculateValue(event.clientX)
      // this.rail.style.transition = null
      this.moveControl(value)
    },
    moveControl: function (value) {
      this.value = value
    },
    onContainerMouseMove: function (event) {
      if (this.controlState.moving) {
        const x = event.type === 'touchmove' ? event.changedTouches[0].clientX : event.clientX
        this.transition = ''
        const value = this.calculateValue(x)

        if (value <= this.propMax && value >= this.propMin) {
          this.moveControl(value)
        }
      }
    },
    calculateValue (z) {
      // z = mouse position
      const c = this.control.getBoundingClientRect().left
      const cW = this.control.offsetWidth
      const cP = c + cW / 2
      const rW = this.rail.offsetWidth
      const rL = this.rail.getBoundingClientRect().left
      const x = rL + cW / 2
      // const y = this.rail.offsetWidth + this.rail.getBoundingClientRect().left
      const a = rW - (cW / 2)
      const zA = z - x
      const zP = zA / a * 100

      if (this.propPips && this.propPips.length) {
        const pips = this.propPips
        let value = null

        pips.forEach((pip, index) => {
          let nextPip = pip
          if (index + 1 in pips) {
            nextPip = pips[index + 1]
          }

          console.log(this.getMaxPip().value)
          if (zP >= this.getMaxPip().percentage) {
            value = this.getMaxPip().value
          } else if (zP >= pip.percentage && zP <= nextPip.percentage) {
            const increment = (nextPip.value - pip.value) / (nextPip.percentage - pip.percentage)
            value = pip.value + (zP - pip.percentage) * increment
          }
        })
        // console.log(`pips value: ${value}`)
        this.debug = {
          controlPosition: cP,
          cursorPosition: z,
          railWidth: rW,
          railOffsetLeft: rL,
          controlWidth: cW,
          cursorPositionRelativeToElement: zA,
          cursorPercentageToElement: zP,
          value: zP / 100 * this.propMax
        }

        console.log(value)
        value = value < this.getMinPip().value ? this.getMinPip().value : (value > this.getMaxPip().value ? this.getMaxPip().value : value)
        console.log(value)
        return this.propFloatingValues ? value : Math.round(value)
      }

      this.debug = {
        controlPosition: cP,
        cursorPosition: z,
        railWidth: rW,
        railOffsetLeft: rL,
        controlWidth: cW,
        cursorPositionRelativeToElement: zA,
        cursorPercentageToElement: zP,
        value: zP / 100 * this.propMax
      }
      let value = zP / 100 * this.propMax
      value = value < this.propMin ? this.propMin : (value > this.propMax ? this.propMax : value)

      return this.propFloatingValues ? value : Math.round(value)
      // return this.rail.getBoundingClientRect().width - x - this.rail.getBoundingClientRect().left

      // return x / (this.rail.offsetWidth + this.control.offsetWidth) * this.propMax
    }
  },
  mounted: function () {
    this.isMounted = true
    this.value = this.propDefaultValue

    const styles = this.rail.style
    // styles.backgroundColor = this.propRailColor ?? this.propRailColor.default
    styles.height = this.propRailHeight.toString().concat('px')

    // desktop
    document.addEventListener('mousemove', this.onContainerMouseMove)
    document.addEventListener('mouseup', this.onControlMouseUp)
    // mobile
    document.addEventListener('touchmove', this.onContainerMouseMove)
    document.addEventListener('touchend', this.onControlMouseUp)

    this.rail.addEventListener('click', this.onRailClick)
  }
}
</script>

<style scoped>
  .vue-smart-slider-container {
    max-width: 1080px;
    padding: 15px;
    margin: auto;
  }

  .vue-smart-slider {
    border-radius: 3px;
  }

  .vue-smart-slider-rail {
    background-color: #2f3a44;
    position: relative;
    cursor: pointer;
    border-radius: 5px;
    border: 1px solid #7491ab;
  }

  .vue-smart-slider-control {
    position: absolute;
    top: 50%;
    -webkit-transform: translate(0, -50%);
    -moz-transform: translate(0, -50%);
    -ms-transform: translate(0, -50%);
    -o-transform: translate(0, -50%);
    transform: translate(0, -50%);
    background-color: #2f3a44;
    border-radius: 4px;
    width: 34px;
    height: 28px;
    border: 1px solid #7491ab;
  }

  .vue-smart-slider-control:after {
    opacity: 0.2;
    content: '||';
    display: block;
    color: #e8e7e6;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
