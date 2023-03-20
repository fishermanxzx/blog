# 一、简单
[原题](https://leetcode.cn/study-plan/lcof/?progress=xh8zkeud)
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

## 3、包含min函数的栈
定义栈的数据结构，请在该类型中实现一个能够得到栈的最小元素的 min 函数，调用 min、push 及 pop 的时间复杂度都是 O(1)。
```js
/*
1、准备一个辅助栈，记录每个时刻的最小值。
2、当元素入栈时，取辅助栈栈顶存储的最小值，与当前元素比较得出最小值，将最小值插入辅助栈中；
3、当一个元素要出栈时，我们把辅助栈的栈顶元素也一并弹出；在任意一个时刻，栈内元素的最小值就存储在辅助栈的栈顶元素中。
*/
/**
 * initialize your data structure here.
 */
var MinStack = function() {
  this.stack = []
  this.minStack = []
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
    this.stack.push(x)
    min = this.minStack[this.minStack.length-1]
    min = min==undefined?x:min>x?x:min
    this.minStack.push(min)
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    this.minStack.pop()
     return this.stack.pop()
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
     return this.stack[this.stack.length-1]
};

/**
 * @return {number}
 */
MinStack.prototype.min = function() {
     return this.minStack[this.minStack.length-1]
};
```

## 4、反转链表
```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    // 重新构建的链表头
    let current = null
    // 下个待加入的节点
    let next = head
    while(next){
        const temp = next.next
        next.next = current
        current = next
        next = temp
    }
  return  current
};
```

## 5、复杂链表的控制
请实现 copyRandomList 函数，复制一个复杂链表。在复杂链表中，每个节点除了有一个 next 指针指向下一个节点，还有一个 random 指针指向链表中的任意节点或者 null。
```js
/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function(head) {
    if(!head) return null
    const map = new Map()
    const getNewNode = (node)=>{
        if(node===null) return null
        if(!map.has(node)){
            map.set(node,{val:node.val})
            Object.assign(map.get(node),
            {
                next:getNewNode(node.next),
                random:getNewNode(node.random)
            })
            /*
            这样写会死循环，因为此语句没能成功执行set,map里面永远是空的
            map.set(node,{val:node.val,next:getNewNode(node.next), random:getNewNode(node.random)})
            */
        }
        return map.get(node)
    }
    return getNewNode(head)
};
```

## 6、0～n-1中缺失的数字
一个长度为n-1的递增排序数组中的所有数字都是唯一的，并且每个数字都在范围0～n-1之内。在范围0～n-1内的n个数字中有且只有一个数字不在该数组中，请找出这个数字。
输入: [0,1,3]
输出: 2
```js
// 记录巧妙的方法
// 方法1 位运算
/*
 根据出现的次数的奇偶性，可以使用按位异或运算得到缺失的数字。
 缺失的数字出现了一次，其余的数字都出现了两次。
 因此第一次对数组中每个数异或，第二次对所有数异或，结果即为缺失的数字
*/
var missingNumber = function(nums) {
    let xor = 0;
    const n = nums.length + 1;
    for (let i = 0; i < n - 1; i++) {
        xor ^= nums[i];
    }
    for (let i = 0; i <= n - 1; i++) {
        xor ^= i;
    }
    return xor;
};

// 方法2 数学
/*
根据高斯求和公式，
*/
var missingNumber = function(nums) {
    const n = nums.length + 1;
    let total = Math.floor(n * (0 + (n - 1)) / 2);
    let arrSum = 0;
    for (let i = 0; i < n - 1; i++) {
        arrSum += nums[i];
    }
    return total - arrSum;
}

```

## 7、二维数组中的查找
在一个 n * m 的二维数组中，每一行都按照从左到右 非递减 的顺序排序，每一列都按照从上到下 非递减 的顺序排序。请完成一个高效的函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。


```js
// 示例：
// 现有矩阵 matrix 如下：
[
  [1,   4,  7, 11, 15],
  [2,   5,  8, 12, 19],
  [3,   6,  9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30]
]
// 给定 target = 5，返回 true
// 给定 target = 20，返回 false
```

```js
/*
将矩阵顺时针旋转 45° ，并将其转化为图形式，发现其类似于二叉搜索树。
算法流程：
1、从矩阵 matrix 左下角元素（索引设为 (i, j) ）开始遍历，并与目标值对比：
a、当 matrix[i][j] > target 时，执行 i-- ，即消去第 i 行元素；
b、当 matrix[i][j] < target 时，执行 j++ ，即消去第 j 列元素；
c、当 matrix[i][j] = target 时，返回 true ，代表找到目标值。
2、若行索引或列索引越界，则代表矩阵中无目标值，返回 false 。
*/
```

## 8、旋转数组的最小数字

把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。
给你一个可能存在 重复 元素值的数组 numbers ，它原来是一个升序排列的数组，并按上述情形进行了一次旋转。请返回旋转数组的最小元素。例如，数组 [3,4,5,1,2] 为 [1,2,3,4,5] 的一次旋转，该数组的最小值为 1。  
注意，数组 [a[0], a[1], a[2], ..., a[n-1]] 旋转一次 的结果为数组 [a[n-1], a[0], a[1], a[2], ..., a[n-2]] 。

```js
/*
示例 1：
输入：numbers = [3,4,5,1,2]
输出：1
示例 2：
输入：numbers = [2,2,2,0,1]
输出：0
*/
```

```js
/*
二分查找:
考虑数组最后一个元素x:
设左边界为 low，右边界为 hight,区间的中点为pivot
1、numbers[pivot] < numbers[high],这说明 numbers[pivot] 是最小值右侧的元素，因此我们可以忽略二分查找区间的右半部分。
2、numbers[pivot]>numbers[high],这说明 numbers[pivot] 是最小值左侧的元素，因此我们可以忽略二分查找区间的左半部分。
3、numbers[pivot]==numbers[high],由于重复元素的存在，并不能确定 numbers[pivot] 究竟在最小值的左侧还是右侧，不能莽撞地忽略某一部分的元素。唯一可以知道的是，由于它们的值相同，所以无论 numbers[high] 是不是最小值，都有一个它的「替代品」
numbers[pivot]numbers[pivot]，因此可以忽略二分查找区间的右端点。
*/
var minArray = function(numbers) {
    let low = 0;
    let high = numbers.length - 1;
    while (low < high) {
        const pivot = low + Math.floor((high - low) / 2);
        if (numbers[pivot] < numbers[high]) {
            high = pivot;
        } else if (numbers[pivot] > numbers[high]) {
            low = pivot + 1;
        } else {
            high -= 1;
        }
    }
    return numbers[low];
}
```
# 二、笔记速达
## [快速幂算法](/markdownPage/?md=快速幂算法)