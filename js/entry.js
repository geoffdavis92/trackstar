// entry

'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _utilitiesIndexUtilJs = require('./utilities/index.util.js');

require('./models/entry.model.js');

var workoutSelectBox = $('select[name="workout"]'),
    woSBHTML = workoutSelectBox.html(),
    currentFormState = undefined;

workoutSelectBox.html('<option selected disabled>Choose a workout...</option>' + woSBHTML);

workoutSelectBox.on('input', function (e) {
	var val = $(this).val();
	// $('form section.state').each(function(i,el) {
	// 	$(el).removeClass('display-block').addClass('display-none')
	// })
	// $(`form section.state.${val}`).removeClass('display-none').addClass('display-block')
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
$('.add-new-record').on('click', function (e) {
	e.preventDefault();
});

console.log((0, _utilitiesIndexUtilJs.convert)().info);
console.log((0, _utilitiesIndexUtilJs.convert)('12 in').toFeet());
console.log((0, _utilitiesIndexUtilJs.convert)('24 in').toFeet({ strict: true }));

// React

var workout_types = [{ key: "bike",
	title: "Bike Workout",
	igroups: [{
		label: 'Distance',
		input: {
			name: 'bike-distance',
			type: 'number',
			bind: 'bike-distance'
		}
	}, {
		label: 'Duration',
		input: {
			name: 'bike-time',
			type: 'number',
			bind: 'bike-duration'
		}
	}]
}, { key: "hike",
	title: "Hiking",
	igroups: [{}, {}]
}, { key: "run",
	title: "Running Workout",
	igroups: [{}, {}]
}, { key: "swim",
	title: "Swimming Workout",
	igroups: [{}, {}]
}, { key: "weightlift",
	title: "Weightlifting Workout",
	igroups: [{}, {}]
}];

var findKey = function findKey(key) {
	for (var i = 0; i < workout_types.length; i++) {
		if (workout_types[i].key === key) {
			return workout_types[i];
		}
	}
};

var Subform = _react2['default'].createClass({
	displayName: 'Subform',

	current_state: function current_state() {
		var result = this.props.data;
		switch (result) {
			case 'bike':
				result = findKey('bike');
				break;
			case 'hike':
				result = findKey('hike');
				break;
			case 'run':
				result = findKey('run');
				break;
			case 'swim':
				result = findKey('swim');
				break;
			case 'weightlift':
				result = findKey('weightlift');
				break;
		}
		return result;
	},
	render: function render() {
		console.log(this.current_state());
		var igroups = this.current_state().igroups.map(function (igroup, i) {
			return _react2['default'].createElement(
				'span',
				{ className: 'input-group row pad-10' },
				_react2['default'].createElement(
					'label',
					{ className: 'input-group-addon', htmlFor: igroup.input.name },
					igroup.label
				),
				_react2['default'].createElement('input', { className: 'form-control', name: igroup.input.name, type: igroup.input.type, dataBind: igroup.input.bind })
			);
		});
		return _react2['default'].createElement(
			'span',
			null,
			_react2['default'].createElement(
				'h4',
				{ className: 'section-title' },
				_react2['default'].createElement(
					'span',
					{ className: 'inner' },
					this.current_state().title
				)
			),
			_react2['default'].createElement('div', { className: 'col-md-2' }),
			_react2['default'].createElement(
				'div',
				{ className: 'col-md-8' },
				igroups
			),
			_react2['default'].createElement('div', { className: 'col-md-2' })
		);
	}
});

$('.form_type_setter').on('input', function () {
	var form_state = $('.form_type_setter').val();
	_reactDom2['default'].render(_react2['default'].createElement(Subform, { data: form_state }), document.querySelector('.Type')); //document.querySelector('section.Type'))
});

// h4.section-title: span.inner Bike Workout
// .row.pad-10
// 	.col-md-2
// 	.col-md-8.form-group
// 		span.input-group
// 			label.input-group-addon(for="bike-distance") Distance:
// 			input.form-control(name="bike-distance" type="number" data-bind="bike-distance")
// 	.col-md-2
// .row.pad-10
// 	.col-md-2
// 	.col-md-8.form-group
// 		span.input-group
// 			label.input-group-addon(for="bike-time") Duration:
// 			input.form-control(name="bike-time" type="number" data-bind="bike-duration")
// 	.col-md-2
//# sourceMappingURL=entry.js.map
