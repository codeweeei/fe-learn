// 类
// 抽象类及抽象方法
abstract class Animal {
  abstract makeSound(): void
  move():void {
    console.log('移动')
  }
}

class Cat extends Animal {
  makeSound(): void {
    console.log('miao miao~')
  }
}

const cat1 = new Cat()
export default cat1