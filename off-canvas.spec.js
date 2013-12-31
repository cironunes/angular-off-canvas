describe('cnOffCanvas', function() {
  var cnOffCanvas,
    rootScope,
    container;

  beforeEach(module('cn.offCanvas'));

  beforeEach(inject(function(_cnOffCanvas_, $rootScope, $templateCache) {
    cnOffCanvas = _cnOffCanvas_;
    rootScope = $rootScope;

    rootScope.foo = 'foo';
    $templateCache.put('test.html', [200, '<div>{{foo}}</div>', {}]);
    container = angular.element('<div></div>');
  }));

  afterEach(function() {
    container = null;
  });

  describe('#init', function() {
    it('should be closed initially', function() {
      var offCanvas = cnOffCanvas({
        templateUrl: 'test.html',
        container: container
      });

      expect(offCanvas.isOpened).toBeFalsy();
    });

    it('should load content of navigation', function() {
      cnOffCanvas({
        templateUrl: 'test.html',
        container: container
      });
      rootScope.$digest();
      expect(container.text()).toBe('foo');
    });

    it('should throw if called without a `template` or `templateUrl` options', function() {
      expect(function() { cnOffCanvas({}) }).toThrow();
    });

    it('should throw if called with both `template` and `templateUrl` options', function() {
      expect(function() {
        cnOffCanvas({
          template: '<div></div>',
          templateUrl: 'test.html'
        });
      }).toThrow();
    });

    it('should instantiate a controller via `controller` option', function() {
      cnOffCanvas({
        templateUrl: 'test.html',
        controller: function($scope) {
          $scope.foo = 'bar';
        },
        container: container
      });
      rootScope.$digest();
      expect(container.text()).toBe('bar');
    });

    it('should instantiate expose a controller to the scope via the `controllerAs` option', function() {
      cnOffCanvas({
        template: '<div>{{ctrl.foo}}</div>',
        controller: function() {
          this.foo = 'bar';
        },
        controllerAs: 'ctrl',
        container: container
      });
      rootScope.$digest();
      expect(container.text()).toBe('bar');
    });
  });

  describe('#toggle', function() {
    var offCanvas;
    beforeEach(function() {
      offCanvas = cnOffCanvas({
        templateUrl: 'test.html',
        container: container
      });
    })
    it('should open the off-canvas nav', function() {
      offCanvas.toggle();
      expect(offCanvas.isOpened).toBeTruthy();
    });

    it('should close the off-canvas nav', function() {
      offCanvas.toggle();
      expect(offCanvas.isOpened).toBeTruthy();
      offCanvas.toggle();
      expect(offCanvas.isOpened).toBeFalsy();
    });

    it('should toggle `is-off-canvas-opened` class to the container by default', function() {
      offCanvas.toggle();
      expect(container.hasClass('is-off-canvas-opened')).toBeTruthy();
    });

    it('should toggle a configurable class via `containerClass` option', function() {
      offCanvas = cnOffCanvas({
        templateUrl: 'test.html',
        container: container,
        containerClass: 'is-opened-nav'
      });
      offCanvas.toggle();
      expect(container.hasClass('is-opened-nav')).toBeTruthy();
    });
  });
});