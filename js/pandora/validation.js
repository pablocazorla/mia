// VALIDATION
;
(function() {

	'use strict';

	var $fieldsets = null,

		validateFieldset = function($fieldset) {

			$fieldset.removeClass('error');

			var isValid = true,
				$input = $fieldset.find('input,textarea'),
				minCharacters = parseInt($fieldset.attr('data-min')),
				val = $input.val(),
				showError = function() {
					$fieldset.addClass('error');
					$input.focus();
				};

			minCharacters = (isNaN(minCharacters)) ? 3 : minCharacters;

			if (val.length < minCharacters) {
				isValid = false;
				showError();
			} else {
				if ($fieldset.hasClass('email')) {
					if (val.search(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i) == -1) {
						isValid = false;
						showError();
					}
				}
			}
			return isValid;
		},
		validate = function() {
			var valid = true;

			$fieldsets.each(function() {
				var v = validateFieldset($(this));
				if (!v) {
					valid = false;
				}
			});

			return valid;
		},
		set = function(context) {
			var ctx = context || '';

			$fieldsets = $(ctx + 'fieldset.validate').removeClass('validate');

			$('#submit').click(function(e) {
				if (!validate()) {
					e.preventDefault();
				}
			});
			$('#clearFields').click(function(e) {
				e.preventDefault();
				$fieldsets.removeClass('error').find('input,textarea').val('').eq(0).focus();
			});
		};

	PANDORA.VALIDATION = {
		set: set
	};
})();