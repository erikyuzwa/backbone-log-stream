/*
  backbone-log-stream v0.5.0 (2017-09-06)
  by erikyuzwa <erik@erikyuzwa.com> - https://github.com/erikyuzwa/backbone-log-stream.git
 */
// AMD wrapper from https://github.com/umdjs/umd/blob/master/amdWebGlobal.js
(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module and set browser global
		define(['underscore', 'backbone', 'jquery'], function (_, Backbone, $) {
			return (root.Backbone = factory(_, Backbone, $));
		});
	} else if (typeof exports !== 'undefined' && typeof require !== 'undefined') {
		module.exports = factory(require('underscore'), require('backbone'), require('jquery'));
	} else {
		// Browser globals
		root.Backbone = factory(root._, root.Backbone, root.jQuery);
	}
}(this, function (_, Backbone, $) {

	var LogStream = function(options) {
		options = (options || {});
	};

	_.extend(LogStream.prototype, {

		$logEnabled: function(val) {

			this.$logTrace = Boolean(val);
		},

		$logTrace: true,

		$logPrefix: '[app]:',

		$log: function() {
			var args = 1 <= arguments.length ? Array.prototype.slice.call(arguments, 0) : [];
			
			if (!this.$logTrace) {
				return;
			}
	
			if (this.$logPrefix) {
				args.unshift(this.$logPrefix);
			}
	
			if (typeof console !== 'undefined' && console !== null) {
				if (typeof console.log === 'function') {
					console.log.apply(console, args);
				}
			}
			
		}

	});

	
	var $logStream = $logStream || null;

	if ($logStream === null) {
		$logStream = new LogStream();
	}

	_.extend(Backbone.Collection.prototype, $logStream);
	_.extend(Backbone.Model.prototype, $logStream);
	_.extend(Backbone.View.prototype, $logStream);
	_.extend(Backbone.Router.prototype, $logStream);

	//Backbone.$logStream = $logStream;

	return Backbone;
}));