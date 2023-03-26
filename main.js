const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";
const winGame = "✓";

class Field {
  constructor(newField) {
    this.field = newField;
    this.X = 0;
    this.Y = 0;
  }
  print() {
    for (let i = 0; i < this.field.length; i++) {
      console.log(this.field[i].join(""));
    }
    console.log(`Your position is ${this.X}, ${this.Y}`);
  }
  static generateField = (length, height) => {
    if (length === 1 || height === 1) {
      throw "You need to make a field size bigger than 1 row or column";
    }
    try {
      ErrorMsg(length, height);
    } catch (e) {
      console.error(e);
    }
    // Generate empty field
    let generatedField = [];
    generatedField.length = height;
    for (let i = 0; i < height; i++) {
      generatedField[i] = [];
      generatedField[i].length = length;
      generatedField[i].fill(fieldCharacter);
    }

    // Add holes to field
    const fieldSize = length * height;
    let numOfHoles = 0;
    while (numOfHoles < fieldSize * 0.25) {
      let holePosition = Math.floor(Math.random() * fieldSize);
      while (holePosition === 0) {
        holePosition = Math.floor(Math.random() * fieldSize);
      }
      let holeRow = Math.floor(holePosition / length);
      let holeCol = holePosition % length;
      generatedField[holeRow][holeCol] = hole;
      numOfHoles++;
    }

    // Add hat to field
    let hatPosition = Math.floor(Math.random() * fieldSize);
    while (hatPosition === 0) {
      hatPosition = Math.floor(Math.random() * fieldSize);
    }
    console.log("Hat will be placed at: " + hatPosition);
    let hatRow = Math.floor(hatPosition / length);
    let hatCol = hatPosition % length;
    generatedField[hatRow][hatCol] = hat;

    // Add player to field
    generatedField[0][0] = pathCharacter;

    return generatedField;
  };
}

let myField = new Field([]);

// Declare field size
myField.field = Field.generateField(2, 1);

myField.print();

console.log("Use WASD for UP/LEFT/DOWN/RIGHT");
let win = "false";
while ((win = "false")) {
  let direction = prompt("Which direction? ");
  console.log("\n");
  switch (direction) {
    // Move Down
    case "s":
      myField.Y += 1;
      if (myField.Y > myField.field.length - 1) {
        console.log("You went outside the field!");
        return win;
      } else if (myField.field[myField.Y][myField.X] === hole) {
        console.log("You fell in a hole!");
        return win;
      } else if (myField.field[myField.Y][myField.X] === hat) {
        myField.field[myField.Y][myField.X] = winGame;
        myField.print();
        console.log("You win!");
        return win;
      } else {
        myField.field[myField.Y][myField.X] = pathCharacter;
      }
      myField.print();
      break;

    // Move up
    case "w":
      myField.Y -= 1;
      if (myField.Y < 0) {
        console.log("You went outside the field!");
        return win;
      } else if (myField.field[myField.Y][myField.X] === hole) {
        console.log("You fell in a hole!");
        return win;
      } else if (myField.field[myField.Y][myField.X] === hat) {
        myField.field[myField.Y][myField.X] = winGame;
        myField.print();
        console.log("You win!");
        return win;
      } else {
        myField.field[myField.Y][myField.X] = pathCharacter;
      }
      myField.print();
      break;

    // Move Right
    case "d":
      myField.X += 1;
      if (myField.X > myField.field[myField.Y].length) {
        console.log("You went outside the field!");
        return win;
      } else if (myField.field[myField.Y][myField.X] === hole) {
        console.log("You fell in a hole!");
        return win;
      } else if (myField.field[myField.Y][myField.X] === hat) {
        myField.field[myField.Y][myField.X] = winGame;
        myField.print();
        console.log("You win!");
        return win;
      } else {
        myField.field[myField.Y][myField.X] = pathCharacter;
      }
      myField.print();
      break;

    // Move left
    case "a":
      myField.X -= 1;
      if (myField.X < 0) {
        console.log("You went outside the field!");
        return win;
      } else if (myField.field[myField.Y][myField.X] === hole) {
        console.log("You fell in a hole!");
        return win;
      } else if (myField.field[myField.Y][myField.X] === hat) {
        myField.field[myField.Y][myField.X] = winGame;
        myField.print();
        console.log("You win!");
        return win;
      } else {
        myField.field[myField.Y][myField.X] = pathCharacter;
      }
      myField.print();
      break;
  }
}
