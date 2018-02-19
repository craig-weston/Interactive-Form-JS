$(document).ready(function() { 
	
	var checked = $("checkbox:checked");
	var all = $("input[name='all'");
	var frameworks = $("input[name='js-frameworks']");
	var libraries = $("input[name='js-libs']");
	var express = $("input[name='express']");
	var node = $("input[name='node']");
	var build = $("input[name='build-tools']");
	var npm = $("input[name='npm']");
	var error =  $('.error-message');
	
	$('#name').focus();
	$('#other-title').hide();
	$('#bitcoin').hide();
	$('#paypal').hide();
	$('#card').hide();
	$('#card-number').hide();
	
	//////////////////////////////////////////////////////////////////////
	// Form Validation Variables
	//////////////////////////////////////////////////////////////////////
	  // Name Validation
	  var nameValid = false;
	  //Email Validation
	  var emailValid = false;
	  // Role/Job title initial state validation variable
	  var tShirtSelected = false;
	  // Payment initial state of form validation variable
	  var ccNumValid = false;
	  var zipValid = false;
	  var cValidate = false;
	  var paymentValid = false;
	
	///////////////////////////////////////////////////////////////////////////
	// Payment Fieldset Validator
	//////////////////////////////////////////////////////////////////////////
	
	// Set CVV max length
	$('#cvv').attr('maxlength', 3);

	$('#title').change(function() {
			
		if (this.value == "other") {
		   	$('#other-title').slideDown();
		   }
		else {
			$('#other-title').hide();
		}
	});
	
	//////////////////////////////////////////////////////////////////////////
	// Form Validation
	//////////////////////////////////////////////////////////////////////////
	
	
	
	$("#name").keyup(function() {
	  if ($('#name').val() != '') {
		nameValid = true;
		return nameValid;
	  }
	});
	

	var validateEmail = function(email) {
		var RegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return RegEx.test(email);
	};
	
	// On KeyUp, check if email is valid
	$("#mail").keyup(function() {
	  emailValid = validateEmail($(this).val());
	  return emailValid;
	});
	
	
	$("#zip").keyup(function() {
	  if ($('#zip').val().length === 5) {
		zipValid = true;
		return zipValid;
	  }
	});
	
	
	$("#cvv").keyup(function() {
	  if ($('#cvv').val().length === 3) {
		cValidate = true;
		return cValidate;
	  }
	});
	
	
	$("#cc-num").keyup(function() {
	  if ($('#cc-num').val().length > 12 && $('#cc-num').val().length < 17) {
		ccNumValid = true;
		return ccNumValid;
	  }
	});

	$('form').submit(function(e){
		
		if (nameValid != true) {
			$('#name').attr("placeholder", "Please enter your name");
			e.preventDefault();
		}
		

		if (cValidate != true) {
			$('#cvv').attr("placeholder", "Please enter your 3 digit CVV");
			e.preventDefault();
		}

		if (ccNumValid != true) {
			$('#cc-num').attr("placeholder", "Please enter a number that is between 13 and 16 digits long");
			e.preventDefault();
		}
		
		if (zipValid != true) {
			$('#zip').attr("placeholder", "Please enter your 5 digit ZIP");
			e.preventDefault();
		}
		

		if ($('.activities :checkbox:checked').length == 0){
			$('#activity-error').html('<h3 style="color:red">Please select your activity below:</h3>');
			e.preventDefault();
			$('#activity-error').slideDown();
		}
		
			if (emailValid != true) {
			$('#mail').attr("placeholder", "Please enter your email");
			e.preventDefault();
		}
		
		

		
		else {
			$('label').css("color", "green!important");
			$('#activity-error').slideUp();
		}
		
	});
	
	
  // Hide Color select until a design is selected
  $('#colors-js-puns').hide();
	
// Show design colours on change
  var shirtSelected = false;
  $('#design').change(function(){
  	if ($('#design option:selected').val() === "js puns") {
  		$('#colors-js-puns').show();
  		$('#color').html('<option value="cornflowerblue">Cornflower Blue (JS Puns shirt only)</option><option value="darkslategrey">Dark Slate Grey (JS Puns shirt only)</option><option value="gold">Gold (JS Puns shirt only)</option>');
  		shirtSelected = true;
  		return shirtSelected;
  	} else if ($('#design option:selected').val() === "heart js") {
  		$('#colors-js-puns').show();
  		$('#color').html('<option value="tomato">Tomato (I &#9829; JS shirt only)</option><option value="steelblue">Steel Blue (I &#9829; JS shirt only)</option><option value="dimgrey">Dim Grey (I &#9829; JS shirt only)</option>');
  		shirtSelected = true;
  		return shirtSelected;
  	} else {
  		$('#colors-js-puns').hide();
  		shirtSelected = false;
  		return shirtSelected;
  	}
  });
	

	//If the user selects a workshop, don't allow selection of a workshop at the same date and time -- disable the checkbox and visually indicate that the workshop in the competing time slot isn't available.
	
	$(frameworks).change(function(){
		$(express).attr('disabled', this.checked);
		if (frameworks.is(':checked')) {
		updateCost(100);
		} else{
		updateCost(-100);
		}
	});
	
	$(express).change(function(){
		
		$(frameworks).attr('disabled', this.checked);
		if (express.is(':checked')) {
		updateCost(100);
		} else{
		updateCost(-100);
		}
		
	});
	
	$(libraries).change(function(){
		$(node).attr('disabled', this.checked);

		if (libraries.is(':checked')) {
		updateCost(100);
		} else{
		updateCost(-100);
		}
		
	});
	
	$(node).change(function(){
		$(libraries).attr('disabled', this.checked);
		
		if (node.is(':checked')) {
		updateCost(100);
		} else{
		updateCost(-100);
		}
		
	});
	
	$(all).change(function(){
		if (all.is(':checked')) {
		updateCost(200);
		} else{
		updateCost(-200);
		}
		
	});
	
	$(build).change(function(){
		if (build.is(':checked')) {
		updateCost(100);
		} else{
		updateCost(-100);
		}
	});
	
	
	$(npm).change(function(){
		if (npm.is(':checked')) {
		updateCost(100);
		} else{
		updateCost(-100);
		}
	});
	
	// As a user selects activities, a running total displays below the list of checkboxes.
	
	var totalCost = 0;
	$('.activities').append('<label>Total:</label><div id="total"></div>');
	
	var updateCost = function (cost) {
		totalCost += cost;
		document.getElementById("total").innerHTML = "Total Costs: $" + totalCost;
	}; 
	

	
	// Display relevant message depending on payment type
	
	$('#payment').change(function() {
	  if(this.value === "paypal") {
		$('#paypal').slideDown();
		$('#bitcoin').slideUp();
		  $('#credit-card').slideUp();
		  
	} else if(this.value === "bitcoin") {
		$('#bitcoin').slideDown();
		$('#paypal').slideUp();
		$('#credit-card').slideUp();
	}
	else {
		$('#bitcoin').hide();
		$('#paypal').hide();
		$('#credit-card').slideDown();
		}
	});
});