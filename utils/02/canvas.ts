import Particle from "./particle";

class Canvas {
  fps: {
    interval: number;
    now: number;
    delta: number;
    then: number;
  };
  dpr: number;
  particles: Particle[];

  constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    this.fps = {
      interval: 1000 / 50, // 뭔가 공식이 이상함. interval을 낮추면 깜박여도 내려가는 속도는 똑같아야하는데 말이지...
      now: 0,
      delta: 0,
      then: Date.now(),
    };
    this.dpr = window.devicePixelRatio;
    this.resize(ctx, canvas);
    this.particles = [];
  }

  createParticles() {
    const PARTICLE_NUM = 1;
    for (let i = 0; i < PARTICLE_NUM; i++) {
      const x = 300;
      const y = 300;
      this.particles.push(new Particle(x, y));
    }
  }

  resize(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    this.dpr = window.devicePixelRatio;
    canvas.width = window.innerWidth * this.dpr;
    canvas.height = window.innerHeight * this.dpr;
    ctx.scale(this.dpr, this.dpr);

    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    // console.log(canvas.style.width, canvas.style.height);

    // ctx.canvas.width = window.innerWidth;
    // ctx.canvas.height = window.innerHeight;
  }

  render(ctx: CanvasRenderingContext2D) {
    window.requestAnimationFrame(() => this.render(ctx));

    this.fps.now = Date.now();
    this.fps.delta = this.fps.now - this.fps.then;

    if (this.fps.delta < this.fps.interval) return;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // ctx.fillRect(100, 100, 100, 100);
    this.particles.forEach((particle) => {
      particle.update();
      particle.draw(ctx);
    });
  }
}

export default Canvas;
