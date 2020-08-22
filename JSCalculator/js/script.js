// Получаю из DOM элементы
let nums = document.querySelectorAll('.nums')
let result = document.querySelector('.result')

let dot = false;
let firstOutput = ''
let sign = ''
let secondOutput = ''
let total = ''


function calculator(va) {
    // Ввод чисел в соответствующие переменные c выводом вторых в окно результатов калькулятора
    if (va === '0' || va === '1' || va === '2' || va === '3' || va === '4' || va === '5' || va === '6' || va === '7' || va === '8' || va === '9') {

        if (secondOutput === '' && sign === '' && firstOutput.length < 11) {
            firstOutput += va
            result.innerHTML = firstOutput
        } else if (sign != '' && secondOutput.length < 11) {
            secondOutput += va
            result.innerHTML = secondOutput
        }


        // Добавляем точку по аналогии с логикой выше, а также меняем dot. И до тех пор пока это верно, повторно точка не добавится
    } else if (va === '.' && dot === false) {

        if (secondOutput === '' && sign === '' && firstOutput.length < 11) {
            dot = true
            firstOutput += va
            result.innerHTML = firstOutput
        } else if (sign != '' && secondOutput.length < 11) {
            dot = true
            secondOutput += va
            result.innerHTML = secondOutput
        }
        
        
        // при нажатии клавиши "C", реализуюем обнуление всех данных в переменных, что отразится соответствующим образом на окне результатов
    } else if (va === 'C') {
        dot = false
        firstOutput = ''
        secondOutput = ''
        sign = ''
        total = ''
        result.innerHTML = 0
        
        // Получим в переменную введенный математический символ, в логике выше, самом первом if это будет значить набор значений в secondOuntup
        // И поэтому уже его вывод в окно результатов
    } else if (va === '+' || va === '-' || va === '*' || va === '/') {
        dot = false
        sign = va;
        
        // Результат выражения, с обнулением всех переменных
    } else if (va === '=') {
        total = String(eval(firstOutput + sign + secondOutput))
        if (total < 99999999999 && total.length < 11) {
            result.innerHTML = total
            
        } else if (total > 99999999999) {
            result.innerHTML = 99999999999
        } else {
            result.innerHTML = total.substr(0, 11)
        }
        
        dot = false
        firstOutput = ''
        sign = ''
        secondOutput = ''
        total = ''
    }
}


// Для ввода символов через интерфейс
// перебираю все кнопки
nums.forEach(btn => {
    // вешая на каждую обработчик события
    btn.addEventListener('click', e => {
        // получаю в переменную текст кнопки из event
        let va = e.path[0].innerHTML

        // кладу её в параметры основной функции
        calculator(va)

    })
})

// Для ввода символов через клавиатуру
document.onkeyup = (e) => {
    // получаю из события клавиатуры нажатую клавишу и отправляю её в параметры функции
    calculator(e.key)
}

