window.addEventListener('load', function () {
	if (!window.reinit) {
		window.reinit = {};
	}
	if (!window.reinit.slider) {
		window.reinit.slider = {};
	}

	const options = {
		rootMargin: '0px',
		threshold: 0.25
	}




	window.reinit.slider.productSlider = function () {
		let productSlider = $('.js-slider-product');
		if (productSlider.length) {

			const initSlider = (el) => {
				window.slam_slider({
					el: el,
					args: {
						autoHeight: false,
						lazy: true,
						spaceBetween: 0,
						watchOverflow: true,
						simulateTouch: true,
						slidesPerView: 'auto',
						// centeredSlides: true,
						// centeredSlidesBounds: true,
						slideClass: 'product-card-wrap',
						pagination: {
									el: $(el).find('.js-swiper-pagination'),
									clickable: true,
									// dynamicBullets: true,
								},						
						// breakpoints:{
						// 	575:{
						// 		slidesPerView: 'auto',
						// 		centeredSlides: false,
						// 		spaceBetween: 0,
						// 		pagination: {
						// 			el: $(el).find('.js-swiper-pagination'),
						// 			clickable: true,
						// 			// dynamicBullets: true,
						// 		},
						// 	}
						// }

					}
				})
				$(el).addClass('inited');
			}

			productSlider.each(function (i, el) {
				const observer = new IntersectionObserver((entries, observer) => {
					if (entries[0].isIntersecting && entries[0].target.classList.contains('inited') == false) {
						initSlider(el);
					}
				}, options);
				observer.observe(el);
			});

		}
	};

	window.reinit.slider.productSlider();
})