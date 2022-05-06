// import LazyLoad  from '../../assets/js/vendor/lazyload.min.js'

export default () => {
	(function () {
		var callback_loaded = function (el) {
			const $img = $(el)
			const $img_wrap = $img.closest('.lazy-img-wrap');

			$img_wrap.addClass('loaded')
		};

		new LazyLoad({
			elements_selector: ".lazy-img",
			threshold: 0,
			callback_loaded: callback_loaded,
		});
	})();
}
