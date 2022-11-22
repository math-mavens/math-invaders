export default class Enemy {
  constructor(x, y, strength, imageName, trigger) {
    this.x = x;
    this.y = y;
    this.strength = strength;
    this.trigger = trigger;

    this.width = 44;
    this.height = 32;

    this.image = new Image();
    this.image.src = `./images/enemy-${imageName}.png`;
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  move(xVelocity, yVelocity) {
    this.x += xVelocity;
    this.y += yVelocity;
  }

  collideWith(sprite) {
    // Bounding box Collision Detection Technique
    if (
      this.x + this.width > sprite.x &&
      this.x < sprite.x + sprite.width &&
      this.y + this.height > sprite.y &&
      this.y < sprite.y + sprite.height
    ) {
      return true;
    } else {
      return false;
    }
  }

  reduceStrength() {
    this.strength--;
  }

  strengthOver() {
    return this.strength <= 0;
  }
}
