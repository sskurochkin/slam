window.addEventListener('load', function () {

	//scrollWidth

	(function () {
		if (document.body.scrollHeight <= window.innerHeight) {
			document.documentElement.style.setProperty('--scrollWidth', 0 + 'px');
		} else {
			let div = document.createElement('div');

			div.style.overflowY = 'scroll';
			div.style.width = '50px';
			div.style.height = '50px';

			// мы должны вставить элемент в документ, иначе размеры будут равны 0
			document.body.append(div);
			let scrollWidth = div.offsetWidth - div.clientWidth;

			div.remove();
			document.documentElement.style.setProperty('--scrollWidth', scrollWidth + 'px');
		}
	})();


	//SLAM CATALOG MENU LOAD

	(() => {
		let isMenuLoaded = false;
		$('.js-popup-catalog').click(async function (ev) {
			ev.stopPropagation();


			if ($(this).hasClass('active')) {
				$('body').removeClass('slam-menu-active');
				$('.js-popup-catalog').removeClass('active');
				$('.header-catalog').removeClass('active');
				$('.header-catalog').removeClass('bg-on');
				$('.burger-icon').removeClass('active');
				return;
			}

			const requestUrl = $(this).attr('data-ajax-src');
			const ajaxTarget = $($(this).attr('data-ajax-target'));
			ajaxTarget.addClass('bg-on');
			$('.burger-icon').addClass('active');
			
			$(this).addClass('active');

			if (!isMenuLoaded) {
				try {
					ajaxTarget.addClass('preloader-block');
					const response = await fetch(requestUrl);
					const html = await response.text();
					ajaxTarget.html(html);
					ajaxTarget.removeClass('preloader-block');
					
					setTimeout(() => {
						ajaxTarget.addClass('active');
					}, 0)
					
					isMenuLoaded = true;
					window.reinit.catalogMenu();
				} catch (e) {
					console.log(e);
				}
			}else{
				ajaxTarget.addClass('active');
			}


			$(document).click(function (ev) {
				$('.burger-icon').removeClass('active');
				$('body').removeClass('slam-menu-active');
				$('.js-popup-catalog').removeClass('active');
				$('.header-catalog').removeClass('active');
				$('.header-catalog').removeClass('bg-on');
			})





			// $(this).addClass('active');
			// $('body').addClass('slam-menu-active');


			// if ($(window).width() < 1023) {
			// 	$('.header-catalog').addClass('active-mobile');
			// }
			// 
			// $(this).addClass('active');
			// // if (!$('.header-catalog').hasClass('loaded')) return;
			// if ($('.header-catalog').hasClass('active')) {
			// 	$('.header-catalog').removeClass('active');
			// 	$(this).removeClass('active');
			// 	$('body').removeClass('slam-menu-active');
			// } else {
			// 	$('.header-catalog').addClass('active');
			// 	$(this).addClass('active');
			// }

		})
	})();


	//SLAM MOBILEMENU CATALOG MENU LOAD

	(() => {
		let isMenuLoaded = false;
		$('.js-mobile-catalog').click(async function(){
			const requestUrl = $(this).attr('data-ajax-src');
			const ajaxTarget = $($(this).attr('data-ajax-target'));
			$('.js-mob-menu').addClass('active');
			if (!isMenuLoaded) {
				try {
					$('.js-mob-menu').addClass('preloader');
					// ajaxTarget.addClass('preloader-block');
					const response = await fetch(requestUrl);
					const html = await response.text();
					ajaxTarget.html(html);
					$('.js-mob-menu').removeClass('preloader');
					// ajaxTarget.removeClass('preloader-block');
					isMenuLoaded = true;
					// window.reinit.catalogMenu();

				} catch (e) {
					console.log(e);
				}
			}else{
				// ajaxTarget.addClass('active');
			}
		})


		$('.js-mob-menu-close').click(function(){
			$(this).closest('.js-mob-menu').removeClass('active');
		})
		
		$('.js-slide-mobile-catalog').click(function(){
			if($('.js-slam-menu').hasClass('active')){
				$('.js-slam-menu').slideUp(100);
			}else{
				$('.js-slam-menu').slideDown(100);
			}
			$(this).closest('.mob-menu__catalog').toggleClass('active')
			$('.js-slam-menu').toggleClass('active')
		})
		


		$(document).on('click', '.js-slam-menu .nav-link .js-nav-toggle', function(ev){
				ev.preventDefault();
				ev.stopPropagation();
				if(!$(this).closest('.nav-item').hasClass('active')){
					$(this).closest('.nav-item').addClass('active');
				}else{
					$(this).closest('.nav-item').removeClass('active');
				}

		})

		$(document).on('click', '.js-slam-menu .nav-lvl2-link .js-nav-toggle', function(ev){
			ev.preventDefault();
			ev.stopPropagation();
			if(!$(this).closest('.nav-lvl2-item').hasClass('active')){
				$(this).closest('.nav-lvl2-item').addClass('active');
			}else{
				$(this).closest('.nav-lvl2-item').removeClass('active');
			}
			
	})

	})();




});

window.reinit.catalogMenu = function () {
	const hoverHanler = (el) => {
		el.addClass('active').siblings().removeClass('active');
		// $('.js-slam-menu .nav-item').removeClass('active');
		// el.addClass('active');
	}

	const hoverHanler2lvl = (el) => {
		$('.js-slam-menu .nav-lvl2-list .nav-lvl2-item').removeClass('active');
		el.addClass('active');
	}
	const hoverHanler3lvl = (el) => {
		$('.js-slam-menu .nav-lvl3-item').removeClass('active');
		el.addClass('active');
	}

	let pageX = 0;
	let currentItem = null;


	$(document).on('mousemove', '.js-slam-menu .nav-list', function (ev) {
		if (pageX == 0) {
			currentItem = $(ev.target).closest('.nav-item');
			pageX = ev.pageX;
		}
		setTimeout(() => {
			pageX = ev.pageX;
		}, 100)
		if (ev.pageX > pageX + 10) {
			return;
		} else {
			if (currentItem[0] == $(ev.target).closest('.nav-item')[0]) return;
			hoverHanler($(ev.target).closest('.nav-item'));
			currentItem = $(ev.target).closest('.nav-item');
		}
	})

	if ($(window).width() <= 1366 && $(window).width() > 768) {
		document.addEventListener('touchend', function (ev) {
			if ($(ev.target).closest('.js-slam-menu .nav-item.has-nav').length != 0) {
				if ($(ev.target).closest('.js-slam-menu .nav-item').hasClass('touch-ev')) {
					return;
				}
				$('.slam-menu .nav-item').removeClass('active');
				$('.slam-menu .nav-item').removeClass('touch-ev');
				$(ev.target).closest('.js-slam-menu .nav-item').addClass('active');
				$(ev.target).closest('.js-slam-menu .nav-item').addClass('touch-ev');
				ev.stopPropagation();
				ev.preventDefault();
			}
		}, { passive: false });
	}

	if ($(window).width() < 1023) {
		$(document).on('click', '.nav-link', function (ev) {
			if ($(ev.target).hasClass('js-nav-toggle')) {
				ev.preventDefault();
				if (!$(this).hasClass('active')) {
					$(this).addClass('active');
					$(this).closest('.nav-item').addClass('active');
				} else {
					$(this).closest('.nav-item').removeClass('active');
					$(this).removeClass('active');
				}
				return;
			}
			if (!$(this).hasClass('active') && $(this).closest('.nav-item').find('.nav-lvl2').length) {
				ev.preventDefault();
			}
			$('.slam-menu .nav-item').removeClass('active');
			$('.slam-menu .nav-link').removeClass('active');
			$(this).addClass('active');
			$(this).closest('.nav-item').addClass('active');
		})

		$(document).on('click', '.nav-lvl2-link', function (ev) {
			if ($(ev.target).hasClass('js-nav-toggle')) {
				ev.preventDefault();
				if (!$(this).hasClass('active')) {
					$(this).addClass('active');
					$(this).closest('.nav-lvl2-item').addClass('active');
				} else {
					$(this).closest('.nav-lvl2-item').removeClass('active');
					$(this).removeClass('active');
				}
				return;
			}
			if (!$(this).hasClass('active') && $(this).closest('.nav-lvl2-item').find('.nav-lvl3').length) {
				ev.preventDefault();
			}
			$(this).closest('.nav-lvl2-item').addClass('active');
			$(this).addClass('active');
		})
	}

}
