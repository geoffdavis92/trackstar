// INIT
const PAGE = window.location.pathname.split('/')[1]
var $nav_a
$(document).ready(function() {
	// Active nav highlight
	$nav_a = $('nav ul.list li a')
	$nav_a.each((i,el) => {
		if (PAGE.toLowerCase() === $(el).attr('href').toLowerCase()) {
			$(el).attr('class',`${$(el).attr('class').split('btn-')[0]} btn-success`)
		}
	})
})