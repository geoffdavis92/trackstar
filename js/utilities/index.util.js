// Utilities Index

'use strict';

/**
 * All values are multipliers; given that
 * 1 [parent name unit] === 1 [property name unit]
 */

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
		this.options = {
			strict: false,
			output: 'number'
		};
		this.table = {
			temp: {
				abbr: {
					degC: 'celsius',
					degF: 'fahrenheit'
				},
				celsius: {},
				fahrenheit: {}
			},
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
			var options = arguments.length <= 0 || arguments[0] === undefined ? this.options : arguments[0];

			var table = this.table.distance['' + this.table.distance.abbr['' + this.unit]];
			var product;
			switch (this.unit) {
				case 'in':
					product = this.num * table.toFeet;
					break;
			}
			product = options.strict ? product : Math.round(product);
			return product;
		}
	}]);

	return Conversion;
})();

var TypeCheck = (function () {
	function TypeCheck(v, t) {
		_classCallCheck(this, TypeCheck);

		this._var = v;
		this._type = t;
	}

	_createClass(TypeCheck, [{
		key: 'type',
		value: function type(_var) {
			_var = _var || this._var;
			return typeof _var;
		}
	}, {
		key: 'isExpected',
		value: function isExpected(_var, _type) {
			_var = _var || this._var;
			_type = _type || this._type;
			return typeof _var === _type ? true : false;
		}
	}, {
		key: 'isString',
		value: function isString(_var) {
			_var = _var || this._var;
			return typeof _var === 'string' ? true : false;
		}
	}, {
		key: 'isNum',
		value: function isNum(_var) {
			_var = _var || this._var;
			if (typeof parseInt(_var) === 'number' && isNaN(_var) === false) {
				return true;
			} else {
				return false;
			}
		}
	}, {
		key: 'isInt',
		value: function isInt(_var) {
			_var = _var || this._var;
			if (_var.toString().indexOf('.') !== -1 || typeof _var !== 'number') {
				return false;
			} else {
				return true;
			}
		}
	}, {
		key: 'isFloat',
		value: function isFloat(_var) {
			_var = _var || this._var;
			if (_var.toString().indexOf('.') !== -1) {
				return true;
			} else {
				return false;
			}
		}
	}, {
		key: 'isArray',
		value: function isArray(_var) {
			_var = _var || this._var;
			return _var.length >= 0 ? true : false;
		}
	}, {
		key: 'isObject',
		value: function isObject(_var) {
			_var = _var || this._var;
			if (typeof _var === "object" && _var.length === undefined) {
				return true;
			} else {
				return false;
			}
		}
	}, {
		key: 'isFunction',
		value: function isFunction(_var) {
			_var = _var || this._var;
			return typeof _var === 'function' ? true : false;
		}
	}]);

	return TypeCheck;
})();

var convert = function convert(i) {
	return new Conversion(i);
};
var check = function check(v, t) {
	return new TypeCheck(v, t);
};

module.exports = {
	convert: convert,
	check: check
};
//# sourceMappingURL=index.util.js.map
