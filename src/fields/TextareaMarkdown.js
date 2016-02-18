import mixin from 'lib/mixin'
import Textarea from './Textarea'
import Markdown from './Markdown'

class TextareaMarkdown extends Textarea { }
mixin(TextareaMarkdown, Markdown)

export default TextareaMarkdown
