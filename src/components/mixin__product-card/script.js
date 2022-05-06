window.addEventListener('load', function (event) {


	(!window.reinit && (window.reinit = {}));


	window.reinit.animateAddToCart = (elem) => {
		if (elem.classList.contains('animate')) return;
		elem.classList.add('animate');
		setTimeout(() => {
			elem.classList.add('btn--green');
			elem.classList.remove('animate');
		}, 400)
		elem.innerHTML = 'Оформить';
	};


	$('.product-card__add-to-cart .btn.btn--primary').click(function () {
		window.reinit.animateAddToCart(this);
	})

});

