# JS数据类型及检测方式
## JS的数据类型
> JavaScript一共有8种数据类型：分别为undefined、null、Boolean、number、string、bigInt(es10新增)、symbol(es6新增)、object

object包含：普通对象Object、数组对象Array、正则对象Regexp、日期对象Date、数学函数Math、函数对象Function
其中前7种为基础（原始）数据类型，最后一种为引用数据类型（根据在内存不同的存储方式来划分）
基础数据类型在存储在栈内存中，引用数据类型存储在堆内存中；
基础数据类型的赋值会完整的复制变量值，而引用类型的赋值是复制引用地址；函数传参时传递的是对象在堆中的内存地址值（数值）

*注意当编译过程中，JavaScript引擎判断到一个闭包，会在堆内存中新建一个`clousure(fn)`的对象（内置对象，JavaScript无法访问），用来保存里面的变量，所以闭包中的变量是存储在堆空间的*

## 数据类型检测
### typeof
typeof对于原始数据类型进行检测，除了null，其它都能检测出正确的类型；
typeof对于引用数据类型进行检测，除了function，其他都显示object
typeof对于NuN进行检测返回'number'
```js
typeof null // object
typeof function(){} // function
typeof NaN // number
```

### instanceof
instanceof 可以正确的检测出引用数据的类型，因为instanceof内部机制是通过判断对象(左边)的原型链中是否能找到类型(右边)的`prototype`
- 手写instanceof
```js
// 手写instanceof
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
    console.log(false, '非原型')
    return false
  }else {
    console.log(false, '非对象')
    return false
  }
}
```
## 数据类型转换
### 类型转换
|原始值|转换目标|结果|
|-----|-----|-----|
|number|boolearn|非0、-0及NaN的都为true|
|string|boolean|非空字符串的都为true|
|undefined、null|boolean|FALSE|
|引用类型|Boolean|TRUE|
|number|string|5->'5'|
|boolean、函数、symbol|string|'true'|
|数组|string|[1,2] -> '1,2'|
|对象|string|'object object'|
|string|number|'1'->1;'a'->NaN|
|数组|number|空数组->；存在一个元素且为数字->数字；其他->NaN|
|null、boolean|number|null、false->0;true->1|
|undefined、非数组的引用类型|number|NaN|
|symbol|number|抛错|

- 条件判断：除了undefined、null、false、NaN、''、0、-0以外，其他所有值都转为true，包括所有对象；
- 对象转原始类型的流程：优先调用`valueOf()`返回原始值；再调用`toString()`返回原始值
### 四则运算
如果一方是字符串，那么就会将另一方转换为字符串；
如果一方不是数字或字符串，那么就会将它转换为数字或者字符串；
### ==、===与Object.is()
== 中，左右两边都需要转换为数字然后进行比较
`[] == ![] // true`
=== 叫做严格相等，指左右两边不仅值要相等，类型也要相等；== 不像===那么严格，对于一般情况，只要值相等，就返回true，但是==还涉及一些类型转换：
- == 两边类型是否相同，相同就比较值的大小;
- null == undefined；
- == 两边是否为string或number，是的话则把string类型转换为number，再进行比较；
- 判断其中一方是否为boolean，如是则将boolean转换为number再进行比较；
- 其中一方为object的话，且另一方为string、number，会将object转换为string再进行比较；
