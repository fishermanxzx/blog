# 一、简单
## 1、用两个栈实现队列

```js
var CQueue = function() {
  //负责入栈 
  this.inStack= []
  //负责出栈   
  this.outStack = []
};

/** 
 * @param {number} value
 * @return {void}
 */
CQueue.prototype.appendTail = function(value) {
    this.inStack.push(value)
};

/**
 * @return {number}
 */
CQueue.prototype.deleteHead = function() {
    if(this.inStack.length==0&&this.outStack.length==0) return -1
    if(this.outStack.length!==0) return this.outStack.pop()
    while(this.inStack.length){
        this.outStack.push(this.inStack.pop())
    }
    return this.outStack.pop()
};
```

## 2、写一个函数，输入 n ，求斐波那契数列的第 n 项。
答案需要取模 1e9+7（1000000007），如计算初始结果为：1000000008，请返回 1。
```js
/* 方法一 动态规划
状态转移方程:F(n)=F(n−1)+F(n−2)
边界条件为 F(0) = 0;F(1) = 1
*/ 
const fib = function(n) {
    const MOD = 1000000007;
    if (n < 2) {
        return n;
    }
    let p = 0, q = 0, r = 1;
    for (let i = 2; i <= n; ++i) {
        p = q; 
        q = r; 
        r = (p + q) % MOD;
    }
    return r;
};
/*复杂度分析
时间复杂度：O(n)。
空间复杂度：O(1)。
*/

/* 方法二：矩阵快速幂
递推关系：
矩阵1：1 1  矩阵2：F(n)    矩阵3：F(n+1)
      1 0        F(n-1)        F(n)
矩阵3 = 矩阵1^n 乘 矩阵2
矩阵1记为M
快速计算矩阵 M^n，就可以得到 F(n) 的值。如果直接求取 M^n, 时间复杂度是 O(n)，可以定义矩阵乘法，然后用快速幂算法来加速求取M^n。

*/
const fib = function(n) {
    if (n < 2) {
        return n;
    }
    const q = [[1, 1], [1, 0]];
    const res = pow(q, n - 1);
    return res[0][0];
};
// 快速幂算法
const pow = (a, n) => {
    let ret = [[1, 0], [0, 1]];
    while (n > 0) {
        if ((n & 1) === 1) {
            ret = multiply(ret, a);
        }
        n >>= 1;
        a = multiply(a, a);
    }
    return ret;
}

const multiply = (a, b) => {
    const c = new Array(2).fill(0).map(() => new Array(2).fill(0));
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
            c[i][j] = (BigInt(a[i][0]) * BigInt(b[0][j]) + BigInt(a[i][1]) * BigInt(b[1][j])) % BigInt(1000000007);
        }
    }
    return c;
}
/*复杂度分析
时间复杂度：O(logn)。
空间复杂度：O(1)。
*/
```
# 二、笔记速达
## [快速幂算法](/markdownPage/?md=快速幂算法)