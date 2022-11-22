export default class HudController {
  yOffset = 25;
  elapsedSeconds = 0;

  constructor() {
    this.gameTime = Date.now();
  }

  draw(ctx, score, playerBulletsFired) {
    ctx.fillStyle = "white";
    ctx.font = "18px Verdana";

    this.elapsedSeconds = (Date.now() - this.gameTime) / 1000;

    ctx.fillText(`${this.elapsedSeconds.toFixed(1)} seconds`, 470, this.yOffset);
    ctx.fillText(`Bullets fired: ${playerBulletsFired}`, 10, this.yOffset);

    ctx.fillStyle = "red";
    ctx.fillText(`Score: ${score}`, 270, this.yOffset);
  }

  getTotalTimePlayed() {
    return this.elapsedSeconds;
  }
}
