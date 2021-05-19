function createIncrementor(n) {
	return function (num) {
		return n + num
	}
}

const addOne = createIncrementor(1)
const addTen = createIncrementor(10)

console.log(addOne(10))
console.log(addOne(41))

console.log(addTen(10))
console.log(addTen(41))

function urlGenerator(domain) {
	return function (url) {
		return `https://${url}.${domain}`
	}
}

const comUrl = urlGenerator('com')
const ruUrl = urlGenerator('ru')

console.log(comUrl('google'))
console.log(comUrl('netflix'))
console.log(ruUrl('ya'))
console.log(ruUrl('anekdot'))

/*
? Написать функцию bind
*/

function bind(context, fn) {
	return function (...args) {
		fn.apply(context, args)
	}
}

function logPerson() {
	console.log(`Person: ${this.name}, ${this.age}, ${this.job}`)
}

const person1 = { name: 'Миша', age: 18, job: 'Student' }
const person2 = { name: 'Алексей', age: 25, job: 'Frontend' }

bind(person1, logPerson)()
bind(person2, logPerson)()
