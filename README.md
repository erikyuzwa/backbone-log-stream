# backbone-log-stream
a Backbone plugin to control and centralize logging

My ultimate goal with this plugin is to avoid the use of `console.log` scattered throughout my application,
and to control this output for production builds / releases.

Compatible with Backbone 1.0.0 and up.

## Usage
Add the script to the page after backbone.js has been included:

```html
<script src="/path/to/backbone.js"></script>
<script src="/path/to/backbone.log-stream.js"></script>
```

or if you're using AMD, require the script as a module:

```js
require(['path/to/backbone.log-stream.js']);
```

Note that the AMD module depends on `underscore` and `backbone` modules being defined as it lists them as dependencies. 
If you don't have these mapped, you can do it by adding the following to your require config:

```js
requirejs.config({
  paths: {
    backbone: 'actual/path/to/backbone.js',
    underscore: 'actual/path/to/underscore.js'
  }
});
```

If you are using CommonJS modules, install via `npm`:

```
npm install backbone-log-stream
```

then require it in your modules:

```js
require('backbone-log-stream');
```

## API

* `Object.log()` - where `Object` is one of `Backbone.Model`, `Backbone.Collection`, `Backbone.Router`, `Backbone.View`.

## Example

There's an example one page app in the `example/` folder, modified from this (original tutorial)[https://tutorialzine.com/2013/04/services-chooser-backbone-js]

* `npm install http-server -g`
* `http-server .`
* open your browser to (http://localhost:8080/example)[http://localhost:8080/example]

## Tests
You can run the tests by cloning the repo, installing the dependencies and
running `grunt jasmine`:

```
$ npm install
$ grunt jasmine
```

The `npm run test` task runs tests and lints the code.

```
$ npm run test
```

## Releases
We will handle release versioning based on the changes. This will update `package.json`, `bower.json`, and also create a new git tag.

Once the version is bumped you can uglify the file so the version makes it into the uglified version.

```
$ grunt uglify
```

Now commit the changes, push to GitHub, and `npm publish`.


# LICENSE

MIT License

Copyright (c) 2017 Erik Yuzwa

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

