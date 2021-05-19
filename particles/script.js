const canvas = document.getElementById('canvas1')
const c = canvas.getContext('2d')

let hsl = 0

const mouse = {
	moved: false,
	x: undefined,
	y: undefined,
	t: 0,
	move() {
		this.t += 0.05
		this.t %= Math.PI * 2 * 2
		this.x = 300 + Math.cos(this.t) * 200 + 10 * this.t * Math.sin(this.t)
		this.y = 300 + Math.sin(this.t) * 100 + 10 * this.t * Math.cos(this.t)
	},
	pop(n = 1) {
		for (let i = 0; i < n; i++)
			particles.push(new Particle(`hsl(${hsl}, 100%, 60%)`))
	}
}

function drawCircle(x, y, r, color) {
	c.fillStyle = color// == 'hsl' ? `hsl(${hsl}, 20%, 60%)` : color
	//c.strokeStyle = 'white'
	//c.lineWidth = 1
	c.beginPath()
	c.arc(x, y, r, 0, Math.PI * 2)
	c.fill()
	//c.stroke()
}

class Particle {
	constructor(color) {
		this.alive = true
		this.x = mouse.x
		this.y = mouse.y
		this.r = Math.random() * 10 + 5
		this.color = color
		this.vel = this.getRandomVel(2)
	}
	outOfBorder() {
		if (this.x + this.r < 0 ||
			this.y + this.r < 0 ||
			this.x - this.r > canvas.width ||
			this.y - this.r > canvas.height)
			return true
		return false
	}
	getRandomVel(speed) {
		const angle = Math.random() * Math.PI * 2
		return {
			x: speed * Math.cos(angle),
			y: speed * Math.sin(angle),
		}
	}
	bounce() {
		if (this.x - this.r < 0 || this.x + this.r > canvas.width)
			this.vel.x *= -1
		if (this.y - this.r < 0 || this.y + this.r > canvas.height)
			this.vel.y *= -1
	}
	update() {
		this.x += this.vel.x
		this.y += this.vel.y
		if (this.r > 0.1)
			this.r -= 0.1
	}
	draw() {
		if (this.alive)
			drawCircle(this.x, this.y, this.r, this.color)
	}
}

let particles = []

function canvasSetup() {
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight
	if (!mouse.moved) {
		mouse.x = canvas.width / 2
		mouse.y = canvas.height / 2
	}
}

canvasSetup()

window.addEventListener('resize', canvasSetup)

// canvas.addEventListener('mousemove', (event) => {
// 	mouse.moved = true
// 	mouse.x = event.x
// 	mouse.y = event.y
// 	//for (let i = 0; i < 3; i++)
// 	particles.push(new Particle(`hsl(${hsl}, 100%, 60%)`))
// })

// canvas.addEventListener('click', () => {
// 	for (let i = 0; i < 30; i++)
// 		particles.push(new Particle('red'))
// })

function animate() {
	//c.fillStyle = 'rgba(0, 0, 0, 0.1)';
	c.fillStyle = 'black';
	c.fillRect(0, 0, canvas.width, canvas.height)
	mouse.move()
	mouse.pop()
	hsl++
	for (let i = 0; i < particles.length; i++) {
		const part1 = particles[i]
		part1.update()
		if (part1.r <= 0.1) {
			particles.splice(i--, 1)
			continue
		}
		part1.bounce()
		for (let j = i; j < particles.length; j++) {
			const part2 = particles[j]
			if (Math.hypot(part1.x - part2.x, part1.y - part2.y) < 100) {
				c.strokeStyle = 'white'
				c.beginPath()
				c.moveTo(part1.x, part1.y)
				c.lineTo(part2.x, part2.y)
				c.stroke()
			}
		}
		part1.draw()

	}

	//console.log(particles.length)
	requestAnimationFrame(animate)
}

animate()