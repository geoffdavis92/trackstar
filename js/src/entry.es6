// entry

import u from './utilities/index.util.js'
import './models/entry.model.js'

var workoutSelectBox = $('select[name="workout"]'),
woSBHTML = workoutSelectBox.html(),
currentFormState = undefined

workoutSelectBox.html(`<option selected disabled>Choose a workout...</option>${woSBHTML}`)

workoutSelectBox.on('input', function(e) {
	let val = $(this).val()
	$('form section.state').each(function(i,el) {
		$(el).removeClass('display-block').addClass('display-none')
	})
	$(`form section.state.${val}`).removeClass('display-none').addClass('display-block')
	currentFormState = val
	return currentFormState
})

// binding

$('form [data-bind]').each(function(i,el) {
	var databind = $(el).attr('data-bind')
	$(el).on('input', function() {
		var val = $(el).val()
		$(`#preview [data-bind="${databind}"]`).val(val)
	})
})

// Add button for new record
var ba = $('.button-after')
var new_record_button_html = `<button class="add-new-record"><span class="inner">+</span></button>`
ba.parent().append(`${new_record_button_html}`)
$(new_record_button_html).on('click', function (e) { e.preventDefault() })

console.log(u.convert().info)
console.log(u.convert('12 in').toFeet())
console.log(u.convert('24 in').toFeet({strict: true}))
