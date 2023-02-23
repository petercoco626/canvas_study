import { RefObject } from "react";
import genrateRandomNumber from "./genrateRandomNumber";
import Particle from "./Particle";

const fps = {
  interval: 1000 / 50, // 뭔가 공식이 이상함. interval을 낮추면 깜박여도 내려가는 속도는 똑같아야하는데 말이지...
  now: 0,
  delta: 0,
  then: Date.now(),
};

export default function animate(
  ctx: CanvasRenderingContext2D,
  particles: Particle[],
  canvasRef: RefObject<HTMLCanvasElement>
) {
  if (!canvasRef.current) return;
  window.requestAnimationFrame(() => animate(ctx, particles, canvasRef));

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
      particle.y = -particle.radius;
    }
  });

  fps.then = fps.now - (fps.delta % fps.interval);
}
