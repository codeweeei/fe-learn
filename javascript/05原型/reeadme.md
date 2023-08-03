# 原型
JavaScript是使用构造函数来新建一个对象的，每个构造函数内部都有一个protype属性值，这个属性值是一个对象，这个对象包含了可以由该构造函数的所有实例共享的属性和方法；
当查找一个对象的某个属性或方法时，会先去该对象的自有的属性或方法中查找，如果没找到，就会向该对象的构造函数的prototype中进行查找，直到找到Object.prototype的；
## 扩展
### JS中获取对象所有属性（区分自有属性及原型链）
1. for...in 循环遍历对象上可枚举的属性，包括原型链上的属性
```js
for(let key in obj) {
  console.log('obj内的所有属性', key) 
  if(!obj.hasOwnProperty(key)) {
    console.log('obj原型链上的属性', key)
  }
}
```
2. Object.keys返回对象可枚举属性key的数组，不包括原型链上的属性
```js
let keys = Object.keys(prototype)
console.log(keys)
```
3. Object.getOwnPropertyNames返回对象自身所有属性，包括不可枚举的属性，但不包括原型链上的属性
```js
let keys = Object.getOwnPropertyNames(obj)
console.log(keys)
```
4. 先利用Object.getPrototypeOf获取对象的原型，然后利用Object.keys遍历出对象的可枚举属性
```js
let proto = Object.getPrototypeOf(obj)
let protoKeys = Object.keys(proto)
console.log(protoKeys) // ['sex']
```
### instanceof 原理以及如何实现 instanceof
- instanceof 原理：instanceof是为了判断构造函数的原型是否在对象的原型链上，如在则返回true，否则返回false
- 实现 instanceof
```js
/**
 * @param {*} obj 需要判断的对象
 * @param {*} Func 构造函数
 */
function myInstanceof(obj, Func) {
  let proto = Object.getPrototypeOf(obj)
  while(true) {
    if(!proto) return false
    if(proto === Func.prototype) {
      return true
    }
    proto = Object.getPrototypeOf(proto)
  }
}
console.log(myInstanceof(obj, Object)) // true
console.log(myInstanceof(func, Function)) // true
console.log(myInstanceof(func, Object)) // true
console.log(myInstanceof(str, String)) // true
```