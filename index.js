/**@type{HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
const c = canvas.getContext("2d");
const CANVAS_WIDTH = (canvas.width = 500);
const CANVAS_HEIGHT = (canvas.height = 1000);
const numberOfEnemies = 20;
const enemiesArray = [];

gameFrame = 0;

class Enemy {
  constructor() {
    this.image = new Image();
    this.image.src = "enemy3.png";
    this.speed = Math.random() * 4 + 1;
    this.spriteWidth = 218;
    this.spriteHeight = 177;
    this.width = this.spriteWidth / 2.5;
    (this.x = Math.random() * (canvas.width - this.width)),
      (this.height = this.spriteHeight / 2.5);
    this.y = Math.random() * (canvas.height - this.height);
    this.newX = Math.random() * (canvas.width - this.width);
    (this.newY = Math.random() * (canvas.width - this.width)), (this.frame = 0);
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    this.interval = Math.floor(Math.random() * 200 + 50);
  }
  update() {
    if (gameFrame % this.interval == 0) {
      //every 30 frames if %30)
      this.newX = Math.random() * (canvas.width - this.width);
      this.newY = Math.random() * (canvas.width - this.width);
    }
    let dx = this.x - this.newX;
    let dy = this.y - this.newY;

    this.x -= dx / 20; //
    this.y -= dy / 20; // move to new position 1/20th of speed (/20)
    if (this.x + this.width < 0) this.x = canvas.width;
    if (gameFrame % this.flapSpeed === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++; //
    }
  }
  draw() {
    // c.strokeRect(this.x, this.y, this.width, this.height);
    c.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

for (let i = 0; i < numberOfEnemies; i++) {
  enemiesArray.push(new Enemy());
}
function animate() {
  c.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  enemiesArray.forEach((enemy) => {
    enemy.update();
    enemy.draw();
  });
  gameFrame++;

  requestAnimationFrame(animate);
}

animate();
