document.addEventListener("DOMContentLoaded", function () {
  const iconoAjustes = document.getElementById("botonAjustes");
  const menu = document.getElementById("menu");

  if (localStorage.getItem("menuActivo") === "true") {
    menu.classList.add("active");
  } else {
    menu.classList.remove("active");
  }

  iconoAjustes.addEventListener("click", function () {
    menu.classList.toggle("active");
    localStorage.setItem("menuActivo", menu.classList.contains("active"));
  });

  generarNumerosIniciales();
});



function generarNumerosIniciales() {
  let tableroCompleto = generarTableroCompleto();
  
  let tableroVisible = tableroCompleto.map(row => row.slice());

  eliminarCeldasAleatoriamente(tableroVisible, 30);

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      let cell = document.getElementById(`input${i + 1}.${j + 1}`);
      if (tableroVisible[i][j] !== 0) {
        cell.value = tableroVisible[i][j];
        cell.readOnly = true;
        cell.classList.add("initial");
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




var estado1 = localStorage.getItem("estado1") === "true";

document.addEventListener("DOMContentLoaded", function () {
  var boton = document.getElementById("botonAjustes");
  var botonAjustesLight = document.getElementById("botonAjustesLight");
  var botonAjustesShadow = document.getElementById("botonAjustesShadow");

  applyButtonState(estado1, true);

  boton.onclick = function() {
    estado1 = !estado1;
    localStorage.setItem("estado1", estado1);
    applyButtonState(estado1, false);
  };

  function applyButtonState(active, noTransition) {
    if (noTransition) {
      botonAjustesLight.style.transition = 'none';
      botonAjustesShadow.style.transition = 'none';
    }

    if (active) {
      botonAjustesLight.style.display = "block";
      botonAjustesLight.style.opacity = 1;
      botonAjustesLight.style.transform = "translate(0%, 0%) rotate(420deg)";
      botonAjustesShadow.style.opacity = 0;
      botonAjustesShadow.style.transform = "translate(0%, 0%) rotate(420deg)";
    } else {
      botonAjustesShadow.style.display = "block";
      botonAjustesLight.style.opacity = 0;
      botonAjustesLight.style.transform = "translate(0%, 0%) rotate(0deg)";
      botonAjustesShadow.style.opacity = 1;
      botonAjustesShadow.style.transform = "translate(0%, 0%) rotate(0deg)";
    }

    if (noTransition) {
      setTimeout(() => {
        botonAjustesLight.style.transition = '';
        botonAjustesShadow.style.transition = '';
      }, 50);
    }
  }
});

document.getElementById("botonCross").onclick = function botonCross() {
  var boton = document.getElementById("botonCross");
  var estado2 = localStorage.getItem("estado2") === "true";

  estado2 = !estado2;

  localStorage.setItem("estado2", estado2);

  if (estado2) {
    botonActivoCross();
  } else {
    botonInactivoCross();
  }
};

document.addEventListener("DOMContentLoaded", function() {
  var estado2 = localStorage.getItem("estado2") === "true";
  var boton = document.getElementById("botonCross");

  if (estado2) {
    botonActivoCross();
  } else {
    botonInactivoCross();
  }
});


function botonActivoCross() {
  var cells = document.querySelectorAll("td");

  function handleClick() {
    cells.forEach(function (cell) {
      cell.classList.remove("hover-row");
      cell.classList.remove("hover-column");
    });

    var cellId = this.id;
    var [row, column] = cellId.split(".");

    cells.forEach(function (target) {
      if (target.id.startsWith(row + ".")) {
        target.classList.add("hover-row");
      }
    });

    cells.forEach(function (target) {
      if (target.id.endsWith("." + column)) {
        target.classList.add("hover-column");
      }
    });
  }

  cells.forEach(function (cell) {
    cell.addEventListener("click", handleClick);
    cell.crossClickHandler = handleClick;
  });

  document.addEventListener("click", removeCrossHighlight);
  document.querySelector(".sudoku-container").addEventListener("click", stopPropagation);

  crossLight.style.display = "block";
  crossLight.style.opacity = 1;
  crossShadow.style.opacity = 0;
  botonCross.style.borderColor = "#BDAA7B";
}

function botonInactivoCross() {
  var cells = document.querySelectorAll("td");

  cells.forEach(function (cell) {
    cell.classList.remove("hover-row");
    cell.classList.remove("hover-column");
    if (cell.crossClickHandler) {
      cell.removeEventListener("click", cell.crossClickHandler);
      delete cell.crossClickHandler;
    }
  });

  document.removeEventListener("click", removeCrossHighlight);
  document.querySelector(".sudoku-container").removeEventListener("click", stopPropagation);

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

document.getElementById("botonEquals").onclick = function botonEquals() {
  var boton = document.getElementById("botonEquals");
  var estado3 = localStorage.getItem("estado3") === "true";

  estado3 = !estado3;

  localStorage.setItem("estado3", estado3);

  if (estado3) {
    botonActivoEquals();
  } else {
    botonInactivoEquals();
  }
};

document.addEventListener("DOMContentLoaded", function() {
  var estado3 = localStorage.getItem("estado3") === "true";
  var boton = document.getElementById("botonEquals");

  if (estado3) {
    botonActivoEquals();
  } else {
    botonInactivoEquals();
  }
});

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



document.getElementById("botonColorArea").onclick = function botonColorArea() {
  var boton = document.getElementById("botonColorArea");
  var estado4 = localStorage.getItem("estado4") === "true";

  estado4 = !estado4;

  localStorage.setItem("estado4", estado4);

  if (estado4) {
    botonActivoColorArea();
  } else {
    botonInactivoColorArea();
  }
};

document.addEventListener("DOMContentLoaded", function() {
  var botonColorArea = document.getElementById("botonColorArea");
  var estado4 = localStorage.getItem("estado4") === "true";

  if (estado4) {
    botonActivoColorArea();
  } else {
    botonInactivoColorArea();
  }

  botonColorArea.onclick = function() {
    estado4 = !estado4;
    localStorage.setItem("estado4", estado4);

    if (estado4) {
      botonActivoColorArea();
    } else {
      botonInactivoColorArea();
    }
  };
});

function botonActivoColorArea() {
  var cells = document.querySelectorAll("td");
  var inputs = document.querySelectorAll("input");
  var colorAreaLight = document.getElementById("colorAreaLight");
  var colorAreaShadow = document.getElementById("colorAreaShadow");

  cells.forEach(function(cell) {
    cell.addEventListener("click", handleGroupHighlight);
  });

  inputs.forEach(function(input) {
    input.addEventListener("blur", removeGroupHighlight);
  });

  botonColorArea.style.borderColor = "#BDAA7B";
  colorAreaLight.style.display = "block";
  colorAreaShadow.style.display = "block";
  colorAreaLight.style.opacity = 1;
  colorAreaShadow.style.opacity = 0;
}

function botonInactivoColorArea() {
  var cells = document.querySelectorAll("td");
  var colorAreaLight = document.getElementById("colorAreaLight");
  var colorAreaShadow = document.getElementById("colorAreaShadow");

  cells.forEach(function(cell) {
    cell.removeEventListener("click", handleGroupHighlight);
  });

  removeGroupHighlight();
  colorAreaLight.style.opacity = 0;
  colorAreaShadow.style.opacity = 1;
  botonColorArea.style.borderColor = "black";

  colorAreaLight.addEventListener('transitionend', function handler() {
    if (parseFloat(colorAreaLight.style.opacity) === 0) {
      colorAreaLight.style.display = 'none';
      colorAreaShadow.style.display = 'block';
      colorAreaLight.removeEventListener('transitionend', handler);
    }
  });
}

function handleGroupHighlight(event) {
  var estado4 = localStorage.getItem("estado4") === "true";
  if (!estado4) return;

  var target = event.target;
  if (target.tagName !== "INPUT") {
    return;
  }

  removeGroupHighlight();

  var inputId = target.id;
  var parts = inputId.match(/(\d+)\.(\d+)/);
  if (!parts) return;

  var row = parseInt(parts[1], 10);
  var col = parseInt(parts[2], 10);

  var startRow = row - ((row - 1) % 3);
  var startCol = col - ((col - 1) % 3);

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      var cellId = `input${startRow + i}.${startCol + j}`;
      var cell = document.getElementById(cellId);
      if (cell) {
        cell.parentNode.classList.add("grupoSeleccionado");
      }
    }
  }
}

function removeGroupHighlight() {
  var cells = document.querySelectorAll("td");
  cells.forEach(cell => cell.classList.remove("grupoSeleccionado"));
}








var isChecking = false;

document.getElementById("botonCheckear").onclick = function botonLimpiar() {
  if (isChecking) return;
  isChecking = true;
  
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
    isChecking = false;
  }, 2250);
};


var isCleaning = false;

document.getElementById("botonLimpiar").onclick = function botonLimpiar() {
  if (isCleaning) return;
  isCleaning = true;
  
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
    cleanGif.style.opacity = "0";
    cleanGif.style.display = "none";
    cleanGif.src = "img/clean.gif";
    clean.style.opacity = "1";
    isCleaning = false;
  }, 2500);
};





var estado7 = false;

document.getElementById("botonRestart").onclick = function botonRestart() {
  if (!estado7) {
    estado7 = true;
    botonActivoRestart();

    setTimeout(function() {
      botonInactivoRestart();
      estado7 = false;
    }, 1000);
  }
};

function botonActivoRestart() {
  let restartShadow = document.getElementById("restartShadow");
  let restartLight = document.getElementById("restartLight");
  let boton = document.getElementById("botonRestart");

  restartLight.style.display = "block";
  restartLight.style.opacity = 1;
  restartShadow.style.opacity = 0;
  boton.style.borderColor = "#BDAA7B";
}

function botonInactivoRestart() {
  let restartShadow = document.getElementById("restartShadow");
  let restartLight = document.getElementById("restartLight");
  let boton = document.getElementById("botonRestart");

  restartShadow.style.display = "block";
  restartLight.style.opacity = 0;
  restartShadow.style.opacity = 1;
  boton.style.borderColor = "black";
}





