export default {
  inserted (el, binding) {
    const defOpts = {
      trigger: 'hover',
      type: 'tooltip'
    }
    const tooltipOpts = binding.value || {}
    !tooltipOpts.hide && $(el).tooltip({
      ...defOpts,
      ...tooltipOpts
    })
  },
  update (el, binding) {
    const defOpts = {
      trigger: 'hover',
      type: 'tooltip'
    }
    const tooltipOpts = binding.value || {}
    $(el).tooltip('dispose')
    !tooltipOpts.hide && $(el).tooltip('dispose').tooltip({
      ...defOpts,
      ...tooltipOpts
    })
  },
  unbind (el, binding) {
    $(el).tooltip('dispose')
  }
}
