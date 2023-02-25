import { useCallback, useEffect, useRef, useState } from "react";
import animate from "utils/animate";
import generateParticle from "utils/generateParticle";
import Particle from "utils/Particle";
import styles from "./Canvas.module.css";

// import * as dat from "dat.gui";

function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [controller, setController] = useState({
    blurValue: 40,
    alphaChannel: 100,
    alphaOffset: -23,
    acc: 1.02,
  });
  const particles = useRef<Particle[]>([]);
  const dat = useState(async () => await import("dat.gui"));
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

      particles.current = generateParticle({ count: 50, maxX: canvasWidth });

      animate(ctx, particles.current, canvasRef);
    }
  }, [particles]);

  // 이렇게 비동기 함수로 만들고 useEffect로 해줘야 window is not defined 에러가 안뜨네..?
  const datInit = useCallback(async () => {
    if (!canvasRef.current) return;
    // const ctx = canvasRef.current.getContext("2d");
    const dat = await import("dat.gui");

    const gui = new dat.GUI();
    const gooeyFolder = gui.addFolder("gooey effect");
    const particleFolder = gui.addFolder("particle effect");
    gooeyFolder.add(controller, "blurValue", 0, 100).onChange((value) => {
      setController((pre) => ({ ...pre, blurValue: value }));
    });
    gooeyFolder.add(controller, "alphaChannel", 0, 100).onChange((value) => {
      setController((pre) => ({ ...pre, alphaChannel: value }));
    });
    gooeyFolder.add(controller, "alphaOffset", -50, 50).onChange((value) => {
      setController((pre) => ({ ...pre, alphaOffset: value }));
    });
    // if (ctx)
    //   particleFolder
    //     .add(controller, "acc", 0.02, 1.02, 0.02)
    //     .onChange((value) => {
    //       setController((pre) => ({ ...pre, acc: value }))

    //       ctx.clearRect(
    //         0,
    //         0,
    //         canvasRef.current.clientWidth,
    //         canvasRef.current.clientHeight
    //       );
    //       particles.current.forEach((particle) => {
    //         particle.update();
    //         particle.draw(ctx);
    //         particle.acc = value;
    //         console.log(particle.acc);
    //       });
    //     });
  }, [controller]);

  useEffect(() => {
    datInit();
  }, []);

  useEffect(() => {
    console.log(particles.current);
  }, [particles]);

  return (
    <>
      <canvas ref={canvasRef} className={styles.canvas}></canvas>
      <svg>
        <defs>
          <filter id="gooey">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation={controller.blurValue}
              result="blur1"
            />
            <feColorMatrix
              in="blur1"
              mode="matrix"
              values={`1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${controller.alphaChannel} ${controller.alphaOffset}`}
            />
          </filter>
        </defs>
      </svg>
    </>
  );
}

export default Canvas;
