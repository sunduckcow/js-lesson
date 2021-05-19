'use strict'

//console.log(this)

function hello() {
	console.log('Hello', this)
}

//hello()

const person = {
	name: 'Nikita',
	age: 20,
	sayHello: hello,
	sayHelloDocument: hello.bind(document),
	logInfo: function (job, phone) {
		console.group(`${this.name} Info:`)
		console.log(`Name is ${this.name}`)
		console.log(`Age is ${this.age}`)
		console.log(`Job is ${job}`)
		console.log(`Phone is ${phone}`)
		console.groupEnd()
	},
}

//person.sayHello()
//person.sayHelloDocument()
//person.logInfo()

const lena = {
	name: 'Elena',
	age: 23,
}

//! .bind() makes function
//person.logInfo.bind(lena)('Frontend', '8(999)123-45-67')
//! .bind() makes function + binds arguments
//person.logInfo.bind(lena, 'Frontend', '8(999)123-45-67')()
//! .call() calls function with binded arguments immediately
//person.logInfo.call(lena, 'Frontend', '8(999)123-45-67')
//! .apply() calls function with binded arguments immediately but args in array
//person.logInfo.apply(lena, [Frontend', '8(999)123-45-67])

const array = [1, 2, 3, 4, 5]

//! shitcode
// function multBy(arr, n) {
// 	return arr.map(function (i) {
// 		return i * n
// 	})
// }

// console.log(multBy(array, 5))
//!

//! nice code
Array.prototype.multBy = function (n) {
	return this.map(i => i * n)
}

//! wtf idk it doesnt work
//Array.prototype.multBy = n => this.map(i => i * n)

console.log(array.multBy(5))
