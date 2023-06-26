// 手写call
Function.prototype.myCall = function(context) {
  context = context || window
  const arg = [...arguments].slice(1)
  context.fn = this
  context.fn(...arg)
  delete context.fn
}
// 手写apply
Function.prototype.myApply = function(context) {
  context = context || window
  const arg = [...arguments].slice(1)
  context.fn = this
  context.fn(arg)
  delete context.fn
}

let obj = {
  name: '威威',
  showName(...arg) {
    console.log(this.name, ...arg)
  }
}
let obj1 = {
  name: '坤坤'
}

obj.showName.myCall(obj1, 1, 2)
obj.showName.myApply(obj1, [1, 2])