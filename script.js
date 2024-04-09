document.addEventListener('DOMContentLoaded', function(){

		// selecting the DOM element
	const bill_amount = document.getElementById("billTotal");
	console.log(bill_amount)
	const tipButtons = Array.from(document.getElementsByClassName('btn-tips')); 
	const customTip = document.getElementById('customAmount');
	const numOfPpl = document.getElementById('numOfPpl');
	const totalTipAmountPerPerson = document.getElementById('totalTipAmount');
	const totalAmount = document.getElementById('totalAmount');
	const reset = document.getElementById('reset');
	const alertMessage = document.getElementById('alert');
	
	// event lister for tips buttons
	tipButtons.forEach(button => {
		button.addEventListener('click', function(e) {
			clearButtonSelection();
			button.classList.add('btn-selected');
			calculateTip(button.value);
			// console.log(button.value);
		})
	});

	// event lister for custom tips input
	customTip.addEventListener('input', function(e) {
		clearButtonSelection();
		calculateTip(customTip.value);
		// console.log(customTip.value);
	});

	// event lister for bill amount and number of people input
	numOfPpl.addEventListener('keyup', function(e){
		clearButtonSelection();
		calculateTip(0);
		// console.log(e)

		if (e.key === '.'){
			numOfPpl.value = numOfPpl.value.slice(0,numOfPpl.value.length);
		}
		// alert for if number of people are not inputed 
		if (numOfPpl.value == 0) {
			alertMessage.style.display = 'block';
			alertMessage.innerHTML = 'Please enter a number of people';
			} else {
				alertMessage.style.display = 'block';
				alertMessage.innerHTML = 'You have entered ' + parseInt(numOfPpl.value) + ' people';
			}
	})

	// function to clear button selection
	function clearButtonSelection() {
		tipButtons.forEach(button => {
			button.classList.remove('btn-selected');
		})
	}

	// function to calculate tip and total per person
	function calculateTip(tipPercent) {
		const billAmount = parseFloat(bill_amount.value ?? 0);
		console.log(bill_amount.value)
		console.log(billAmount)
		const numOfPeople = parseInt(numOfPpl.value);

		const tipAmount = (billAmount * (tipPercent / 100));
		const totalPerPerson = (billAmount + tipAmount) / numOfPeople;
		
		// Update totalTipAmountPerPerson with the tip amount per person
		totalTipAmountPerPerson.value = tipAmount.toFixed(2);

    // Update totalAmount with the total per person
    totalAmount.value = totalPerPerson.toFixed(2);

	}

	// event lister for reset button
	reset.addEventListener('click', function(e) {
    clearButtonSelection();
    bill_amount.value = '';
    customTip.value = '';
    numOfPpl.value = '';
    totalTipAmountPerPerson.value = '';
    totalAmount.value = '';
    alertMessage.style.display = 'none';
  })

});
