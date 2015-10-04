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

### Options
If your project needs a bit more finesse, that can be arrange too. All you need to do is pass a second argument to `boat.run`.

```js
var boat = require('boat');

boat.run(['./tests/*.test.js'], {
  before: './tests/before.js',
  after: './tests/after.js'
});
```

#### `before`
If you need to run some kind of setup script before your tests are run, you can pass the scripts path to `before` and `boat` will run them for you.

#### `after`
If you need, `boat` can help you run a cleanup script, just pass a path to `after`.

#### `reporter`
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

#### `...`
All options that you pass to `boat.run` will be passed down to the reporter that is used. So, if your reporter accepts additionally arguments, you can put them in here.

## License
`boat` is licensed under the MIT [license](LICENSE).
