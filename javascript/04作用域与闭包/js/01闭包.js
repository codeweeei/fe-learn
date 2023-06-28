// 闭包

// for(var i=0;i<6;i++) {
//   setTimeout(() => {
//     console.log(i)
//   }, 1000)
// }

// 使用闭包 
// IIFE函数
// for(var i=0;i<6;i++) {
//   (function IIFE(j) {
//     setTimeout(function timer() {
//       console.log(j)
//     }, 1000)
//   })(i)
// }

// setTimeout的第三个参数
for(var i=1;i<=5;i++) {
  setTimeout(function timer(j) {
    console.log(j)
  }, 1000, i)
}