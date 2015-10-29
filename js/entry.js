// entry

'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilitiesIndexUtilJs = require('./utilities/index.util.js');

var _utilitiesIndexUtilJs2 = _interopRequireDefault(_utilitiesIndexUtilJs);

require('./models/entry.model.js');

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
//# sourceMappingURL=entry.js.map
