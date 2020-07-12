<template>
  <div id="app">
    lol
    <img alt="Vue logo" src="./assets/logo.png">
    <vue-smart-slider-component
            :propWidth="width"
            :prop-max="1000"
            :prop-default-value="100"
            :prop-pips="pips"
            :prop-marks="marks"></vue-smart-slider-component>
  </div>
</template>

<script>

export default {
  name: 'App',
  data: function () {
    return {
      width: 1080,

      pips: [{
        id: 0,
        percentage: 0,
        value: 10
      }, {
        id: 1,
        percentage: 5,
        value: 12
      }, {
        id: 2,
        percentage: 10,
        value: 14
      }, {
        id: 3,
        percentage: 14,
        value: 16
      }, {
        id: 4,
        percentage: 19,
        value: 18
      }, {
        id: 5,
        percentage: 24,
        value: 20
      }, {
        id: 6,
        percentage: 29,
        value: 22
      }, {
        id: 7,
        percentage: 33,
        value: 24
      }, {
        id: 8,
        percentage: 38,
        value: 28
      }, {
        id: 9,
        percentage: 43,
        value: 32
      }, {
        id: 10,
        percentage: 48,
        value: 42
      }, {
        id: 11,
        percentage: 52,
        value: 50
      }, {
        id: 12,
        percentage: 57,
        value: 64
      }, {
        id: 13,
        percentage: 62,
        value: 70
      }, {
        id: 14,
        percentage: 67,
        value: 80
      }, {
        id: 15,
        percentage: 71,
        value: 100
      }, {
        id: 16,
        percentage: 76,
        value: 125
      }, {
        id: 17,
        percentage: 81,
        value: 150
      }, {
        id: 18,
        percentage: 86,
        value: 175
      }, {
        id: 19,
        percentage: 90,
        value: 200
      }, {
        id: 20,
        percentage: 95,
        value: 250
      }, {
        id: 21,
        percentage: 100,
        value: 1000
      }],
      marks: []
      // [10,12,14,16,18,20,22,24,28,32,42,50,64,70,80,100,125,150,175,200,250,1000]
      /*
      marks: [{
        id: 1,
        label: '0',
        value: 0
      }, {
        id: 2,
        label: '100',
        value: 100
      }, {
        id: 3,
        label: 'mitte',
        value: 500
      }, {
        id: 4,
        label: '1000',
        value: 1000
      }]
       */
    }
  },
  components: {
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
