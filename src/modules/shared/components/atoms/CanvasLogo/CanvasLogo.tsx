import { useRef, useEffect } from 'react';

interface CanvasLogoProps {
  size?: number;
  color?: string;
  /** velocidad del aleteo, 1 = normal */
  speed?: number;
  /** amplitud del aleteo en grados */
  flutter?: number;
}

// Coordenadas originales del logo de Alaria (mismas del SVG).
// Pivote de aleteo en (0, 135). Punto central (círculo) en (0, 135).
const PIVOT_X = 0;
const PIVOT_Y = 135;

// Bounding box real del contenido (las dos hojas), calculado de los paths.
const BBOX = { minX: -262, minY: -205, maxX: 95, maxY: 135 };

/**
 * Logo de Alaria dibujado en Canvas, replicando el SVG original
 * (dos hojas + punto), con aleteo suave animado por requestAnimationFrame.
 * El contenido se encuadra dentro del canvas para que nunca se corte.
 */
const CanvasLogo = ({ size = 120, color = '#123A47', speed = 1, flutter = 7 }: CanvasLogoProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    // Encuadre: escalar el bbox para que quepa con margen y centrarlo.
    const margin = 0.88;
    const bboxW = BBOX.maxX - BBOX.minX; // 357
    const bboxH = BBOX.maxY - BBOX.minY; // 340
    const scale = (size * margin) / Math.max(bboxW, bboxH);
    // Centro del bbox en coords del logo
    const bboxCenterX = (BBOX.minX + BBOX.maxX) / 2;
    const bboxCenterY = (BBOX.minY + BBOX.maxY) / 2;

    // Ala izquierda (hoja grande) relativa al pivote
    const drawLeafLarge = () => {
      ctx.beginPath();
      ctx.moveTo(-15, 130);
      ctx.bezierCurveTo(-20, 0, -125, -137, -262, -205);
      ctx.bezierCurveTo(-280, -150, -260, -37, -175, 37);
      ctx.bezierCurveTo(-105, 100, -45, 120, -15, 130);
      ctx.closePath();
    };

    // Ala derecha (hoja pequeña)
    const drawLeafSmall = () => {
      ctx.beginPath();
      ctx.moveTo(15, 130);
      ctx.bezierCurveTo(25, 80, 55, 25, 95, -12);
      ctx.bezierCurveTo(105, 5, 100, 37, 75, 62);
      ctx.bezierCurveTo(50, 87, 30, 112, 15, 130);
      ctx.closePath();
    };

    const start = performance.now();

    const render = (now: number) => {
      const t = ((now - start) / 1000) * speed;
      ctx.clearRect(0, 0, size, size);

      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = 6.5;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';

      // Transform base: centrar el bbox en el canvas y aplicar escala.
      ctx.save();
      ctx.translate(size / 2, size / 2);
      ctx.scale(scale, scale);
      ctx.translate(-bboxCenterX, -bboxCenterY);

      // Aleteo: rotar cada hoja alrededor del pivote (0,135), como el SVG.
      const flapL = Math.sin(t * 2 * Math.PI) * flutter; // grados
      const flapR = Math.sin(t * 2 * Math.PI + 0.5) * -flutter * 0.85;

      // Ala izquierda
      ctx.save();
      ctx.translate(PIVOT_X, PIVOT_Y);
      ctx.rotate((flapL * Math.PI) / 180);
      ctx.translate(-PIVOT_X, -PIVOT_Y);
      drawLeafLarge();
      ctx.stroke();
      ctx.restore();

      // Ala derecha
      ctx.save();
      ctx.translate(PIVOT_X, PIVOT_Y);
      ctx.rotate((flapR * Math.PI) / 180);
      ctx.translate(-PIVOT_X, -PIVOT_Y);
      drawLeafSmall();
      ctx.stroke();
      ctx.restore();

      // Punto central (quieto)
      ctx.beginPath();
      ctx.arc(PIVOT_X, PIVOT_Y, 8, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => cancelAnimationFrame(rafRef.current);
  }, [size, color, speed, flutter]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: size, height: size, display: 'block' }}
      aria-label="Alaria"
    />
  );
};

export default CanvasLogo;
