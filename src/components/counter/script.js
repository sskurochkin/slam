(function () {
	var offCounterMinus = function($input) {
		var $counterMinus = $input.siblings('.js-counter-minus');
		$counterMinus.prop('disabled', true)
	};

	var onCounterMinus = function($input) {
		var $counterMinus = $input.siblings('.js-counter-minus');
		$counterMinus.prop('disabled', false)
	};
	var offCounterPlus = function($input) {
		var $counterPlus = $input.siblings('.js-counter-plus');
		$counterPlus.prop('disabled', true)
	};

	var onCounterPlus = function($input) {
		var $counterPlus = $input.siblings('.js-counter-plus');
		$counterPlus.prop('disabled', false)
	};

	var uploadCounterBtnState = function($input) {
		var $counterInput = $input;
		var counterValueMax = parseFloat($counterInput.attr('data-max-value'));
		var counterValueMin = parseFloat($counterInput.attr('data-min-value'));

		var value = parseFloat($counterInput.val().replace(',', '.'))

		if (value === counterValueMin) {
			offCounterMinus($counterInput);
		} else {
			onCounterMinus($counterInput);
		}
		if (value === counterValueMax) {
			offCounterPlus($counterInput)
		} else {
			onCounterPlus($counterInput)
		}
	};



	var handlerCounterFocus = function () {
		var $counterInput = $(this);
		var counterValue = $counterInput.val();
		$counterInput.val(counterValue)
	};

	var handlerCounterBlur = function () {
		var $this = $(this);
		var counterValue = parseFloat($this.val().replace(',', '.'));
		setCounterValue($this, counterValue);
	};

	var handlerCounterChange = function () {
		var $counterInput = $(this);
		var counterValueNext = parseFloat($counterInput.val().replace(',', '.'));
		setCounterValue($counterInput, counterValueNext);
	};

	var handlerCounterMinus = function () {
		var $this = $(this);
		var $counterInput = $this.siblings('.js-counter-input');
		var $counterInput_step = parseFloat($counterInput.attr('data-step')) || 1;
		var counterValue = parseFloat($counterInput.val().replace(',', '.'));
		setCounterValue($counterInput, counterValue - $counterInput_step);
		$counterInput.trigger('change');
	};

	var handlerCounterPlus = function () {
		var $this = $(this);
		var $counterInput = $this.siblings('.js-counter-input');
		var $counterInput_step = parseFloat($counterInput.attr('data-step')) || 1;
		var counterValue = parseFloat($counterInput.val().replace(',', '.'));
		setCounterValue($counterInput, counterValue + $counterInput_step);
		$counterInput.trigger('change');
	};

	var setCounterValue = function ($input, value) {
		var $counterInput = $input;
		var counterValueNext = value;
		var baseStep = $counterInput.attr('data-base-step') && parseFloat($counterInput.attr('data-base-step'));
		var step = parseFloat($counterInput.attr('data-step'));
		var counterValueMax = parseFloat($counterInput.attr('data-max-value'));
		var counterValueMin = parseFloat($counterInput.attr('data-min-value'));
		var counterValueSuffix = $counterInput.attr('data-suffix');

		if (!isNaN(counterValueMax) && counterValueNext > counterValueMax) {
			$counterInput.val(counterValueMax);
			$counterInput.trigger('counter-value-max', [$counterInput, $counterInput.val()]);
			// console.log('max', $counterInput.val())
		} else if (!isNaN(counterValueMin) && counterValueNext < counterValueMin) {
			$counterInput.val(counterValueMin);
			$counterInput.trigger('counter-value-min', [$counterInput, $counterInput.val()]);
			// console.log('min', $counterInput.val())
		} else if (isNaN(counterValueNext)) {
			$counterInput.val(0);
		} else {
			if (baseStep) {
				if (step) {
					if (counterValueNext%baseStep !== 0 && counterValueNext%baseStep > (step / 2)) {
						$counterInput.val(counterValueNext - (counterValueNext%baseStep) + step);
						// console.log(1)
					} else {
						$counterInput.val(counterValueNext - (counterValueNext%baseStep));
						// console.log(2)
					}
				} else {
					$counterInput.val(counterValueNext - (counterValueNext%baseStep));
					// console.log(3)
				}
			} else {
				$counterInput.val(counterValueNext);
			}

		}
		var value_split = $counterInput.val().split('.');

		if (value_split.length > 1) {
			if (value_split[1].length > 1) {
				$counterInput.val(parseFloat($counterInput.val()).toFixed(3).replace(/0*$/,"").replace(/\.*$/,""));
			}
		}
		$counterInput.val($counterInput.val().replace('.', ','));

		uploadCounterBtnState($counterInput);

		$counterInput.trigger('counter-change', [$counterInput, $counterInput.val()]);
		counterValueSuffix && $counterInput.val($counterInput.val() + counterValueSuffix);
	};

	$(document).on('click', '.js-counter-minus', handlerCounterMinus);
	$(document).on('click', '.js-counter-plus', handlerCounterPlus);
	$(document).on('focus', '.js-counter-input', handlerCounterFocus);
	$(document).on('blur', '.js-counter-input', handlerCounterBlur);
	$(document).on('change', '.js-counter-input', handlerCounterChange);
	function format(card){
		let digits = card.replace(/[^0-9\,\.]/gi, ''),
			result = '',
			_result = '',
			flag = false;
		for (let i = 1; i <= digits.length; i++){
			result += digits[i-1];
		}
		result = result.replace('.', ',');
		for (let i = 1; i <= result.length; i++){
			if (result[i-1] === ',') {
				!flag && (_result += ',');
				flag = true;
				
			} else {
				_result += result[i-1];
			}
		}
		result = _result;
		return result;
	}

	$(document).on('change input', '.js-counter-input',function() {
		this.value = format(this.value);
	});
	window.reinit.counter = function() {
		$('.js-counter-input').each(function(i,el) {
			uploadCounterBtnState($(el));
		})
	};

	window.reinit.counter()
})();
