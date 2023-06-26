// 转换规则
// 类型转换
// 转换为Boolean


// 四则运算：
// - * / %：需要一律转换为数值后进行计算
console.log('1' - true) // 0
console.log('1' * '') // 0
console.log('3' / {}) // 3
console.log('5' / []) // infinity

// +
console.log(1 + '12a') // 112a
console.log(1 + {}) // 1[object object] 优先调用对象的valueOf -> toString
console.log(1 + null) // 1
console.log(1 + false) // 1 // null/boolean -> 数字
console.log(1 + undefined) // NaN


