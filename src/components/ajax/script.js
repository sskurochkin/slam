
!window.reinit && (window.reinit = {});
window.reinit.ajax = function() {
	$('[data-slam-ajax]:not(.loaded)').each(function(i,el) {
		new Ajax(el);
	})
};

class Ajax {
	constructor(el) {
		this.$el = $(el);
		this.id = Math.floor(Math.random() * Math.floor(999999999999));
		this.src = this.$el.attr('data-ajax-src');
		this.event = this.$el.attr('data-ajax-event').split(' ');
		this.target = this.$el.attr('data-ajax-target');
		this.$target = $(this.target);
		this.reinit = this.$el.attr('data-ajax-reinit').split(',');

		this.event_add();
	}
	loading() {
		this.preloader_add();
		this.$target.load( this.src, () => {
			this.reinit_plugin();
			this.preloader_remove();
		});
		this.event_remove();
	}
	event_add() {
		$.each(this.event, (i,el) => {
			$(document).on(el + '.' + this.id, '[data-ajax-target="' + this.target + '"]', this.loading.bind(this))
		})
	}
	event_remove() {
		$.each(this.event, (i,el) => {
			$(document).off(el + '.' + this.id, '[data-ajax-target="' + this.target + '"]')
		})
	}

	reinit_plugin() {
		$.each(this.reinit, (i,el) => {
			let multilevel = el.split('.');

			if (multilevel.length > 1) {

				let multilevel_init = window.reinit;
				$.each(multilevel, function(i,el) {
					multilevel_init = multilevel_init[el.trim()];
				});

				multilevel_init()

			} else {
				window.reinit[el] && window.reinit[el]();
			}
		})
	}

	preloader_add() {
		this.$target.addClass('preloader-block');
		this.$target.addClass('preloader-block--ajax');
	}
	preloader_remove() {
		this.$target.removeClass('preloader-block');
		this.$target.removeClass('preloader-block--ajax');
	}

}

if (document.readyState != "loading") {
	window.reinit.ajax()
} else {
	window.addEventListener( 'load', function( event ) {
		window.reinit.ajax()
	});
}
