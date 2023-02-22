import { useEffect, useRef } from "react";
import Particle from "utils/Particle";
import styles from "./Canvas.module.css";

function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  console.log(canvasRef);
  useEffect(() => {
    if (!canvasRef.current) return;
    console.log(window.devicePixelRatio); // 1
    const ctx = canvasRef.current.getContext("2d");
    const dpr = window.devicePixelRatio;
    const canvasWidth = 300;
    const canvasHeight = 300;
    canvasRef.current.style.width = canvasWidth + "px";
    canvasRef.current.style.height = canvasHeight + "px";

    // canvas 크기에 dpr를 연산.
    canvasRef.current.width = canvasWidth * dpr;
    canvasRef.current.height = canvasHeight * dpr;

    if (ctx) {
      // scale을 곱함.
      ctx.scale(dpr, dpr);
      // ctx?.fillRect(10, 10, 50, 50);

      const circle1 = new Particle(100, 100, 50);
      // circle1.draw(ctx);
      // animate(ctx, circle1);
    }
  }, []);

  function animate(ctx: CanvasRenderingContext2D, shape: Particle) {
    if (!canvasRef.current) return;
    window.requestAnimationFrame(() => animate(ctx, shape));
    ctx.clearRect(
      0,
      0,
      canvasRef.current.clientWidth,
      canvasRef.current.clientHeight
    );
    shape.draw(ctx);
    console.log("drawing...");
  }

  return <canvas ref={canvasRef} className={styles.canvas}></canvas>;
}

export default Canvas;
