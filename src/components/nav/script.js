window.addEventListener('load', function (event) {

	$('.nav-show-more').click(function () {

		$(this).toggleClass('active');
		$(this).closest('.nav-list').toggleClass('more');
	})

	//скрипт для мобольного меню
	$(document).on('click touch', '.js-nav-toggle', function (e) {
		e.preventDefault();
		e.stopPropagation();

		let $toggle = $(this);
		let $link = $toggle.parent();
		let $nav = $link.siblings('.js-nav');

		if ($link.hasClass('active')) {
			$link.removeClass('active');
			$nav.removeClass('active');
			$toggle.removeClass('active');
		} else {
			$link.addClass('active');
			$nav.addClass('active');
			$toggle.addClass('active');
		}
	});

});

