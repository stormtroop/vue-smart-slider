<template>
    <ul class="vue-smart-slider-debug">
        <li>control width: {{debugObject.controlWidth}}</li>
        <li>rail width: {{debugObject.railWidth}}</li>
        <li>control left position: {{debugObject.controlPosition}}</li>
        <li>rail left position: {{debugObject.railOffsetLeft}}</li>
        <li>cursor position: {{debugObject.cursorPosition}}</li>
        <li>relative position: {{debugObject.cursorPositionRelativeToElement}}</li>
        <li>percentage: {{debugObject.cursorPercentageToElement}}</li>
        <li>value: {{debugObject.value}}</li>
    </ul>
</template>

<script>
export default {
  name: 'VueSmartSliderDebug',
  props: {
    debugObject: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
    .vue-smart-slider-debug {
        position: absolute;
        z-index: 100;
        bottom: 0;
        height: auto;
    }
</style>
