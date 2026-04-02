window.onload = function(){
    let a = ""
    let b = ''
    let expressionResult = ''
    let selectedOperation = null

    const outputElement = document.getElementById("result")

    const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')

    function onDigitButtonClicked(digit) {
        if (a === 'Nan' || a === 'Infinity') {
            return;
        }
        if (!selectedOperation) {
            if ((digit != '.') || (digit == '.' && !a.includes(digit))) {
                if (a === "0" && digit === "0"){
                    return;
                }
                if (a.length == 0 && digit === '.'){
                    a = "0."
                }
                else if (a.length < 9){
                    a += digit;
                }
            }
            outputElement.innerHTML = a;
        }
        else {
            if ((digit != '.') || (digit == '.' && !b.includes(digit))) {
                if (b.length < 9){
                    b += digit;
                }
                outputElement.innerHTML = b;
            }
        }
    }

    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML;
            onDigitButtonClicked(digitValue);
        }
    });

    document.getElementById("btn_op_mult").onclick = function() {
        if (a === '') return;
        selectedOperation = 'x';
    }
    document.getElementById("btn_op_plus").onclick = function() {
        if (a === '') return;
        selectedOperation = '+';
    }
    document.getElementById("btn_op_minus").onclick = function() {
        if (a === '') return;
        selectedOperation = '-';
    }
    document.getElementById("btn_op_div").onclick = function() {
        if (a === '') return;
        selectedOperation = '/';
    }

    document.getElementById("btn_op_square").onclick = function() {
        if (a === '') return;
        selectedOperation = '^';
    }

    document.getElementById("btn_op_sign").onclick = function() {
        if (a === '' || isNaN(parseFloat(a))) return;

        a = String(-parseFloat(a));
        outputElement.innerHTML = a;
    }

    document.getElementById("btn_op_percent").onclick = function() {
        if (a === '' || isNaN(parseFloat(a))) return;

        a /= 100;
        outputElement.innerHTML = a;
    }

    document.getElementById("btn_op_clear").onclick = function() {
        a = ''
        b = ''
        selectedOperation = ''
        expressionResult = ''
        outputElement.innerHTML = 0
        outputElement.style.color = 'white';
    }

    document.getElementById("btn_op_equal").onclick = function() {
        if (a === '' || (b === '' && selectedOperation !== '^') || !selectedOperation)
            return

        switch(selectedOperation) {
            case 'x':
                expressionResult = (+a) * (+b)
                break;
            case '+':
                expressionResult = (+a) + (+b)
                break;
            case '-':
                expressionResult = (+a) - (+b)
                break;
            case '/':
                expressionResult = (+a) / (+b)
                break;
            case '^':
                expressionResult = (+a) * (+a)
                break;
            default:
                break;
        }


        a = expressionResult.toString()
        hexa = (expressionResult % 16777215).toString(16);
        console.log(hexa);

        outputElement.style.color = '#' + hexa;
        console.log(outputElement.style.color);

        if (a.length > 10){
            a = expressionResult.toExponential(3);
        }

        b = ''
        selectedOperation = null

        outputElement.innerHTML = a
    }
};
