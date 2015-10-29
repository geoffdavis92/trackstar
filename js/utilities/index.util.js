// Utilities Index

/**
 * All values are multipliers; given that
 * 1 [parent name unit] === 1 [property name unit]
 */

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Conversion = (function () {
	/**
  * [constructor description]
  * @param  {string} input Containers numeric value and 
  *                        	unit to be converted, delimited
  *                        	by a space.
  * @return {object}       Class object
  */

	function Conversion(i) {
		_classCallCheck(this, Conversion);

		this.check = (function (i) {
			console.log(i);
		})(i);
		this.num = i ? parseFloat(i.split(' ')[0]) : undefined;
		this.unit = i ? i.split(' ')[1] : undefined;
		this.table = {
			distance: {
				abbr: {
					cm: 'centimeters',
					ft: 'feet',
					'in': 'inches',
					km: 'kilometers',
					m: 'meters',
					mi: 'miles',
					mm: 'millimeters',
					yd: 'yards'
				},
				feet: {
					toInches: 12,
					toMeters: 0.3048, // eg 1ft === 0.3048m
					toYards: 0.3333
				},
				inches: {
					toFeet: 0.0833
				},
				meters: {
					toFeet: 3.2808
				},
				yards: {
					toFeet: 3
				}
			}
		};
		this.info = {
			default_system: 'Imperial'
		};
	}

	_createClass(Conversion, [{
		key: 'toFeet',
		value: function toFeet() {
			var num = arguments.length <= 0 || arguments[0] === undefined ? this.num : arguments[0];
			var unit = arguments.length <= 1 || arguments[1] === undefined ? this.unit : arguments[1];
			var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

			var table = this.table.distance['' + this.table.distance.abbr['' + this.unit]];
			var product;
			switch (unit) {
				case 'in':
					product = num * table.toFeet;
					break;
			}
			product = options.strict ? product : Math.round(product);
			return product;
		}
	}, {
		key: 'echo',
		value: function echo() {
			console.log({
				number: this.num,
				unit: this.unit
			});
		}
	}]);

	return Conversion;
})();

var convert = function convert(i) {
	return new Conversion(i);
};

module.exports = {
	convert: convert
};
//# sourceMappingURL=index.util.js.map
