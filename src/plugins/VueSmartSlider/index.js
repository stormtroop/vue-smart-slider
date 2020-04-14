import VueSmartSlider from './components/VueSmartSliderComponent.vue'

// This is your plugin object. It can be exported to be used anywhere.
const MyPlugin = {
  // The install method is all that needs to exist on the plugin object.
  // It takes the global Vue object as well as user-defined options.
  install (Vue, options) {
    Vue.component(VueSmartSlider.name, VueSmartSlider)
    Vue.mixin({
      mounted () {
        console.log('Mounted!')
      }
    })
  }
}

export default MyPlugin
