$(document).ready(function() { 
	var checked = $("checkbox:checked");
	var all = $("input[name='all'");
	var frameworks = $("input[name='js-frameworks'");
	var libraries = $("input[name='js-libs']");
	var express = $("input[name='express']");
	var node = $("input[name='node']");
	var build = $("input[name='build-tools']");
	var npm = $("input[name='npm']");
	
	$('#name').focus();
	$('#other-title').hide();
	$('#bitcoin').hide();
	$('#paypal').hide();
	$('#card').hide();
	$('#card-number').hide();

	$('#title').change(function() {
			
		if (this.value == "other") {
		   	$('#other-title').slideDown();
		   }
		else {
			$('#other-title').hide();
		}
	});
	
	$('#design').change(function() {
		
		if (this.value == "js puns") {
			// display "Cornflower Blue," "Dark Slate Grey," and "Gold." in color menu
			$(".love").hide();
			$(".puns").show();
		}
		else if (this.value == "heart js") {
			// display "Tomato," "Steel Blue," and "Dim Grey."
			$(".puns").hide();
			$(".love").show();
		}
		else {
			$(".puns").show();
			$(".love").show();
		}
		
	});

	
	// If  If the user selects a workshop, don't allow selection of a workshop at the same date and time -- disable the checkbox and visually indicate that the workshop in the competing time slot isn't available.
	
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
	
	//Must select at least one checkbox under the "Register for Activities" section of the form.
 	$('button').click(function() {
      checked = $("input[type=checkbox]:checked").length;

      if(!checked) {
        alert("You must check at least one checkbox.");
        return false;
      }
	  
	  	if ($('#zip').val().length !== 5){
			alert('Please enter a 5-digit number for the ZIP code');
		}
		
		if ($('#zip').val().length !== 3){
			alert('Please enter a 3-digit number for the CVV value');
		}
	});
	
	$(document).keypress(function(event) {

		 if ($('#cc-num').val().length < 12){
			$('#card-number').show();
			}
			else if ($('#cc-num').val().length > 17){
			$('#card-number').slideDown();
			}
			
			else {
				$('#card').slideUp();
			$('#card-number').slideUp();
			}
			
    });
	
	// As a user selects activities, a running total displays below the list of checkboxes.
	var totalCost = 0;
	$('.activities').append('<label>Total:</label><div id="total"></div>');
	
	var updateCost = function (cost) {
		totalCost += cost;
		document.getElementById("total").innerHTML = "Total Costs: $" + totalCost;
	};  
	
	$('#payment').change(function() {
	  if(this.value === "paypal") {
	   
		$('#paypal').slideDown();
		$('#bitcoin').slideUp();
	   
	} else if(this.value === "bitcoin") {
		
		$('#bitcoin').slideDown();
		$('#paypal').slideUp();
	}
	else {
		$('#bitcoin').hide();
		$('#paypal').hide();
		}
		
	});

	
	
});