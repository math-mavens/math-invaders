export default class HudController {
  yOffset = 25;
  elapsedMilliseconds = 0;

  constructor() {
    this.gameTime = Date.now();
  }

  draw(ctx, score, playerBulletsFired) {
    ctx.fillStyle = "white";
    ctx.font = "18px Verdana";

    this.elapsedMilliseconds = (Date.now() - this.gameTime);

    ctx.fillText(`${this.getTimeInSeconds().toFixed(1)} seconds`, 470, this.yOffset);
    ctx.fillText(`Bullets fired: ${playerBulletsFired}`, 10, this.yOffset);

    ctx.fillStyle = "red";
    ctx.fillText(`Score: ${score}`, 270, this.yOffset);
  }

  getTimeInSeconds() {
    return (this.elapsedMilliseconds / 1000);
  }

  getTotalTimePlayed() {
    return this.elapsedMilliseconds;
  }
}
