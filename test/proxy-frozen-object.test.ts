import * as assert from "assert";
import { createProxyForFrozenObject } from "../src/proxy-frozen-object";

describe("proxy-frozen-object", function() {
    describe("createProxyForFrozenObject", () => {
        it("should return proxied object", () => {
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

            assert.strictEqual(proxied.bye(), "Bye!");
            assert.strictEqual(proxied.hello(), "Hi!");
        });
    });
});
