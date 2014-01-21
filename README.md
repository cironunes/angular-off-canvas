# angular-off-canvas [![Build Status](https://travis-ci.org/cironunes/angular-off-canvas.png)](https://travis-ci.org/cironunes/angular-off-canvas)

An off-canvas nav factory service for AngularJS that makes it easy to add off-canvas navs to your app.
[Plunker demo](http://plnkr.co/edit/arcXHcQgdWiHVB2a7IXA?p=preview)

## Install

```shell
bower install angular-off-canvas
```

## Usage
1. Include the `off-canvas.js` script provided by this component into your app.
2. *Optional:* Include the `off-canvas.css` style provided by this component into your html.
3. Add `cn.offCanvas` as a module dependency to your app.

### Typical Use

> app.js

```javascript
angular.module('myApp', []).

// let's make a nav called `myOffCanvas`
factory('myOffCanvas', function (cnOffCanvas) {
  return cnOffCanvas({
    controller: 'MyOffCanvasCtrl',
    controllerAs: 'offCanvas',
    templateUrl: 'my-off-canvas.html'
  });
}).

// typically you'll inject the offCanvas service into its own
// controller so that the nav can toggle itself
controller('MyOffCanvasCtrl', function (myOffCanvas) {
  this.toggle = myOffCanvas.toggle;
}).
```

> my-off-canvas.html

```html
<div class="off-canvas__nav">
  <h3>Hello {{name}}</h3>
  <p><a href ng-click="offCanvas.toggle()">Close Me</a></p>
</div>
```

> index.html

```html
<div ng-app="myApp" ng-controller="MyCtrl as ctrl">
  <a href ng-click="ctrl.toggle()">Show the modal</a>
</div>
```

### Cleaning up

If you add any listeners within the nav's controller that are **outside the nav's `scope`**,
you should remove them with `$scope.$on('$destroy', fn () { ... })` to avoid creating a memory leak.

### Inline Options

**Note:** The best practice is to use a separate file for the template and a separate declaration for
the controller, but inlining these options might be more pragmatic for cases where the template or
controller is just a couple lines.

```javascript
angular.module('myApp', []).

// let's make a nav called myOffCanvas
factory('myOffCanvas', function (btfModal) {
  return btfModal({
    controller: function () {
      this.name = 'World';
    },
    controllerAs: 'ctrl',
    template: '<div class="off-canvas__nav">Hello {{ctrl.name}}</div>'
  });
}).

controller('MyCtrl', function (myOffCanvas) {
  this.toggle = myOffCanvas.toggle;
});
```

```html
<div ng-app="myApp" ng-controller="MyCtrl">
  <a href ng-click="ctrl.toggle()">Toggle the nav</a>
</div>
```


## API

### `cnOffCanvas`

The nav `factory`. Takes a configuration object as a parameter:

```javascript
var navService = cnOffCanvas({
  /* options */
})
```

And returns a `navService` object that you can use to toggle the nav (described below).

The config object **must** either have a `template` or a `templateUrl` option.

These options work just like the [route configuration in Angular's
`$routeProvider`](http://docs.angularjs.org/api/ngRoute.$routeProvider#methods_when).


#### `config.template`
**string:** HTML string of the template to be used for this modal.
Unless the template is very simple, you should probably use `config.templateUrl` instead.

#### `config.templateUrl`
**string (recommended):** URL to the HTML template to be used for this modal.

#### `config.controller`
**string|function (optional):** The name of a controller or a controller function.

#### `config.controllerAs`
**string (optional, recommended):** Makes the controller available on the scope of the modal as the given name.

#### `config.container`
**DOM Node (optional):** DOM node to prepend. Defaults to `document.body`.

#### `config.containerClass`
**string (optional):** HTML class to add to the container. Defaults to `is-off-canvas-opened`.

### `navService`

A `navService` has just two methods: `activate` and `deactivate`.

#### `navService.toggle`

Add or remove a class to open/hide the nav with CSS

## Tests

You can run the tests with [`karma`](http://karma-runner.github.io/0.10/index.html):

```shell
karma start
```


## License
MIT
