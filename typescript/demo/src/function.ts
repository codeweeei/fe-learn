function Add(top: number): number

function Add(top: number): number {
  return top
}

// 泛型的基本使用
function returnItem<T>(param: T): T{
  console.log(param)
  return param
}

// 多个类型参数
function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]];
}
swap([7, 'seven']); // ['seven', 7]

// 泛型变量
function getArrayLength<T>(arr: Array<T>): Array<T> {
  console.log((arr as Array<T>).length)
  return arr
}