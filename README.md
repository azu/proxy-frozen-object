# proxy-frozen-object

ES Proxy for `Object.freeze(object)`.

## Why this library is needed?

[ES Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) can not proxy frozen object directly.

Following example throw an `TypeError`.
Because, ES Proxy can not proxy for `Object.freeze(object)` directly. 

> TypeError: proxy must report the same value for the non-writable, non-configurable property '"hello"'

```js
const myObject = {
  hello: function() { return 'Hello!'; },
  bye: function() { return 'Bye!'; }
};
console.log(myObject.hello()); // "Hello!"
console.log(myObject.bye()); // "Bye!"
// Freeze the object
Object.freeze(myObject);
// Create an proxy for myObject
const proxied = new Proxy(myObject, {
  get: function(target, name, receiver) {
     if (name === 'hello'){
       return function() { return 'Hi!'; };
     }
     return Reflect.get(target, name, receiver);
  }
});
// ERROR!
console.log(proxied.hello()); // TypeError: proxy must report the same value for the non-writable, non-configurable property '"hello"'
```

## How to resolve this issue?

This library that create an proxy for dummy object.
It is means that does not proxy `myObject` directly.

It Proxy `myObject` indirectly for avoiding `TypeError`.

```js
const myObject = {
  hello: function() { return 'Hello!'; },
  bye: function() { return 'Bye!'; }
};
console.log(myObject.hello()); // "Hello!"
console.log(myObject.bye()); // "Bye!"
// Freeze the object
Object.freeze(myObject);

// Create an Proxy for {} (dummy object)
const proxied = new Proxy({}, {
  get: function(target, name, receiver) {
     if (name === 'hello'){
       return function() { return 'Hi!'; };
     }
     // Reflect myObject instead of target
     // if it is not `hello` method, return `myObject["hello"]`
     return Reflect.get(myObject, name, receiver);
  }
});

console.log(proxied.hello()); // "Hi!"
console.log(proxied.bye()); // "Bye!"
```


## Install

Install with [npm](https://www.npmjs.com/):

    npm install proxy-frozen-object

## Usage

### `createProxyForFrozenObject: <T extends object>(target: T, proxyHandler: ProxyHandler<T>) => T`

`proxyHandler` is same API with [Methods of the handler object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy#Methods_of_the_handler_object) of ES Proxy. 

```js
import { createProxyForFrozenObject } from "proxy-frozen-object";

const myObject = {
    hello: function() {
        return "Hello!";
    },
    bye: function() {
        return "Bye!";
    }
};
Object.freeze(myObject);
const proxied = createProxyForFrozenObject(myObject, {
    get: function(target, name, receiver) {
        if (name === "hello") {
            return function() {
                return "Hi!";
            };
        }
        return Reflect.get(target, name, receiver);
    }
});

assert.strictEqual(proxied.hello(), "Hi!");
```

## Changelog

See [Releases page](https://github.com/azu/proxy-frozen-object/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/azu/proxy-frozen-object/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- [github/azu](https://github.com/azu)
- [twitter/azu_re](https://twitter.com/azu_re)

## License

MIT © azu

## References

- [変更禁止のオブジェクトの一部のメソッドだけをES6 Proxyでオーバーライドする方法 - ククログ(2016-03-04)](https://www.clear-code.com/blog/2016/3/4.html)
