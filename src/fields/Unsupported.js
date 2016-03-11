import Field from './Field'
import * as At from 'lib/at'

class Unsupported extends Field {

  observe() {
    console.log('atwho')
    this.$element.atwho({
      at: "/",
      data: [
        "This text field is unsupported",
        "Hit enter to learn more."
      ],
      displayTimeout: 0
    })
    this.$element.on('inserted.atwho', () => {
      window.open("https://github.com/jessepollak/command/wiki/Why-isn't-command-supported-on-_______-website%3F", '_blank')
    })
  }
}

export default Unsupported
