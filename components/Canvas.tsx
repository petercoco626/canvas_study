import { useEffect, useRef } from "react";
import styles from "./Canvas.module.css";

function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  console.log(canvasRef);
  useEffect(() => {
    if (!canvasRef.current) return;
    // // getContext : 2d관련 작업도구. 다양한 method 존재.
    // const ctx = canvasRef.current.getContext("2d");
    // // console.log(ctx);

    // // canvas 사이즈에 대한 이해(2가지)
    // // 1. css로 직접 조절. element(tag)
    // // 2. width, height로 지정. -> canvas 자체의 크기. ( w: 300, h :150으로 default )
    // const canvasWidth = 300;
    // const canvasHeight = 300;
    // // 근데 아래처럼 300으로만 하면 fillRect값이 직사각형처럼 보임.
    // canvasRef.current.style.width = canvasWidth + "px";
    // canvasRef.current.style.height = canvasHeight + "px";

    // // 아래처럼 canvas 자체의 크기도 조정해줘야함.
    // canvasRef.current.width = canvasWidth;
    // canvasRef.current.height = canvasHeight;

    // // 보통 canvas element size와 canvas 자체의 size를 맞추어 진행함.

    // // canvas 사이즈를 기준으로 x,y, 10씩 공백을 가지고 w,h 50의 크기글 가진 사각형을 그린다.
    // ctx?.fillRect(10, 10, 50, 50);

    // window.devicePixelRatio : dpr -> 하나의 css pixel을 그릴때 사용되는 디바이스의 픽셀수
    // 1pixel을 그릴떄 실제로 몇개의 픽셀을 쓰는가?
    // dpr = 1 1x1 dpr = 2 2x2 dpr이 높을수록 좋다.

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

    // scale을 곱함.
    ctx?.scale(dpr, dpr);
    ctx?.fillRect(10, 10, 50, 50);
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas}></canvas>;
}

export default Canvas;
