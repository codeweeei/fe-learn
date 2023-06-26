// 手写instanceOf
function _instanceOf(obj, type) {
  if(typeof obj === 'object' && obj !== null || typeof obj === 'function') {
    let proto = obj.__proto__
    let prototype = type.prototype
    while(proto) {
      if(proto === prototype) {
        console.log(true)
        return true
      }
      proto = proto.__proto__
    }
    console.log(false, '非类型')
    return false
  }else {
    console.log(false, '非对象')
    return false
  }
}
let val = function(){}
console.log(val instanceof Object)
_instanceOf(val, Function)