import { useCallback, useEffect, useRef, useState } from "react";
import animate from "utils/01/animate";
import generateParticle from "utils/01/generateParticle";
import Particle from "utils/01/Particle";
import styles from "./Canvas.module.css";

function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [controller, setController] = useState({
    blurValue: 10,
    alphaChannel: 100,
    alphaOffset: -23,
    acc: 1.02,
  });

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");

    const particleCount = 100;
    if (ctx) {
      // scale을 곱함.

      console.log(ctx.canvas.width);
      const particles = generateParticle({
        count: particleCount,
        maxX: window.innerWidth,
      });

      animate(ctx, particles);
    }

    const handleWindowResize = () => {
      if (!ctx) return;
      ctx.canvas.width = window.innerWidth;
      ctx.canvas.height = window.innerHeight;
    };

    // 맨처음 선언을 안하면 300 x 150으로 canvas가 그려지는거 같다.
    handleWindowResize();

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

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
