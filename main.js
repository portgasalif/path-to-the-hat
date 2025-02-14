const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(field) {
    this._field = field;
    this._locationX = 0;
    this._locationY = 0;
  }

  get field() {
    return this._field;
  }
  print() {
    for (let char of this._field) {
      console.log(char.join(""));
    }
  }
  isInBound() {
    if (
      this._locationY < 0 ||
      this._locationY >= this._field.length ||
      this._locationX < 0 ||
      this._locationX >= this._field[0].length
    ) {
      return false;
    } else {
      return true;
    }
  }
  getCharacter() {
    return this._field[this._locationY][this._locationX];
  }
  isHat() {
    return this.getCharacter() === hat;
  }
  isHole() {
    return this.getCharacter() === hole;
  }
  movePlayer(direction) {
    switch (direction) {
      case "w":
        this._locationY -= 1;
        break;
      case "s":
        this._locationY += 1;
        break;
      case "a":
        this._locationX -= 1;
        break;
      case "d":
        this._locationX += 1;
        break;

      default:
        console.log("Enter W,A,S,D to Play");
        break;
    }
    this._field[this._locationY][this._locationX] = pathCharacter;
  }

  runGame() {
    let playing = true;
    while (playing) {
      this.print();
      const direction = prompt("Which way? (w/a/s/d): ");
      this.movePlayer(direction);
      if (!this.isInBound()) {
        console.log("Out of bounds - Game Over!");
        playing = false;
      } else if (this.isHat()) {
        console.log("Congrats, you found your hat!");
        playing = false;
      } else if (this.isHole()) {
        console.log("Sorry, you fell in a hole!");
        playing = false;
      }
    }
  }
}
