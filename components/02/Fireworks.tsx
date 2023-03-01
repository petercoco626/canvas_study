/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import Canvas from "utils/02/canvas";
import styles from "./Fireworks.module.css";

export default function Fireworks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    let canvas: Canvas;
    if (ctx) {
      canvas = new Canvas(ctx, canvasRef.current);
      canvas.createParticles();
      canvas.render(ctx);
    }

    window.addEventListener("resize", () => {
      ctx && canvasRef.current && canvas.resize(ctx, canvasRef.current);
    });

    return () => {
      window.removeEventListener("resize", () => {
        ctx && canvasRef.current && canvas.resize(ctx, canvasRef.current);
      });
    };
  }, []);

  return <canvas ref={canvasRef}></canvas>;
}
