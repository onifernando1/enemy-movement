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
    (this.y = Math.random() * (canvas.height - this.height)), (this.frame = 0);
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    this.angle = 0;
    this.angleSpeed = Math.random() * 2 + 0.5;
    this.curve = Math.random() * 200 + 50;
  }
  update() {
    this.x =
      this.curve * Math.sin(this.angle * (Math.PI / 180)) + // change this .curve to this.width / 2 to fit into canvas
      (canvas.width / 2 - this.width / 2); // center take into account width to center
    this.y =
      this.curve * Math.cos(this.angle * (Math.PI / 180)) +
      (canvas.height / 2 - // center
        this.height / 2); // take into account width to center    this.angle += this.angleSpeed;
    this.angle += this.angleSpeed;
    // if Math.Pi/90 and Math.pi/180 x,y , then figure of 8
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
