export default {
  inserted (el, binding) {
    if (!binding.value.pickerOptions) {
      binding.value.pickerOptions = {}
    }
    $(el).daterangepicker({
      timePicker: true,
      timePicker24Hour: true,
      timePickerIncrement: 1,
      buttonClasses: 'btn btn-sm',
      applyButtonClasses: 'btn-apply',
      cancelClass: 'btn-cancel',
      opens: 'center',
      showDropdowns: true,
      linkedCalendars: false,
      maxSpan: 'off',
      ...binding.value.pickerOptions
    }, (...args) => {
      binding.value.onDateSubmit(...args)
    })

  },
  update (el, binding) {
    if (binding.value.pickerOptions) {
      const datePicker = $(el).data('daterangepicker')
      datePicker.ranges = binding.value.pickerOptions.ranges
      datePicker.startDate = binding.value.pickerOptions.startDate
      datePicker.endDate = binding.value.pickerOptions.endDate
      datePicker.maxDate = binding.value.pickerOptions.maxDate
      datePicker.updateView()
      datePicker.updateElement()
    }
  },
  unbind (el, binding) {
    const datePicker = $(el).data('daterangepicker')
    datePicker.remove()
    datePicker = null
  }
}
