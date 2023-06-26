interface User {
  name: string,
  age?: number, // 可选属性
  readonly isMale: boolean, // 只读属性
  // say: (word: string) => string // 函数类型（方式一）
  say?: Say, // 函数类型（方式二）
  info: Info // 可索引类型（集合成员数量不确定）
}
// 接口描述函数类型
interface Say {
  (word: string): string
}
// 可索引类型
interface Info {
  [name: string]: string
}
function getUserName(user: User): string {
  return user.name
}
let user1: User = {
  name: 'codeweeei',
  isMale: true,
  info: {
    qq: '1749894019',
    email: '1749894019@qq.com',
    // ...
  }
}
console.log(getUserName(user1))