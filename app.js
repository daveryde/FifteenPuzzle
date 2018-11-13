var board;
var rows;
var cols;

function start() {
  // If no input rows/columns specified -- default is 4x4
  if (!rows && !cols) {
    rows = 4;
    cols = 4;
    newGame(rows, cols);
  }

  // Get the user input rows/columns and start a new game
  document.getElementById('button').addEventListener('click', function() {
    rows = document.getElementById('inputRow').value;
    cols = document.getElementById('inputCol').value;
    newGame(rows, cols);
  });

  // Get tile Id position on click event
  // Move tile using the Id position
  window.addEventListener('click', getId, false);
} // End of start()

function newGame(rows, cols) {
  // Create the empty array for the game tiles
  var gameBoard = createBoard(rows, cols);

  // Fill the empty array tiles with random numbers
  scrambleBoard(gameBoard, rows, cols);

  // Display the game tiles
  displayBoard();
} // End of newGame()

function createBoard(rows, cols) {
  //==================================
  //            ROW ROW ROW ROW
  //            --- --- --- ---
  // COLUNN |||  6   0   5   3
  // COLUNN |||  14  15  1   12
  // COLUNN |||  7   4   10  13
  // COLUNN |||  2   9   11  8
  //
  // =================================
  //
  //        (i) ROW   ROW   ROW   ROW
  //        (j) ---   ---   ---   ---
  // COLUNN ||| i=0   i=0   i=0   i=0
  //        ||| j=1   j=2   j=3   j=4
  // COLUNN ||| i=1   i=1   i=1   i=1
  //        ||| j=1   j=2   j=3   j=4
  // COLUNN ||| i=2   i=2   i=2   i=2
  //        ||| j=1   j=2   j=3   j=4
  // COLUNN ||| i=3   i=3   i=3   i=3
  //        ||| j=1   j=2   j=3   j=4
  //

  // Create the proper board size.
  board = new Array(rows);
  for (var i = 0; i < rows; i++) {
    board[i] = new Array(cols);
  }
  return board;
}

function scrambleBoard(array, rows, cols) {
  // Temporary arrays for number randomization
  var usedNumArray, scrambledNumArray, randomNum;

  // Set up a temporary array for
  // allocating unique numbers.
  usedNumArray = new Array(rows * cols);
  for (var i = 0; i < rows * cols; i++) {
    usedNumArray[i] = 0;
  }

  scrambledNumArray = new Array();

  // Assign random numbers to the array.
  for (var i = 0; i < rows * cols; i++) {
    // Get random numbers with the limits of the row and col size
    randomNum = Math.floor(Math.random() * rows * cols);

    // Test
    //console.log(usedNumArray);

    // This array keeps track of where the random number is placed. 1 or 0.
    // If our random numer is unique, add it to the array array.
    // EXAMPLE OF LOOP
    //
    // usedNumArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    // if (usedNumArray[randomNum or 11] {
    //  usedNumArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "1", 0, 0, 0, 0, 0]
    // })
    // Assign numbers to the game array.
    if (usedNumArray[randomNum] == 0) {
      usedNumArray[randomNum] = 1;
      scrambledNumArray.push(randomNum);
    } else {
      i--;
    }
  }

  var counter = 0;
  for (var row = 0; row < rows; row++) {
    for (var col = 0; col < cols; col++) {
      array[row][col] = scrambledNumArray[counter];
      counter++;
    }
  }
  return array;
}

function displayBoard() {
  var table = document.getElementById('table');
  var output = '<table id="gameTiles">';
  for (var row = 0; row < rows; row++) {
    output += '<tr>';
    for (var col = 0; col < cols; col++) {
      if (board[row][col] == 0) {
        output += '<td class="blank" id="b-' + row + '-' + col + '"> </td>';
      } else {
        output +=
          '<td id="b-' + row + '-' + col + '">' + board[row][col] + '</td>';
      }
    }
    output += '</tr>';
  }
  output += '</table>';
  table.innerHTML = output;
  console.log(board[0][1]);
} //END OF FUNCTION DISPLAYTABLE90

function getId(element) {
  // Store the click target event value into an array then remove the "-" and string "b"
  var currentNode = element.target.id.split('-');
  currentNode.splice(0, 1);

  // Find and store the blank tile then remove the "-" and string "b"
  var blankElement = document.getElementsByClassName('blank');
  var blankNode = blankElement[0].id.split('-');
  blankNode.splice(0, 1);

  // Transform the index values to integers
  for (var i = 0; i < currentNode.length; i++) {
    currentNode[i] = parseInt(currentNode[i]);
    blankNode[i] = parseInt(blankNode[i]);
  }

  // Set the clicked tile and blank tile indexes
  var curRow = currentNode[0];
  var curCol = currentNode[1];
  var blankRow = blankNode[0];
  var blankCol = blankNode[1];

  var tempArray = board[blankRow][blankCol];

  if (curRow - 1 == blankRow && curCol == blankCol) {
    console.log('Blank tile is above');
    board[blankRow][blankCol] = board[curRow][curCol];
    board[curRow][curCol] = tempArray;
    displayBoard();
  }
  if (curRow + 1 == blankRow && curCol == blankCol) {
    console.log('Blank tile is below');
    board[blankRow][blankCol] = board[curRow][curCol];
    board[curRow][curCol] = tempArray;
    displayBoard();
  }
  if (curRow == blankRow && curCol - 1 == blankCol) {
    console.log('Blank tile is to the left');
    board[blankRow][blankCol] = board[curRow][curCol];
    board[curRow][curCol] = tempArray;
    displayBoard();
  }
  if (curRow == blankRow && curCol + 1 == blankCol) {
    console.log('Blank tile is to the right');
    board[blankRow][blankCol] = board[curRow][curCol];
    board[curRow][curCol] = tempArray;
    displayBoard();
  }
} //END OF FUNCTION MOVETILE()

function win() {
  var count = 1;
  for (var row = 0; row < rows; row++) {
    for (var col = 0; col < cols; col++) {
      if (board[row][col] != count) {
        return false;
      }
      count++;
    }
  }
  return true;
} //END OF FUNCTION WIN()

window.addEventListener('load', start, false);
