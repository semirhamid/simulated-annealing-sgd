let canvas
let ctx
let width
let height
let animation
let currentX
let velocity
let colors

function setCanvasSize (canvasElement) {
  canvas = canvasElement
  width = canvas.width = window.innerWidth
  height = canvas.height = window.innerHeight
  ctx = canvas.getContext('2d')
}

function initialize (canvasElement, colorScheme) {
  setCanvasSize(canvasElement)
  colors = colorScheme
  currentX = width / 2
  velocity = 0
  render(canvasElement, colorScheme)
}

function render (canvasElement, colorScheme) {
  if (!ctx) return
  
  ctx.fillStyle = colorScheme.backgroundColor
  ctx.fillRect(0, 0, width, height)
  drawLandscape()
  drawBall(currentX)
}

function drawLandscape () {
  ctx.beginPath()
  ctx.moveTo(0, height)
  
  for (let x = 0; x < width; x++) {
    const y = getLandscapeY(x)
    ctx.lineTo(x, y)
  }
  
  ctx.lineTo(width, height)
  ctx.fillStyle = colors.hillColor
  ctx.fill()
}

function getLandscapeY(x) {
  return height - (
    200 * Math.sin(x / 100) +
    100 * Math.sin(x / 50) +
    150 * Math.sin(x / 200)
  )
}

function calculateGradient(x) {
  const dx = 0.1
  const f1 = objectiveFunction(x + dx)
  const f2 = objectiveFunction(x)
  return (f1 - f2) / dx
}

function objectiveFunction(x) {
  return -(
    2 * Math.sin(x / 100) +
    Math.sin(x / 50) +
    1.5 * Math.sin(x / 200)
  )
}

function drawBall (x) {
  const y = getLandscapeY(x)
  
  ctx.beginPath()
  ctx.arc(x, y, 10, 0, Math.PI * 2)
  ctx.fillStyle = colors.ballColor
  ctx.fill()
}

function run (params) {
  let prevVelocity = 0
  
  function update () {
    const gradient = calculateGradient(currentX)
    
    // Update velocity using momentum
    velocity = params.momentum * prevVelocity - params.learningRate * gradient
    prevVelocity = velocity
    
    // Update position
    currentX += velocity
    
    // Keep ball within canvas bounds
    currentX = Math.max(50, Math.min(width - 50, currentX))
    
    render(canvas, colors)
    animation = requestAnimationFrame(() => {
      setTimeout(update, params.keyframe)
    })
  }
  
  if (animation) {
    cancelAnimationFrame(animation)
  }
  update()
}

function terminate () {
  if (animation) {
    cancelAnimationFrame(animation)
  }
}

export default {
  setCanvasSize,
  initialize,
  render,
  run,
  terminate
} 