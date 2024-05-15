document.addEventListener("DOMContentLoaded", function () {
  const iconoAjustes = document.getElementById("botonAjustes");
  const menu = document.getElementById("menu");

  iconoAjustes.addEventListener("click", function () {
    menu.classList.toggle("active");
  });

  // Generar números de comienzo del Sudoku cuando se cargue la página
  generarNumerosIniciales();
});

function generarNumerosIniciales() {
  // Generar un tablero completo de Sudoku
  let tableroCompleto = generarTableroCompleto();
  
  // Copiar el tablero completo para trabajar con el tablero visible
  let tableroVisible = tableroCompleto.map(row => row.slice());

  // Eliminar celdas aleatoriamente mientras se asegura de que el tablero sigue siendo resoluble
  eliminarCeldasAleatoriamente(tableroVisible, 30); // Ajusta el número de celdas visibles

  // Rellenar el tablero en la página HTML
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      let cell = document.getElementById(`input${i + 1}.${j + 1}`);
      if (tableroVisible[i][j] !== 0) {
        cell.value = tableroVisible[i][j];
        cell.readOnly = true; // Hacer las celdas iniciales de solo lectura
        cell.classList.add("initial"); // Añadir una clase para las celdas iniciales
      } else {
        cell.value = '';
        cell.readOnly = false;
      }
    }
  }
}

function generarTableroCompleto() {
  let tablero = Array.from({ length: 9 }, () => Array(9).fill(0));
  resolverSudoku(tablero);
  return tablero;
}

function resolverSudoku(tablero) {
  let vacio = encontrarCeldaVacia(tablero);
  if (!vacio) return true;

  let [row, col] = vacio;

  for (let num = 1; num <= 9; num++) {
    if (esSeguro(tablero, row, col, num)) {
      tablero[row][col] = num;

      if (resolverSudoku(tablero)) {
        return true;
      }

      tablero[row][col] = 0;
    }
  }

  return false;
}

function encontrarCeldaVacia(tablero) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (tablero[row][col] === 0) {
        return [row, col];
      }
    }
  }
  return null;
}

function esSeguro(tablero, row, col, num) {
  for (let x = 0; x < 9; x++) {
    if (tablero[row][x] === num || tablero[x][col] === num) {
      return false;
    }
  }

  let startRow = row - row % 3, startCol = col - col % 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (tablero[i + startRow][j + startCol] === num) {
        return false;
      }
    }
  }

  return true;
}

function eliminarCeldasAleatoriamente(tablero, celdasVisibles) {
  let celdas = Array.from({ length: 81 }, (_, index) => index);
  celdas = shuffle(celdas).slice(0, 81 - celdasVisibles);

  for (let i of celdas) {
    let row = Math.floor(i / 9);
    let col = i % 9;
    let temp = tablero[row][col];
    tablero[row][col] = 0;

    let tableroCopia = tablero.map(row => row.slice());
    if (!resolverSudoku(tableroCopia)) {
      tablero[row][col] = temp;
    }
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function checkEmptyCells() {
  let inputCells = document.querySelectorAll('.inputCasilla');
  
  inputCells.forEach(cell => {
      if (cell.value.trim() === '') {
          cell.classList.remove("checkError");
          cell.classList.remove("checkEmpty");
          cell.classList.add("checkEmpty");
      }
  });
}

function checkRowDuplicates() {
  let rowIds = {};
  let errorCells = [];
  let cajaErrores = document.querySelector('.cajaErrores');
  
  for (let i = 1; i <= 9; i++) {
      for (let j = 1; j <= 9; j++) {
          let inputId = 'input' + i + '.' + j;
          let cellValue = document.getElementById(inputId).value;
          
          if (cellValue !== '') {
              if (rowIds[cellValue]) {
                  errorCells.push(inputId);
              } else {
                  rowIds[cellValue] = true;
              }
          }
      }
      rowIds = {};
  }
  
  if (errorCells.length > 0) {
      let errorDiv = document.createElement('div');
      errorDiv.textContent = "Número repetido en la fila: " + errorCells.map(cellId => cellId.slice(5)).join(", ");
      cajaErrores.appendChild(errorDiv);
      
      errorCells.forEach(cellId => {
          document.getElementById(cellId).classList.remove("checkError");
          document.getElementById(cellId).classList.remove("checkEmpty");
          document.getElementById(cellId).classList.add("checkError");
      });
  }
}

function checkColumnDuplicates() {
  let columnIds = {};
  let errorCells = [];
  let cajaErrores = document.querySelector('.cajaErrores');
  
  for (let j = 1; j <= 9; j++) {
      for (let i = 1; i <= 9; i++) {
          let inputId = 'input' + i + '.' + j;
          let cellValue = document.getElementById(inputId).value;
          
          if (cellValue !== '') {
              if (columnIds[cellValue]) {
                  errorCells.push(inputId);
              } else {
                  columnIds[cellValue] = true;
              }
          }
      }
      columnIds = {};
  }
  
  if (errorCells.length > 0) {
      let errorDiv = document.createElement('div');

      errorDiv.textContent = "Número repetido en la columna: " + errorCells.map(cellId => cellId.slice(5)).join(", ");
      cajaErrores.appendChild(errorDiv);
      
      errorCells.forEach(cellId => {
          document.getElementById(cellId).classList.remove("checkError");
          document.getElementById(cellId).classList.remove("checkEmpty");
          document.getElementById(cellId).classList.add("checkError");
      });
  }
}

function checkGroupDuplicates() {
  let groupIds = {};
  let errorCells = [];
  let cajaErrores = document.querySelector('.cajaErrores');
  
  for (let k = 0; k < 9; k += 3) {
      for (let l = 0; l < 9; l += 3) {
          for (let i = 1; i <= 3; i++) {
              for (let j = 1; j <= 3; j++) {
                  let inputId = 'input' + (i + k) + '.' + (j + l);
                  let cellValue = document.getElementById(inputId).value;
                  
                  if (cellValue !== '') {
                      if (groupIds[cellValue]) {
                          errorCells.push(inputId);
                      } else {
                          groupIds[cellValue] = true;
                      }
                  }
              }
          }
          groupIds = {};
      }
  }
  
  if (errorCells.length > 0) {
      let errorDiv = document.createElement('div');
      errorDiv.textContent = "Número repetido en el grupo: " + errorCells.map(cellId => cellId.slice(5)).join(", ");
      cajaErrores.appendChild(errorDiv);
      
      errorCells.forEach(cellId => {
          document.getElementById(cellId).classList.remove("checkError");
          document.getElementById(cellId).classList.remove("checkEmpty");
          document.getElementById(cellId).classList.add("checkError");
      });
  }
}

document.getElementById('botonCheckear').addEventListener('click', function() {
  setTimeout(function () {
      let inputs = document.querySelectorAll('.inputCasilla');
      inputs.forEach(input => {
          input.style.backgroundColor = '';
      });

      let cajaErrores = document.querySelector('.cajaErrores');
      cajaErrores.innerHTML = '';

      checkRowDuplicates();
      checkColumnDuplicates();
      checkGroupDuplicates();
      checkEmptyCells();

  }, 500);

  
});

function ForbidenInput(input) {
  var valor = input.value;

  if (valor === '0' || isNaN(valor)) {
      input.value = '';
  }
}

var estado1 = false;

document.getElementById("botonAjustes").onclick = function botonAjustes() {
  var boton = document.getElementById("botonAjustes");
  estado1 = !estado1; 

  if (estado1) {
    botonActivoAjustes();
  } else {
    botonInactivoAjustes();
  }
};

function botonActivoAjustes() {
  botonAjustesLight.style.transform = "translate(0%, 0%) rotate(420deg)";
  botonAjustesShadow.style.transform = "translate(0%, 0%) rotate(420deg)";
  botonAjustesLight.style.display = "block";
  botonAjustesLight.style.opacity = 1; 
  botonAjustesShadow.style.opacity = 0;
}

function botonInactivoAjustes() {
  botonAjustesLight.style.transform = "translate(0%, 0%) rotate(0deg)";
  botonAjustesShadow.style.transform = "translate(0%, 0%) rotate(0deg)";
  botonAjustesShadow.style.display = "block";
  botonAjustesLight.style.opacity = 0;
  botonAjustesShadow.style.opacity = 1;
}

estado2 = false;

document.getElementById("botonCross").onclick = function botonCross() {
  var boton = document.getElementById("botonCross");
  estado2 = !estado2;

  if (estado2) {
    botonActivoCross();
  } else {
    botonInactivoCross();
  }
};

function botonActivoCross() {
  var cells = document.querySelectorAll("td");

  function handleClick() {
    // Eliminar las clases existentes de todas las celdas
    cells.forEach(function (cell) {
      cell.classList.remove("hover-row");
      cell.classList.remove("hover-column");
    });

    var cellId = this.id;
    var [row, column] = cellId.split(".");

    // Añadir la clase hover-row a todas las celdas en la fila del input seleccionado
    cells.forEach(function (target) {
      if (target.id.startsWith(row + ".")) {
        target.classList.add("hover-row");
      }
    });

    // Añadir la clase hover-column a todas las celdas en la columna del input seleccionado
    cells.forEach(function (target) {
      if (target.id.endsWith("." + column)) {
        target.classList.add("hover-column");
      }
    });
  }

  // Agregar el evento de clic a cada celda
  cells.forEach(function (cell) {
    cell.addEventListener("click", handleClick);
    // Guardar el manejador en la celda para removerlo después
    cell.crossClickHandler = handleClick;
  });

  // Evento para eliminar el resaltado al hacer clic fuera del Sudoku
  document.addEventListener("click", removeCrossHighlight);
  document.querySelector(".sudoku-container").addEventListener("click", stopPropagation);

  // Ajustes para el botón activado
  crossLight.style.display = "block";
  crossLight.style.opacity = 1;
  crossShadow.style.opacity = 0;
  botonCross.style.borderColor = "#BDAA7B";
}

function botonInactivoCross() {
  var cells = document.querySelectorAll("td");

  // Remover las clases hover-row y hover-column de todas las celdas
  cells.forEach(function (cell) {
    cell.classList.remove("hover-row");
    cell.classList.remove("hover-column");
    // Remover el evento de clic de cada celda
    if (cell.crossClickHandler) {
      cell.removeEventListener("click", cell.crossClickHandler);
      delete cell.crossClickHandler;
    }
  });

  // Remover el evento de clic fuera del Sudoku
  document.removeEventListener("click", removeCrossHighlight);
  document.querySelector(".sudoku-container").removeEventListener("click", stopPropagation);

  // Ajustes para el botón desactivado
  crossShadow.style.display = "block";
  crossLight.style.opacity = 0;
  crossShadow.style.opacity = 1;
  botonCross.style.borderColor = "black";
}

function removeCrossHighlight(event) {
  if (!event.target.closest(".sudoku-container")) {
    var cells = document.querySelectorAll("td");
    cells.forEach(function (cell) {
      cell.classList.remove("hover-row");
      cell.classList.remove("hover-column");
    });
  }
}

function stopPropagation(event) {
  event.stopPropagation();
}

estado3 = false;

document.getElementById("botonEquals").onclick = function botonEquals() {
  var boton = document.getElementById("botonEquals");
  estado3 = !estado3;

  if (estado3) {
    botonActivoEquals();
  } else {
    botonInactivoEquals();
  }
};

function botonActivoEquals() {
  var cells = document.querySelectorAll("td");

  function handleClick() {
    cells.forEach(function (cell) {
      cell.classList.remove("hover-equal");
    });

    var cellId = this.id;
    var inputValue = document.getElementById("input" + cellId).value;

    cells.forEach(function (target) {
      var targetInputValue = document.getElementById("input" + target.id).value;
      if (targetInputValue === inputValue && inputValue !== '') {
        target.classList.add("hover-equal");
      }
    });
  }

  cells.forEach(function (cell) {
    cell.addEventListener("click", handleClick);
    cell.equalsClickHandler = handleClick;
  });

  document.addEventListener("click", removeEqualsHighlight);

  equalsLight.style.display = "block";
  equalsLight.style.opacity = 1;
  equalsShadow.style.opacity = 0;
  botonEquals.style.borderColor = "#BDAA7B";
}

function botonInactivoEquals() {
  var cells = document.querySelectorAll("td");

  cells.forEach(function (cell) {
    cell.classList.remove("hover-equal");
    if (cell.equalsClickHandler) {
      cell.removeEventListener("click", cell.equalsClickHandler);
      delete cell.equalsClickHandler;
    }
  });

  document.removeEventListener("click", removeEqualsHighlight);

  equalsShadow.style.display = "block";
  equalsLight.style.opacity = 0;
  equalsShadow.style.opacity = 1;
  botonEquals.style.borderColor = "black";
}

function removeEqualsHighlight(event) {
  if (!event.target.closest("td")) {
    var cells = document.querySelectorAll("td");
    cells.forEach(function (cell) {
      cell.classList.remove("hover-equal");
    });
  }
}



var estado4 = false;

document.getElementById("botonColorArea").onclick = function botonColorArea() {
  var boton = document.getElementById("botonColorArea");
  estado4 = !estado4;

  if (estado4) {
    botonActivoColorArea();
    boton.style.borderColor = "#BDAA7B"; // Borde activo
  } else {
    botonInactivoColorArea();
    boton.style.borderColor = "black"; // Borde inactivo
  }
};

function botonActivoColorArea() {
  var cells = document.querySelectorAll("td");
  var inputs = document.querySelectorAll("input");

  // Añadir eventos solo si el botón está activo
  cells.forEach(function(cell) {
    cell.addEventListener("click", handleGroupHighlight);
  });

  inputs.forEach(function(input) {
    input.addEventListener("blur", removeGroupHighlight);
  });

  colorAreaLight.style.display = "block";
  colorAreaShadow.style.display = "block";

  setTimeout(() => {
    colorAreaLight.style.opacity = 1;
    colorAreaShadow.style.opacity = 0;
  }, 10);
}

function botonInactivoColorArea() {
  var cells = document.querySelectorAll("td");

  // Eliminar el manejador de eventos cuando el botón está inactivo para evitar marcar grupos
  cells.forEach(function(cell) {
    cell.removeEventListener("click", handleGroupHighlight);
  });

  removeGroupHighlight();
  colorAreaLight.style.opacity = 0;
  colorAreaShadow.style.opacity = 1;

  setTimeout(() => {
    colorAreaLight.style.display = "none";
    colorAreaShadow.style.display = "block";
  }, 500);
}

function handleGroupHighlight(event) {
  if (!estado4) return; // No hacer nada si el botón no está activo

  var cells = document.querySelectorAll("td");
  removeGroupHighlight();

  var clickedCellId = this.id;
  var [row, col] = clickedCellId.split(".");
  row = parseInt(row);
  col = parseInt(col);

  // Calcular el inicio del grupo basado en el ID de la celda
  var startRow = row - ((row - 1) % 3);
  var startCol = col - ((col - 1) % 3);

  // Añadir la clase a todas las celdas del mismo grupo
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      var cellId = `${startRow + i}.${startCol + j}`;
      var cell = document.getElementById(cellId);
      if (cell) {
        cell.classList.add("grupoSeleccionado");
      }
    }
  }
}

function removeGroupHighlight() {
  var cells = document.querySelectorAll("td");
  cells.forEach(cell => cell.classList.remove("grupoSeleccionado"));
}







document.getElementById("botonCheckear").onclick = function botonLimpiar() {
  let boton = document.getElementById("botonCheckear");
  let checkearShadow = document.getElementById("checkearShadow");
  let checkearLight = document.getElementById("checkearLight");

  checkearShadow.style.display = "block";
  checkearLight.style.display = "block";
  checkearLight.style.zIndex = "20";

  checkearLight.style.opacity = "0";
  checkearShadow.style.opacity = "100";
  boton.style.borderColor = "#1d1c1c";

  setTimeout(function () {
    checkearLight.style.opacity = "1";
    boton.style.borderColor = "#BDAA7B";
  }, 500);

  setTimeout(function () {
    checkearLight.style.opacity = "1";
    boton.style.borderColor = "#BDAA7B";

  }, 1750);

  setTimeout(function () {
    checkearLight.style.opacity = "0.5";

  }, 2000);

  setTimeout(function () {
    boton.style.borderColor = "#1d1c1c";
    checkearLight.style.opacity = "0";
    checkearLight.style.display = "none";
    
  }, 2250);
};


document.getElementById("botonLimpiar").onclick = function botonLimpiar() {
  let boton = document.getElementById("botonLimpiar");
  let clean = document.getElementById("cleanShadow");
  let cleanGif = document.getElementById("cleanGif");

  cleanGif.style.display = "block";
  clean.style.display = "block";
  clean.style.opacity = "100";
  cleanGif.style.opacity = "0";
  cleanGif.style.transition = "opacity 1s ease-in";

  setTimeout(function () {
    cleanGif.style.opacity = "50";
    clean.style.opacity = "50";
    boton.style.borderColor = "#BDAA7B";
  }, 250);

  setTimeout(function () {
    clean.style.opacity = "0";
    clean.style.display = "none";
    cleanGif.style.opacity = "100";
  }, 500);

  setTimeout(function () {
    let inputCells = document.querySelectorAll('.inputCasilla');
  
    inputCells.forEach(cell => {
        if (cell.value.trim() === '') {
            cell.classList.remove("checkError");
            cell.classList.remove("checkEmpty");
        }
    });

  }, 1000);

  setTimeout(function () {
    clean.style.opacity = "0";
    clean.style.display = "block";
    cleanGif.style.opacity = "100";
  }, 2300);

  setTimeout(function () {
    boton.style.borderColor = "rgb(29, 28, 28)";
  }, 2400);

  setTimeout(function () {
    clean.style.opacity = "100";
    cleanGif.style.opacity = "0";
    cleanGif.style.display = "none";
    cleanGif.src = "img/clean.gif";
  }, 2500);
};

document.getElementById("botonRestart").onclick = function botonLimpiar() {
  let boton = document.getElementById("botonRestart");
  let restartShadow = document.getElementById("restartShadow");
  let restartLight = document.getElementById("restartLight");

  restartShadow.style.display = "block";
  restartLight.style.display = "block";
  restartLight.style.zIndex = "20";

  restartLight.style.opacity = "0";
  restartShadow.style.opacity = "100";
  boton.style.borderColor = "#1d1c1c";

  setTimeout(function () {
    restartLight.style.opacity = "1";
    boton.style.borderColor = "#BDAA7B";
  }, 500);

  setTimeout(function () {
    restartLight.style.opacity = "1";
    boton.style.borderColor = "#BDAA7B";

  }, 1750);

  setTimeout(function () {
    restartLight.style.opacity = "0.5";

  }, 2000);

  setTimeout(function () {
    boton.style.borderColor = "#1d1c1c";
    restartLight.style.opacity = "0";
    restartLight.style.display = "none";
    
  }, 2250);
};




