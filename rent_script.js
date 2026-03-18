window.onload = function(){ 
    // Переменные для хранения чисел и операций
    let rent_a = ''           // Первое число
    let rent_b = ''           // Второе число
    let rent_expressionResult = ''  // Результат вычисления
    let rent_selectedOperation = null  // Выбранная операция
    
    let rent_currentValue = null
    let rent_flag_water = false 
    const rent_outputElement = document.getElementById("rent_result")

    // Получаем все кнопки с цифрами (их id начинаются с "rent_btn_digit_")
    const rent_digitButtons = document.querySelectorAll('[id ^= "rent_btn_digit_"]')

    function onDigitButtonClicked(digit) {
        // Если операция не выбрана, работаем с первым числом (a) - после выбора операции начинается ввод второго числа
        if (!rent_selectedOperation) {
            // Проверяем, не пытаемся ли мы добавить вторую точку
            if ((digit != '.') || (digit == '.' && !rent_a.includes(digit))) { 
                // здесь у нас происходит складывание сохраненного уже числа и нажатой цифры. Оба поля string, поэтому
                // каждый раз цифра записывается в конец строки. Например: a = '14', digit = '5', 
                // a += digit - это короткая запись a = a + digit - поэтомоу после этой операции a = '145'
                rent_a += digit;
            }
            rent_outputElement.innerHTML = rent_a;
        } 
        // Если операция выбрана, работаем со вторым числом (b)
        else {
            if ((digit != '.') || (digit == '.' && !rent_b.includes(digit))) { 
                rent_b += digit;
                rent_outputElement.innerHTML = rent_b;        
            }
        }
    }

     // Настраиваем обработчики для цифровых кнопок - для каждой кнопки с цифрой и точкой вызываем выше написанную функцию по формированию числа
    rent_digitButtons.forEach(button => {
        button.onclick = function() {
            // берем текст, написанный на кнопке - он и является цифрой
            const digitValue = button.innerHTML;
            onDigitButtonClicked(digitValue);
        }
    });

    // Настраиваем обработчики для кнопок операций - сохраняем выбранную операцию в ранее созданную переменную selectedOperation
    document.getElementById("rent_btn_op_mult").onclick = function() { 
        if (rent_a === '') return;
        rent_selectedOperation = 'x';
    }
    let rent_megaPlus = 0;
    document.getElementById("rent_btn_op_plus").onclick = function() { 
        if (rent_a === '') return;
        if (rent_selectedOperation !== null){
            rent_megaPlus += (+rent_b)
            rent_b = ''
        }
        rent_selectedOperation = '+';
    }
    document.getElementById("rent_btn_op_minus").onclick = function() { 
        if (rent_a === '') return;
        rent_selectedOperation = '-';
    }
    document.getElementById("rent_btn_op_div").onclick = function() { 
        if (rent_a === '') return;
        rent_selectedOperation = '/';
    }

        // Очищаем все значения при нажатии на кнопку C (вешаем обработчик события click на кнопку С)
    document.getElementById("rent_btn_op_clear").onclick = function() { 
        rent_a = '';
        rent_b = '';
        rent_selectedOperation = null;
        rent_expressionResult = '';
        rent_outputElement.innerHTML = 0;
        // Сбрасываем переменные rent_btn_rent при очистке
        rent_currentValue = null;
        rent_flag_water = false;
    }

        // Вычисляем результат при нажатии на = (вешаем обработчик события click на кнопку =)
    document.getElementById("rent_btn_op_equal").onclick = function() { 
        if (rent_a === '' || (rent_b === '' && rent_megaPlus === 0) || !rent_selectedOperation)
            return
        if (rent_megaPlus !== 0){
            rent_expressionResult = (+rent_a) + (+rent_megaPlus);
            if (rent_b !== ''){
                rent_expressionResult += (+rent_outputElement.innerHTML);
            }
        }
        else{
            switch(rent_selectedOperation) { 
                case 'x':
                    rent_expressionResult = (+rent_a) * (+rent_b)
                    break;
                case '+':
                    rent_expressionResult = (+rent_a) + (+rent_b)
                    break;
                case '-':
                    rent_expressionResult = (+rent_a) - (+rent_b)
                    break;
                case '/':
                    rent_expressionResult = (+rent_a) / (+rent_b)
                    break;
                default:
                    break;
            }
        }
        rent_a = rent_expressionResult.toString()
        rent_b = ''
        rent_selectedOperation = null
        rent_outputElement.innerHTML = rent_a
        rent_expressionResult = 0
        rent_megaPlus = 0
    }

    document.getElementById("rent_btn_op_sign").onclick = function() { 
        if (rent_a === '') return;
        else if (rent_b === '') {
            rent_a *= -1;
            rent_outputElement.innerHTML = rent_a;
        }
        else {
            rent_b *= -1;
            rent_outputElement.innerHTML = rent_b;
        }
    }

    document.getElementById("rent_btn_op_percent").onclick = function() {
        if (rent_selectedOperation) {
            rent_b = rent_b / 100;
            rent_outputElement.innerHTML = rent_b;
        }
        else {
            rent_a = rent_a / 100;
            rent_outputElement.innerHTML = rent_a;
        }
    }

    document.getElementById("rent_btn_op_back").onclick = function() {
        if (rent_selectedOperation) {
            if (rent_b.length > 1) {
                rent_b = rent_b.slice(0, rent_b.length - 1);
                rent_outputElement.innerHTML = rent_b;
            }
            else {
                rent_b = "";
                rent_outputElement.innerHTML = 0;
            }
        }
        else {
            if (rent_a.length > 1) {
                rent_a = rent_a.slice(0, rent_a.length - 1);
                rent_outputElement.innerHTML = rent_a;
            }
            else {
                rent_a = "";
                rent_outputElement.innerHTML = 0;
            }
        }
    }
    document.getElementById("rent_btn_op_sqrt").onclick = function() {
        if (rent_selectedOperation) {
            rent_b = Math.sqrt(rent_b);
            rent_outputElement.innerHTML = rent_b;
        }
        else {
            rent_a = Math.sqrt(rent_a);
            rent_outputElement.innerHTML = rent_a;
        }
    }

    document.getElementById("rent_btn_op_x**2").onclick = function() {
        if (rent_selectedOperation) {
            rent_b = rent_b ** 2;
            rent_outputElement.innerHTML = rent_b;
        }
        else {
            rent_a = rent_a ** 2;
            rent_outputElement.innerHTML = rent_a;
        }
    }
    document.getElementById("rent_btn_op_factorial").onclick = function() {
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
        if (rent_selectedOperation) {
            rent_b = factorial(rent_b);
            rent_outputElement.innerHTML = rent_b;
        }
        else {
            rent_a = factorial(rent_a);
            rent_outputElement.innerHTML = rent_a;
        }
    }

    document.getElementById("rent_btn_op_000").onclick = function() {
        if (rent_selectedOperation === null){
            rent_a = rent_a+='000';
            rent_outputElement.innerHTML = rent_a;
        }
        else{
            rent_b = rent_b+='000';
            rent_outputElement.innerHTML = rent_b;
        }
    }

    document.getElementById("rent_btn_op_res_color").onclick = function() {
        if (document.getElementById("rent_result").style.backgroundColor === 'white' || document.getElementById("rent_result").style.backgroundColor === '') {
            document.getElementById("rent_result").style.backgroundColor = "rgb(253, 210, 210)";
        } 
        else {
            document.getElementById("rent_result").style.backgroundColor = 'white';
        }
    }
    document.getElementById("rent_btn_op_calc_color").onclick = function() {
        let calculatorElement = document.getElementsByClassName("rent_calculator")[0];
        let currentColor = calculatorElement.style.backgroundColor;
        if (currentColor === 'rgb(237, 244, 252)' || currentColor === '#edf4fc' || currentColor === '' || currentColor === 'transparent') {
            calculatorElement.style.backgroundColor = '#23364c';
        } 
        else {
            calculatorElement.style.backgroundColor = '#edf4fc';
        }
    }

    // Функция для проверки формата числа
    function formatValue(value) {
        let parts = value.split('.');
        let f_part = parts[0];
        let s_part = parts[1] || '';
        let f_value = f_part === '' ? 0 : parseInt(f_part, 10);
        if (f_value < 0 || f_value > 99999) {
            return false;
        }
        if (s_part !== '') {
            let s_value = parseInt(s_part, 10);
            if (s_value < 0 || s_value > 999) {
                return false;
            }
        }
        return true;
    }
    // Функция для расчета стоимости воды
    function cost_water(current, previous) {
        const TARIFF = 65.77; // тариф за м^3
        if (current >= previous) {
            return (current - previous) * TARIFF;
        } else {
            return (99999.999 + current - previous) * TARIFF;
        }
    }

    document.getElementById("rent_btn_rent").onclick = function() {
        // Получаем текущее значение с экрана
        let currentDisplayValue = rent_outputElement.innerHTML;
        if (currentDisplayValue === '0' && rent_a === '' && rent_b === '') {
            alert('Сначала введите показание счётчика');
            return;
        }
        if (!rent_flag_water) {
            if (!formatValue(currentDisplayValue)) {
                alert('Некорректный формат введите показание счётчика формата ххххх.ххх');
                return;
            }
            rent_currentValue = parseFloat(currentDisplayValue);
            rent_flag_water = true;
            rent_a = '';
            rent_b = '';
            rent_selectedOperation = null;
            rent_outputElement.innerHTML = '0';
            alert('Введите показание счётчика за предыдущий месяц');
        } 
        // Второе нажатие (вводим предыдущее показание)
        else {
            if (!formatValue(currentDisplayValue)) {
                alert('Некорректный формат введите показание счётчика формата ххххх.ххх');
                return;
            }
            let previousValue = parseFloat(currentDisplayValue);
            let currentValue = rent_currentValue;
            let cost = cost_water(currentValue, previousValue);
            rent_outputElement.innerHTML = cost.toFixed(2);
            rent_a = cost.toString();
            rent_currentValue = null;
            rent_flag_water = false;
        }
    }
};