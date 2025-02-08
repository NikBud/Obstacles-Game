export class Exit {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 40;
  }

  draw(ctx) {
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  get bounds() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    };
  }
}