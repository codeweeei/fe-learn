// Object.prototype.sex = 1
// let obj = new Object()
// obj.name = 'codeweeei'
// obj.age = 24
// obj.call = function() {
//   console.log('124')
// }

// 1. for...in 循环遍历对象上可枚举的属性，包括原型链上的属性
// for(let key in obj) {
//   console.log('obj内的所有属性', key)
//   if(!obj.hasOwnProperty(key)) {
//     console.log('obj原型链上的属性', key)
//   }
// }

// 2. Object.keys返回对象可枚举属性key的数组，不包括原型链上的属性
// let keys = Object.keys(prototype)
// console.log(keys)

// 3. Object.getOwnPropertyNames返回对象自身所有属性，包括不可枚举的属性，但不包括原型链上的属性
// let keys = Object.getOwnPropertyNames(obj)
// console.log(keys)

// 4. 先利用Object.getPrototypeOf获取对象的原型，然后利用Object.keys遍历出对象的可枚举属性
// let proto = Object.getPrototypeOf(obj)
// let protoKeys = Object.keys(proto)
// console.log(protoKeys) // ['sex']

let obj = new Object()
let func = () => {}
let str = new String('123')
// console.log(obj instanceof Object) // true
// console.log(func instanceof Function) // true
// console.log(func instanceof Object) // true
// console.log(str instanceof String) // true

/**
 * instanceof 原理：判断构造函数是否在对象的原型链上，在则返回true，否则返回false
 * @param {*} obj 需要判断的对象
 * @param {*} Func 需要判断的构造函数
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
console.log(myInstanceof(obj, Object))
console.log(myInstanceof(func, Function))
console.log(myInstanceof(func, Object))
console.log(myInstanceof(str, String))