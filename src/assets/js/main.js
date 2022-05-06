import uiInits from './init';
import lazy_img from '../../mixins/lazy-img/script';
import lazy_video from '../../mixins/lazy-video/script';
import slamJquey from './slamJquey';
const ready = (callback) => {
	document.readyState != "loading"
		? callback()
		: document.addEventListener("DOMContentLoaded", callback);
};

ready(() => {
	uiInits.init();
	lazy_img();
	lazy_video();
	slamJquey();
	// const btn_toggle = require('../../mixins/btn-toggle/script');
	// const lazy_img = require('../../mixins/lazy-img/script');
	// const lazy_video = require('../../mixins/lazy-video/script');
	// const scroll_to = require('../../mixins/scroll-to/script');
	// const trigger_click = require('../../mixins/trigger-click/script');

});
