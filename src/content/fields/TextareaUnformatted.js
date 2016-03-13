import mixin from 'content/lib/mixin'
import Textarea from './Textarea'
import Unformatted from './Unformatted'

class TextareaUnformatted extends Textarea { }
mixin(TextareaUnformatted, Unformatted)

export default TextareaUnformatted
