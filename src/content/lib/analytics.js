import * as Extension from 'content/lib/extension'

export function sendEvent(category, action, label, value) {
  Extension.sendMessage({
    method: "sendEvent",
    category: category,
    action: action,
    label: label,
    value: value
  })
}
