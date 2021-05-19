const person = Object.create(
	{
		calculateAge() {
			console.log('Age:', new Date().getFullYear() - this.birthYear)
		},
	},
	{
		name: {
			value: 'Nikita',
			enumerable: true,
			writable: true,
			configurable: true,
		},
		birthYear: {
			value: 2000,
			enumerable: false, //by default
			writable: false, //by default
			configurable: false, //by default
		},
		age: {
			get() {
				return new Date().getFullYear() - this.birthYear
			},
			set(value) {
				console.log('Set age', value)
			},
		},
	}
)

//! writable:
//person.name = 'Maxim'

//! configurable:
//delete person.name

//! enumerable:
for (let key in person) {
	if (person.hasOwnProperty(key)) {
		console.log('Key', key, person[key])
	}
}
