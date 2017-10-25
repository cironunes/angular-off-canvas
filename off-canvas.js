/*
 * angular-off-canvas v0.1.0
 * (c) 2013 Ciro Nunes http://cironunes.github.io/
 * License: MIT
 */

'format amd';
/* global define */

(function () {
	'use strict';

	function isUndefinedOrNull(val) {
		return angular.isUndefined(val) || val === null;
	}

	function cnOffCanvas(angular) {

		angular.module('cn.offCanvas', [])
        	.factory('cnOffCanvas', function($compile, $rootScope, $controller, $http, $templateCache, $q) {
        		return function (config) {
        			var container = angular.element(config.container || document.body),
        				containerClass = config.containerClass || 'is-off-canvas-opened',
        				controller = config.controller || angular.noop,
        				controllerAs = config.controllerAs,
        				element = null,
        				html, deferred, scope, ctrl;

        			if ((+!!config.template) + (+!!config.templateUrl) !== 1) {
        				throw new Error('You must specify either a `template` or a `templateUrl` to create an off-canvas navigation.');
        			}

        			if (config.template) {
        				deferred = $q.defer();
        				deferred.resolve(config.template);
        				html = deferred.promise;
        			} else {
        				html = $http.get(config.templateUrl, {
        					cache: $templateCache
        				}).then(function(response) {
        					return response.data;
        				});
        			}

        			html.then(function(html) {
        				scope = $rootScope.$new();
        				ctrl = $controller(controller, {$scope: scope});
        				if (controllerAs) {
        					scope[controllerAs] = ctrl;
        				}
        				element = angular.element(html);
        				container.prepend(element);
        				$compile(element)(scope);
        			})

        			function toggle() {
        				this.isOpened = !this.isOpened;
        				container.toggleClass(containerClass);
        			}

        			return {
        				toggle: toggle,
        				isOpened: false
        			}
        		}
        	});

		return 'cn.OffCanvas';
	}

	var isElectron = window && window.process && window.process.type;
	if (typeof define === 'function' && define.amd) {
		define(['angular'], cnOffCanvas);
	} else if (typeof module !== 'undefined' && module && module.exports && (typeof require === 'function') && !isElectron) {
		module.exports = cnOffCanvas(require('angular'));
	} else {
		cnOffCanvas(angular);
	}
})();
