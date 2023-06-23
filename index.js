/**@type{HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
const c = canvas.getContext("2d");
const CANVAS_WIDTH = (canvas.width = 500);
const CANVAS_HEIGHT = (canvas.height = 1000);
const numberOfEnemies = 100;
const enemiesArray = [];

gameFrame = 0;

class Enemy {
  constructor() {
    this.image = new Image();
    this.image.src = "enemy1.png";
    (this.x = Math.random() * canvas.width),
      (this.y = Math.random() * canvas.height),
      (this.speed = Math.random() * 4 - 2); // -2 to + 2 as starts 0-4 then takes away 2
    this.spriteWidth = 293;
    this.spriteHeight = 155;
    this.width = this.spriteWidth / 2.5;
    this.height = this.spriteHeight / 2.5;
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
  }
  update() {
    this.x += this.speed;
    this.y += this.speed;
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
