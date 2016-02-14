import clc from 'cli-color';

export const pending = function(message) {
  console.log(clc.yellow(message))
}

export const success = function(message) {
  console.log(clc.green(message))
}

export const error = function(message) {
  console.error(clc.red(message))
}

export const done = function() {
  success("Done")
}
