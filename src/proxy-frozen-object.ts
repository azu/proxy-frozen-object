export const createProxyForFrozenObject = <T extends object>(target: T, proxyHandler: ProxyHandler<T>) => {
    const dummyObject = {};
    const proxyProxyHandler = {
        getPrototypeOf(_dummyTarget: T): object | null {
            return proxyHandler.getPrototypeOf
                ? proxyHandler.getPrototypeOf(target)
                : Reflect.getPrototypeOf(target);
        },
        setPrototypeOf(_dummyTarget: T, v: any): boolean {
            return proxyHandler.setPrototypeOf
                ? proxyHandler.setPrototypeOf(target, v)
                : Reflect.setPrototypeOf(target, v);
        },
        isExtensible(_dummyTarget: T): boolean {
            return proxyHandler.isExtensible
                ? proxyHandler.isExtensible(target)
                : Reflect.isExtensible(target);
        },
        preventExtensions(_dummyTarget: T): boolean {
            return proxyHandler.preventExtensions
                ? proxyHandler.preventExtensions(target)
                : Reflect.preventExtensions(target);
        },
        getOwnPropertyDescriptor(
            _dummyTarget: T,
            p: PropertyKey
        ): PropertyDescriptor | undefined {
            return proxyHandler.getOwnPropertyDescriptor
                ? proxyHandler.getOwnPropertyDescriptor(target, p)
                : Reflect.getOwnPropertyDescriptor(target, p);
        },
        has(_dummyTarget: T, p: PropertyKey): boolean {
            return proxyHandler.has
                ? proxyHandler.has(target, p)
                : Reflect.has(target, p);
        },
        get(_dummyTarget: T, p: PropertyKey, receiver: any): any {
            return proxyHandler.get
                ? proxyHandler.get(target, p, receiver)
                : Reflect.get(target, p, receiver);
        },
        set(_dummyTarget: T, p: PropertyKey, value: any, receiver: any): boolean {
            return proxyHandler.set
                ? proxyHandler.set(target, p, value, receiver)
                : Reflect.set(target, p, value, receiver);
        },
        deleteProperty(_dummyTarget: T, p: PropertyKey): boolean {
            return proxyHandler.deleteProperty
                ? proxyHandler.deleteProperty(target, p)
                : Reflect.deleteProperty(target, p);
        },
        defineProperty(
            _dummyTarget: T,
            p: PropertyKey,
            attributes: PropertyDescriptor
        ): boolean {
            return proxyHandler.defineProperty
                ? proxyHandler.defineProperty(target, p, attributes)
                : Reflect.defineProperty(target, p, attributes);
        },
        ownKeys(_dummyTarget: T): PropertyKey[] {
            return proxyHandler.ownKeys
                ? proxyHandler.ownKeys(target)
                : Reflect.ownKeys(target);
        },
        apply(_dummyTarget: T, thisArg: any, argArray: any): any {
            return proxyHandler.apply
                ? proxyHandler.apply(target, thisArg, argArray)
                : Reflect.apply(target as Function, thisArg, argArray);
        },
        construct(_dummyTarget: T, argArray: any, newTarget: any): object {
            return proxyHandler.construct
                ? proxyHandler.construct(target, argArray, newTarget)
                : Reflect.construct(target as Function, argArray, newTarget);
        }
    };
    return new Proxy(dummyObject, proxyProxyHandler) as T;
};
