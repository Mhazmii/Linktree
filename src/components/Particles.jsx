import React, { useRef, useEffect } from 'react';

export default function Particles({
  particleCount = 100,
  particleColor = '#22c55e', // HazzFarm Green
  lineColor = '#22c55e',
  backgroundColor = '#09090b', // Zinc-950 (Black/Dark Gray)
  particleSize = 1.5,
  particleSpeed = 0.5,
  connectionDistance = 120,
  hoverDistance = 150,
  className = '',
}) {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const mouse = useRef({ x: null, y: null, radius: hoverDistance });
  const requestRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles();
    };

    class Particle {
      constructor(x, y, dx, dy, size, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.size = size;
        this.color = color;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update() {
        // Bounce off edges
        if (this.x > canvas.width || this.x < 0) this.dx = -this.dx;
        if (this.y > canvas.height || this.y < 0) this.dy = -this.dy;

        // Mouse collision detection / repel effect
        if (mouse.current.x != null && mouse.current.y != null) {
          let dx = mouse.current.x - this.x;
          let dy = mouse.current.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          let forceDirectionX = dx / distance;
          let forceDirectionY = dy / distance;
          let maxDistance = mouse.current.radius;
          let force = (maxDistance - distance) / maxDistance;
          let directionX = forceDirectionX * force * this.density;
          let directionY = forceDirectionY * force * this.density;

          if (distance < mouse.current.radius) {
            this.x -= directionX;
            this.y -= directionY;
          } else {
            if (this.x !== this.baseX) {
              let dxBase = this.x - this.baseX;
              this.x -= dxBase / 10;
            }
            if (this.y !== this.baseY) {
              let dyBase = this.y - this.baseY;
              this.y -= dyBase / 10;
            }
          }
        }

        // Standard movement
        this.x += this.dx;
        this.y += this.dy;

        this.draw();
      }
    }

    const initParticles = () => {
      particles.current = [];
      for (let i = 0; i < particleCount; i++) {
        const size = (Math.random() * particleSize) + 0.5;
        const x = Math.random() * (canvas.width - size * 2) + size;
        const y = Math.random() * (canvas.height - size * 2) + size;
        const dx = (Math.random() - 0.5) * particleSpeed;
        const dy = (Math.random() - 0.5) * particleSpeed;
        particles.current.push(new Particle(x, y, dx, dy, size, particleColor));
      }
    };

    const animate = () => {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.current.length; i++) {
        particles.current[i].update();
        
        // Connect particles
        for (let j = i; j < particles.current.length; j++) {
          const dx = particles.current[i].x - particles.current[j].x;
          const dy = particles.current[i].y - particles.current[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            // Check if near mouse to make lines brighter
            let distToMouse = 9999;
            if (mouse.current.x != null && mouse.current.y != null) {
              const dxMouse = mouse.current.x - particles.current[i].x;
              const dyMouse = mouse.current.y - particles.current[i].y;
              distToMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
            }

            // Opacity based on distance between particles AND distance to mouse
            let opacity = 1 - (distance / connectionDistance);
            
            // If mouse is near, make it glow brighter green, otherwise very dim
            if (distToMouse < hoverDistance) {
              opacity = opacity * 0.8; // Bright when near mouse
            } else {
              opacity = opacity * 0.15; // Very dim/almost invisible when away from mouse
            }

            ctx.beginPath();
            ctx.strokeStyle = `rgba(34, 197, 94, ${opacity})`; // Tailwind green-500 equivalent
            ctx.lineWidth = 1;
            ctx.moveTo(particles.current[i].x, particles.current[i].y);
            ctx.lineTo(particles.current[j].x, particles.current[j].y);
            ctx.stroke();
          }
        }
      }
      requestRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(requestRef.current);
    };
  }, [particleCount, particleColor, lineColor, backgroundColor, particleSize, particleSpeed, connectionDistance, hoverDistance]);

  const handleMouseMove = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();
    mouse.current.x = event.clientX - rect.left;
    mouse.current.y = event.clientY - rect.top;
  };

  const handleMouseLeave = () => {
    mouse.current.x = null;
    mouse.current.y = null;
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`w-full h-full block ${className}`}
      style={{ backgroundColor }}
    ></canvas>
  );
}
