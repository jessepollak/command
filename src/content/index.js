import $ from 'jquery'
import * as Fields from 'fields'

$(document).on('focus', Fields.SELECTOR, (e) => {
  Fields.setup($(e.target))
})
