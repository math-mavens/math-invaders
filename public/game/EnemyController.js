import Levels from "./Levels.js";
import Enemy from "./Enemy.js";
import MovingDirection from "./MovingDirection.js";

export default class EnemyController {
  enemyMap = Levels['level1'];

  enemyRows = [];

  currentDirection = MovingDirection.right;
  xVelocity = 0;
  yVelocity = 0;
  defaultXVelocity = 1;
  defaultYVelocity = 1;
  moveDownTimerDefault = 15;
  moveDownTimer = this.moveDownTimerDefault;
  fireBulletTimerDefault = 100;
  fireBulletTimer = this.fireBulletTimerDefault;
  hudHeight = 60;
  score = 0;
  defaultScorePerEnemy = 100;
  triggerBonusPerEnemy = 100;

  constructor(canvas, enemyBulletController, playerBulletController) {
    this.canvas = canvas;
    this.createEnemies();
    this.enemybulletController = enemyBulletController;
    this.playerBulletController = playerBulletController;

    this.enemyDeathSound = new Audio("./sounds/enemy-death.wav");
    this.enemyDeathSound.volume = 0.2;
  }

  draw(ctx) {
    this.decrementMoveDownTimer();
    this.updateVelocityAndDirection();
    this.collisionDetection();
    this.drawEnemies(ctx);
    this.resetMoveDownTimer();
    this.fireBullet();
  }

  updateScore(triggered, enemyCount) {
    if (triggered) {
      this.score += (this.defaultScorePerEnemy + this.triggerBonusPerEnemy) * enemyCount;
    } else {
      this.score += this.defaultScorePerEnemy * enemyCount;
    }
  }

  getScore() {
    return this.score;
  }

  collisionDetection() {
    this.enemyRows.forEach((enemyRow) => {
      enemyRow.forEach((enemy, enemyIndex) => {
        if(this.playerBulletController.collideWith(enemy)) {
          if (enemy.trigger) {
            this.updateScore(true, enemyRow.length);
            //Delete entire row
            enemyRow.splice(0, enemyRow.length);
          } else {
            //Check strength of enemy
            if (enemy.strengthOver()) {
              this.updateScore(false, 1);
              //play death sound
              this.enemyDeathSound.currentTime = 0;
              this.enemyDeathSound.play();
              enemyRow.splice(enemyIndex, 1);
            } else {
              enemy.reduceStrength();
            }
          }
        }
      });
    });
    // Remove empty Enemy rows
    this.enemyRows = this.enemyRows.filter(enemyRow => enemyRow.length > 0);
  }

  fireBullet() {
    this.fireBulletTimer--;
    if (this.fireBulletTimer <=0 ) {
      this.fireBulletTimer = this.fireBulletTimerDefault;
      const allEnemies = this.enemyRows.flat();
      const enemyRandIndex = Math.floor(Math.random() * allEnemies.length);
      const enemy = allEnemies[enemyRandIndex];
      this.enemybulletController.shoot(enemy.x, enemy.y, -3);
    }
  }

  decrementMoveDownTimer() {
    if (this.currentDirection === MovingDirection.downLeft
        || this.currentDirection === MovingDirection.downRight) {
      this.moveDownTimer--;
    }
  }

  resetMoveDownTimer() {
    if (this.moveDownTimer <= 0) {
      this.moveDownTimer = this.moveDownTimerDefault;
    }
  }

  updateVelocityAndDirection() {
    for (const enemyRow of this.enemyRows) {
      if (this.currentDirection === MovingDirection.right) {
        this.xVelocity = this.defaultXVelocity;
        this.yVelocity = 0;
        const rightMostEnemy = enemyRow[enemyRow.length - 1];
        if (rightMostEnemy.x + rightMostEnemy.width >= this.canvas.width) {
          this.currentDirection = MovingDirection.downLeft;
          break;
        }
      } else if (this.currentDirection === MovingDirection.downLeft) {
        this.xVelocity = 0;
        this.yVelocity = this.defaultYVelocity;
        if (this.moveDown(MovingDirection.left)) {
          break;
        }
      } else if (this.currentDirection === MovingDirection.left) {
        this.xVelocity = -this.defaultXVelocity;
        this.yVelocity = 0;
        const leftMostEnemy = enemyRow[0];
        if (leftMostEnemy.x <= 0) {
          this.currentDirection = MovingDirection.downRight;
          break;
        }
      }  else if (this.currentDirection === MovingDirection.downRight) {
        this.xVelocity = 0;
        this.yVelocity = this.defaultYVelocity;
        if (this.moveDown(MovingDirection.right)) {
          break;
        }
      }
    }
  }

  moveDown(newDirection) {
    this.xVelocity = 0;
    this.yVelocity = this.defaultYVelocity;
    if(this.moveDownTimer <= 0) {
      this.currentDirection = newDirection;
      return true;
    }
    return false;
  }

  drawEnemies(ctx) {
    this.enemyRows.flat().forEach((enemy) => {
      enemy.move(this.xVelocity, this.yVelocity);
      enemy.draw(ctx);
    })
  }

  createEnemies() {
    this.enemyMap.forEach((row, rowIndex) => {
      this.enemyRows[rowIndex] = [];
      row.forEach((enemy, enemyIndex) => {
        if (enemy !== null) {
          this.enemyRows[rowIndex].push(
            new Enemy(enemyIndex * 50, (this.hudHeight + rowIndex * 35), enemy.strength, enemy.name, enemy.trigger)
          );
        }
      });
    });
  }

  collideWith(sprite) {
    return this.enemyRows.flat().some((enemy) => enemy.collideWith(sprite));
  }
}
