// const animal = {
// 	name: 'bobik',
// 	age: 5,
// 	hasTail: true,
// }

// class Animal {
// 	static type = 'ANIMAL'
// 	constructor(options) {
// 		this.name = options.name
// 		this.age = options.age
// 		this.hasTail = options.hasTail
// 	}

// 	voice() {
// 		console.log('I am animal')
// 	}
// }

// const animal = new Animal({
// 	name: 'bobik',
// 	age: 5,
// 	hasTail: true,
// })

// class Cat extends Animal {
// 	static type = 'CAT'
// 	constructor(options) {
// 		super(options)
// 		this.color = options.color
// 	}

// 	voise() {
// 		super.voice()
// 		console.log('I am cat')
// 	}

// 	get ageInfo() {
// 		return this.age * 7
// 	}
// }

// const cat = new Cat({
// 	name: 'cat',
// 	age: 3,
// 	hasTail: true,
// 	color: 'black',
// })

class Component {
	constructor(selector) {
		this.$el = document.querySelector(selector)
	}

	hide() {
		this.$el.style.display = 'none'
	}

	show() {
		this.$el.style.display = 'block'
	}
}

class Box extends Component {}
