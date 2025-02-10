import { useRef, useEffect } from "react";

interface Node3D {
  x: number;
  y: number;
  z: number;
  activity: number;
  connections: number[];
}

const NodeSphere = ({
  nodeCount = 50,
  radius = 40,
  backgroundColor = "#101010",
  nodeColor = "#A476FF",
  activeNodeColor = "#ffffff",
  rotationSpeed = 0.003,
  connectionOpacity = 0.2,
}: {
  nodeCount?: number;
  radius?: number;
  backgroundColor?: string;
  nodeColor?: string;
  activeNodeColor?: string;
  rotationSpeed?: number;
  connectionOpacity?: number;
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const animationRef = useRef<number | null>(null);
  const nodesRef = useRef<Node3D[]>([]);
  const angleRef = useRef(0);

  const createNodes = () => {
    const nodes: Node3D[] = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    for (let i = 0; i < nodeCount; i++) {
      const y = 1 - (i / (nodeCount - 1)) * 2; // Range from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y); // Radius at this y
      const theta = phi * i; // Golden angle increment

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      nodes.push({
        x: x * radius,
        y: y * radius,
        z: z * radius,
        activity: 0,
        connections: [],
      });
    }

    // Create connections between nearby nodes
    nodes.forEach((node, i) => {
      nodes.forEach((otherNode, j) => {
        if (i !== j) {
          const distance = Math.sqrt(
            Math.pow(node.x - otherNode.x, 2) +
              Math.pow(node.y - otherNode.y, 2) +
              Math.pow(node.z - otherNode.z, 2),
          );
          if (distance < radius * 0.6) {
            node.connections.push(j);
          }
        }
      });
    });

    return nodes;
  };

  const project = (x: number, y: number, z: number) => {
    const perspective = 300;
    const scale = perspective / (perspective + z);
    return {
      x: x * scale,
      y: y * scale,
      scale,
    };
  };

  const rotateY = (x: number, y: number, z: number, angle: number) => {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return {
      x: x * cos - z * sin,
      y,
      z: z * cos + x * sin,
    };
  };

  const drawSphere = () => {
    const ctx = contextRef.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;

    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    const centerX = width / (2 * (window.devicePixelRatio || 1));
    const centerY = height / (2 * (window.devicePixelRatio || 1));

    // Adjusted scale factor to make sphere larger
    const scaleFactor =
      Math.min(width, height) / (radius * 3 * (window.devicePixelRatio || 1));

    // Update rotation angle
    angleRef.current += rotationSpeed;

    // Rotate and project all nodes
    const projectedNodes = nodesRef.current.map((node) => {
      const rotated = rotateY(node.x, node.y, node.z, angleRef.current);
      const projected = project(
        rotated.x * scaleFactor,
        rotated.y * scaleFactor,
        rotated.z * scaleFactor,
      );
      return {
        ...projected,
        x: projected.x + centerX,
        y: projected.y + centerY,
        activity: node.activity,
      };
    });

    // Draw connections
    nodesRef.current.forEach((node, i) => {
      const projected1 = projectedNodes[i];
      node.connections.forEach((j) => {
        const projected2 = projectedNodes[j];
        const opacity =
          connectionOpacity *
          Math.min(projected1.scale, projected2.scale) *
          (1 + Math.max(node.activity, nodesRef.current[j].activity));

        ctx.beginPath();
        ctx.strokeStyle = `rgba(164, 118, 255, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.moveTo(projected1.x, projected1.y);
        ctx.lineTo(projected2.x, projected2.y);
        ctx.stroke();
      });
    });

    // Draw nodes
    projectedNodes.forEach((projected, i) => {
      const node = nodesRef.current[i];
      const nodeSize = 2 + projected.scale * (2 + node.activity * 3);

      ctx.beginPath();
      ctx.fillStyle = node.activity > 0 ? activeNodeColor : nodeColor;
      ctx.arc(projected.x, projected.y, nodeSize, 0, Math.PI * 2);
      ctx.fill();
    });

    // Decay node activity
    nodesRef.current.forEach((node) => {
      node.activity *= 0.95;
    });

    // Randomly activate nodes
    if (Math.random() < 0.05) {
      const randomNode =
        nodesRef.current[Math.floor(Math.random() * nodeCount)];
      randomNode.activity = 1;
    }
  };

  const animate = () => {
    drawSphere();
    animationRef.current = requestAnimationFrame(animate);
  };

  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = parent.getBoundingClientRect();

    // Set canvas size to match parent dimensions
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    if (contextRef.current) {
      contextRef.current.scale(dpr, dpr);
    }

    nodesRef.current = createNodes();
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

export default NodeSphere;
