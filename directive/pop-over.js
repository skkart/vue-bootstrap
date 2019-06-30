export default {
  inserted (el, binding) {
    const popoverId = binding.value

    if (popoverId === null || popoverId === '') {
      return
    }

    $(el).popover({
      html: true,
      content () {
        return $(popoverId).children('.popover-body').html()
      },
      title () {
        return $(popoverId).children('.popover-heading').html()
      }
    })
    $(el).on('click', function () {
      $(this).popover('show')
    })
    let dynId
    $(el).on('inserted.bs.popover', function () {
      dynId = $(this).attr('aria-describedby')

      $(this).on('focusout', function () {
        $(this).popover('hide')
      })

      $(`#${dynId}`).on('click', '.close', function () {
        $(this).parents('.popover').popover('hide')
      })
    })

    $(el).on('hide.bs.popover', () => {
      $(`#${dynId}`).off('click', '.close')
    })
  }
}
