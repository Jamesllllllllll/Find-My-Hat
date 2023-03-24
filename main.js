const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

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
    while (numOfHoles < fieldSize * 0.2) {
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
myField.field = Field.generateField(10,5);

myField.print();

console.log("Use WASD for UP/LEFT/DOWN/RIGHT");
let win = "false";
while ((win = "false")) {
  let direction = prompt("Which direction? ");
  console.log("\n");
  if (direction === "s") {
    
    // Move Down
    myField.Y += 1;
    if (myField.Y > myField.field.length - 1) {
      console.log("You went outside the field!");
      break;
    } else if (myField.field[myField.Y][myField.X] === hole) {
      console.log("You fell in a hole!");
      break;
    } else if (myField.field[myField.Y][myField.X] === hat) {
      console.log("You win!");
      break;
    } else {
      myField.field[myField.Y][myField.X] = pathCharacter;
    }
    myField.print();
  } else if (direction === "w") {
    
    // Move up
    myField.Y -= 1;
    if (myField.Y < 0) {
      console.log("You went outside the field!");
      break;
    } else if (myField.field[myField.Y][myField.X] === hole) {
      console.log("You fell in a hole!");
      break;
    } else if (myField.field[myField.Y][myField.X] === hat) {
      console.log("You win!");
      break;
    } else {
      myField.field[myField.Y][myField.X] = pathCharacter;
    }
    myField.print();
  } else if (direction === "d") {
    
    // Move Right
    myField.X += 1;
    if (myField.X > myField.field[myField.Y].length) {
      console.log("You went outside the field!");
      break;
    } else if (myField.field[myField.Y][myField.X] === hole) {
      console.log("You fell in a hole!");
      break;
    } else if (myField.field[myField.Y][myField.X] === hat) {
      console.log("You win!");
      break;
    } else {
      myField.field[myField.Y][myField.X] = pathCharacter;
    }
    myField.print();
  } else if (direction === "a") {
    
    // Move Left
    myField.X -= 1;
    if (myField.X < 0) {
      console.log("You went outside the field!");
      break;
    } else if (myField.field[myField.Y][myField.X] === hole) {
      console.log("You fell in a hole!");
      break;
    } else if (myField.field[myField.Y][myField.X] === hat) {
      console.log("You win!");
      break;
    } else {
      myField.field[myField.Y][myField.X] = pathCharacter;
    }
    myField.print();
  }
}