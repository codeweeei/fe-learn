// 变量提升及函数提升
// console.log(a) // undefined
// b() // b
// var a = 1
// console.log(a) // 1
// function b() {
//   console.log('b')
// }
// 函数优先于var变量提升
// b() // b
// function b() {
//   console.log('b')
// }
// var b = 2
// 后函数声明会覆盖前函数声明
// b() // 2
// function b() {
//   console.log('1') 
// }
// function b() {
//   console.log('2') 
// }
// var b = 3

// let 暂时性死区
console.log(b) // Uncaught ReferenceError: Cannot access 'b' before initialization
let b = 2