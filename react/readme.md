# react 学习收录
> 慕课—双越老师课程
## 使用脚手架创建项目
- 更换npm下载源
    - `npm config set registry https://registry.npm.taobao.org/` （淘宝源）
    - `npm config set registry https://registry.npmjs.org/` （官方）
- 使用 `create-react-app` 创建
    - `npx create-react-app my-app`
    - `npx create-react-app my-app --template typescript` 创建ts版本
- 使用 `vite` 创建

配置编码规则
- 引入eslint
    - vscode 中安装eslint插件
    - `npm i eslint -D`
    - `npx eslint --init`
    - 自动生成.eslintrc.js文件
    - 项目根目录新建.eslintignore文件
    - 在package.json的scripts中加入`"lint": "eslint 'eslint ./src/**/*.{js,jsx,ts,tsx}"`
- 使用prettier规范代码风格
    - `npm i prettier eslint-config-prettier eslint-plugin-prettier --save-dev`
    - 配置
        - 在.eslintrc.js中的extends中加上`"plugin:prettier/recommended"`
        - vscode 中安装prettier插件
        - 在package.json的cripts中加入`"format: prettier --write src/**/*.{js,jsx,ts,tsx}"`
        - 配置.prettierrc.js文件
- husky规范提交流程
    - 地址：https://github.com/typicode/husky
    - 在 git commit 之前执行自定义的命令（如执行代码风格的检查、避免提交非规范代码）
    - 安装husky
- commit lint 规范
    - 地址：https://github.com/conventional-changelog/commitlint
    - 按照上面官网执行
    - 规范commit提交内容（主题: 内容）
## react基础
### 基础语法
jsx 语法（ES规范-非react独有）
jsx-js的扩展，写在JS代码里面，是组件的UI结构
标签：
首字母大小写区分（大写为自定义组件）、标签必须是闭合
属性（避免规范字）：
class -> className
style要使用JS对象(不能是string)而且key用驼峰写法
for -> htmlFor
事件：
使用onXxx的形式，必须传入一个函数（fn而非`fn()`）
注意typescript类型
插入JS变量{}

引入css文件，引入后即可用css文件内的css类
### 组件
react 一切都是组件（函数）
组件就是一个ui片段、拥有独立的逻辑和显示（非静态）、可嵌套
class组件 函数组件
首字母大写（自定义组件）
## react hooks
内置hooks
- useState
- useEffect
自定义hooks（复用代码-抽离）
第三方hooks（提高效率）

hook 使用规则：
1. 必须用 useXxx 的形式
2. 只能在组件内使用hook或者在别的hook上使用
3. 必须保证每次调用的顺序是一致的；（不能放在if跟for中）

### useState
useState可以触发组件的更新
`const [count, setCount] = useState(0)` 
setCount可以返回一个新值，赋值给count；或者传入一个函数，函数返回一个新值

state是一个组件的独家记忆
props - 父组件传递过来的信息
state - 组件内部的状态信息，不对外
state 变化 - 触发组件更新，重新render
state也可以作为props传递给子组件
state的特点：
异步更新：setCount后打印出的count都是上一次的count值，无法拿到最新的state值，state的更新是异步的
可能会被合并（使用函数，state更新不会被合并）
不可变数据：不去修改state的值，而是去传入一个新的值
```js
const [userInfo, setUserInfo] = useState({ name: 'codeweeei', age: 18 })
function changeUserInfo() {
    setUserInfo({
        ...userInfo,
        age: 24
    })
}
```
 
- state 是不可变数据，操作成本较高，有很大的不稳定性；
- 使用 immer 可避免这一问题；
- `npm i immer --save`
- 使用：
```js
import { useState } from 'react'
import { produce } from 'immer'
function Demo() {
    const [userInfo, setUserInfo] = useState({
        name: 'codeweeei',
        age: 18
    })
    const changeUserInfo = () => {
        // 原始写法：不改变state原数据，传入新的数据
        setUserInfo({
            ...userInfo,
            age: 24
        })
        // 使用immer写法
        setUserInfo(produce(draft => {
                draft.age = 24
            })
        )
    }
    return (
        //...
    )
}

```

### useEffect
副作用，组件(函数)原本就是输入输出的，但是中间可能需要在某些时机执行一些操作(副作用)，就可以使用useEffect来实现
当某个state或某些state发生变化时执行某些操作；或者当组件渲染完成时执行某些操作；及当组件销毁时；
```js
useEffect(() => {
    console.log('组件mounted')
    return () => {
        console.log('组件unMounted')
    }
}, []) // 数组依赖，当其中有个依赖变化时就会执行第一个函数参数；当无依赖时只有组件初次渲染时才会执行这个函数参数
```
useEffect执行两次问题：
React18开始，useEffect会在开发环境执行两次，用来模拟组件的创建、销毁、再创建的完整流程；但在生产环境下会执行一次；

### useRef
一般用于操作DOM
react 推崇数据驱动视图，但是也是可以手动操作DOM；
ref 也可传入普通JS变量，但是更新该变量不会触发rerender（state更改会触发视图更新），注意区分Vue3的ref
使用：
```js
import React, {FC, useRef} from "react";
const UseRefDemo:FC = () => {
    const inputRef = useRef<HTMLInputElement>(null)
    const selectInput = () => {
        const current = inputRef.current
        current?.select()
    }
    const textVal = useRef('哥哥')
    const changeText = () => {
        textVal.current = '鸽鸽'
        console.log(textVal.current) // '鸽鸽' ref变量更改，但是不触发组件的rerender
    }
    return (
        <>
            <h2>useRef的使用：</h2>
            <h3>操作DOM</h3>
            <input type="text" ref={inputRef} defaultValue='默认值' />
            <button onClick={selectInput}>选中</button>
            <h4>传入JS变量，更改不更新视图</h4>
            <p>{textVal.current}</p>
            <button onClick={changeText}>更改text</button>
        </>
    )
}
export default UseRefDemo
```
### useMemo
函数组件，每次state更新都会重新执行函数，执行函数就会重新生成数据，当数据量大时就会比较消耗性能；
此时就可以使用useMemo来缓存数据，用来提升性能；
```js
const sum = useMemo(() => {
    // 当依赖项更改时就会重新触发
    return num1 + num2
}, [num1, num2]) // 依赖项
```
### useCallback
和useMemo作用一样，用来缓存函数；
```js
const fn = useCallback(() => {
    console.log('fn')
}, [a]) // 根据依赖的a来决定是否重新定义函数
```
### 自定义hook
内置hooks保证基础功能，内置hooks灵活配合，实现业务功能；
抽离公共部分，自定义hooks或者第三方hooks——复用代码；
React组件之前是class组件，现在推崇函数组件；
class组件之前使用mixin 和 HOC（高阶组件）来复用公共逻辑；
函数组件使用hooks来复用公共逻辑；

使用例子：
1. 修改网页标题
```ts
import { useEffect } from 'react'
function useTitle(title: string) {
    useEffect(() => {
        document.title = title
    }, [])
}
export default useTitle
```
2. 获取鼠标位置
```ts
import { useState, useEffect } from 'react'
function useMouse() {
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    const mousemoveHandle = (e: MouseEvent) => {
        setX(e.clientX)
        setY(e.clientY)
    }
    useEffect(() => {
        window.addEventListener('mousemove', mousemoveHandle)
        return () => {
            // 注意unMounted时移除监听事件
            window.removeEventListener('mousemove', mousemoveHandle)
        }
    }, [])
    return {
        x, y
    }
}
export default useMouse
```
3. 模拟异步加载数据
```ts
import { useState, useEffect } from 'react'
function getInfo():Promise<string> {
    return new Promise(resolve => {
        resolve(Date.now().toString())
    })
}
function useGetInfo() {
    const [loading, setLoading] = useState(true)
    const [info, setInfo] = useState('')
    useEffect(() => {
        setTimeout(() => {
            getInfo().then(res => {
                setLoading(false)
                setInfo(res)
            })
        }, 1500)
    }, [])
    return [loading, info]
}
export default useGetInfo
```
### 使用第三方hooks
常用的第三方hooks：
ahooks：https://ahooks.gitee.io/zh-CN

### 闭包陷阱
当异步函数获取state时，可能不是当前最新的state值，可使用useRef及useEffect来规避； 
可以在state值更改时，将state值存在useRef定义的ref（引用类型）中，然后异步中取ref的current值就能取到最新的值；

## 样式
### 引用css
- 使用内联style（不推荐）
    - 使用{}语法，使用驼峰标识符
- 引入css文件
    - jsx使用className
```js
let itemClassName = 'list-item'
if(isPublished) itemClassName += ' published'
```
    - 使用`classnames`包（https://github.com/JedWatson/classnames）
```js
import classnames from 'classnames'
let itemClassName = classnames('list-item', {
    published: isPublished
})
let itemClassName = classname({
    'list-item': true,
    published: isPublished
})
```
### css module
- react使用组件化开发，多个组件需要多个css文件，多个css文件就很容易造成className重复，不好管理；
- css模块：每个css文件都当作单独的模块，命令xxx.module.css，为每个className增加后缀名，不让它重复，create-react-app原生支持css module;
- 使用：
```js
import styles from 'test.module.css'
styles['class-name']
```
### 使用sass
- css语法比较原始，不能嵌套；一般使用less和sass语法；CRA原生支持sass module，后缀改为.scss即可 
### 使用 css-in-js
- 一种解决方案，有好几个工具；在JS中写css，有很大的灵活性；
styled-components（https://github.com/styled-components/styled-components）
- demo.module.scss
```scss
.content {
    display: flex;
    .left {
        flex: 1;
    }
    .right: {
        width: 40px;
    }
}
- `demo.jsx`
```jsx
import styles from './demo.module.scss'
function Demo() {
    return (
        <>
            <div className={styles.content}>
                <div className={styles.left}><div>
                <div className={styles.left}><div>
            </div
        </>
    )
}
``` 
## react-router
### 安装包
- 安装react-router-dom：`npm i react-router-dom`
### 路由
- 抽离项目页面中的公共部分组成layout组件：顶部、底部，中间内容动态页面(vue-插槽|react-Outlet)；
- 使用React-router配置路由，并用于项目；
- 使用路由功能，配置页面及路由映射关系；

### layout
- 使用 `Outlet` 实现类似vue的slot
- 样例
```tsx
import React, {FC} from 'react'
import { Outlet } from 'react-router-dom'
const MainLayout:FC = () => {
    return (
        <>
            <div>MainLayout header</div>
            <div>
                {/* 插槽 */}
                <Outlet></Outlet>
            </div>
            <div>MainLayout footer</div>
        </>
    )
}
export default MainLayout
```

### 配置路由
- src/router/index.tsx
```tsx
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Test from "../pages/Test";
import MainLayout from "../layouts/MainLayout";
import ManageLayout from "../layouts/ManageLayout";
import ListDemo from "../pages/manages/ListDemo";
const routerConfig = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: 'test/:id',
                element: <Test />
            },
            {
                path: 'list',
                element: <ManageLayout />,
                children: [
                    {
                        path: '',
                        element: <ListDemo/>
                    }
                ]
            }
        ]
    },
    {
        path: '*', // 404
        element: <NotFound />
    }
])
export default routerConfig
```
- App.tsx
```tsx
import React from 'react'
import { RouterProvider } from 'react-router-dom'
import routerConfig from './router'
function App() {
  return (
    <>
      <RouterProvider router={routerConfig}></RouterProvider>
    </>
  )
}
export default App
```
### 路由跳转
- 使用`useNavigate`进行路由跳转；使用`useParams`及`useSearchParams`获取路由的params及search参数；
- 使用`link`组件跳转;
- 样例
```tsx
import { useNavigate } from 'react-router-dom'
function Home() {
    const { id = '' } = useParams()
    const [searchParams] = useSearchParams()
    console.log(searchParams.get('name')) // 获取name的search参数
    const nav = useNavigate()
    const navTo = (url: string) => {
        // nav(url) 使用方式一
        // 使用方式二
        nav({
            pathname: url
        })
        // nav(1/-1) // 前进/后退
    }
    return (
        <>
            <div>
                <button onClick={() => {
                    navTo('/test/123')    
                }}>测试</button>
            </div>
        </>
    )
}
export default Home
```
### 引入UI组件库
- ant-design
## React 表单组件
### 表单组件
- 受控组件：值同步到state并使用value属性；
- 非受控组件：值不同步到state，使用defaultValue属性；
## Mock

- 搭建mock服务（作为临时的服务端）
- API设计（Restful API）

### 搭建mock服务

- 技术选型
  - 使用mock.js
  - 使用nodejs服务 + mock.js
  - 使用在线mock平台
- React组件中引入mock.js
- mock.js只能劫持XMLHttpRequest，不能劫持fetch
  ```javascript
  import Mock from 'mockjs'
  Mock.mock('/api/test', 'get', () => {
    return {
      error: 0,
      data: {
        name: 'codeweeei'
      }
    }
  })
  ```

- 注意要在生成环境上线前注释掉，否则线上请求也会被劫持；

## Ajax

- 使用Ajax和服务端通讯，并应用于现有功能

- XMLHttpRequest 和 fetch
  ```javascript
  // XMLHttpRequest
  let xhr = new XMLHttpRequest()
  xhr.open('get', '/api/test', true)
  xhr.onreadystatechange = function() {
    if( xhr.readystate == 4 && xhr.status == 200) {
      let result = JSON.parse(xhr.responseText)
    }
  }
  xhr.send()
  // fetch
  fetch('/api/test').then(res = > {
    res.json()
  }).then(data => {
    console.log(data)
  })
  ```

- axios：基于promise的网络请求库
  ```javascript
  import axios from 'axios'
  axios.get('/api/test').then(res => {
    console.log(res)
  })
  ```

## craco.js
- create react app 配置重写
- 解决开发跨域问题
## API设计

### 用户API

- 注册
- 登录
- 用户信息

### 问卷API

- 创建问卷
- 获取单个问卷
- 更新问卷
- 删除问卷
- 查询问卷列表
- 复制问卷

## 封装axios

- 根目录创建services
  - ajax.ts
  - question.ts
    ```typescript
    import axios from "axios";
    import { message } from 'antd'
    
    const instance = axios.create({
      timeout: 10 * 1000,
      baseURL: 'http://127.0.0.1:4523/m1/2078094-0-default/'
    })
    
    // 响应拦截器
    instance.interceptors.response.use(
      res => {
        const resData = (res.data || {}) as ResType
        const { errno, data, msg } = resData
        if(errno !== 0) {
          if(msg) {
            message.error(msg)
            return Promise.reject(msg)
          }
        }
        return data as any
      }
    )
    
    export default instance
    
    export type ResType = {
      errno: number,
      data?: ResDataType,
      msg: string
    }
    
    export type ResDataType = {
      [ key: string ]: any
    }
    ```

```typescript
import axios, { ResDataType } from "./ajax";

// 获取单个问卷信息
export async function getQuestionService(id:string):Promise<ResDataType> {
  const url = `/api/question/${id}`
  const data = (await axios.get(url)) as ResDataType
  return data
}
```

- 使用useRequest封装hooks
  ```typescript
  // import {useState, useEffect} from "react";
  // import type {ResDataType} from '../services/ajax'
  import { getQuestionService } from "../services/question";
  import { useRequest } from 'ahooks'
  
  
  const useQuestionDetail = (id: string) => {
    // 正常写法：
    // const [resLoading, setLoading] = useState(true)
    // const [error, setError] = useState(false)
    // const [data, setData] = useState<ResDataType>({})
    // useEffect(() => {
    //   getQuestionService(id).then(res => {
    //     console.log(res)
    //     setData(res)
    //   }).catch(err => {
    //     console.log(err)
    //     setError(true)
    //   }).finally(() => {
    //     setLoading(false)
    //   })
    // }, [])
    // return {
    //   loading: resLoading,
    //   error,
    //   data
    // }
    
    // 使用useRequest hook写法
    async function load() {
      const data = await getQuestionService(id)
      return data
    }
    const { loading, error, data, run } = useRequest(load, {
        manual: true // 手动触发（默认为false，在初次渲染时触发）
    })
    return { loading, error, data, run }
  }
  
  export default useQuestionDetail
  ```

- 使用该hook
  ```tsx
  import React, {FC} from "react";
  import useQuestionDetail from "../hooks/useQuestionDetail";
  const Register:FC = () => {
    const {loading, error, data, run} = useQuestionDetail('1234')
    return (
      <>
        <h3>使用useRequest</h3>
        <button onClick={run}>发送请求</button>
        { loading ? <div>loading</div> : !error ? <div>{data?.title}</div> : <div>请求失败</div> }
      </>
    )
  }
  export default Register
  ```
