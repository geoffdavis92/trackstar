// Utilities Index

'use strict';

/**
 * All values are multipliers; given that
 * 1 [parent name unit] === 1 [property name unit]
 */

class Conversion {

	/**
	 * [constructor description]
	 * @param  {string} input Containers numeric value and 
	 *                        	unit to be converted, delimited
	 *                        	by a space.
	 * @return {object}       Class object
	 */
	
	constructor(i) {
		this.check = (function(i) {
			console.log(i)
		})(i)
		this.num = i ? parseFloat(i.split(' ')[0]) : undefined
		this.unit = i ? i.split(' ')[1] : undefined
		this.options = {
			strict: false,
			output: 'number'
		}
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
					in: 'inches',
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
		}
		this.info = {
			default_system: 'Imperial'
		}
	}
	toFeet(options=this.options) {
		var table = this.table.distance[`${this.table.distance.abbr[`${this.unit}`]}`]
		var product
		switch(this.unit) {
			case 'in':
				product = this.num*table.toFeet
				break;
		}
		product = options.strict ? product : Math.round(product)
		return product
	}
}

class TypeCheck {
	constructor(v,t) {
		this._var = v
		this._type = t
	}
	type(_var) {
		_var = _var || this._var
		return typeof _var
	}
	isExpected(_var, _type) {
		_var = _var || this._var
		_type = _type || this._type
		return typeof _var === _type ? true : false
	}
	isString(_var) {
		_var = _var || this._var
		return typeof _var === 'string' ? true : false
	}
	isNum(_var) {
		_var = _var || this._var
		if (typeof parseInt(_var) === 'number' && isNaN(_var) === false) {
			return true
		} else {
			return false
		}
	}
	isInt(_var) {
		_var = _var || this._var
		if (_var.toString().indexOf('.') !== -1 || typeof _var !== 'number') {
			return false
		} else {
			return true
		}
	}
	isFloat(_var) {
		_var = _var || this._var
		if (_var.toString().indexOf('.') !== -1) {
			return true
		} else {
			return false
		}
	}
	isArray(_var) {
		_var = _var || this._var
		return _var.length >= 0 ? true : false
	}
	isObject(_var) {
		_var = _var || this._var
		if (typeof _var === "object" &&  _var.length === undefined) {
			return true
		} else {
			return false
		}
	}
	isFunction(_var) {
		_var = _var || this._var
		return typeof _var === 'function' ? true : false
	}
}

var convert = (i) => new Conversion(i)
var check = (v,t) => new TypeCheck(v,t)

module.exports = {
  convert: convert,
  check: check
}