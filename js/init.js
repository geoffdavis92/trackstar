// INIT
'use strict';

var PAGE = window.location.pathname.split('/')[1];
var $nav_a;
$(document).ready(function () {
	// Active nav highlight
	$nav_a = $('nav ul.list li a');
	$nav_a.each(function (i, el) {
		if (PAGE.toLowerCase() === $(el).attr('href').toLowerCase()) {
			$(el).attr('class', $(el).attr('class').split('btn-')[0] + ' btn-success');
		}
	});
});
//# sourceMappingURL=init.js.map
