const fieldCharacter = "░";
const hat = "^";
const hole = "O";

const generateField = (length, height) => {
  // Generate empty field
  let generatedField = [];
  generatedField.length = height;
  for (let i = 0; i < height; i++) {
    generatedField[i] = [];
    generatedField[i].length = length;
    generatedField[i].fill(fieldCharacter);
  }

  // Add holes
  const fieldSize = length * height;
  let numOfHoles = 0;
  while (numOfHoles < (fieldSize * 0.2)) {
    let holePosition = Math.floor(Math.random() * fieldSize);
    while (holePosition === 0) {
      holePosition = Math.floor(Math.random() * fieldSize);
    }
    holeRow = Math.floor(holePosition / length);
    holeCol = holePosition % length;
    generatedField[holeRow][holeCol] = hole;
    numOfHoles++;
  }

  // Add hat
  let hatPosition = Math.floor(Math.random() * fieldSize);
  while (hatPosition === 0) {
    hatPosition = Math.floor(Math.random() * fieldSize);
  }
  console.log("Hat will be placed at: " + hatPosition);
  hatRow = Math.floor(hatPosition / length);
  hatCol = hatPosition % length;
  generatedField[hatRow][hatCol] = hat;

  // Print field
  for (let i = 0; i < generatedField.length; i++) {
    console.log(generatedField[i].join(""));
  }
};

generateField(10, 5);
