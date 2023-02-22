import { useEffect, useRef } from "react";
import animate from "utils/animate";
import generateParticle from "utils/generateParticle";
import genrateRandomNumber from "utils/genrateRandomNumber";
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
    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;
    canvasRef.current.style.width = canvasWidth + "px";
    canvasRef.current.style.height = canvasHeight + "px";

    // canvas 크기에 dpr를 연산.
    canvasRef.current.width = canvasWidth * dpr;
    canvasRef.current.height = canvasHeight * dpr;

    if (ctx) {
      // scale을 곱함.
      ctx.scale(dpr, dpr);

      const paricles = generateParticle({ count: 50, maxX: canvasWidth });

      animate(ctx, paricles, canvasRef);
    }
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas}></canvas>;
}

export default Canvas;
