setTimeout(() => {
	console.log('t1')
}, 0)
setTimeout(() => {
	console.log('t2')
}, 0)
setTimeout(() => {
	console.log('t3')
}, 0)

console.log('1')
console.log('2')
console.log('3')

for (let i = 0; i < 3; i++) {
	console.log(`f${i}`)
	setTimeout(() => {
		console.log(`tf${i}`)
	}, 0)
}

//!Anyways timouted logs go after linear

/*
while (true) {
	console.log('w1')
	setTimeout(() => {
		console.log('tw1')
	}, 0)
}
*/

//!Even with infinite cycle (don`t do this anyore!)
