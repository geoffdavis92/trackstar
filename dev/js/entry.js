/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	// entry

	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _utilitiesIndexUtilJs = __webpack_require__(1);

	var _utilitiesIndexUtilJs2 = _interopRequireDefault(_utilitiesIndexUtilJs);

	__webpack_require__(2);

	var workoutSelectBox = $('select[name="workout"]'),
	    woSBHTML = workoutSelectBox.html(),
	    currentFormState = undefined;

	workoutSelectBox.html('<option selected disabled>Choose a workout...</option>' + woSBHTML);

	workoutSelectBox.on('input', function (e) {
		var val = $(this).val();
		$('form section.state').each(function (i, el) {
			$(el).removeClass('display-block').addClass('display-none');
		});
		$('form section.state.' + val).removeClass('display-none').addClass('display-block');
		currentFormState = val;
		return currentFormState;
	});

	// binding

	$('form [data-bind]').each(function (i, el) {
		var databind = $(el).attr('data-bind');
		$(el).on('input', function () {
			var val = $(el).val();
			$('#preview [data-bind="' + databind + '"]').val(val);
		});
	});

	// Add button for new record
	var ba = $('.button-after');
	var new_record_button_html = '<button class="add-new-record"><span class="inner">+</span></button>';
	ba.parent().append('' + new_record_button_html);
	$(new_record_button_html).on('click', function (e) {
		e.preventDefault();
	});

	console.log(_utilitiesIndexUtilJs2['default'].convert().info);
	console.log(_utilitiesIndexUtilJs2['default'].convert('12 in').toFeet());
	console.log(_utilitiesIndexUtilJs2['default'].convert('24 in').toFeet({ strict: true }));
	//# sourceMappingURL=entry.js.map


/***/ },
/* 1 */
/***/ function(module, exports) {

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


/***/ },
/* 2 */
/***/ function(module, exports) {

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

/***/ }
/******/ ]);