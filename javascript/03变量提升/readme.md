# 变量提升
## 变量及函数提升
### 提升
- 当执行JS代码时，会生成执行环境，只要代码不是写在函数中，就是在全局执行环境中，函数中的代码会产生函数执行环境；只有这两种执行环境；
```js
console.log(a) // undefined
b() // b
var a = 1
console.log(a) // 1
function b() {
  console.log('b')
}
```
- 上述代码就发生了提升，所谓提升解释就是将声明的代码提升到执行环境的最顶层的操作；
- 更确切的解释就是：在创建执行环境过程中，会有两个阶段，首先是创建阶段，JS解释器会找到需要提升的变量和函数，并在内存中提前为他们开辟好空间；var声明的变量默认为undefined，声明的函数则整个保存在内存中；因此在第二个阶段，代码执行阶段就可以直接使用了；

- 后声明函数会覆盖前声明函数，且函数优先于var变量提升
```js
b() // 2
function b() {
  console.log('1') 
}
function b() {
  console.log('2') 
}
var b = 3
```
### var的弊端
var声明变量的提升会带来很多问题，因此后续ES6推出了let和const来声明变量；let和const声明变量也会提升，但是产生的暂时性死区不允许在变量赋值前访问变量；
```js
console.log(b) // Uncaught ReferenceError: Cannot access 'b' before initialization
let b = 2
```