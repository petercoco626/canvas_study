class Particle {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  update() {
    this.y += 1;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 10, 0, (Math.PI / 180) * 360); // 각도는 radian임.
    ctx.fillStyle = "orange";
    ctx.fill();
    ctx.closePath();
  }
}

export default Particle;
