<template>
    <div class="vue-smart-slider-pip" v-bind:style="{ left: leftPosition(propPip).toString().concat('%') }">
        <div class="vue-smart-slider-mark-label">
            {{label(propPip)}}
        </div>
    </div>
</template>

<script>
export default {
  name: 'VueSmartSliderPip',
  props: {
    propPipCount: {
      type: Number,
      required: true
    },
    propPip: {
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
  data: function () {
    return {
      pipIndex: 0
    }
  },
  computed: {
    markPosition () {
      return this.propPip.value / this.propMax * 100
    }
  },
  methods: {
    label (propPip) {
      return this.propPip.label ? this.propPip.label : this.propPip.value
    },
    leftPosition (propPip) {
      return propPip.percentage ?? propPip.id / (this.propPipCount - 1) * 100
    }
  }
}
</script>

<style scoped>
    .vue-smart-slider-pip:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 1px;
        height: 20px;
        background-color: gray;
    }
    .vue-smart-slider-pip {
        margin-top: 25px;
        position: absolute;
    }
    .vue-smart-slider-pip .vue-smart-slider-mark-label {
        font-size: 10px;
        position: absolute;
        left: 50%;
        transform: translate(-50%, 20px);
    }
</style>
