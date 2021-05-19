const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const scoreEl = document.querySelector('#scoreEl')
const start = document.querySelector('.titles-start')
const titlesScore = document.querySelector('.titles-score')
const titles = document.querySelector('.titles')

class Circle {
	constructor(x, y, r, color, vel = {}) {
		this.x = x
		this.y = y
		this.r = r
		this.color = color
		this.vel = vel
	}

	draw() {
		c.beginPath();
		c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false)
		c.fillStyle = this.color
		c.fill()
	}

	update() {
		this.x += this.vel.x
		this.y += this.vel.y
	}
}

class Player extends Circle { }

class Projectile extends Circle { }

class Enemy extends Circle { }

const friction = 0.98
class Particle extends Circle {
	constructor(x, y, r, color, vel) {
		super(x, y, r, color, vel)
		this.alpha = 1
	}

	draw() {
		c.save()
		c.globalAlpha = this.alpha
		super.draw()
		c.restore()
	}

	update() {
		this.vel.x *= friction
		this.vel.y *= friction
		super.update()
		this.alpha -= 0.01
	}
}

const canx = canvas.width / 2;
const cany = canvas.height / 2;

let player = {}
let projectiles = []
let enemies = []
let particles = []

function init() {
	score = 0
	scoreEl.innerHTML = 0
	player = new Player(canx, cany, 10, 'white')
	projectiles = []
	enemies = []
	particles = []
}

function angle(x, y, destx, desty) {
	return Math.atan2(desty - y, destx - x)
}

function calcVel(angle, absvel) {
	return {
		x: Math.cos(angle) * absvel,
		y: Math.sin(angle) * absvel,
	}
}

function spawnEnemies() {
	setInterval(() => {
		let x = 0
		let y = 0
		const r = Math.random() * (30 - 4) + 4
		const color = `hsl(${Math.random() * 360}, 50%, 50%)`

		if (Math.random() < .5) {
			x = Math.random() < .5 ? 0 - r : canvas.width + r
			y = Math.random() * canvas.height
		} else {
			x = Math.random() * canvas.width
			y = Math.random() < .5 ? 0 - r : canvas.height + r
		}

		const vel = calcVel(angle(x, y, canx, cany), Math.random() + 1)
		enemies.push(new Enemy(x, y, r, color, vel))
	}, 1000);
}

let animationID
let score = 0
function animate() {
	animationID = requestAnimationFrame(animate)
	c.fillStyle = 'rgba(0, 0, 0, 0.1)';
	c.fillRect(0, 0, canvas.width, canvas.height)
	player.draw()
	projectiles.forEach((proj, projind) => {
		proj.update()
		proj.draw()

		if (proj.x + proj.r < 0 ||
			proj.x - proj.r > canvas.width ||
			proj.y + proj.r < 0 ||
			proj.y - proj.r > canvas.height
		) {
			setTimeout(() => {
				projectiles.splice(projind, 1)
			}, 0);
		}
	})

	particles.forEach((part, partind) => {
		if (part.alpha <= 0.01) {
			particles.splice(partind, 1)

		} else {
			part.update()
			part.draw()
		}
	})

	enemies.forEach((enem, enemind) => {
		enem.update()
		enem.draw()

		const dist = Math.hypot(player.x - enem.x, player.y - enem.y)

		if (dist < enem.r + player.r) {
			cancelAnimationFrame(animationID)
			titles.style.display = 'flex'
			titlesScore.innerHTML = score
		}

		projectiles.forEach((proj, projind) => {
			const dist = Math.hypot(proj.x - enem.x, proj.y - enem.y)
			if (dist < enem.r + proj.r) {

				for (let i = 0; i < 8; i++) {
					particles.push(new Particle(
						proj.x,
						proj.y,
						Math.random() * 2 + 1,
						enem.color,
						calcVel(Math.random() * Math.PI, Math.random() * 5 + 3)
					))
				}

				if (enem.r - 10 > 10) {
					score += 100
					scoreEl.innerHTML = score
					gsap.to(enem, {
						r: enem.r - 10
					})
					projectiles.splice(projind, 1)
				} else {
					score += 250
					scoreEl.innerHTML = score
					setTimeout(() => {
						enemies.splice(enemind, 1)
						projectiles.splice(projind, 1)
					}, 0)
				}

			}
		})
	})
}

addEventListener('click', (event) => {
	projectiles.push(new Projectile(
		canx,
		cany,
		5,
		'white',
		calcVel(angle(canx, cany, event.clientX, event.clientY), 3),
	))
})

start.addEventListener('click', () => {
	init()
	animate()
	spawnEnemies()
	titles.style.display = 'none'
})

