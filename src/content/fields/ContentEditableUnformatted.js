import mixin from 'content/lib/mixin'
import ContentEditable from './ContentEditable'
import Unformatted from './Unformatted'

class ContentEditableUnformatted extends ContentEditable { }
mixin(ContentEditableUnformatted, Unformatted)

export default ContentEditableUnformatted
