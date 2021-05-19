'use strict';


const output = document.querySelector('output');

const div = document.createElement('div');
div.classList.add('keyboard');
document.querySelector('.calculator').appendChild(div);

'C CE % / 7 8 9 * 4 5 6 - 1 2 3 + 0 ( ) ='
	.split(' ')
	.map(symbol => {
		div.insertAdjacentHTML('beforeend', `<button value="${symbol}">${symbol}</button>`)
	})

document.querySelectorAll('button').forEach(button => {
	button.addEventListener('click', function () {
		calc(this.value)
	})
})

document.addEventListener('keydown', event => {
	if ((event.key).match(/[0-9%\/*\-+\(\)=]|Backspace|Enter/)) calc(event.key)
})

function calc(value) {
	switch (value) {
		case '=':
		case 'Enter':
			try {
				output.textContent = Math.trunc(math.evaluate(output.textContent))
			} catch {
				let oldValue = output.textContent
				let newValue = 'недопустимое выражение'
				output.textContent = newValue
				setTimeout(() => {
					output.textContent = oldValue
				}, 1500)
			}
			break;

		case 'C':
			output.textContent = '';
			break;

		case 'CE':
		case 'Backspace':
			output.textContent = output.textContent.substring(0, output.textContent.length - 1);
			break;

		default:
			output.textContent += value;
	}
}