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


## 手写call、apply和bind