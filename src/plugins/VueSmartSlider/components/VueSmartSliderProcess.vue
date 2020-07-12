<template>
    <div class="vue-smart-slider-process"
         v-if="left !== undefined"
         v-bind:style="{ height: height.toString().concat('px'), width: left.toString().concat('px'), transition: transition }">
    </div>
</template>

<script>
export default {
  name: 'VueSmartSliderProcess',
  props: {
    left: {
      required: true,
      type: Number,
      default: 0
    },
    height: {
      required: true,
      type: Number,
      default: 0
    },
    transition: {
      required: true,
      type: String
    }
  }
}
</script>

<style scoped>
    .vue-smart-slider-process {
        -webkit-box-shadow: none;
        box-shadow: none;
        -webkit-box-shadow: 0 0 35px 0 rgba(0, 0, 0, .3);
        box-shadow: 0 0 35px 0 rgba(0, 0, 0, .3);
        background-image: -webkit-gradient(linear, right top, left top, from(#463751), to(#2d3544));
        background-image: linear-gradient(-90deg, #463751, #2d3544);
    }
</style>
