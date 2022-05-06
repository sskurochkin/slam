export default () => {

	function SlamQuery(selector) {
		this.selector = selector || null;
		this.element = null;
		this.prevObject = null;
	}

	SlamQuery.prototype.eventHandler = {
		events: [],

		bindEvent: function (event, callback, targetElement) {
			targetElement.addEventListener(event, callback, false);
			this.events.push({
				type: event,
				event: callback,
				target: targetElement
			})
		},

		findEvent: function (event, targetElement) {
			return this.events.filter(function (evt) {
				return (evt.type === event && evt.target == targetElement); //if event type is a match return
			}, event);
		},

		unbindEvent: function (event, targetElement) {
			//search events
			var foundEvent = this.findEvent(event, targetElement);

			//remove event listener if found
			if (foundEvent !== undefined) {
				foundEvent.forEach(function (item) {
					targetElement.removeEventListener(event, item.event, false);
				})

			}

			//update the events array
			this.events = this.events.filter(function (evt) {
				return (evt.type !== event && evt.target !== targetElement);
			}, event);
		}
	};

	SlamQuery.prototype.init = function () {
		if((this.selector.constructor && this.selector.constructor.name === 'HTMLDocument') || (this.selector.constructor && this.selector.constructor.name === 'Window')){
			this.element = this.selector;
		}else{
			this.element = Array.prototype.slice.call(document.querySelectorAll(this.selector));
		}

	};

	SlamQuery.prototype.click = function (callback){
		this.nodeIteration((node) => {
			this.eventHandler.bindEvent('click', callback, node)
		})
	}

	SlamQuery.prototype.on = function (event, callback) {
		this.nodeIteration((node) => {
			this.eventHandler.bindEvent(event, callback, node)
		})
	}

	SlamQuery.prototype.scrollTop = function(){
		console.log(this.get().getBoundingClientRect().y);
		// return y;
	}
	
	SlamQuery.prototype.get = function () {
		if(Array.isArray(this.element)){
			return this.element[0];
		}else{
			return this.element;
		}
	}
	
	// SlamQuery.prototype.off = function (event) {
	// 	this.eventHandler.unbindEvent(event, this.element);
	// }

	// SlamQuery.prototype.val = function (newVal) {
	// 	return (newVal !== undefined ? this.element.value = newVal : this.element.value);
	// };

	// SlamQuery.prototype.append = function (html) {
	// 	this.element.innerHTML = this.element.innerHTML + html;
	// };

	// SlamQuery.prototype.prepend = function (html) {
	// 	this.element.innerHTML = html + this.element.innerHTML;
	// };


	SlamQuery.prototype.html = function (html) {
		const chunk = [];
		if (html === undefined) {
			this.nodeIteration((node) => {
				chunk.push(node.innerHTML);
			})
			return chunk.join('');
		} else {
			this.nodeIteration((node) => {
				node.innerHTML = html;
			})
		}
	};

	SlamQuery.prototype.addClass = function (className) {
		this.nodeIteration((node) => {
			node.classList.add(className)
		})
	};
	SlamQuery.prototype.removeClass = function (className) {
		this.nodeIteration((node) => {
			node.classList.remove(className)
		})
	};

	SlamQuery.prototype.toggleClass = function (className) {
		this.nodeIteration((node) => {
			node.classList.contains(className) ? node.classList.remove(className) : node.classList.add(className)
		})
	};

	SlamQuery.prototype.each = function (callback) {
		this.element.forEach(function (item, index) {
			callback.apply(item, [index]);
		})
	}

	SlamQuery.prototype.closest = function (selector) {
		let closest = [];
		this.nodeIteration((node) => {
			if (node.closest(selector)) {
				closest = [...closest, node.closest(selector)]
			}
		})
		this.element = closest;
		return this;
	}

	SlamQuery.prototype.find = function (selector) {
		let finded = [];
		this.nodeIteration((node) => {
			finded = [...finded, ...node.querySelectorAll(selector)];
		})
		this.element = finded;
		return this;
	}

	SlamQuery.prototype.nodeIteration = function (clb) {
		if (this.element.length) {
			this.element.forEach((item) => clb(item))
		}
	}

	const $ = function (selector) {
		var el = new SlamQuery(selector); // new SlamQuery
		el.init(); // initialize the SlamQuery
		return el; //return the SlamQuery
	}

	$('div').scrollTop(function() {
		// console.log(this);
	})


}