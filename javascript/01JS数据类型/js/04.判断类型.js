function getType(obj) {
  let type = typeof obj
  if(type !== 'object') {
    return type
  }
  return Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, '$1')
}

console.log(getType([])) // Array
console.log(getType(() => {})) // function
console.log(getType(null)) // Null
