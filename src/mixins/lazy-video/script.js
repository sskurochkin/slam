export default () => {
	new LazyLoad({
		elements_selector: ".lazy-video:not(.lazy-video-scroll)",
		threshold: 0,
		callback_loaded: function (el) {
			// el.play()
		}
	});

	$('.lazy-video-scroll').each(function () {
		const $this = $(this);
		window.oneevent({
			name: 'lazy-video-scroll',
			event: {
				click: true,
				timeout: {
					delay: 6000
				},
			},
			callback: () => {
				const src = $this.attr('data-src');
				$this.attr('src', src);
			}
		})
	})
};
