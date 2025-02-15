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
    this.playing = true;
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
    let newX = this._locationX;
    let newY = this._locationY;
    switch (direction) {
      case "w":
        newY--;
        break;
      case "s":
        newY++;
        break;
      case "a":
        newX--;
        break;
      case "d":
        newX++;
        break;
      default:
        console.log("Enter W, A, S, D to play");
        return;
    }
    if (
      newY < 0 ||
      newY >= this._field.length ||
      newX < 0 ||
      newX >= this._field[0].length
    ) {
      console.log("Out of bounds - Game Over!");
      this.playing = false; // Perbarui properti kelas
      return;
    }
    // Jika valid, update posisi
    this._locationX = newX;
    this._locationY = newY;
  }

  runGame() {
    this._field[this._locationY][this._locationX] = pathCharacter;
    while (this.playing) {
      this.print();
      const direction = prompt("Which way? (w/a/s/d): ");
      this.movePlayer(direction);
      if (!this.isInBound()) {
        console.log("Out of bounds - Game Over!");
        this.playing = false;
      } else if (this.isHat()) {
        console.log("Congrats, you found your hat!");
        this.playing = false;
      } else if (this.isHole()) {
        console.log("Sorry, you fell in a hole!");
        this.playing = false;
      } else {
        this._field[this._locationY][this._locationX] = pathCharacter;
      }
    }
  }
  static generateField(height, width, percentage) {
    const field = Array(height)
      .fill()
      .map(() => Array(width).fill(fieldCharacter));

    const numHoles = Math.floor(height * width * percentage);

    for (let i = 0; i < numHoles; i++) {
      let randomRow = Math.floor(Math.random() * height);
      let randomCol = Math.floor(Math.random() * width);

      while (
        (randomRow === 0 && randomCol === 0) ||
        field[randomRow][randomCol] === hole
      ) {
        randomRow = Math.floor(Math.random() * height);
        randomCol = Math.floor(Math.random() * width);
      }

      field[randomRow][randomCol] = hole;
    }

    let hatRow, hatCol;
    do {
      hatRow = Math.floor(Math.random() * height);
      hatCol = Math.floor(Math.random() * width);
    } while ((hatRow === 0 && hatCol === 0) || field[hatRow][hatCol] === hole);

    field[hatRow][hatCol] = hat;

    return field;
  }
}
const generatedField = Field.generateField(5, 5, 0.4);
const myField = new Field(generatedField);
myField.runGame();
