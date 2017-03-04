var Calculator = {
		operators : {
			"+" : "",
			"-" : "",
			"/" : "",
			"*" : "",
			"%" : ""
		},
		// Get the text input element from the DOM 
		inputElem : function() {
			return document.getElementById("textResult");
		},
		// Get the last character of the text input element value
		getLastChar : function() {
			return this.inputElem().value[this.inputElem().value.length -1];
		},
		// Check if the last character of text input element value is an math operator
		lastCharIsOperator : function(char){
			return (this.getLastChar() in this.operators && char in this.operators);
		},
		// Push the button value(as single char) to the text input element value.
		// If the last pushed char is an operator, do not allow math operators to be pushed sequentially 
		pushCharToInput : function(char) {
			if(char === "+-" || char === ".") {
				this.inputElem().value = "Not yet implemented.";
				return;
			}
			if(this.lastCharIsOperator(char)) return;
			//
			var inputValue = this.inputElem().value;
			inputValue += String(char);
			this.inputElem().value = inputValue;
		},
		// Self calculate expression, does not need the equals button to be clicked to get an answer
		// Calculate the power of 2 of the current number in the text input element
		calcPowerOfTwo : function(num) {
			return Number(num *  num);
		},
		// Self calculate expression, does not need the equals button to be clicked to get an answer
		// Calculate the factorial of the current number in the text input element
		factorial: function(num) {
			if(isNaN(num)) return "isNaN error";
			if(num>14) return "Too large. Can't handle."; 
			var result = 1;
			for(var i = num;i>0;i--){
				result *= i;			
			}
			return result;
		},
		// Self calculate expression, does not need the equals button to be clicked to get an answer
		// Calculate the square root of the current number in the text input element
		squareRoot : function(num) {
			return Math.sqrt(eval(num));
		},
		// Self calculate expression, does not need the equals button to be clicked to get an answer
		selfCalculate: function(char) {
			if("!" === char) this.inputElem().value = this.factorial(this.inputElem().value);
			if("pow2" === char) this.inputElem().value = this.calcPowerOfTwo(this.inputElem().value);
			if("sqrt" === char) this.inputElem().value = this.squareRoot(this.inputElem().value);
		},
		clearInputField : function() {
			this.inputElem().value = "";
		},
		// Calculate the total/answer of the current expression in the text input element
		calcTotal : function() {
			var lastChar = this.getLastChar();
			var total = "";

			if(lastChar === "+" || lastChar === "-") {
				total = this.inputElem().value + "0";
			} else if(lastChar === "*" || lastChar === "/" || lastChar === "%") {
				total = this.inputElem().value + "1";
			} else {
				total = this.inputElem().value;
			}
			total = eval(total);
			if(isNaN(total)) return;
			this.inputElem().value = total;
		}

	};

	// Assign Event Listeners
	document.getElementById("clear").addEventListener("click", function() {
		Calculator.clearInputField();
	},false);

	document.getElementById("total").addEventListener("click", function() { 
		Calculator.calcTotal();
	},false);

	// Trying to fix JSHint warning "Don't make functions within a loop"
	var addHandlerTo_numAndbtns = function() {
		Calculator.pushCharToInput(this.value);
	};
	var numAndbtns = document.getElementsByClassName("numOrOperator");
	for (var i = 0; i < numAndbtns.length; i++) {
		numAndbtns[i].addEventListener("click",addHandlerTo_numAndbtns, false);
	}

	// Trying to fix JSHint warning "Don't make functions within a loop"
	var addHandlerTo_selfCalcs = function() {
		Calculator.selfCalculate(this.value);
	};
	var selfCalcs = document.getElementsByClassName("selfCalculate");
	for (var i = 0; i < selfCalcs.length; i++) {
		selfCalcs[i].addEventListener("click",addHandlerTo_selfCalcs, false);
	}
