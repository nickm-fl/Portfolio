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
      time += 0.0005; // Slowed down movement
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Fill background with darker base color
      ctx.fillStyle = 'hsl(260, 15%, 3%)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Create static gradients with purple and dark green
      const gradients = [
        {
          x: Math.sin(time * 0.5) * canvas.width * 0.2 + canvas.width * 0.5,
          y: Math.cos(time * 0.7) * canvas.height * 0.2 + canvas.height * 0.5,
          radius: canvas.width * 0.5,
          color: '#A476FF' // Purple
        },
        {
          x: Math.cos(time * 0.6) * canvas.width * 0.2 + canvas.width * 0.5,
          y: Math.sin(time * 0.8) * canvas.height * 0.2 + canvas.height * 0.5,
          radius: canvas.width * 0.5,
          color: '#2D5A27' // Dark green
        }
      ];

      // Draw each gradient
      gradients.forEach(({ x, y, radius, color }) => {
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, `${color}40`); // 25% opacity
        gradient.addColorStop(0.5, `${color}20`); // 12% opacity
        gradient.addColorStop(1, 'transparent');

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
      style={{ opacity: 1 }}
    />
  );
};

export default GradientBackground; 