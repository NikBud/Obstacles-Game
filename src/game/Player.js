export class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 20;
    this.speed = 10;
    this.lastX = x;
    this.lastY = y;
  }

  moveUp() {
    this.lastY = this.y;
    this.y = Math.max(this.y - this.speed, 0);
  }

  moveDown() {
    this.lastY = this.y;
    this.y = Math.min(this.y + this.speed, 800 - this.size);
  }

  moveLeft() {
    this.lastX = this.x;
    this.x = Math.max(this.x - this.speed, 0);
  }

  moveRight() {
    this.lastX = this.x;
    this.x = Math.min(this.x + this.speed, 1000 - this.size);
  }

  cancelLastMove(touchedKey) {
    if (touchedKey === "ArrowUp" || touchedKey === "ArrowDown"){
      this.y = this.lastY;
    }
    else if (touchedKey === "ArrowRight" || touchedKey === "ArrowLeft"){
      this.x = this.lastX;
    }
  }

  collidesWith(object) {
    return (
      this.x < object.x + object.width &&
      this.x + this.size > object.x &&
      this.y < object.y + object.height &&
      this.y + this.size > object.y
    );
  }

  draw(ctx) {
    ctx.fillStyle = '#ffcc00';
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
}