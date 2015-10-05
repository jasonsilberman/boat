Boat
====
A simple JavaScript testing framework.

## Installation
```
$ npm install boat
```

*Note: If you plan on using the command-line utility, you should run `npm install boat -g` instead.*

## Usage
Setting up your project to use Boat is easy. There are two ways to use Boat: through the JavaScript API or through the command-line utility.

*You can check out some examples of Boat inside the [`examples/`](examples/) directory.*

### API
1. Create a file to initiate your tests from (ie. `test.js`)
2. Inside this newly created testing file, you need to initiate Boat and tell it where your test files are.

```js
var boat = require('boat');

var status = boat.run(['./tests/*.test.js']); // returns false if any tests failed
```

3. That's it. You can then run your code with something like `node test.js` and you are good to go.

### CLI
The Boat command-line utility is very easy to use.

```
$ boat <path>
```

There is only one argument, the path to the config file. If it is empty it will assume it is `./boat.config.js`.

#### Config File
This is what an example config file looks like.

```js
module.exports = {
  files: ['./tests/*.test.js']
};
```

The only thing that is required is `files`. Everything else in your config file will be passed to `boat.run()`.

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
There are four `assert` functions bundled with Boat.

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
If your project needs a bit more finesse, that can be arranged too. All you need to do is pass a second argument to `boat.run()`.

```js
var boat = require('boat');

boat.run(['./tests/*.test.js'], {
  before: './tests/before.js',
  after: './tests/after.js'
});
```

### `before`
If you need to run some kind of setup script before your tests are run, you can pass the scripts path to `before` and Boat will run them for you. If you need to pass options to your `before` hook, just set `before` as an `object` with a `path` key.

```js
{
  before: {
    path: './tests/before.js',
    optionForBeforeScript: 'secretive'
  }
}
```

### `after`
If you need, Boat can help you run a cleanup script, just pass a path to `after`. If you need to pass options to your `after` hook, just set `after` as an `object` with a `path` key.

```js
{
  after: {
    path: './tests/after.js',
    optionForAfterScript: 'secretive'
  }
}
```

### `compiler`
If your test code is written in a language that needs to be compiled (ie. CoffeScript or ES2015), then you should pass the `compile` option to `boat.run()`. It works the same as `before` and `after` where you can pass either a `string` or an `object`.

```js
{
  compiler: 'babel/register'
}
```

or

```js
{
  compiler: {
    path: 'babel/register',
    stage: 0
  }
}
```

### `reporter`
The default reporter used by Boat is [`dot`](lib/reporters/dot.js), however you pass a custom reporter if you would like. You can look in [here](lib/reporters/) to see all of the reporters included by default, but if you would like to use your own feel free.

*Note: When passing your own reporter, Boat will check to see if there is a `/` in the name. If there is, it will check its own included reporters and if it does not find what the reporter there, it will just include the path combined with the current working directory. If there is no `/`, then it will just pass the reporter argument straight to `require`.*

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
All options that you pass to `boat.run()` will be passed down to the reporter that is used. So, if your reporter accepts additionally arguments, you can put them in here.

## Roadmap
Features coming in future releases:

- ~~*cli*. You will be able to call Boat from the command line.~~
- *watch*. You will be able to have Boat watch for changes in your tests and continually run them.

## License
Boat is licensed under the MIT [license](LICENSE).
