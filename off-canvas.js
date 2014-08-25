/*
 * angular-off-canvas v0.1.0
 * (c) 2013 Ciro Nunes http://cironunes.github.io/
 * License: MIT
 */

'use strict';

angular.module('cn.offCanvas', [])
	.factory('cnOffCanvas', function($compile, $rootScope, $controller, $http, $templateCache, $q) {
		return function (config) {

			if((+!!config.template) + (+!!config.templateUrl) !== 1) {
				throw new Error();
			}

			var container = angular.element(config.container || document.body),
				containerClass = config.containerClass || 'is-off-canvas-opened',
				controller = config.controller || angular.noop,
				controllerAs = config.controllerAs,
				element = null,
				promise = null,
				html;

			if(config.template) {
				var deferred = $q.defer();
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
				var scope = $rootScope.$new();
				var ctrl = $controller(controller, {$scope: scope});
				if(controllerAs) {
					scope[controllerAs] = ctrl;
				}
				element = angular.element(html);
				container.prepend(element);
				$compile(element)(scope);
			})

			function toggle() {
				if (this.isOpened) {
					return this.close();
				} else {
					return this.open();
				}
			}

			function open() {
				if (!this.isOpened) {
					this.isOpened = true;
					container.toggleClass(containerClass);
				}
				promise = $q.defer();
				return promise.promise;
			}

			function close() {
				if (this.isOpened) {
					this.isOpened = false;
					container.toggleClass(containerClass);
				}
				promise.resolve();
				var defered = $q.defer();
				defered.reject();
				return defered.promise;
			}

			return {
				toggle: toggle,
				open: open,
				close: close,
				isOpened: false
			}
		}
	});
