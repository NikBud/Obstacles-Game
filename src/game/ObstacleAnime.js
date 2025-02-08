export class ObstacleAnime {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw(ctx) {
    ctx.fillStyle = '#00ff7f';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}