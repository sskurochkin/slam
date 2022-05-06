window.addEventListener('load', function (event) {


	const handlerToggleClick = function (e) {
		e.preventDefault();
		e.stopPropagation();
		const $btnToggle = $(this);
		const elDataTarget = $btnToggle.data('target');
		const $btnToggleCloned = $('*[data-target="' + elDataTarget + '"]');
		const $ToggleTarget = $(elDataTarget);
		const $ToggleBodyOverflow = $btnToggle.data('body-overflow');
		let $ToggleBodyOverflowCloned = false;
		$btnToggleCloned.each(function (i, el) {

			let data = $(el).data('body-overflow');
			if (data) {
				$ToggleBodyOverflowCloned = true;
			}
		});


		if ($btnToggle.hasClass('active')) {
			$btnToggle.removeClass('active');
			$btnToggleCloned.removeClass('active');
			if ($ToggleBodyOverflow || $ToggleBodyOverflowCloned) {
				$('body').removeClass('ofh')
			}
		} else {
			$btnToggle.addClass('active');
			$btnToggleCloned.addClass('active');
			if ($ToggleBodyOverflow || $ToggleBodyOverflowCloned) {
				$('body').addClass('ofh');
			}
		}

		const handlerOverflowClick = function (e) {
			const $target = $(e.target);
			const check = !$target.is($ToggleTarget) && !$target.is($btnToggle) && !$target.closest($ToggleTarget).length > 0 && !$target.closest($btnToggle).length > 0;
			if (check) {
				$ToggleTarget.removeClass('active');
				$btnToggle.removeClass('active');
				$btnToggleCloned.removeClass('active');
				if ($ToggleBodyOverflow) {
					$('body').removeClass('ofh')
				}
				$(document).off('mouseup touch', handlerOverflowClick);
			}
		};

		if ($ToggleTarget.length > 0) {

			if ($btnToggle.hasClass('active')) {
				$ToggleTarget.addClass('active');
				const dataOverflowClick = $btnToggle.data('overflow-click');
				const dataOverflowClickMinWidth = parseInt($btnToggle.data('overflow-click-min-width')) || 0;
				const windowsWidth = $(window).width();

				if (dataOverflowClick && windowsWidth > dataOverflowClickMinWidth) {
					$(document).on('mouseup touch', handlerOverflowClick);
				}
			} else {
				$ToggleTarget.removeClass('active');

				if ($btnToggle.data('overflow-click')) {
					$(document).off('mouseup touch', handlerOverflowClick);
				}
			}
		}
	};

	$(document).on('click touch', '.js-btn-toggle', handlerToggleClick)

});
