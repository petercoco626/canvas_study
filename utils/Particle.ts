class Particle {
  x: number;
  y: number;
  radius: number;
  vy: number;
  acc: number;
  constructor(x: number, y: number, radius: number, vy: number) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.vy = vy;
    this.acc = 1.02;
  }

  update() {
    this.vy *= this.acc;
    this.y += this.vy;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, (Math.PI / 180) * 360); // 각도는 radian임.
    ctx.fillStyle = "orange";
    ctx.fill();
    ctx.closePath();
  }
}

export default Particle;
