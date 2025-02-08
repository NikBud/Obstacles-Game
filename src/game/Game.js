import { Player } from './Player.js';
import { Exit } from './Exit.js';
import { ObstacleAnime } from './ObstacleAnime.js';

export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.player = new Player(50, 50);
    this.exit = new Exit(canvas.width - 70, canvas.height - 70);
    this.obstacles = [];
    this.currentLevel = 1;

    this.setupKeyboardButtons();
    this.setUpLevel(this.currentLevel);
  }

  setupKeyboardButtons() {
    window.addEventListener('keydown', (e) => {      
      switch (e.key) {
        case 'ArrowUp':
          this.player.moveUp();
          break;
        case 'ArrowDown':
          this.player.moveDown();
          break;
        case 'ArrowLeft':
          this.player.moveLeft();
          break;
        case 'ArrowRight':
          this.player.moveRight();
          break;
      }
      
      this.checkCollisions(e.key);
      this.update();
    });
  }

  setUpLevel(level) {
    this.obstacles = [];
    this.player.x = 50;
    this.player.y = 50;

    switch (level) {
      case 1:
        this.obstacles = [
          new ObstacleAnime(200, 150, 30, 500),
          new ObstacleAnime(500, 100, 30, 600),
          new ObstacleAnime(800, 300, 30, 500),
          new ObstacleAnime(100, 400, 800, 25),
        ];
        break;
      case 2:
        this.obstacles = [
          new ObstacleAnime(100, 80, 30, 800),
          new ObstacleAnime(400, 0, 30, 250),
          new ObstacleAnime(400, 450, 30, 350),
          new ObstacleAnime(600, 0, 30, 250),
          new ObstacleAnime(600, 450, 30, 350),
          new ObstacleAnime(200, 250, 600, 25),
          new ObstacleAnime(200, 450, 600, 25),
        ];
        break;
      case 3:
        this.obstacles = [
          new ObstacleAnime(90, 40, 900, 20),   
          new ObstacleAnime(90, 770, 900, 20),  
          new ObstacleAnime(90, 40, 20, 650),   
          new ObstacleAnime(970, 40, 20, 750),  

          new ObstacleAnime(150, 150, 700, 20), 
          new ObstacleAnime(150, 250, 20, 200), 
          new ObstacleAnime(250, 350, 600, 20), 
          new ObstacleAnime(850, 40, 20, 400), 
          new ObstacleAnime(400, 450, 400, 20), 
          new ObstacleAnime(500, 400, 20, 370), 
          new ObstacleAnime(300, 650, 500, 20), 
        ];
        break;
      case 4:
        this.obstacles = [
        new ObstacleAnime(90, 40, 50, 20), 
        new ObstacleAnime(160, 40, 810, 20),
        new ObstacleAnime(90, 770, 900, 20),
        new ObstacleAnime(90, 40, 20, 750),  
        new ObstacleAnime(970, 40, 20, 750),

        new ObstacleAnime(150, 100, 700, 20),
        new ObstacleAnime(150, 200, 20, 250),
        new ObstacleAnime(250, 300, 600, 20),
        new ObstacleAnime(850, 40, 20, 240), 
        new ObstacleAnime(400, 400, 400, 20),
        new ObstacleAnime(500, 200, 20, 250),
        new ObstacleAnime(700, 360, 20, 410),
        new ObstacleAnime(300, 600, 500, 20),
        new ObstacleAnime(200, 500, 20, 150),
        new ObstacleAnime(600, 650, 20, 120),
        new ObstacleAnime(400, 700, 550, 20),
      ];
      break;
    }
  }


  checkCollisions(touchedKey) {
    // Check if player collides with obstacle
    for (const obstacle of this.obstacles) {
      if (this.player.collidesWith(obstacle)) {
        this.player.cancelLastMove(touchedKey);
        return;
      }
    }

    // Check if player collides with exit
    if (this.player.collidesWith(this.exit)) {
      if (this.currentLevel < 4) {
        this.currentLevel++;
        this.setUpLevel(this.currentLevel);
      } else {
        alert('Congratulations! You completed all levels!');
        this.currentLevel = 1;
        this.setUpLevel(1);
      }
    }
  }

  update() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Create background
    this.ctx.fillStyle = '#1a1a1a';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Create level number
    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = '30px Arial';
    this.ctx.fillText(`Level ${this.currentLevel}`, 20, 40);

    // Create game objects
    this.exit.draw(this.ctx);
    this.obstacles.forEach(obstacle => obstacle.draw(this.ctx));
    this.player.draw(this.ctx);
  }

  start() {
    this.update();
  }
}