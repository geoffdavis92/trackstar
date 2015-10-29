// Utilities Index

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
			strict: false
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
		switch(unit) {
			case 'in':
				product = num*table.toFeet
				break;
		}
		product = options.strict ? product : Math.round(product)
		return product
	}
	echo() {
		console.log({
			number: this.num,
			unit: this.unit
		})
	}

}

var convert = (i) => new Conversion(i)

module.exports = {
  convert: convert
}