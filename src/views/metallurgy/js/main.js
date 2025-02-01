let canvas;
let ctx;
let width;
let height;
let animation;
let particles = [];
let currentTemp;
let colors;

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 2;
    this.vy = (Math.random() - 0.5) * 2;
    this.radius = 4;
    this.baseRadius = 4;
  }

  update(temp) {
    const energy = temp / 1000;
    
    // Particles grow slightly with temperature
    this.radius = this.baseRadius * (1 + energy * 0.5);
    
    // More energetic movement at higher temperatures
    this.vx += (Math.random() - 0.5) * energy * 0.5;
    this.vy += (Math.random() - 0.5) * energy * 0.5;
    
    // Damping based on temperature
    this.vx *= 0.95 + (energy * 0.04);
    this.vy *= 0.95 + (energy * 0.04);
    
    this.x += this.vx * energy;
    this.y += this.vy * energy;

    // Bounce off walls with energy loss
    if (this.x < this.radius || this.x > width - this.radius) {
      this.vx *= -0.8;
      this.x = Math.max(this.radius, Math.min(width - this.radius, this.x));
    }
    if (this.y < this.radius || this.y > height - this.radius) {
      this.vy *= -0.8;
      this.y = Math.max(this.radius, Math.min(height - this.radius, this.y));
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = colors.particleColor;
    ctx.fill();
  }
}

function setCanvasSize(canvasElement) {
  canvas = canvasElement;
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  ctx = canvas.getContext('2d');
}

/* eslint-disable no-unused-vars */
function initialize(canvasElement, colorScheme) {
  setCanvasSize(canvasElement);
  colors = colorScheme;
  particles = [];
  
  // Create particles in a grid
  const particleCount = 100;
  const gridSize = Math.ceil(Math.sqrt(particleCount));
  const spacing = Math.min(width, height) / (gridSize + 2);
  
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      particles.push(new Particle(
        (i + 1) * spacing,
        (j + 1) * spacing
      ));
    }
  }
  
  render(canvasElement, colorScheme);
}
/* eslint-enable no-unused-vars */

function render(canvasElement, colorScheme) {
  if (!ctx) {
    setCanvasSize(canvasElement);
    colors = colorScheme;  // Use the colorScheme parameter
  }
  
  // Create gradient background
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, '#1a0f0f');  // Dark top
  gradient.addColorStop(1, '#3d0c0c');  // Slightly lighter bottom
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  // Add furnace-like glow effect
  const centerX = width / 2;
  const centerY = height / 2;
  const glowRadius = Math.min(width, height) * 0.4;
  
  const glow = ctx.createRadialGradient(
    centerX, centerY, 0,
    centerX, centerY, glowRadius
  );
  glow.addColorStop(0, 'rgba(255, 100, 0, 0.2)');
  glow.addColorStop(1, 'rgba(255, 50, 0, 0)');
  
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);
  
  // Draw particles with glow effect
  particles.forEach(particle => {
    // Particle glow
    const particleGlow = ctx.createRadialGradient(
      particle.x, particle.y, 0,
      particle.x, particle.y, particle.radius * 3
    );
    particleGlow.addColorStop(0, 'rgba(255, 200, 0, 0.3)');
    particleGlow.addColorStop(1, 'rgba(255, 100, 0, 0)');
    
    ctx.fillStyle = particleGlow;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius * 3, 0, Math.PI * 2);
    ctx.fill();
    
    // Actual particle
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fillStyle = colors.particleColor;
    ctx.fill();
  });

  // Add explanatory text
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.font = '20px Arial';
  ctx.fillText(`Temperature: ${Math.round(currentTemp)}°C`, 20, height - 60);
  
  // Add explanation based on temperature
  let explanation = '';
  if (currentTemp > 1000) {
    explanation = 'High temperature: Atoms have high energy and move freely';
  } else if (currentTemp > 500) {
    explanation = 'Medium temperature: Atoms begin to settle into more stable positions';
  } else if (currentTemp > 200) {
    explanation = 'Low temperature: Atoms move slower, crystal structure forming';
  } else {
    explanation = 'Cool temperature: Atoms settled into crystal structure';
  }
  ctx.fillText(explanation, 20, height - 30);
}

function run(params) {
  currentTemp = params.initialTemp;
  
  function update() {
    // Update temperature
    currentTemp *= params.coolingRate;
    
    // Update and draw particles
    ctx.fillStyle = colors.backgroundColor;
    ctx.fillRect(0, 0, width, height);
    
    particles.forEach(particle => {
      particle.update(currentTemp);
      particle.draw();
    });
    
    // Show temperature
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText(`Temperature: ${Math.round(currentTemp)}°C`, 20, height - 20);
    
    if (currentTemp > 100) {
      animation = requestAnimationFrame(() => {
        setTimeout(update, params.keyframe);
      });
    }
  }
  
  if (animation) {
    cancelAnimationFrame(animation);
  }
  update();
}

function terminate() {
  if (animation) {
    cancelAnimationFrame(animation);
  }
}

export default {
  setCanvasSize,
  initialize,
  render,
  run,
  terminate
}; 