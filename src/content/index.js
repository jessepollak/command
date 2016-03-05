import $ from 'jquery'
import * as Fields from 'fields'

$(document).on('keydown', Fields.SELECTOR, (e) => {
  Fields.setup($(e.target))
})
