window.addEventListener('load', function () {

	$(document).on('click', '.js-cookie-notification-close', function () {
		setCoockie('isCookieNotificationShowed', '1', 86400);
		$(this).closest('.cookie-notification').slideUp(100);
	})

	if ($(window).width() < 768) {
		$('.footer-nav__title').click(function () {
			if ($(this).closest('.footer-nav').hasClass('active')) {
				$(this).closest('.footer-nav').find('.footer-nav__menu').slideUp(100);
			} else {
				$(this).closest('.footer-nav').find('.footer-nav__menu').slideDown(100);
			}
			$(this).closest('.footer-nav').toggleClass('active');
		})
	}

})