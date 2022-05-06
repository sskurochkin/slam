(function() {
  $(document).on('click', '.js-trigger-click',function() {
  	let $this = $(this);
  	let $this_target = $($this.attr('data-target'));
	  $this_target.trigger('click');
  })
})();
