<template>
    <div class="vue-smart-slider-pips">
        <vue-smart-slider-pip
                v-for="pip in propPips"
                :key="pip.id"
                :prop-pip-count="propPips.length"
                :propPip="pip"
                :propWidth="propWidth"
                :propMax="propMax"></vue-smart-slider-pip>
    </div>
</template>

<script>
import VueSmartSliderPip from './VueSmartSliderPip'

export default {
  name: 'VueSmartSliderPips',
  components: {
    VueSmartSliderPip
  },
  props: {
    propPips: {
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
