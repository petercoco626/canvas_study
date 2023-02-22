class Particle {
  x: number;
  y: number;
  radius: number;
  vy: number;
  constructor(x: number, y: number, radius: number, vy: number) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.vy = vy;
  }

  update() {
    this.y += this.vy;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, (Math.PI / 180) * 360); // 각도는 radian임.
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
  }
}

export default Particle;
