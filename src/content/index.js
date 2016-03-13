import $ from 'jquery'
import * as Fields from './fields'

$(document).on('keypress focus', Fields.SELECTOR, (e) => {
  Fields.setup($(e.target))
})
