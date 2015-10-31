'use strict';

const convert = require('./js/utilities/index.util.js').convert
const check = require('./js/utilities/index.util.js').check

const r = require('rethinkdb')

const CONNECTION = {
    host: 'localhost',
    port: 28015
}

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
  connect: connect,
  create: createDB,
  addTable: addTable,
  insert: insert
}