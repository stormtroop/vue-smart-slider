<template>
    <div class="vue-smart-slider-marks">
        <vue-smart-slider-mark
                v-for="mark in propMarks"
                :key="mark.id"
                :propMark="mark"
                :propWidth="propWidth"
                :propMax="propMax"></vue-smart-slider-mark>
    </div>
</template>

<script>
import VueSmartSliderMark from './VueSmartSliderMark'

export default {
  name: 'VueSmartSliderMarks',
  components: {
    VueSmartSliderMark
  },
  props: {
    propMarks: {
      type: Array,
      required: false,
      default: function () {
        return []
      }
    },
    propWidth: {
      type: Number,
      required: false,
      default: 0
    },
    propMax: {
      type: Number,
      required: false,
      default: 100
    }
  },
  computed: {},
  mounted () {

  }
}
</script>

<style scoped>

</style>
