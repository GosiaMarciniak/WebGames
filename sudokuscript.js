document.addEventListener("DOMContentLoaded", function() {
    const sudokuBoard = document.getElementById("sudokuBoard");
    
    // Początkowe wartości planszy Sudoku (0 oznacza puste pole)
    const initialValues = [
      [5, 3, 0, 0, 7, 0, 0, 0, 0],
      [6, 0, 0, 1, 9, 5, 0, 0, 0],
      [0, 9, 8, 0, 0, 0, 0, 6, 0],
      [8, 0, 0, 0, 6, 0, 0, 0, 3],
      [4, 0, 0, 8, 0, 3, 0, 0, 1],
      [7, 0, 0, 0, 2, 0, 0, 0, 6],
      [0, 6, 0, 0, 0, 0, 2, 8, 0],
      [0, 0, 0, 4, 1, 9, 0, 0, 5],
      [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ];
  
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const cell = document.createElement("div");
        cell.classList.add("sudoku-cell");
        if (initialValues[i][j] !== 0) {
          cell.classList.add("initial-value"); 
          cell.textContent = initialValues[i][j]; 
        }
        sudokuBoard.appendChild(cell);
      }
    }
  
    sudokuBoard.addEventListener("click", function(event) {
    const clickedCell = event.target;
    if (clickedCell.classList.contains("initial-value")) {
      return; 
    }
    const currentValue = clickedCell.textContent;
    const newValue = prompt("Wprowadź nową wartość (1-9):");
    if (newValue !== null) {
      clickedCell.textContent = newValue;
    }
  });
  
    const checkButton = document.getElementById("checkButton");
    checkButton.addEventListener("click", checkSolution);
  
    function checkSolution() {
        const cells = Array.from(sudokuBoard.children);
      
        const values = cells.map(cell => cell.textContent);
      
        const validSolution = validateSolution(values);
        const allCellsFilled = cells.every(cell => cell.textContent !== "");
      
        if (validSolution && allCellsFilled) {
          alert("Gratulacje! Rozwiązanie jest poprawne.");
        } else {
          alert("Rozwiązanie jest błędne lub nie wszystkie pola są wypełnione.");
        }
      }
      
  
    function validateSolution(values) {
      for (let row = 0; row < 9; row++) {
        const rowValues = values.slice(row * 9, row * 9 + 9);
        if (!isSetValid(rowValues)) {
          return false;
        }
      }
  
      for (let col = 0; col < 9; col++) {
        const colValues = [];
        for (let row = 0; row < 9; row++) {
            colValues.push(values[row * 9 + col]);
        }
        if (!isSetValid(colValues)) {
          return false;
        }
      }
  
      for (let blockRow = 0; blockRow < 3; blockRow++) {
        for (let blockCol = 0; blockCol < 3; blockCol++) {
          const blockValues = [];
          for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
              const value =
                values[(blockRow * 3 + row) * 9 + (blockCol * 3 + col)];
              blockValues.push(value);
            }
          }
          if (!isSetValid(blockValues)) {
            return false;
          }
        }
      }
  
      return true;
    }
  
    function isSetValid(set) {
      const usedValues = new Set();
  
      for (let i = 0; i < set.length; i++) {
        const value = set[i];
        if (value !== "" && usedValues.has(value)) {
          return false;
        }
        usedValues.add(value);
      }
  
      return true;
    }
  });
  
  