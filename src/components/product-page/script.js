window.addEventListener('load', function () {
	if (!window.reinit) {
		window.reinit = {};
	}
	if (!window.reinit.slider) {
		window.reinit.slider = {};
	}

	window.reinit.slider.productPageSlider = function () {
		let productPageSlider = $('.js-slider-product-page')
		if (productPageSlider.length && !productPageSlider.hasClass('inited')) {
			productPageSlider.each(function (i, el) {

				let nav = undefined;

				if ($(window).width() > 768 && $('.js-slider-product-page-nav').length) {

					nav = window.slam_slider({
						el: $('.js-slider-product-page-nav'),
						args: {
							lazy: true,
							spaceBetween: 0,
							slidesPerView: 'auto',
							direction: 'vertical',
						}
					})
				}


				const thumbs = nav ? { thumbs: { swiper: nav } } : {};

				let slider = el;
				let length = slider.querySelectorAll('.swiper-slide').length;
				let swiper = window.slam_slider({
					el: el,
					args: {
						autoHeight: false,
						lazy: true,
						spaceBetween: 0,
						watchOverflow: true,
						simulateTouch: true,
						slidesPerView: 'auto',
						// loop: length > 1,
						// effect: 'fade',
						pagination: {
							clickable: true,
							el: $(el).find('.js-swiper-pagination')
						},
						fadeEffect: {
							crossFade: true
						},
						on: {
							slideChange: function () {
								let position = 0;
								setTimeout(() => {
									$('.slider-fs .swiper-wrapper .swiper-slide').each(function (index) {
										if ($(this).hasClass('swiper-slide-active')) {
											position = index;
											return;
										}
									})
									nav.slideTo(position);
								}, 0)


							}
						},
						...thumbs
					}
				})
					.on('init', () => {
						// swiper.autoplay.delay = 5000;
						// setTimeout(function(){
						// 	swiper.autoplay.start()
						// }, 3000);
					})
			});
			productPageSlider.addClass('inited')
		}
	};

	window.reinit.slider.productPageSlider();


	$('[data-tab-index]').click(function () {
		const index = $(this).attr('data-tab-index');
		$('[data-tab-content]').removeClass('active');
		$('[data-tab-index]').removeClass('active');
		$(this).addClass('active');
		$(`[data-tab-content=${index}]`).addClass('active');
		if ($(this).attr('data-scroll')) {
			const index = $(this).attr('data-tab-index');
			$('[data-tab-index]').removeClass('active');
			$(`[data-tab-index=${index}]`).addClass('active');
			$('html,body').stop().animate({ scrollTop: $(`[data-tab-content=${index}]`).offset().top }, 1000);
			$(`[data-tab-content=${index}]`).find('.js-toggler').addClass('active');
			$(`[data-tab-content=${index}]`).find('.product-page__media-content').slideDown();
			$(`[data-tab-content=${index}]`).find('.product-page__media-content').addClass('active');
		}
	});

	$('.js-reviews-show-more').click(function () {
		$('.reviews').toggleClass('active');
		$(this).toggleClass('active');
	})

	$('.js-toggler').click(function () {
		$(this).toggleClass('active');
		const content = $(this).closest('.product-page__tab-content').find('.product-page__media-content');
		if (!content.hasClass('active')) {
			content.slideDown();
			content.addClass('active');
		} else {
			content.slideUp();
			content.removeClass('active');
		}

	})

	$(window).scroll(function () {

		if ($('.product-control')[0].getBoundingClientRect().y + $('.product-control').height() < 0) {
			$('.product-control-sticky').addClass('active');
		} else {
			$('.product-control-sticky').removeClass('active');
		}
	})


	$('.checkbox-rate-label').hover(function(){
		$('.checkbox-rate-label').removeClass('hover');
		if(!$(this).closest('.rate-group').hasClass('touched')){
			$(`.rate-group input`).removeAttr('checked');
		}
		const _this = this;
		let isReach = false
		$('.checkbox-rate-label').each(function(){
			if(!isReach){
				$(this).addClass('hover');
			}
			if(_this === this) isReach = true;
		})

	})

	$('.rate-group').on('mouseleave',function(){
		$('.checkbox-rate-label').removeClass('hover');
		$(this).removeClass('touched');
	})

	$('.rate-group').click(function(){
		$('.checkbox-rate-label.hover').each(function(){
			const id = $(this).attr('for');
			$(`#${id}`).attr('checked', 'checked');
		})
		$(this).addClass('touched');
		rateValidation();
	})

	function rateValidation(ev){
		let isRate = false;

		$('.rate-group input').each(function(){
			if($(this).attr('checked')){
				isRate = true;
			};
		})

		if(!isRate){
			$('.rate-group').closest('.form-group').addClass('has-error');
			$('.rate-group+.help-block').removeClass('hidden');
			if(ev){
				ev.preventDefault();
			}

		}else{
			$('.rate-group').closest('.form-group').removeClass('has-error')
			$('.rate-group+.help-block').addClass('hidden');
			$('button').removeAttr('disabled')
		}
	}

	$('.modal-review form').submit(function(ev){
		rateValidation(ev)
	})

})