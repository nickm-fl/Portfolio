import { useRef, useEffect } from "react";

interface Node {
  x: number;
  y: number;
  radius: number;
  connections: number[];
  pulses: Pulse[];
  activity: number;
}

interface Pulse {
  progress: number;
  targetIndex: number;
  color: string;
}

const SystemFlowDiagram = ({
  nodeCount = 15,
  backgroundColor = "#101010",
  primaryColor = "#A476FF",
  secondaryColor = "#5e4491",
  pulseSpeed = 0.02,
  connectionProbability = 0.3,
  pulseSpawnRate = 0.03,
}: {
  nodeCount?: number;
  backgroundColor?: string;
  primaryColor?: string;
  secondaryColor?: string;
  pulseSpeed?: number;
  connectionProbability?: number;
  pulseSpawnRate?: number;
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const nodesRef = useRef<Node[]>([]);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  const initializeNodes = (width: number, height: number) => {
    const nodes: Node[] = [];
    
    // Create nodes with random positions
    for (let i = 0; i < nodeCount; i++) {
      const radius = Math.random() * 3 + 2;
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius,
        connections: [],
        pulses: [],
        activity: 0,
      });
    }

    // Create connections between nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (Math.random() < connectionProbability) {
          nodes[i].connections.push(j);
          nodes[j].connections.push(i);
        }
      }
    }

    return nodes;
  };

  const drawSystem = () => {
    const ctx = contextRef.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;

    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    // Draw connections
    nodesRef.current.forEach((node, index) => {
      node.connections.forEach(targetIndex => {
        const target = nodesRef.current[targetIndex];
        ctx.beginPath();
        ctx.strokeStyle = `rgba(94, 68, 145, ${0.1 + (node.activity + target.activity) * 0.2})`;
        ctx.lineWidth = 1;
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(target.x, target.y);
        ctx.stroke();
      });
    });

    // Draw pulses
    nodesRef.current.forEach((node, nodeIndex) => {
      node.pulses.forEach((pulse, pulseIndex) => {
        const target = nodesRef.current[pulse.targetIndex];
        const x = node.x + (target.x - node.x) * pulse.progress;
        const y = node.y + (target.y - node.y) * pulse.progress;
        
        ctx.beginPath();
        ctx.fillStyle = pulse.color;
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      });
    });

    // Draw nodes
    nodesRef.current.forEach(node => {
      ctx.beginPath();
      ctx.fillStyle = primaryColor;
      ctx.arc(node.x, node.y, node.radius * (1 + node.activity * 0.5), 0, Math.PI * 2);
      ctx.fill();
    });
  };

  const updateSystem = () => {
    nodesRef.current.forEach((node, nodeIndex) => {
      // Update existing pulses
      node.pulses = node.pulses.filter(pulse => {
        pulse.progress += pulseSpeed;
        if (pulse.progress >= 1) {
          nodesRef.current[pulse.targetIndex].activity = 0.8;
          return false;
        }
        return true;
      });

      // Spawn new pulses
      if (Math.random() < pulseSpawnRate && node.connections.length > 0) {
        const targetIndex = node.connections[Math.floor(Math.random() * node.connections.length)];
        node.pulses.push({
          progress: 0,
          targetIndex,
          color: Math.random() > 0.5 ? primaryColor : secondaryColor,
        });
        node.activity = 0.8;
      }

      // Decay node activity
      node.activity *= 0.95;
    });
  };

  const animate = () => {
    updateSystem();
    drawSystem();
    animationRef.current = requestAnimationFrame(animate);
  };

  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = parent.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    if (contextRef.current) {
      contextRef.current.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    nodesRef.current = initializeNodes(rect.width, rect.height);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    contextRef.current = canvas.getContext("2d");
    handleResize();
    animate();

    let resizeTimeout: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 100);
    };

    window.addEventListener("resize", debouncedResize);

    return () => {
      cancelAnimationFrame(animationRef.current!);
      window.removeEventListener("resize", debouncedResize);
    };
  }, []);

  return (
    <div className="relative w-full h-full" style={{ backgroundColor }}>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};

export default SystemFlowDiagram; 