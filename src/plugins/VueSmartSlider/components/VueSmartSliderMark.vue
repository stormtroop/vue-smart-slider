<template>
    <div class="vue-smart-slider-mark" v-bind:style="{ left: markPosition.toString().concat('%') }">
        <div class="vue-smart-slider-mark-label">
            {{propMark.label}}
        </div>
    </div>
</template>

<script>
export default {
  name: 'VueSmartSliderMark',
  props: {
    propMark: {
      type: Object,
      required: true
    },
    propWidth: {
      type: Number,
      required: true
    },
    propMax: {
      type: Number,
      required: true
    }
  },
  computed: {
    markPosition () {
      return this.propMark.value / this.propMax * 100
    }
  }
}
</script>

<style scoped>
    .vue-smart-slider-mark:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 1px;
        height: 20px;
        background-color: gray;
    }
    .vue-smart-slider-mark {
        margin-top: 25px;
        position: absolute;
    }
    .vue-smart-slider-mark .vue-smart-slider-mark-label {
        font-size: 10px;
        position: absolute;
        left: 50%;
        transform: translate(-50%, 20px);
    }
</style>
