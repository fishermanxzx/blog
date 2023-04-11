# 一、题目
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
/* 方法一 迭代
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
/*
方法二：动态规划
状态转移方程:F(n)=F(n−1)+F(n−2)
边界条件为 F(0) = 0;F(1) = 1
*/
const fib = function(n) {
    const MOD = 1000000007;
    if (n < 2) {
        return n;
    }
    const dp = new Array(n+1).fill(0)
    dp[1] = 1
    for(let i= 2;i<=n;i++){
        dp[i] = (dp[i-1] + dp[i-2]) % MOD
    }
    return dp[n];
};
/* 方法三：矩阵快速幂
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

## 9、 第一个只出现一次的字符
在字符串 s 中找出第一个只出现一次的字符。如果没有，返回一个单空格。 s 只包含小写字母。
```js
/*
例1:
输入：s = "abaccdeff"
输出：'b'
例2:
输入：s = "" 
输出：' '
*/
```
```js
/*
方法一:使用哈希表存储索引
哈希映射中键表示字符，值表示它首次出现的索引（如果该字符只出现一次）或者 −1（如果该字符出现多次）。第一次遍历字符串时，设当前遍历到的字符为 c，如果 c 不在哈希映射中，就将 c 与它的索引作为一个键值对加入哈希映射中，否则将 c 在哈希映射中对应的值修改为 −1。
接着遍历一次哈希映射中的所有值，找出其中不为 −1 的最小值，即为第一个不重复字符的索引，然后返回该索引对应的字符。如果哈希映射中的所有值均为 −1，就返回空格。
*/
var firstUniqChar = function(s) {
    const position = new Map();
    const n = s.length;
    for (let [i, ch] of Array.from(s).entries()) {
        if (position.has(ch)) {
            position.set(ch, -1);
        } else {
            position.set(ch, i);
        }
    }
    let first = n;
    for (let pos of position.values()) {
        if (pos !== -1 && pos < first) {
            first = pos;
        }
    }
    return first == n ? ' ' : s[first];
}
/*
方法二:哈希表+队列
队列具有「先进先出」的性质，借助队列找到第一个不重复的字符。
使用与方法一相同的哈希映射，并且使用一个额外的队列，按照顺序存储每一个字符以及它们第一次出现的位置。对字符串进行遍历时，设当前遍历到的字符为 
c，如果 c 不在哈希映射中，就将 c 与它的索引作为一个二元组放入队尾，否则就需要检查队列中的元素是否都满足「只出现一次」的要求，即不断地根据哈希映射中存储的值（是否为 −1）选择弹出队首的元素，直到队首元素「真的」只出现了一次或者队列为空。
在遍历完成后，如果队列为空，说明没有不重复的字符，返回空格，否则队首的元素即为第一个不重复的字符以及其索引的二元组。
小贴士：
在维护队列时，使用了「延迟删除」这一技巧。也就是说，即使队列中有一些字符出现了超过一次，但它只要不位于队首，那么就不会对答案造成影响，我们也就可以不用去删除它。只有当它前面的所有字符被移出队列，它成为队首时，我们才需要将它移除。
*/
var firstUniqChar = function(s) {
    const position = new Map();
    const q = [];
    const n = s.length;
    for (let [i, ch] of Array.from(s).entries()) {
        if (!position.has(ch)) {
            position.set(ch, i);
            q.push([s[i], i]);
        } else {
            position.set(ch, -1);
            while (q.length && position.get(q[0][0]) === -1) {
                q.shift();
            }
        }
    }
    return q.length ? q[0][0] : ' ';
}
```

## 10、从上到下打印二叉树（层序遍历BFS,广度优先搜索）
```js
// BFS 通常借助 队列 的先入先出特性来实现。
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var levelOrder = function(root) {
    if(!root) return []
    const queue = [root]
    let current = null
    const result = []
    while(current = queue.shift()){
        if(current.left){
            queue.push(current.left)
        }
        if(current.right){
            queue.push(current.right)
        }
        result.push(current.val)
    }
    return result
}
```


## 11、输入两棵二叉树A和B，判断B是不是A的子结构。
约定空树不是任意一个树的子结构
```js
/*
示例：
输入：A = [3,4,5,1,2], B = [4,1]
输出：true
*/
```
```js
/*
若树 B 是树 A 的子结构，则子结构的根节点可能为树 A 的任意一个节点。因此，判断树B是否是树 A 的子结构，需完成以下两步工作：
1、先序遍历树A中的每个节点a，对应函数 isSubStructure
2、判断树A中以a为根节点的子树是否包含树B。对应函数recur

recur函数：
树 A 的根节点记作 节点 A ，树 B 的根节点称为 节点 B 
1、终止条件：
    a、当节点B为空：说明树B已匹配完成（越过叶子节点），返回 true
    b、当节点A为空：说明已经越过树A叶子节点，匹配失败，返回false
    c、当节点A和B值不同，return false
2、返回值：
    a、判断 A 和 B 的左子节点是否相等，即 recur(A.left, B.left) ；
    b、判断 A 和 B 的右子节点是否相等，即 recur(A.right, B.right) ；

isSubStructure 函数：
1、特例处理： 当 树 A 为空 或 树 B 为空 时，直接返回 false ；
2、返回值： 若树B是树 A 的子结构，则必满足以下三种情况之一，因此用或 || 连接；
    a、以 节点 A 为根节点的子树 包含树 B ，对应 recur(A, B)；
    b、树 B 是 树 A 左子树 的子结构，对应 isSubStructure(A.left, B)；
    c、树 B 是 树 A 右子树 的子结构，对应 isSubStructure(A.right, B)；
*/
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} A
 * @param {TreeNode} B
 * @return {boolean}
 */

var isSubStructure = function(A, B) {
    // 约定空树不是任意一个树的子结构
    if(!A || !B) {
        return false;
    }
    return recur(A, B) || isSubStructure(A.left, B) || isSubStructure(A.right, B)
};

var recur = function(A, B) {
    if(B==null) return true
    if(A==null)  return false
    // 当前节点的值不相等，不 ok
    if(A.val !== B.val) {
        return false;
    }
    // 递归考察左子树、右子树
    return recur(A.left, B.left) && recur(A.right, B.right);
}
```

## 12、连续子数组的最大值
输入一个整型数组，数组中的一个或连续多个整数组成一个子数组。求所有子数组的和的最大值。要求时间复杂度为O(n)。
```js
// 示例
// 输入：nums:[-2,1,-3,4,-1,2,1,-5,4]
// 输出：6
// 解释：连续子数组 [4,-1,2,1] 的和最大，为 6。
```
```js
/*
动态规划：
假设以第i个数为结尾的所有子数组中，最大值为f(i)，则有以下两种情况：
1、如果f(i-1) 小于等于0，则f(i-1)对f(i)的贡献为负。所以f(i)=nums[i]，也就是该数本身最大。
2、如果f(i-1) 大于0，则f(i)=f(i-1)+nums[i]

状态定义：
dp[i]代表以元素nums[i]结尾的所有连续子数组中最大的和
转移方程：
1、dp[i-1]<=0,dp[i] = nums[i]
2、dp[i-1]>0,dp[i]=dp[i-1]+nums[i] 
*/
/**
 * @param {number[]} nums
 * @return {number}
 */
// 使用原始数组作为存储空间，降低空间复杂度
var maxSubArray = function(nums) {
    let maxSubArraySum =nums[0]
    for(var i=1;i<nums.length;i++){
        nums[i] = Math.max(nums[i-1],0) + nums[i]
        maxSubArraySum = Math.max(maxSubArraySum,nums[i])
    }
    return maxSubArraySum
};
```

## 13、礼物的最大价值
在一个 m*n 的棋盘的每一格都放有一个礼物，每个礼物都有一定的价值（价值大于 0）。你可以从棋盘的左上角开始拿格子里的礼物，并每次向右或者向下移动一格、直到到达棋盘的右下角。给定一个棋盘及其上面的礼物的价值，请计算你最多能拿到多少价值的礼物？
```js
/*
示例：输入: 
[
  [1,3,1],
  [1,5,1],
  [4,2,1]
]
输出: 12
解释: 路径 1→3→5→2→1 可以拿到最多价值的礼物
*/
```
```js
/*
动态规划
状态定义：设动态规划矩阵dp,dp(i,j)表示从棋盘左上角开始到达单元格(i,j)时能拿到礼物的最大累计价值
转移方程：
1、i == 0 且 j==0，dp(i,j) = grid(i,j)
2、i == 0 且 j!==0，dp(i,j) = grid(i,j-1)+ grid(i,j)
3、i !== 0 且 j==0，dp(i,j) = grid(i-1,j) + grid(i,j)
4、i !== 0 且 j !==0，dp(i,j) = max(dp(i-1,j) ,dp(i,j-1)) + gird(i,j)

空间优化：将原矩阵 grid 用作 dp 矩阵，即直接在 grid 上修改即可。
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxValue = function(grid) {
    if(!grid.length)    return 0;
    let res = [];
    for(let i = 0; i < grid.length; i++) {
        for(let j = 0; j < grid[i].length; j++) {
            if(i === 0 && j === 0)  continue;
            if(i === 0) grid[i][j] = grid[i][j] + grid[i][j-1];
            if(j === 0) grid[i][j] = grid[i][j] + grid[i-1][j];
            if(i !== 0 && j !== 0)  grid[i][j] = Math.max(grid[i-1][j] ,grid[i][j-1]) + grid[i][j];
        }
    }
    return grid[grid.length-1][grid[0].length-1];
};
```

## 14、最长不含重复字符的子字符串
请从字符串中找出一个最长的不包含重复字符的子字符串，计算该最长子字符串的长度。
```js
/*
 示例1:
 输入："abcabcbb"
 输出：3
 解释：因为无重复字符的最长子串是"abc",所以长度是3
 */

```
```js
/*
双指针：
1、定义左右指针i、j,哈希表map记录字符s[j]最后一次出现的索引。
2、更新左指针i:根据上轮左指针i和 map[s[j]],每轮更新左边界i,保证区间[i+1,j]内无重复字符且最大。
i=max(i,map[s[j]])
3、更新结果res:取上轮res和本轮双指针区间[i+1,j]的宽度（即j-i）中的最大值。
res=max(res,j-i)
*/ 
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    if(s.length == 0 ) return 0
    let i = -1
    let j = 0
    const mapImp = new Map()
    let res = 0
    while(j<s.length){
         i = mapImp.has(s[j])?Math.max(mapImp.get(s[j]),i):i
        mapImp.set(s[j],j)
        res = Math.max(res,j-i)
        j++
    }
    return res
};
```

## 15、链表中倒数第k个节点
输入一个链表，输出该链表中倒数第k个节点。为了符合大多数人的习惯，本题从1开始计数，即链表的尾节点是倒数第1个节点。

例如，一个链表有 6 个节点，从头节点开始，它们的值依次是 1、2、3、4、5、6。这个链表的倒数第 3 个节点是值为 4 的节点。
```js
/*
 示例：
 给定一个链表: 1->2->3->4->5, 和 k = 2.
 返回链表 4->5.
 */
```
```js
/*
 双指针：
 1、初始化：前指针former、后指针latter,双指针都指向头节点head
 2、构建双指针距离：前指针former先向前走k步（结束后，双指针former和latter间相距k步）
 3、双指针共同移动：循环中，双指针former和latter每轮都向前走一步，直至former走过链表的尾节点时跳出（跳出后，latter与尾节点距离为k-1，即latter指向倒数第k个节点。
 4、返回值：返回latter即可。
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var getKthFromEnd = function(head, k) {
    if(!head) return head
     let latter = head
     let former = head
     let formerStep = k
     while(formerStep--){
         former = former.next
     }
     while(former){
         former= former.next
         latter = latter.next
     }
     return latter
};
```
## 16、二进制中1的个数
编写一个函数，输入是一个无符号整数（以二进制串的形式），返回其二进制表达式中数字位数为 '1' 的个数。（也被称为 汉明重量）。
```js
/*
输入：n = 11 (控制台输入 00000000000000000000000000001011)
输出：3
解释：输入的二进制串 00000000000000000000000000001011 中，共有三位为 '1'。
 */
```
```js
// 方法一:循环检查二进制位
/**
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function(n) {
    let res = 0;
    // 如果 n & 1 = 0,则n的二进制最后一位是0，如果 n & 1 = 1, 则n的二进制最后一位为1
    while (n !== 0) {
        res += n & 1;
        n >>>= 1;
    }

    return res;
};
// 方法二:巧用 n&(n−1)
/*
(n−1) 解析： 二进制数字 n 最右边的 1变成 0 ，此 1 右边的 0 都变成 1 。
n&(n−1) 解析： 二进制数字 n 最右边的 1 变成 0 ，其余不变。

算法流程：
1、初始化数量统计变量 res 。
2、循环消去最右边的 1 ：当 n=0 时跳出。
   1、res += 1 ： 统计变量加 1 ；
   2、n &= n - 1 ： 消去数字 n 最右边的 1 。
3、返回统计数量 res 。
 */
/**
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function(n) {
    let res = 0
    while(n!==0){
        n&=n-1
        res++
    }
    return res
};
```
## 17、不用加减乘除做加法
写一个函数，求两个整数之和，要求在函数体内不得使用 “+”、“-”、“*”、“/” 四则运算符号。
```js
// 示例
// 输入: a = 1, b = 1
// 输出: 2
```
```js
/*
无进位和 与 异或运算 规律相同，进位 和 与运算 规律相同（并需左移一位）
n=a^b 非进位和：异或运算
c=a&b<<1 进位：与运算+左移一位
s=a+b=>s=n+c
循环求 n 和 c ，直至进位 c=0;此时 s=n ，返回 n 即可。
*/
var add = function(a, b) {
   while(b!=0){
       const carry = (a&b)<<1
       a=a^b
       b=carry
   }
   return a
};
```
# 二、笔记速达
## [快速幂算法](/markdownPage/?md=快速幂算法)