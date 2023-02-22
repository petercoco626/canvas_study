import { RefObject } from "react";
import genrateRandomNumber from "./genrateRandomNumber";
import Particle from "./Particle";

export default function animate(
  ctx: CanvasRenderingContext2D,
  particles: Particle[],
  fps: {
    interval: number;
    now: number;
    delta: number;
    then: number;
  },
  canvasRef: RefObject<HTMLCanvasElement>
) {
  if (!canvasRef.current) return;
  window.requestAnimationFrame(() => animate(ctx, particles, fps, canvasRef));

  fps.now = Date.now();
  fps.delta = fps.now - fps.then;

  if (fps.delta < fps.interval) return;

  // clear를 안하면 기존화면에 덧칠해서 그려져서 쭈욱 흘러내리는것처럼 보인다..
  ctx.clearRect(
    0,
    0,
    canvasRef.current.clientWidth,
    canvasRef.current.clientHeight
  );

  particles.forEach((particle) => {
    particle.update();
    particle.draw(ctx);

    if (particle.y > window.innerHeight + particle.radius) {
      particle.x = genrateRandomNumber(0, window.innerWidth);
      particle.vy = genrateRandomNumber(1, 3);
      particle.y = genrateRandomNumber(0, 100) - particle.radius;
    }
  });
}
