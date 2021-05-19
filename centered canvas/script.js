const canvas = document.getElementById('canvas1')
const c = canvas.getContext('2d')

canvas.width = 30
canvas.height = 30

c.fillRect(10, 10, 10, 10)
c.strokeRect(0, 0, canvas.width, canvas.height)
