# 普通函数
普通函数this取决于与如何调用
```js
const obj1 = {
    name:'obj1',
    testThis(){
        return function(){
            console.log(this)
        }
    }
}
const obj2 = {name:'obj2'}
const obj3 = {name:'obj3'}
// 解释：因为this永远指向testThis的this，取决于testThis函数的this，而testThis的this取决于如何调用
obj1.testThis()() //指向window
obj1.testThis.call(obj2)() //指向window
const fn =obj1.testThis
fn()()//指向window
fn().call(obj3) //指向obj3
fn().call() //指向window
```

# 箭头函数
箭头函数this指向创建时的作用域

**例1**
```js
const obj1 = {
   name: 'obj1',
   sayHello: () => {
      console.log(this)
   }
}
obj1.sayHello();// 指向window
```

**例2**
```js
const obj1 = {
    name:'obj1',
    testThis(){
        return ()=>{
            console.log(this)
        }
    }
}
const obj2 = {name:'obj2'}
const obj3 = {name:'obj3'}
// 解释：因为this永远指向testThis的this，取决于testThis函数的this，而testThis的this取决于如何调用
obj1.testThis()() //指向obj1
obj1.testThis.call(obj2)() //指向obj2
obj1.testThis.call()() //指向window
const fn =obj1.testThis
fn()()//指向window
fn().call(obj3) //指向window
```
