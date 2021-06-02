import Phaser from 'phaser'

import StartingScene from '../scenes/overtake-scene';
// import StartingScene from '../scenes/starting-scene';


const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  pixelArt: true,
  zoom: 1.2,
  scene: StartingScene,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0,
        debug: true
        }
    }
  },
};

const game = new Phaser.Game(config);
