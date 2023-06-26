# 作用域与闭包
## 作用域
- 作用域
作用域是定义变量的区域，它有一套访问变量的规则，这套规则管理浏览器引擎如何在当前作用域或者嵌套的作用域中根据变量标识来进行变量查找；
- 作用域链

## 闭包
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
