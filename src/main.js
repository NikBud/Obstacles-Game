import './style.css'
import { Game } from './game/Game.js';

window.onload = () => {
  const canvas = document.getElementById('gameCanvas');
  const game = new Game(canvas);
  game.start();
};