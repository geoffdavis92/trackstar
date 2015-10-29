'use strict';

var r = require('rethinkdb')

const CONNECTION = {
    host: 'localhost',
    port: 28015
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

var check = (v,t) => new TypeCheck(v,t)

var test = {
	num: 5,
	flt: 3.14,
	str: "Hellow World",
	arr: [1,2,3],
	obj: {
		name: "test",
		id: 0
	},
	fn: () => console.log("Hello World!")
}

var connect = function(_db,_table,_doc) {
	var _connection = CONNECTION
	r.connect(_connection, function(err, conn) {
		if(err) throw err;
		r.db(_db)
	})
}

var createDB = function(db_name) {
	r.connect(CONNECTION, function(err,conn) {
		r.dbCreate(db_name).run(conn, () => console.log(`${db_name} created at ${CONNECTION.host}:${CONNECTION.port}`))
	})
}

var addTable = function(db_name,table_name,viewResponse) {
	r.connect(CONNECTION, function(err,conn) {
		if (err) throw err;
		r.db(db_name).tableCreate(table_name).run(conn, function(err,res) {
			if (err) throw err;
			if (viewResponse) {
				console.log(`Table "${table_name}" created in ${db_name}.`)
				console.log(JSON.stringify(res,null,2))
			}
		})
	})

}

var insert = function(db_name,table_name,doc,viewResponse) {
	r.connect(CONNECTION, function(err,conn) {
		if (err) throw err;
		r.db(db_name).table(table_name).insert(doc).run(conn, function(err,res) {
			if (err) throw err;
			if (viewResponse) {
				console.log(`Record added in ${db_name}.${table_name}.`)
				console.log(JSON.stringify(res,null,2))
			}
		})
	})
}

// r.connect(CONNECTION, function(err, conn)  {
//     if (err) throw err;
//     r.db('test').table('meta').run(conn, function(err, res)  {
//         if (err) throw err;
//         r.table('meta').insert({
//             'author': 'geoffdavis92@gmail.com',
//             'created': '27.10.2015'
//         })
//     })
//     r.table('meta').run(conn, function(err,cur) {
//     	if (err) throw err;
//     	cur.toArray(function(err, res) {
//     		if(err) throw err;
//     		console.log(JSON.stringify(res,null,2))
//     	})
//     })
// })

module.exports = {
  CONNECTION: CONNECTION,
  check: check,
  connect: connect,
  create: createDB,
  addTable: addTable,
  insert: insert
}