const uiInits = {

	init: function () {
		!window.reinit && (window.reinit = {});
		!window.reinit.slider && (window.reinit.slider = {});
		// this.svgPolifill();
		this.browserCheck();
		this.vendorLoader();
		this.slider();
		this.oneevent();
		this.removeNoTransition();
		this.frontCoockies();
	},


	frontCoockies: function () {
		window.setCoockie = function (coockieName, value, expires = 86400) {
			function setCookie(name, value, days, seconds) {
				var expires;
				var maxAage;
				if (days) {
					var date = new Date();
					date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
					expires = "; expires=" + date.toGMTString();
				} else if (seconds) {
					expires = "";
					maxAage = "; max-age=" + seconds;
				} else {
					expires = "";
					maxAage = "";
				}
				document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + maxAage + "; path=/";
			}
			setCookie(coockieName, value, false, expires);
		}
	},

	removeNoTransition: function () {
		window.addEventListener('load', () => {
			// console.log($('body'))
			// console.log(_$('body'))
			$('body').removeClass('no-transition');
		})
	},

	oneevent: function () {

		/*
			window.oneevent({
				name: '__NAME__',
				event: {
					scroll: true,
					click: true,
					timeout: {
						delay: 1
					},
					mouseover: {
						trigger: '__SELECTOR__'
					}
				},
				callback: __CALLBACK__
			});
		*/

		window.oneevent = function (args = {}) {
			if (!args.name) {
				console.warn('vendorLoader: You must pass the name!');
				return;
			}
			!window.vendor && (window.vendor = {});

			//console.log(args.name)
			window.vendor[args.name] = {};
			window.vendor[args.name].enter = {};
			window.vendor[args.name].enter.timeout;
			window.vendor[args.name].enter.status = false;
			window.vendor[args.name].enter.operator = function () {

				if (!window.vendor[args.name].enter.status) {
					window.vendor[args.name].enter.status = true;
					clearTimeout(window.vendor[args.name].enter.timeout);
					$(document).off('scroll.vendor-' + args.name);
					$(document).off('click.vendor-' + args.name);
					$(document).off('mouseover.vendor-' + args.name);
					args.callback && args.callback()
				}
			};
			if (args.event.scroll) {
				$(document).on('scroll.vendor-' + args.name, function () {
					window.vendor[args.name].enter.operator();
				});
				var doc = document.documentElement;
				var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
				top > 100 && window.vendor[args.name].enter.operator();
			}

			if (args.event.click) {
				$(document).on('click.vendor-' + args.name, function () {
					window.vendor[args.name].enter.operator();
				});
			}

			if (args.event.mouseover) {
				$(document).on('mouseover.vendor-' + args.name, args.event.mouseover.trigger, function () {
					window.vendor[args.name].enter.operator();
				});
			}

			if (args.event.timeout) {
				window.vendor[args.name].enter.timeout = setTimeout(function () {
					window.vendor[args.name].enter.operator();
				}, args.event.timeout.delay || 3000)
			}
		}

	},
	vendorLoader: function () {

		const vendorloadStatus = {};

		window.vendorLoadStatus = vendorloadStatus;

		window.vendorLoader = function (args = {}) {
			if (!args.name) {
				console.warn('vendorLoader: You must pass the name!');
				return;
			}
			if (!args.path) {
				console.warn('vendorLoader: You must pass the path!');
				return;
			}

			!window.vendor && (window.vendor = {});
			!window.SITE_TEMPLATE_PATH && (window.SITE_TEMPLATE_PATH = '/local/templates/html/');

			window.vendor[args.name] = {};
			window.vendor[args.name].load = {};
			window.vendor[args.name].load.timeout;
			if (!vendorloadStatus[args.name]) {
				vendorloadStatus[args.name] = {};
				vendorloadStatus[args.name].load = {};
				vendorloadStatus[args.name].load.timeout = {};
				vendorloadStatus[args.name].load.status = false
			}
			vendorloadStatus[args.name].load.loading = function () {
				if (!vendorloadStatus[args.name].load.status) {
					vendorloadStatus[args.name].load.status = true
					clearTimeout(vendorloadStatus[args.name].load.timeout);
					$(document).off('scroll.vendor-' + args.name);
					$(document).off('click.vendor-' + args.name);
					$(document).off('mouseover.vendor-' + args.name);
					$.getScript((!args.http ? window.SITE_TEMPLATE_PATH : '') + args.path, args.callback || function () { });
				}

			};

			if (args.event.scroll) {
				$(document).on('scroll.vendor-' + args.name, function () {
					vendorloadStatus[args.name].load.loading();
				});
			}

			if (args.event.click) {
				$(document).on('click.vendor-' + args.name, function () {
					vendorloadStatus[args.name].load.loading();
				});
			}

			if (args.event.mouseover) {
				$(document).on('mouseover.vendor-' + args.name, args.event.mouseover.trigger, function () {
					vendorloadStatus[args.name].load.loading();
				});
			}

			if (args.event.timeout) {
				vendorloadStatus[args.name].load.timeout = setTimeout(function () {
					vendorloadStatus[args.name].load.loading();
				}, args.timeout || 3000)
			}
		}
	},

	slider: function () {
		window.slam_slider = function (args) {
			const $slider_wrap = $(args.el);
			const slider = $slider_wrap.find('.js-swiper-slider');
			const data = {
				media: $slider_wrap.attr('data-media'),
			};
			const slider_prev = $slider_wrap.find('.js-swiper-button-prev');
			const slider_next = $slider_wrap.find('.js-swiper-button-next');
			const slider_pagination = $slider_wrap.find('.js-swiper-pagination');

			let swiper = {};
			!args.args.navigation && (args.args.navigation = {});
			args.args.navigation.nextEl = slider_next;
			args.args.navigation.prevEl = slider_prev;
			!args.args.pagination && (args.args.pagination = {});


			const init = function () {
				swiper = new Swiper(slider, args.args, {
					preloadImages: false,
					lazy: {
						loadPrevNext: true,
					},
				})

					.on('imgLazyLoaded', function () {
						setTimeout(function () {
							swiper.update();
						}, 300)
					});

				setTimeout(function () {
					swiper.update();
				}, 1000)
			};

			const destroy = function () {
				swiper.destroy && swiper.destroy();
				new LazyLoad({
					threshold: 0,
				}, $slider_wrap.find('.swiper-lazy'));
			};


			if ($slider_wrap.attr('data-media')) {
				let handler_media = function (state) {
					if (state) {
						init();
					} else {
						destroy();
					}
				};

				window.check_media(data.media, handler_media)

			} else {
				init();
			}

			return swiper;
		}


	},
	media: function () {
		window.check_media = function (media, callback) {
			const breakpoint = window.matchMedia(media);
			const breakpointChecker = function () {
				if (breakpoint.matches === true) {
					callback(true);
				} else if (breakpoint.matches === false) {
					callback(false)
				}
			};
			breakpoint.addListener(breakpointChecker);
			breakpointChecker();
		};
		window.media = function (mediaString) {
			return window.matchMedia(mediaString).matches
		};
	},
	svgPolifill: function () {
		// svg sprites
		svg4everybody && svg4everybody();
	},

	browserCheck: function () {
		// проверка браузера
		const userAgent = navigator.userAgent;
		if (userAgent.indexOf("Firefox") > -1) {
			// "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:61.0) Gecko/20100101 Firefox/61.0"
			document.querySelector('body').classList.add('browser-mozzila');
		} else if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
			//"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 OPR/57.0.3098.106"
			document.querySelector('body').classList.add('browser-opera');
		} else if (userAgent.indexOf("Trident") > -1) {
			// "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; Zoom 3.6.0; wbx 1.0.0; rv:11.0) like Gecko"
			document.querySelector('body').classList.add('browser-ie');
		} else if (userAgent.indexOf("Edge") > -1) {
			// "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299"
			document.querySelector('body').classList.add('browser-edge');
		} else if (userAgent.indexOf("Chrome") > -1) {
			// "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/66.0.3359.181 Chrome/66.0.3359.181 Safari/537.36"
			document.querySelector('body').classList.add('browser-chrome');
		} else if (userAgent.indexOf("Safari") > -1) {
			// "Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.0 Mobile/15E148 Safari/604.1 980x1306"
			document.querySelector('body').classList.add('browser-safari');
		}
		// проверка на МАС платформу
		if (navigator.platform.toUpperCase().indexOf('MAC') >= 0) {
			document.querySelector('body').classList.add('platform-mac');
		}
	},

};

export default uiInits
