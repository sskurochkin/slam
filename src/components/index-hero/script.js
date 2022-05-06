window.addEventListener('load', function () {
	if (!window.reinit) {
		window.reinit = {};
	}
	if (!window.reinit.slider) {
		window.reinit.slider = {};
	}

	window.reinit.slider.fsslider = function () {
		let fsSlider = $('.js-slider-fs')
		if (fsSlider.length && !fsSlider.hasClass('inited')) {
			fsSlider.each(function (i, el) {
				let slider = el;
				let length = slider.querySelectorAll('.swiper-slide').length;
				let swiper = window.slam_slider({
					el: el,
					args: {
						autoHeight: false,
						lazy: true,
						autoplay: 
							{
								delay: 3000,
								// pauseOnMouseEnter: true
							},
						spaceBetween: 0,
						watchOverflow: true,
						simulateTouch: true,
						slidesPerView: 'auto',
						loop: length > 1,
						// effect: 'fade',
						pagination: {
							el: $(el).find('.js-swiper-pagination'),
							clickable: true
						},
						fadeEffect: {
							crossFade: true
						},
						on: {
							init() {
								this.el.addEventListener('mouseenter', () => {
									this.autoplay.stop();
								});
								this.el.addEventListener('mouseleave', () => {
									this.autoplay.start();
								});
							}
						},
					}
				})
					.on('init', () => {
						// swiper.autoplay.delay = 5000;
						// setTimeout(function(){
						// 	swiper.autoplay.start()
						// }, 3000);
					})
			});
			fsSlider.addClass('inited')
		}
	};

	window.reinit.slider.fsslider();
})