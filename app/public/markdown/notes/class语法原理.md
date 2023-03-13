# class语法转es5
## 1、class语法
```js
class A {
  constructor(name) {
    this.name = name;
  }

  say() {
    console.log(this.name);
  }
}

class B extends A {
  constructor() {
    super();
  }
}
```
## 2、babel转义后
```js
var A = /*#__PURE__*/ (function () {
  function A(name) {
    _classCallCheck(this, A);
    this.name = name;
  }
  _createClass(A, [
    {
      key: 'say',
      value: function say() {
        console.log(this.name);
      },
    },
  ]);

  return A;
})();

var B = /*#__PURE__*/ (function (_A) {
  _inherits(B, _A);
  var _super = _createSuper(B);
  function B() {
    _classCallCheck(this, B);
    return _super.call(this);
  }
  return B;
})(A);
```

## 3、_classCallCheck
判断class是不是当作一个函数来执行，如果是则报错。所以class必须用new来执行。
```js
function _classCallCheck(instance, Constructor) {
  if (!_instanceof(instance, Constructor)) { // 等同于 !(this instanceof A)
    throw new TypeError('Cannot call a class as a function');
  }
}
```
## 4、_createClass
定义类的原型属性和静态属性。
```js
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ('value' in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
```
## 5、_inherits
让构造子类和父类之前的原型链。
即等价于 B.prototype._proto_ = A.prototype，并且constructor指向B。B._proto = A
```js
function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function');
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true },
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
  return _setPrototypeOf(o, p);
}
```
## 6、_createSuper
```js
function _createSuper(Derived) {
  // Derived是B 
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    // 获取类__proto__ 见_inherits方法
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      // 获取构造函数即B
      var NewTarget = _getPrototypeOf(this).constructor;
      // 调用A进行实例化，但是__proto__指向B.prototype    即result.__proto__ === B.prototype
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
// 看看是否有Reflect.construct方法
function _isNativeReflectConstruct() {
  if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === 'function') return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
//通过_possibleConstructorReturn判断父函数的执行是否会返回一个对象，如果是个对象的话，最终返回父函数返回的对象。
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
    return call;
  }
  return _assertThisInitialized(self);
}
// 判断是否调用了super
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return self;
}
```
_createSuper会返回一个函数，这个函数会执行父类即A的构造函数。所以子类必须在constructor方法中调用super方法，因为子类自己的this对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法。

# 笔记速达
## 1、[Reflect.construct](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/construct)


