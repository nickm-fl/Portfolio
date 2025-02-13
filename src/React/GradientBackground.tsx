import { useEffect, useRef } from 'react';

const GradientBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation variables
    let time = 0;

    // Animation function
    const animate = () => {
      time += 0.001;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create multiple radial gradients
      const gradients = [
        {
          x: Math.sin(time * 0.5) * canvas.width * 0.3 + canvas.width * 0.5,
          y: Math.cos(time * 0.7) * canvas.height * 0.3 + canvas.height * 0.5,
          radius: canvas.width * 0.5,
          hue: (time * 30) % 360
        },
        {
          x: Math.cos(time * 0.6) * canvas.width * 0.3 + canvas.width * 0.5,
          y: Math.sin(time * 0.8) * canvas.height * 0.3 + canvas.height * 0.5,
          radius: canvas.width * 0.5,
          hue: ((time * 30) + 120) % 360
        },
        {
          x: Math.sin(time * 0.7) * canvas.width * 0.3 + canvas.width * 0.5,
          y: Math.cos(time * 0.9) * canvas.height * 0.3 + canvas.height * 0.5,
          radius: canvas.width * 0.5,
          hue: ((time * 30) + 240) % 360
        }
      ];

      // Fill background with base color
      ctx.fillStyle = 'hsl(260, 15%, 5%)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw each gradient with lower opacity
      gradients.forEach(({ x, y, radius, hue }) => {
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, `hsla(${hue}, 70%, 20%, 0.4)`);
        gradient.addColorStop(0.5, `hsla(${hue}, 60%, 15%, 0.1)`);
        gradient.addColorStop(1, 'hsla(260, 15%, 5%, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });
      
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ opacity: 0.7 }}
    />
  );
};

export default GradientBackground; 