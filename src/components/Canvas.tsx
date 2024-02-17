import React, { useRef, useEffect } from 'react';

const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');

      const onResize = () => {
        if (canvasRef.current) {
          canvasRef.current.width = window.innerWidth;
          canvasRef.current.height = window.innerHeight;

          if (ctx) {
            ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          }
        }
      };

      window.addEventListener('resize', onResize);
      onResize();
      return () => {
        window.removeEventListener('resize', onResize);
      };
    }
  }, [canvasRef.current]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} />
    </div>
  );
};

export default Canvas;
