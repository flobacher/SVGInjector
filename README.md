SVGInjector
=========

A fast, caching, dynamic inline SVG DOM injection library. Originally developed by [Waybury](http://waybury.com/) for use in [iconic.js](https://useiconic.com/tools/iconic-js/), part of the [Iconic](https://useiconic.com/) icon system.
Extended by Flobacher to be able to use with spritesheets and in AngularJS Applications

## Why?
There are a number of ways to use SVG on a page (`object`, `embed`, `iframe`, `img`, CSS `background-image`) but to unlock the full potential of SVG, including full element-level CSS styling and evaluation of embedded JavaScript, the full SVG markup must be included directly in the DOM.

Wrangling and maintaining a bunch of inline SVG on your pages isn't anyone's idea of good time, so **SVGInjector** lets you work with simple `img` tag elements (or other tag of your choosing) and does the heavy lifting of swapping in the SVG markup inline for you.

## How?
* Any DOM element, or array of elements, passed to **SVGInjector** with an SVG file `src` or `data-src` attribute will be replaced with the full SVG markup inline. The async loaded SVG is also cached so multiple uses of an SVG only requires a single server request.

* Any embedded JavaScript in the SVG will optionally be extracted, cached and evaluated.

> Development tip: The dynamic injection process uses AJAX calls to load SVG. If you are developing locally without running a local webserver, be aware that default browser security settings may [block these calls](http://wiki.fluidproject.org/display/fluid/Browser+settings+to+support+local+Ajax+calls).


# Documentation

## Install

> **SVGInjector2** is compatible with:
  * [CommonJS](http://commonjs.org/) via `module.exports` for use with [Browserify](http://browserify.org/) or [Node](http://nodejs.org/)/[PhantomJS](http://phantomjs.org/)
  * [AMD API](https://github.com/amdjs/amdjs-api/blob/master/AMD.md) usage with [RequireJS](http://requirejs.org/)
  * Plain ol' JavaScript via creation of a global function
  * AngularJS

### npm

    npm install svg-injector-2

### Bower

    bower install svg-injector-2

### Manually

Download the [dist/svg-injector.min.js](https://github.com/flobacher/SVGInjector2/blob/master/dist/svg-injector.min.js) file from this repository and add it to your project.


## Usage

### Quick Start

Include the **SVGInjector** script on your page.

```html
<script src="svg-injector.min.js"></script>
```

Add some SVG `svg` tags.

```html
<svg class="inject-me" src="image-one.svg">
<svg class="inject-me" src="image-two.svg">
```

Inject 'em.

```html
<script>
  // Elements to inject
  var mySVGsToInject = document.querySelectorAll('img.inject-me');

  // Do the injection
  new SVGInjector().inject(mySVGsToInject);
</script>
```

The `svg` tags have now been replaced with the full SVG markup.


### Configuration

In addition to passing elements to inject, an options object and callback function can optionally be defined.

```js
new SVGInjector(options).inject(elements, afterAllInjectionsFinishedCallback, perInjectionCallback);
```

#### `elements`

A single DOM element or array of elements, with `src` or `data-src` attributes defined, to inject.

#### `options`

```js
{
  evalScripts: [always|once|never],
  pngFallback: [PNG directory]
}
```

* `evalScript` - String

  Should we run any script blocks found in the SVG?

  * `always` - Run them every time.
  * `once` - [default] Only run scripts once for each SVG file, even if it is used on a page more than once.
  * `[false|'never']` - Ignore scripts

* `pngFallback` - String

  The directory where fallback PNGs are located for use if the browser doesn't [support SVG](http://caniuse.com/svg). This will look for a file with a `.png` extension matching the SVG filename defined in the `src` (or `data-src`).

  For additional flexibility, per-element fallbacks are also [available](#per-element-png-fallback).

* `each(svg)` - function

  A function to call after each SVG is injected. Receives the newly injected SVG DOM element as a parameter.

#### `callback(count)` - function

A function to call once all the requested SVG elements have been injected. Receives a count of the total SVGs injected as a parameter.

### Full Example

```html
<svg id="image-one" class="inject-me" data-src="image-one.svg">
<svg id="image-two" class="inject-me" data-src="image-two.svg">
```

```js
// Elements to inject
var mySVGsToInject = document.querySelectorAll('svg.inject-me');

// Options
var injectorOptions = {
  evalScripts: 'once',
  pngFallback: 'assets/png'
};

// Trigger the injection
new SVGInjector(injectorOptions).inject(
  mySVGsToInject,
  function (totalSVGsInjected) {
    // Callback after all SVGs are injected
    console.log('We injected ' + totalSVGsInjected + ' SVG(s)!');
  },
  function (svg) {
    // Callback after each SVG is injected
    console.log('SVG injected: ' + svg.getAttribute('id'));
  }
);
```

### Per-element PNG fallback

Since you might be using a single SVG styled in multiple ways, you can also define per-element fallbacks by adding a `data-fallback` or `data-png` attribute to your `img` tags to define a unique PNG for each context.

See [examples/fallbacks](https://github.com/flobacher/SVGInjector2/blob/master/examples/fallbacks.html) for more details.

```html
<style>
  .thumb-green {fill: #A6A93C;}
</style>
<svg class="thumb-green inject-me" data-src="svg/thumb-up.svg" data-fallback="png/thumb-up-green.png">

```

### Spritesheets

To save http requests, you can combine your svgs to a spritesheet, where every single svg is represented
as a `<symbol>` or an `<svg>`. To inject the symbol with the id `thumb-up` from a spritesheet, on the element where you want
the injection to happen write :  `data-src = "url-to-spritesheet.svg#thumb-up"`.
Besides spritesheets consisting of symbols, you can also use Spritesheets that specify `<view>` elements with
ids (it is possible to create a fallback-png spritesheet for those). The injector will try to find the symbol/svg element
via comparing its viewbox to that of the view. If no png fallback is needed, the first approach is the most
prefereable. If using nodejs build-tools like gulp or grunt, take a look at [svg-sprite](https://github.com/jkphl/svg-sprite).
See [examples/spritesheet](https://github.com/flobacher/SVGInjector2/blob/master/examples/angular-spritesheet.html) for more details.

#### Classbased fragment ids

When using spritesheets, having to type the same data-src=urltospritesheet.svg#fragmentid can become cumbersome.
Thats why there is a config options that allows to set a default url to a spritesheet. The fragment id can then be provided via
a simple class.
See [examples/fallbacks](https://github.com/flobacher/SVGInjector2/blob/master/examples/spritesheet-classbased.html) for more details.


### AngularJS

SVGInjector is also available as configurable Service / Directive combination.
 See [examples/angular-spritesheet](https://github.com/flobacher/SVGInjector2/blob/master/examples/angular-spritesheet.html) for more details.

#### Performance tip
add
```html
<link rel="prefetch" href="(pathToSpritesheet)"/>
```
to let the browser download the file, even before it was requested via xhr

### Accessibility
`role="img"` and `aria-labelledby` gets added to the root svg element. `aria-labelledby` points to the id of the `desc` and `title` tags inside the injected svg.
The contents of those tags comes from corresponding tags inside the element which is the injection target, if not found there, they are taken from the svg-instance that gets
injected, and if missing there as well defaults to the fragmentid or filename of the injectable. `role="presentation"` gets added to all elements
in all proper browsers (so no IE).



# Licence
The MIT License (MIT)

Copyright (c) 2014 Waybury

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
