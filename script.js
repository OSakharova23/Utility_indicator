window.onload = function(){ 
    // Переменные для хранения чисел и операций
    let a = ''           // Первое число
    let b = ''           // Второе число
    let expressionResult = ''  // Результат вычисления
    let selectedOperation = null  // Выбранная операция
        // Получаем доступ к экрану калькулятора в поле вывода
    const outputElement = document.getElementById("result")

    // Получаем все кнопки с цифрами (их id начинаются с "btn_digit_")
    const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')

    function onDigitButtonClicked(digit) {
        // Если операция не выбрана, работаем с первым числом (a) - после выбора операции начинается ввод второго числа
        if (!selectedOperation) {
            // Проверяем, не пытаемся ли мы добавить вторую точку
            if ((digit != '.') || (digit == '.' && !a.includes(digit))) { 
                // здесь у нас происходит складывание сохраненного уже числа и нажатой цифры. Оба поля string, поэтому
                // каждый раз цифра записывается в конец строки. Например: a = '14', digit = '5', 
                // a += digit - это короткая запись a = a + digit - поэтомоу после этой операции a = '145'
                a += digit;
            }
            outputElement.innerHTML = a;
        } 
        // Если операция выбрана, работаем со вторым числом (b)
        else {
            if ((digit != '.') || (digit == '.' && !b.includes(digit))) { 
                b += digit;
                outputElement.innerHTML = b;        
            }
        }
    }

     // Настраиваем обработчики для цифровых кнопок - для каждой кнопки с цифрой и точкой вызываем выше написанную функцию по формированию числа
    digitButtons.forEach(button => {
        button.onclick = function() {
            // берем текст, написанный на кнопке - он и является цифрой
            const digitValue = button.innerHTML;
            onDigitButtonClicked(digitValue);
        }
    });

    // Настраиваем обработчики для кнопок операций - сохраняем выбранную операцию в ранее созданную переменную selectedOperation
    document.getElementById("btn_op_mult").onclick = function() { 
        if (a === '') return;
        selectedOperation = 'x';
    }
    let megaPlus = 0;
    document.getElementById("btn_op_plus").onclick = function() { 
        if (a === '') return;
        if (selectedOperation !== null){
            megaPlus += (+b)
            b = ''
        }
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

        // Очищаем все значения при нажатии на кнопку C (вешаем обработчик события click на кнопку С)
    document.getElementById("btn_op_clear").onclick = function() { 
        a = '';
        b = '';
        selectedOperation = null;
        expressionResult = '';
        outputElement.innerHTML = 0;
    }

        // Вычисляем результат при нажатии на = (вешаем обработчик события click на кнопку =)
    document.getElementById("btn_op_equal").onclick = function() { 
        if (a === '' || (b === '' && megaPlus === 0) || !selectedOperation)
            return
        if (megaPlus !== 0){
            expressionResult = (+a) + (+megaPlus);
            if (b !== ''){
                expressionResult += (+outputElement.innerHTML);
            }
        }
        else{
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
                default:
                    break;
            }
        }
        a = expressionResult.toString()
        b = ''
        selectedOperation = null
        outputElement.innerHTML = a
        expressionResult = 0
        megaPlus = 0
    }

    document.getElementById("btn_op_sign").onclick = function() { 
        if (a === '') return;
        else if (b === '') {
            a *= -1;
            outputElement.innerHTML = a;
        }
        else {
            b *= -1;
            outputElement.innerHTML = b;
        }
    }

    document.getElementById("btn_op_percent").onclick = function() {
        if (selectedOperation) {
            b = b / 100;
            outputElement.innerHTML = b;
        }
        else {
            a = a / 100;
            outputElement.innerHTML = a;
        }
    }

    document.getElementById("btn_op_back").onclick = function() {
        if (selectedOperation) {
            if (b.length > 1) {
                b = b.slice(0, b.length - 1);
                outputElement.innerHTML = b;
            }
            else {
                b = "";
                outputElement.innerHTML = 0;
            }
        }
        else {
            if (a.length > 1) {
                a = a.slice(0, a.length - 1);
                outputElement.innerHTML = a;
            }
            else {
                a = "";
                outputElement.innerHTML = 0;
            }
        }
    }
    document.getElementById("btn_op_sqrt").onclick = function() {
        if (selectedOperation) {
            b = Math.sqrt(b);
            outputElement.innerHTML = b;
        }
        else {
            a = Math.sqrt(a);
            outputElement.innerHTML = a;
        }
    }

    document.getElementById("btn_op_x**2").onclick = function() {
        if (selectedOperation) {
            b = b ** 2;
            outputElement.innerHTML = b;
        }
        else {
            a = a ** 2;
            outputElement.innerHTML = a;
        }
    }
    document.getElementById("btn_op_factorial").onclick = function() {
        function factorial(n) {
            n = parseInt(n);
            if (n < 0) return NaN;
            if (n === 0) return 1;
            let result = 1;
            for (let i = 2; i <= n; i++) {
                result *= i;
            }
            return result;
        }
        if (selectedOperation) {
            b = factorial(b);
            outputElement.innerHTML = b;
        }
        else {
            a = factorial(a);
            outputElement.innerHTML = a;
        }
    }

    document.getElementById("btn_op_000").onclick = function() {
        if (selectedOperation === null){
            a = a+='000';
            outputElement.innerHTML = a;
        }
        else{
            b = b+='000';
            outputElement.innerHTML = b;
        }
    }

    document.getElementById("btn_op_res_color").onclick = function() {
        if (document.getElementById("result").style.backgroundColor === 'white' || document.getElementById("result").style.backgroundColor === '') {
            document.getElementById("result").style.backgroundColor = "rgb(253, 210, 210)";
        } 
        else {
            document.getElementById("result").style.backgroundColor = 'white';
        }
    }
    document.getElementById("btn_op_calc_color").onclick = function() {
        let calculatorElement = document.getElementsByClassName("calculator")[0];
        let currentColor = calculatorElement.style.backgroundColor;
        if (currentColor === 'rgb(237, 244, 252)' || currentColor === '#edf4fc' || currentColor === '' || currentColor === 'transparent') {
            calculatorElement.style.backgroundColor = '#23364c';
        } 
        else {
            calculatorElement.style.backgroundColor = '#edf4fc';
        }
    }

    document.getElementById("btn_op_reverse").onclick = function() {
        if (selectedOperation) {
            if (b === '') return;
            
            let isNegative = b < 0;
            b = (isNegative ? '-' : '') + 
                Math.abs(b).toString().split('').reverse().join('').replace(/^0+/, '') || '0';
            
            outputElement.innerHTML = b;
        } else {
            if (a === '') return;
            
            let isNegative = a < 0;
            a = (isNegative ? '-' : '') + 
                Math.abs(a).toString().split('').reverse().join('').replace(/^0+/, '') || '0';
            
            outputElement.innerHTML = a;
        }
    }
};