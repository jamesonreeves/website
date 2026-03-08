import React, { useEffect, useRef } from 'react';

const BackgroundFlow: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let trendPathPoints: {x: number, y: number}[] = [];
    let drawProgress = 0;
    let isDrawing = false;
    let pathOpacity = 0;
    let frameCount = 0;

    class Particle {
      x: number; y: number; size: number; speedX: number; speedY: number; opacity: number;
      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.2 - 0.1;
        this.speedY = Math.random() * 0.2 - 0.1;
        this.opacity = Math.random() * 0.15 + 0.05;
      }
      update(scrollVelocity: number) {
        this.x += this.speedX;
        this.y += this.speedY + scrollVelocity * 0.3;
        if (this.x > canvas!.width) this.x = 0; else if (this.x < 0) this.x = canvas!.width;
        if (this.y > canvas!.height) this.y = 0; else if (this.y < 0) this.y = canvas!.height;
      }
      draw() {
        if (!ctx) return;
        ctx.fillStyle = `rgba(0, 71, 171, ${this.opacity})`;
        ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
      }
    }

    const generateImpactPath = () => {
      let curX = 0;
      let curY = canvas.height * 0.92; // Start lower for more runway
      const points = [{x: curX, y: curY}];
      
      const segments = 60;
      const midpoint = 30;
      const stepX = canvas.width / segments;
      
      for (let i = 1; i <= segments; i++) {
        curX += stepX;
        
        let upwardBias, volatility;
        if (i <= midpoint) {
          // Phase 1: Stronger Baseline
          upwardBias = canvas.height * 0.005; 
          volatility = canvas.height * 0.02;
        } else {
          // Phase 2: High-Velocity Growth
          upwardBias = canvas.height * 0.018; 
          volatility = canvas.height * 0.04;
        }
        
        curY -= upwardBias + (Math.random() * volatility - volatility * 0.5);
        
        // Safety bounds
        if (curY < canvas.height * 0.1) curY = canvas.height * 0.1 + Math.random() * 10;
        if (curY > canvas.height * 0.98) curY = canvas.height * 0.98 - Math.random() * 10;
        
        points.push({x: curX, y: curY});
      }
      return points;
    };

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = Array.from({ length: 60 }, () => new Particle());
      trendPathPoints = generateImpactPath();
      drawProgress = 0;
      isDrawing = true;
      pathOpacity = 0.15;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frameCount++;

      // Subtle Axis Ticks
      ctx.strokeStyle = 'rgba(0, 71, 171, 0.03)';
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 200) {
        ctx.beginPath(); ctx.moveTo(i, canvas.height); ctx.lineTo(i, canvas.height - 8); ctx.stroke();
      }

      particles.forEach(p => { p.update(0); p.draw(); });

      if (isDrawing) {
        drawProgress += 0.003; 
        if (drawProgress >= 1) {
          drawProgress = 1;
          if (frameCount % 1500 === 0) isDrawing = false;
        }
      } else {
        pathOpacity -= 0.004;
        if (pathOpacity <= 0) {
          trendPathPoints = generateImpactPath();
          drawProgress = 0;
          pathOpacity = 0.15;
          isDrawing = true;
        }
      }

      if (trendPathPoints.length > 1) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(229, 57, 53, ${pathOpacity})`;
        ctx.lineWidth = 1.5;
        ctx.moveTo(trendPathPoints[0].x, trendPathPoints[0].y);
        
        const totalPoints = trendPathPoints.length - 1;
        const currentIdx = Math.floor(drawProgress * totalPoints);
        const partial = (drawProgress * totalPoints) % 1;

        for (let i = 1; i <= currentIdx; i++) {
          ctx.lineTo(trendPathPoints[i].x, trendPathPoints[i].y);
        }

        if (drawProgress < 1) {
          const p1 = trendPathPoints[currentIdx];
          const p2 = trendPathPoints[currentIdx + 1];
          ctx.lineTo(p1.x + (p2.x - p1.x) * partial, p1.y + (p2.y - p1.y) * partial);
        }
        ctx.stroke();

        // START LABEL: "your business"
        if (currentIdx >= 0) {
          const pt = trendPathPoints[0];
          const labelOpacity = Math.min(pathOpacity * 3, 0.4);
          ctx.font = '500 10px "Inter"';
          ctx.fillStyle = `rgba(229, 57, 53, ${labelOpacity})`;          ctx.textAlign = 'left';
          ctx.fillText('your business', pt.x + 10, pt.y + 20);
        }

        // THE INFLECTION ANNOTATION: "me"
        const midPointIdx = 30;
        if (currentIdx >= midPointIdx) {
          const pt = trendPathPoints[midPointIdx];
          const labelOpacity = Math.min(pathOpacity * 4, 0.6); // Make label more visible than the faint line

          ctx.font = '500 10px "Inter"';
          ctx.fillStyle = `rgba(229, 57, 53, ${labelOpacity})`;          ctx.textAlign = 'left';
          
          // Draw the Label
          ctx.fillText('me', pt.x + 15, pt.y + 35);
          
          // Draw the Arrow pointing to the node
          ctx.beginPath();
          ctx.strokeStyle = `rgba(229, 57, 53, ${labelOpacity})`;
          ctx.lineWidth = 1;
          ctx.moveTo(pt.x + 12, pt.y + 25); // Arrow tail
          ctx.lineTo(pt.x + 4, pt.y + 8);   // Arrow head
          ctx.stroke();
          
          // Arrow head triangle
          ctx.beginPath();
          ctx.moveTo(pt.x + 4, pt.y + 8);
          ctx.lineTo(pt.x + 8, pt.y + 12);
          ctx.lineTo(pt.x + 2, pt.y + 12);
          ctx.closePath();
          ctx.fill();

          // Highlight the inflection node
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    init(); animate();
    const handleResize = () => init();
    window.addEventListener('resize', handleResize);
    return () => { cancelAnimationFrame(animationFrameId); window.removeEventListener('resize', handleResize); };
  }, []);

  return (
    <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, pointerEvents: 'none' }} />
  );
};

export default BackgroundFlow;
