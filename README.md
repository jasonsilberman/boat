boat
====
A simple JavaScript testing framework.

## Installation
```
$ npm install boat
```

## Usage
Setting up your project to use `boat` is easy.

1. Create a file to initiate your tests from (ie. `test.js`)
2. Inside this newly created testing file, you need to initiate `boat` and tell it where your test files are.

```js
var boat = require('boat');

var status = boat.run(['./tests/*.test.js']); // returns false if any tests failed
```

3. That's it. You can then run your code with something like `node test.js` and you are good to go.

*You can check out some examples of `boat` inside the [`examples/`](examples/) directory.*

### Tests
Writing tests is really easy. Here is a test from the [basic](examples/basic/) example.

```js
var test = require('boat').test;
var Calc = require('../src/calc');

test('calc', function (that) {
  that('3 * 4 should = 12', function (assert) {
    assert(Calc.times(3, 4)).equals(12);
  });

  that('3*3 should = 9', function (assert) {
    assert(Calc.square(3)).equals(9);
  });

  that('sqrt 9 should = 3', function (assert) {
    assert(Calc.root(9)).equals(3);
  });
});
```

### Assert
There are four `assert` functions bundled with `boat`.

#### `equals`
This makes sure that things are equal.

```js
var age = 35;
assert(age).equals(35); // true
```
#### `isA`
This makes sure that the object is of a certain type.

```js
var name = 'boat';
assert(name).isA('string'); // true
```
#### `true`
This makes sure that the passed object is true.

```js
var statement = true;
assert(statement).true(); // true
```
#### `false`
This makes sure that the passed object is false.

```js
var statement = false;
assert(statement).false(); // true
```

## Options
If your project needs a bit more finesse, that can be arranged too. All you need to do is pass a second argument to `boat.run`.

```js
var boat = require('boat');

boat.run(['./tests/*.test.js'], {
  before: './tests/before.js',
  after: './tests/after.js'
});
```

### `before`
If you need to run some kind of setup script before your tests are run, you can pass the scripts path to `before` and `boat` will run them for you.

### `after`
If you need, `boat` can help you run a cleanup script, just pass a path to `after`.

### `reporter`
The default reporter used by `boat` is [`dot`](lib/reporters/dot.js), however you pass a custom reporter if you would like. You can look in [here](lib/reporters/) to see all of the reporters included by default, but if you would like to use your own feel free.

*Note:* When passing your own reporter, `boat` will check to see if there is a `/` in the name. If there is, it will check its own included reporters and if it does not find what the reporter there, it will just include the path combined with the current working directory. If there is no `/`, then it will just pass the reporter argument straight to `require`.

```js
{
  reporter: './reporters/dot' // will result in the reporter "dot" that is included by default.
}

{
  reporter: './custom/awesomeness' // this will require the reporter from "./custom/awesomeness".
}

{
  reporter: 'awesome-reporter' // this will be directly passed to require("awesome-reporter").
}
```

### `...`
All options that you pass to `boat.run` will be passed down to the reporter that is used. So, if your reporter accepts additionally arguments, you can put them in here.

## License
`boat` is licensed under the MIT [license](LICENSE).
