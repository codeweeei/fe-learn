# 作用域与闭包
## 作用域
- 作用域
作用域是定义变量的区域，它有一套访问变量的规则，这套规则管理浏览器引擎如何在当前作用域或者嵌套的作用域中根据变量标识来进行变量查找；
- 作用域链

## 闭包
闭包就是可以访问其他函数内部变量的函数，闭包产生的本质就是当前环境中存在指向父级作用域的引用；
### 闭包的用途
1. 我们在函数外部能够访问函数内部的变量，通过使用闭包，我们可以通过在外部调用闭包函数，从而在外部访问到函数内部的变量，可以使用这种方式来创建私有变量；
2. 闭包的另一个用途就是 
### 闭包的应用
解决循环输出问题
```js
for(var i=1;i<=5;i++) {
  setTimeout(function timer() {
    console.log(i)
  }, 1000)
}
```
目标：打印出1，2，3，4，5
结果：一秒后同时打印出6个6
 
解决方法：
- 利用IIFE立即执行函数
```js
for(var i=1;i<=5;i++) {
  (function IIFE(j) {
    setTimeout(function timer() {
      console.log(j)
    }, 1000)
  })(i)
}
```
- 利用setTimeout的第三个参数
```js
for(var i=1;i<=5;i++) {
  setTimeout(function timer(j) {
    console.log(j)
  }, 1000, i)
}
```

- 利用let
```js
for(let i=1;i<=5;i++) {
  setTimeout(function timer() {
    console.log(i)
  }, 1000)
}
```
