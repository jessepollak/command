import $ from 'jquery'
import * as Fields from 'fields'

$(document).on('focus', Fields.SELECTOR, (e) => {
  let field = Fields.getField($(e.target))
  field.observe()
})
