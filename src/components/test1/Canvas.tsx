import React, { useRef, useEffect } from 'react';

interface Mouse {
  x: number | undefined;
  y: number | undefined;
}

const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  let raf: number;

  let mouse: Mouse = {
    x: undefined,
    y: undefined,
  };

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      let x = 50;
      let y = 50;
      let xSpeed = 2;
      let ySpeed = 2;

      const drawCircle = () => {
        ctx!.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
        ctx!.beginPath();
        ctx!.arc(x, y, 30, 0, 2 * Math.PI);
        ctx!.fillStyle = '#0095DD';
        ctx!.fill();
        ctx!.closePath();

        x += xSpeed;
        y += ySpeed;

        if (x + 30 > canvasRef.current!.width || x - 30 < 0) {
          xSpeed = -xSpeed;
        }

        if (y + 30 > canvasRef.current!.height || y - 30 < 0) {
          ySpeed = -ySpeed;
        }

        raf = requestAnimationFrame(drawCircle);
      };

      drawCircle();

      window.addEventListener('mousemove', (e: MouseEvent) => {
        mouse = {
          x: e.clientX,
          y: e.clientY,
        };
        console.log(mouse.x);
      });

      return () => {
        cancelAnimationFrame(raf);
      };
    }
  }, [canvasRef.current]);

  const onResize = () => {
    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    }
  };

  useEffect(() => {
    window.addEventListener('resize', onResize);
    onResize();
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
};

export default Canvas;
