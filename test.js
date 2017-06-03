const drl = require('./index');

test('can store paths and their callbacks', () => {
    const store = drl();
    store.add('/0', () => 0);
    store.add('/1', () => 1);
    expect(store.exec('/0')).toBe(0);
    expect(store.exec('/1')).toBe(1);
});

test('add will reject invalid arguments', () => {
    const store = drl();
    expect(() => store.add(0, () => {})).toThrow(/string/);
    expect(() => store.add('test', 0)).toThrow(/function/);
});

test('exec will reject invalid arguments', () => {
    const store = drl();
    expect(() => store.exec(0, {})).toThrow(/string/);
    expect(() => store.exec('test', 0)).toThrow(/object/);
});

test('can pass params to exec', () => {
    const store = drl();
    store.add('/test', (params) => params);
    expect(store.exec('/test', {a: 0})).toEqual({a: 0});
});

test('can pass params through the path', () => {
    const store = drl();
    store.add('/:value/test', (params) => params);
    expect(store.exec('/test/test')).toEqual({value: 'test'});
});

test('priority is given to the earliest added match', () => {
    const store = drl();
    store.add('/:value', () => 0);
    store.add('/test', () => 1);
    expect(store.exec('/test')).toBe(0);
});
