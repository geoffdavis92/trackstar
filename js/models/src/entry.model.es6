// Entry Model

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

var check = (v,t) => new TypeCheck(v,t)

class Record { 
	constructor(date,temp,total_dur,type,workout) {
		this.date = date
		this.temp = temp
		this.tdur = total_dur
		this.type = type
		this.work = workout
		this.locals = [this.date, this.temp, this.tdur, this.type, this.work]
		this.expected = ['string', 'number', 'number', 'string', 'array']
		this.checkTypes()
	}
	checkTypes() {
		for(let i=0;i<this.locals.length;i++){
			var result = check(this.locals[i],this.expected[i]).isExpected()
			if (result) {
				console.log('OK')
			} else {
				console.error(`${locals[i]} is not of type ${expected[i]}`)
			}
		}
		return;
	}
	json() {
		var record = {
			date: this.date,
			temp: this.temp,
			total_duration: this.tdur,
			workout_type: this.type,
		}
		for(let i=0;i<this.work.length;i++) {
			record[`session-${i}`] = this.work[i]
		}
		return record
	}


}

var entry = (d,td,ty,w) => new Record(d,td,ty,w)

module.exports = {
  entry: entry
}