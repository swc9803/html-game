import React, { useRef, useEffect } from 'react';

const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  let raf: number;

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');

      const animate = () => {
        ctx?.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);

        raf = requestAnimationFrame(animate);
      };

      animate();
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
