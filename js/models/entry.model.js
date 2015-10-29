// Entry Model

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

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

var check = function check(v, t) {
	return new TypeCheck(v, t);
};

var Record = (function () {
	function Record(date, temp, total_dur, type, workout) {
		_classCallCheck(this, Record);

		this.date = date;
		this.temp = temp;
		this.tdur = total_dur;
		this.type = type;
		this.work = workout;
		this.locals = [this.date, this.temp, this.tdur, this.type, this.work];
		this.expected = ['string', 'number', 'number', 'string', 'array'];
		this.checkTypes();
	}

	_createClass(Record, [{
		key: 'checkTypes',
		value: function checkTypes() {
			for (var i = 0; i < this.locals.length; i++) {
				var result = check(this.locals[i], this.expected[i]).isExpected();
				if (result) {
					console.log('OK');
				} else {
					console.error(locals[i] + ' is not of type ' + expected[i]);
				}
			}
			return;
		}
	}, {
		key: 'json',
		value: function json() {
			var record = {
				date: this.date,
				temp: this.temp,
				total_duration: this.tdur,
				workout_type: this.type
			};
			for (var i = 0; i < this.work.length; i++) {
				record['session-' + i] = this.work[i];
			}
			return record;
		}
	}]);

	return Record;
})();

var entry = function entry(d, td, ty, w) {
	return new Record(d, td, ty, w);
};

module.exports = {
	entry: entry
};