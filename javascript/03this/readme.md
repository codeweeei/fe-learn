# this
## this指向
### this指向规则
- 正常情况下，不同情况的调用，this指向不一样
- 对于直接调用`foo`，this一定指向window；
- 对于`obj.foo()`，谁调用函数，函数内this就指向谁；
- 对于`new`方式，this永远绑定在new创建的实例上，不会被任何方式所改变this的指向；
- 对于箭头函数而言，箭头函数中是没有this的，箭头函数中的this只取决于包裹箭头函数的第一个普通函数的this，且bind等方式对于箭头函数是无效的；
- 最后也可以使用call、apply、bind方法来主动更改函数中this的指向；
### this指向优先级
优先级排列
- new -> bind -> obj.foo() -> foo()
其中new跟箭头函数的this一旦被绑定就无法更改；

### this的应用场景
- 利用Object.prototype.toString.call(obj)来判断数据类型
- 类数组借用数组方法：由于类数组不是真正的数据，因此类数组上没有数组类型上自带的方法，所以我们可以借用数组的方法；
```js
let likeArray = {
  0: 'java',
  1: 'python',
  length: 2
}
Array.prototype.push.call(likeArray, 'c++', 'javascript')
console.log(likeArray) // { 0: 'java', 1: 'python', 2: 'c++', 3: 'javascript', length: 4 }
```

## 手写call、apply和bind
### 手写call
```js
Function.prototype.myCall = function(context) {
  context = context || window // 不传参则表示指向window
  let args = [...arguments].slice(1)
  context.fn = this
  context.fn(...args) // 传 1， 2。。。形式 
  delete context.fn
}
```
### 手写apply
```js
Function.prototype.myApply = function(context) {
  context = context || window
  let args = [...arguments].slice(1)
  context.fn = this
  context.fn(args) // 传 [] 形式
  delete context.fn
}
```
### 手写bind
```js
Function.prototype.myBind(context) {
  context = context || window
  let arg = [...arguments].slice(1)
  let _this = this
  return function(...args) {
    return _this.call(context, ...[...arg, ...args])
  }
}
```