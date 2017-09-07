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

	// basic object constructor
	var LogStream = function(options) {
		options = (options || {});
	};

	_.extend(LogStream.prototype, {

		// a helper method to toggle our global setting. Note that this will apply to every object
		// making use of Backbone.$log. If you toggle it in any Backbone.* object,
		// it will apply right across the board - no such thing (currently) for object filtering.
		// @param - {boolean} - true to enable logging, false to squelch
		$logEnabled: function(val) {

			this.$logTrace = Boolean(val);
		},

		// our basic toggle
		$logTrace: true,

		// our logging prefix - identifies that this is a logging message
		$logPrefix: '[log]:',

		// our general replacement for "console.log" - it should accept the same arguments
		// but will make use of our internal smarts to decide to ouput anything or not.
		$log: function() {
			var args = 1 <= arguments.length ? Array.prototype.slice.call(arguments, 0) : [];
			
			// bail if we're in production or want this disabled
			if (!this.$logTrace) {
				return;
			}
	
			// prepend our logging prefix
			if (this.$logPrefix) {
				args.unshift(this.$logPrefix);
			}
	
			// if console.log is available, then pump our given arguments into it via .apply
			if (typeof console !== 'undefined' && console !== null) {
				if (typeof console.log === 'function') {
					console.log.apply(console, args);
				}
			}
			
		}

	});

	// create and define a singleton for all this log centralization.
	var $logStream = $logStream || null;
	if ($logStream === null) {
		$logStream = new LogStream();
	}

	// extend the basic prototypes of each Backbone object to add in our log method
	_.extend(Backbone.Collection.prototype, $logStream);
	_.extend(Backbone.Model.prototype, $logStream);
	_.extend(Backbone.View.prototype, $logStream);
	_.extend(Backbone.Router.prototype, $logStream);

	// TODO - decide if we need another "copy" of this object on
	// the Backbone root object
	// Backbone.$logStream = $logStream;

	return Backbone;
}));