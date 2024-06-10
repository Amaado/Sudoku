campoMensaje = document.getElementById("campoMensaje");

//Crear código de partida
function generarCodigoPartida(){
  let codigo = "";
  let codigoPartida = document.getElementById('codigoPartida');


  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      let cell = document.getElementById(`${i + 1}.${j + 1}`);
      let input = cell.querySelector(".inputCasilla");
      if (input && input.classList.contains('initial')) {
        //console.log(`La celda en (${i+1}, ${j+1}) es inicial.`);

        codigo = codigo+"I"+input.value;
      }else if(input.value.trim() === ''){
        codigo = codigo+"B";
      }else{
        codigo = codigo + input.value;
      }
    }
  }

  codigoPartida.value = codigo;
  campoMensaje.textContent = "Código generado correctamente";
  campoMensaje.style.color = "rgb(29, 28, 28)";
  campoMensaje.style.opacity = "1";
  campoMensaje.style.visibility = "visible";
  console.log("El código es: "+codigo);
}

function descodificarCodigo(codigo) {
  if (esCodigoValido(codigo)) {
    let index = 0;  // Índice para seguir la posición en el código
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        let id = `${i + 1}.${j + 1}`;  // ID de la celda, igual que se genera en generarCodigoPartida()
        let cell = document.getElementById(`input${id}`);
        if (!cell) continue;  // Si la celda no existe, continúa con la siguiente

        // Resetear el estado de la celda antes de aplicar nuevos datos
        cell.value = '';
        cell.classList.remove('initial');
        cell.readOnly = false;

        if (index >= codigo.length) break;  // Evita leer más allá del final del código

        if (codigo[index] === 'I') {
          // El siguiente carácter después de 'I' es el número inicial
          index++;  // Avanza al número
          cell.value = codigo[index];
          cell.classList.add('initial');
          cell.readOnly = true;
        } else if (codigo[index] === 'B') {
          // Celda vacía
          cell.value = '';
        } else {
          // Un número ingresado por el usuario
          cell.value = codigo[index];
        }
        index++;  // Avanza al siguiente carácter en el código
      }
    }

    campoMensaje.textContent = "Partida cargada con éxito";
    campoMensaje.style.color = "rgb(29, 28, 28)";
    campoMensaje.style.opacity = "1";
    campoMensaje.style.visibility = "visible";
    
  } else if(codigo.trim() === ""){
    campoMensaje.textContent = "No se puede cargar una partida sin su código";
    campoMensaje.style.color = "red";
    campoMensaje.style.opacity = "1";
    campoMensaje.style.visibility = "visible";
  }else{
    campoMensaje.textContent = "El código no es válido";
    campoMensaje.style.color = "red";
    campoMensaje.style.opacity = "1";
    campoMensaje.style.visibility = "visible";
  }

}



function esCodigoValido(codigo) {
  if (typeof codigo !== 'string') {
    console.error('El código proporcionado no es un string.');
    return false;
  }

  let contador = 0; // Este contador sumará las celdas encontradas en el código.
  
  for (let i = 0; i < codigo.length; i++) {
    if (codigo[i] === 'B') {
      // Cada 'B' representa una celda vacía.
      contador++;
    } else if (codigo[i] === 'I') {
      // Si encontramos 'I', debemos asegurarnos de que hay un número después de esta letra.
      if (i + 1 < codigo.length && !isNaN(parseInt(codigo[i + 1], 10))) {
        // Aumentamos el índice para saltarnos el número que sigue a 'I', ya que 'I' no representa una celda por sí solo.
        i++;
        contador++;
      } else {
        // Si no hay un número válido después de 'I', el código es inválido.
        console.error('Código inválido: se esperaba un número después de \'I\'.');
        return false;
      }
    } else if (!isNaN(parseInt(codigo[i], 10))) {
      // Cada número que no está precedido por 'I' representa una celda con un valor.
      contador++;
    } else {
      // Si encontramos un carácter que no es 'B', 'I', ni un número, el código es inválido.
      console.error('Código inválido: contiene caracteres no permitidos.');
      return false;
    }
  }

  // Verificar si el contador suma exactamente 81, lo cual es necesario para un tablero de Sudoku completo.
  if (contador === 81) {
    return true;
  } else {
    console.error(`Código inválido: el número de elementos es ${contador}, se esperaban 81.`);
    return false;
  }
}




//Guardar en el localStorage el estado de la ruedita de ajustes
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

//Para el tooltip personalizado
document.addEventListener("DOMContentLoaded", function() {
  const tooltipContainers = document.querySelectorAll('.tooltip-container');

  tooltipContainers.forEach(tooltipContainer => {
    let timer;  // Mover el timer dentro del loop para manejarlo localmente por cada container
    let lastMousePosition = { x: 0, y: 0 };
    let tooltipVisible = false;
    let tooltip;  // Localizar la referencia de tooltip para cada container

    tooltipContainer.addEventListener('mouseenter', function(e) {
      resetTimer(e);
    });

    tooltipContainer.addEventListener('mousemove', function(ev) {
      lastMousePosition.x = ev.clientX;
      lastMousePosition.y = ev.clientY;
      if (!tooltipVisible) {
        resetTimer(ev);
      } else if (tooltip) {
        positionTooltip(tooltip, ev.clientX, ev.clientY);
      }
    });

    tooltipContainer.addEventListener('mouseleave', function() {
      clearTimeout(timer);
      removeTooltip();
      tooltipVisible = false;
    });

    function resetTimer(event) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        showTooltip(lastMousePosition.x, lastMousePosition.y);
        tooltipVisible = true;
      }, 1500);  // 2 segundos de retraso antes de mostrar el tooltip
    }

    function showTooltip(mouseX, mouseY) {
      if (!tooltip) {
        tooltip = createTooltip();
      }
      tooltip.style.left = `${mouseX + 15}px`;
      tooltip.style.top = `${mouseY - 30}px`;
      tooltip.style.visibility = 'visible';
      setTimeout(() => tooltip.style.opacity = '0.9', 10);  // Transición a completamente visible
    }

    function createTooltip() {
      let newTooltip = document.createElement('div');
      newTooltip.className = 'tooltip-text';
      newTooltip.textContent = tooltipContainer.getAttribute('data-tooltip');
      document.body.appendChild(newTooltip);
      newTooltip.style.opacity = '0';  // Inicialmente transparente
      return newTooltip;
    }

    function removeTooltip() {
      if (tooltip) {
        tooltip.style.opacity = '0';  // Inicia la transición a invisible
        setTimeout(() => {
          tooltip.style.visibility = 'hidden';
          tooltip.remove();
          tooltip = null;  // Limpiar la referencia para permitir la recreación
        }, 500); // Espera 500 ms para completar la transición antes de eliminar
      }
    }

    function positionTooltip(tooltip, mouseX, mouseY) {
      tooltip.style.left = `${mouseX + 15}px`;
      tooltip.style.top = `${mouseY - 30}px`;
    }
  });
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
  let hasEmpty = false;

  inputCells.forEach(cell => {
      if (cell.value.trim() === '') {
          cell.classList.add("checkEmpty");
          hasEmpty = true;
      } else {
          cell.classList.remove("checkEmpty");
      }
  });

  return hasEmpty;
}



document.addEventListener("DOMContentLoaded", function() {
  ensureErrorBox();
  configureDraggableErrors();
});

function configureDraggableErrors() {
  const cajaErrores = document.querySelector('.cajaErrores');
  const barraDraggableShadow = document.querySelector('.barraDraggableShadow');

  let isDragging = false;
  let dragStartX = 0;
  let dragStartY = 0;
  let initialMarginLeft = 0;
  let initialMarginTop = 0;

  barraDraggableShadow.addEventListener('mousedown', function(e) {
    isDragging = true;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    initialMarginLeft = parseInt(window.getComputedStyle(cajaErrores).marginLeft, 10);
    initialMarginTop = parseInt(window.getComputedStyle(cajaErrores).marginTop, 10);
    cajaErrores.style.cursor = 'move';
    e.preventDefault();
  });

  document.addEventListener('mousemove', function(e) {
    if (isDragging) {
      const deltaX = e.clientX - dragStartX;
      const deltaY = e.clientY - dragStartY;
      cajaErrores.style.marginLeft = `${initialMarginLeft + deltaX}px`;
      cajaErrores.style.marginTop = `${initialMarginTop + deltaY}px`;
    }
  });

  document.addEventListener('mouseup', function() {
    isDragging = false;
    cajaErrores.style.cursor = 'default';
  });
}





function ensureErrorBox() {
  let cajaErrores = document.querySelector('.cajaErrores');
  if (!cajaErrores) {
    cajaErrores = document.createElement('div');
    cajaErrores.className = 'cajaErrores';
    cajaErrores.style.position = 'absolute';
    document.body.appendChild(cajaErrores);

    let barraDraggable = document.createElement('section');
    barraDraggable.className = "barraDraggable";
    cajaErrores.appendChild(barraDraggable);

    let barraDraggableShadow = document.createElement('section');
    barraDraggableShadow.className = "barraDraggableShadow";
    cajaErrores.appendChild(barraDraggableShadow);

    let tituloError = document.createElement('section');
    tituloError.className = "tituloError";
    tituloError.innerHTML = '¡ <span class="subrayado">ERROR</span> !';
    cajaErrores.appendChild(tituloError);

    let imagenError = document.createElement('img');
    imagenError.className = "imagenError";
    imagenError.src = 'img/error.png';
    tituloError.appendChild(imagenError);

    let imagenErrorHitbox = document.createElement('section');
    imagenErrorHitbox.className = "imagenErrorHitbox";
    imagenErrorHitbox.src = 'img/errorHitbox.png';
    tituloError.appendChild(imagenErrorHitbox);

    imagenErrorHitbox.addEventListener('click', function() {
      cajaErrores.style.display = 'none';
    });
  }
  return cajaErrores;
}




function clearErrors() {
  let cajaErrores = document.querySelector('.cajaErrores');
  if (cajaErrores) {
      cajaErrores.innerHTML = '';
      cajaErrores.parentNode.removeChild(cajaErrores);
  }
}

function addError(message) {
  let cajaErrores = ensureErrorBox();
  let errorDiv = document.createElement('div');
  errorDiv.textContent = message;
  cajaErrores.appendChild(errorDiv);
  cajaErrores.style.display = "flex";
  configureDraggableErrors();
}

function checkForErrors() {
  clearErrors();
  let hasErrors = false;

  hasErrors = checkRowDuplicates() || hasErrors;
  hasErrors = checkColumnDuplicates() || hasErrors;
  hasErrors = checkGroupDuplicates() || hasErrors;
  hasErrors = checkEmptyCells() || hasErrors;
  checkSureNumbers();

  if (!hasErrors) {
      clearErrors();
  }
}

function checkSureNumbers() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      let cell = document.getElementById(`${i + 1}.${j + 1}`);
      let input = cell.querySelector(".inputCasilla");
      if (input && input.classList.contains('initial')) {
        cell.classList.add("backgroundFijo");

      }else{
        cell.classList.remove("backgroundFijo");

      }
    }
  }
}


function checkRowDuplicates() {
  let rowIds = {};
  let errorCells = [];
  let hasError = false;

  for (let i = 1; i <= 9; i++) {
      for (let j = 1; j <= 9; j++) {
          let inputId = 'input' + i + '.' + j;
          let cellValue = document.getElementById(inputId).value.trim();
        
          if (cellValue !== '') {
              if (rowIds[cellValue]) {
                  errorCells.push(inputId);
                  hasError = true;
              } else {
                  rowIds[cellValue] = true;
              }
          }
      }
      rowIds = {};
  }

  if (errorCells.length > 0) {
      addError("Número repetido en la fila: " + errorCells.map(cellId => cellId.slice(5)).join(", "));
  }

  return hasError;
}

function checkColumnDuplicates() {
  let columnIds = {};
  let errorCells = [];
  let hasError = false;

  for (let j = 1; j <= 9; j++) {
      let columnValues = {};

      for (let i = 1; i <= 9; i++) {
          let inputId = 'input' + i + '.' + j;
          let cellValue = document.getElementById(inputId).value.trim();
          
          if (cellValue !== '') {
              if (columnValues[cellValue]) {
                  errorCells.push(inputId);
                  hasError = true;
                  document.getElementById(inputId).classList.add("checkError");
              } else {
                  columnValues[cellValue] = true;
              }
          }
      }
  }

  if (errorCells.length > 0) {
      let errorDiv = document.createElement('div');
      errorDiv.textContent = "Número repetido en la columna: " + errorCells.map(cellId => cellId.slice(5)).join(", ");
      ensureErrorBox().appendChild(errorDiv);
  }

  return hasError;
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
      botonAjustesLight.style.visiblilit = "block";
      botonAjustesLight.style.opacity = 1;
      botonAjustesLight.style.transform = "translate(0%, 0%) rotate(420deg)";
      botonAjustesShadow.style.opacity = 0;
      botonAjustesShadow.style.transform = "translate(0%, 0%) rotate(420deg)";
    } else {
      botonAjustesShadow.style.visibility = "visible";
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
  botonCross.style.boxShadow = "0px 0px 5px 3px #b4a9876e, inset 0px 0px 5px 3px #b4a9876e";
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
  botonCross.style.borderColor = "rgb(29, 28, 28)";
  botonCross.style.boxShadow = "0px 0px 0px 0px #b4a9876e, inset 0px 0px 0px 0px #b4a9876e";
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
  botonEquals.style.boxShadow = "0px 0px 5px 3px #b4a9876e, inset 0px 0px 5px 3px #b4a9876e";
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
  botonEquals.style.borderColor = "rgb(29, 28, 28)";
  botonEquals.style.boxShadow = "0px 0px 0px 0px #b4a9876e, inset 0px 0px 0px 0px #b4a9876e";
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
  botonColorArea.style.boxShadow = "0px 0px 5px 3px #b4a9876e, inset 0px 0px 5px 3px #b4a9876e";
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
  botonColorArea.style.borderColor = "rgb(29, 28, 28)";
  botonColorArea.style.boxShadow = "0px 0px 0px 0px #b4a9876e, inset 0px 0px 0px 0px #b4a9876e";

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





var estado6 = false;

document.getElementById("botonCheckear").onclick = function botonCheckear() {
  if (!estado6) {
    estado6 = true;
    botonActivoCheckear();

    setTimeout(function() {
      botonInactivoCheckear();
      estado6 = false;
    }, 1000);
  }
};

function botonActivoCheckear() {
  let boton = document.getElementById("botonCheckear");
  let checkearShadow = document.getElementById("checkearShadow");
  let checkearLight = document.getElementById("checkearLight");

  checkearLight.style.display = "block";
  checkearLight.style.opacity = 1;
  checkearShadow.style.opacity = 0;
  boton.style.borderColor = "#BDAA7B";
  boton.style.boxShadow = "0px 0px 10px 3px #b4a9876e, inset 0px 0px 5px 3px #b4a9876e";

  setTimeout(function () {
      let inputs = document.querySelectorAll('.inputCasilla');
      inputs.forEach(input => {
          input.style.backgroundColor = '';
          input.classList.remove("checkError", "checkEmpty");
      });

      checkForErrors();

  }, 500);
}

function botonInactivoCheckear() {
  let boton = document.getElementById("botonCheckear");
  let checkearShadow = document.getElementById("checkearShadow");
  let checkearLight = document.getElementById("checkearLight");

  checkearShadow.style.display = "block";
  checkearLight.style.opacity = 0;
  checkearShadow.style.opacity = 1;
  boton.style.borderColor = "rgb(29, 28, 28)";
  boton.style.boxShadow = "0px 0px 20px rgba(0, 0, 0, 0.208)";
}

document.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    if (!estado6) {
      estado6 = true;
      botonActivoCheckear();
  
      setTimeout(function() {
        botonInactivoCheckear();
        estado6 = false;
      }, 1000);
    }
  }
});


var isCleaning = false;

function botonLimpiar() {
  if (isCleaning) return;
  isCleaning = true;

  let boton = document.getElementById("botonLimpiar");
  let clean = document.getElementById("cleanShadow");
  let cleanGif = document.getElementById("cleanGif");
  let cajaErrores = ensureErrorBox();
  cleanGif.style.display = "block";
  clean.style.display = "block";
  clean.style.opacity = "100";
  cleanGif.style.opacity = "0";
  cleanGif.style.transition = "opacity 1s ease-in";

  setTimeout(function () {
      cleanGif.style.opacity = "50";
      clean.style.opacity = "50";
      boton.style.borderColor = "#BDAA7B";
      boton.style.boxShadow = "0px 0px 10px 3px #b4a9876e, inset 0px 0px 5px 3px #b4a9876e";
  }, 250);

  setTimeout(function () {
      clean.style.opacity = "0";
      clean.style.display = "none";
      cleanGif.style.opacity = "100";
  }, 500);

  setTimeout(function () {
      let inputCells = document.querySelectorAll('.inputCasilla');
      inputCells.forEach(cell => {
          cell.classList.remove("checkError", "checkEmpty");
      });
      cajaErrores.style.display = "none";

      let cells = document.getElementsByClassName("initial"); 
      for (let i = 0; i < cells.length; i++) { 
        cells[i].classList.remove("backgroundFijo");
      }

  }, 1000);

  setTimeout(function () {
      clean.style.opacity = "0";
      clean.style.display = "block";
      cleanGif.style.opacity = "100";
  }, 2300);

  setTimeout(function () {
      boton.style.borderColor = "rgb(29, 28, 28)";
      boton.style.boxShadow = "0px 0px 20px rgba(0, 0, 0, 0.208)";
      cleanGif.style.opacity = "0";
      cleanGif.style.display = "none";
      cleanGif.src = "img/clean.gif";
      clean.style.opacity = "1";
      isCleaning = false;
  }, 2500);
}

document.getElementById("botonLimpiar").onclick = botonLimpiar;

document.addEventListener("keydown", function(event) {
  if ((event.key === "l" || event.key === "L") && !event.target.matches("input, textarea")) {
    botonLimpiar();
  }
});


var estado8 = false;

document.getElementById("botonGuardar").onclick = function botonGuardar() {
  if (!estado8) {
    estado8 = true;
    botonActivoGuardar();

    setTimeout(function() {
      botonInactivoGuardar();
      estado8 = false;
    }, 1000);
  }
};

function botonActivoGuardar() {
  let guardartShadow = document.getElementById("guardarShadow");
  let guardartLight = document.getElementById("guardarLight");
  let boton = document.getElementById("botonGuardar");

  console.log("botonActivoGuardar");
  guardartLight.style.display = "block";
  guardartLight.style.opacity = 1;
  guardartShadow.style.opacity = 0;
  boton.style.borderColor = "#BDAA7B";
  boton.style.boxShadow = "0px 0px 5px 3px #b4a9876e, inset 0px 0px 5px 3px #b4a9876e";

  mostrarCampoCodigoPartida();
  generarCodigoPartida();
}

function botonInactivoGuardar() {
  let guardartShadow = document.getElementById("guardarShadow");
  let guardartLight = document.getElementById("guardarLight");
  let boton = document.getElementById("botonGuardar");

  guardartShadow.style.display = "block";
  guardartLight.style.opacity = 0;
  guardartShadow.style.opacity = 1;
  boton.style.borderColor = "rgb(29, 28, 28)";
  boton.style.boxShadow = "0px 0px 20px rgba(0, 0, 0, 0.208)";
}

function mostrarCampoCodigoPartida() {
  let codigoPartida = document.getElementById('codigoPartida');
  let botonCopiar = document.getElementById('botonCopiar');
  let copiartLight = document.getElementById('copiarLight');
  let copiarShadow = document.getElementById('copiarShadow');

  codigoPartida.style.color = "#BDAA7B";
  codigoPartida.style.borderColor = "#BDAA7B";
  codigoPartida.style.boxShadow = "0px 0px 5px 3px #b4a9876e, inset 0px 0px 5px 3px #b4a9876e";
  botonCopiar.style.visibility = "visible";
  botonCopiar.style.opacity = 1;
  copiartLight.style.display = "block";
  copiartLight.style.opacity = 1;
  copiarShadow.style.opacity = 0;

  setTimeout(function() {
    codigoPartida.style.color = "rgb(29, 28, 28)";
    codigoPartida.style.borderColor = "rgb(29, 28, 28)";
    codigoPartida.style.boxShadow = "0px 0px 20px rgba(0, 0, 0, 0.208)";
    botonCopiar.style.opacity = 1;
    copiarShadow.style.display = "block";
    copiartLight.style.opacity = 0;
    copiarShadow.style.opacity = 1;
    
  }, 1000);
}

document.addEventListener("keydown", function(event) {
  if ((event.key === "s" && event.shiftKey) || (event.key === "S" && event.shiftKey)) {
    if (!estado8) {
      estado8 = true;
      botonActivoGuardar();
  
      setTimeout(function() {
        botonInactivoGuardar();
        estado8 = false;
      }, 1000);
    }
  }
});




var estado9 = false;

document.getElementById("botonCargar").onclick = function botonCargar() {
  if (!estado9) {
    estado9 = true;
    botonActivoCargar();

    setTimeout(function() {
      botonInactivoCargar();
      estado9 = false;
    }, 1000);
  }
};

function botonActivoCargar() {
  let cargartShadow = document.getElementById("cargarShadow");
  let cargartLight = document.getElementById("cargarLight");
  let boton = document.getElementById("botonCargar");
  let codigoPartida = document.getElementById('codigoPartida');


  cargartLight.style.display = "block";
  cargartLight.style.opacity = 1;
  cargartShadow.style.opacity = 0;
  boton.style.borderColor = "#BDAA7B";
  boton.style.boxShadow = "0px 0px 5px 3px #b4a9876e, inset 0px 0px 5px 3px #b4a9876e";
  mostrarCampoCodigo();
  descodificarCodigo(codigoPartida.value);
}

function botonInactivoCargar() {
  let cargartShadow = document.getElementById("cargarShadow");
  let cargartLight = document.getElementById("cargarLight");
  let boton = document.getElementById("botonCargar");

  cargartShadow.style.display = "block";
  cargartLight.style.opacity = 0;
  cargartShadow.style.opacity = 1;
  boton.style.borderColor = "rgb(29, 28, 28)";
  boton.style.boxShadow = "0px 0px 20px rgba(0, 0, 0, 0.208)";
}

function mostrarCampoCodigo() {
  let codigoPartida = document.getElementById('codigoPartida');
  let botonCargar = document.getElementById('botonCargar');
  let cargarLight = document.getElementById('cargarLight');
  let cargarShadow = document.getElementById('cargarShadow');

  codigoPartida.style.color = "#BDAA7B";
  codigoPartida.style.borderColor = "#BDAA7B";
  codigoPartida.style.boxShadow = "0px 0px 5px 3px #b4a9876e, inset 0px 0px 5px 3px #b4a9876e";
  botonCargar.style.visibility = "visible";
  botonCargar.style.opacity = 1;
  cargarLight.style.display = "block";
  cargarLight.style.opacity = 1;
  cargarShadow.style.opacity = 0;

  setTimeout(function() {
    codigoPartida.style.color = "rgb(29, 28, 28)";
    codigoPartida.style.borderColor = "rgb(29, 28, 28)";
    codigoPartida.style.boxShadow = "0px 0px 20px rgba(0, 0, 0, 0.208)";
    cargarShadow.style.display = "block";
    cargarLight.style.opacity = 0;
    cargarShadow.style.opacity = 1;
    
  }, 1000);
}

document.addEventListener("keydown", function(event) {
  if (event.key === "u" || event.key === "U") {
    if (!estado9) {
      estado9 = true;
      botonActivoCargar();
  
      setTimeout(function() {
        botonInactivoCargar();
        estado9 = false;
      }, 1000);
    }
  }
});



var estado10 = false;

document.getElementById("botonCopiar").onclick = function botonCopiar() {
  if (!estado10) {
    estado10 = true;
    botonActivoTextoCopiado();

    setTimeout(function() {
      botonInactivoTextoCopiado();
      estado10 = false;
    }, 2000);
  }
};

function botonActivoTextoCopiado() {
  let textoCopiado = document.getElementById("textoCopiado");
  let botonCopiar = document.getElementById("botonCopiar");
  let codigoPartida = document.getElementById('codigoPartida');

  botonCopiar.style.backgroundColor = "#bdaa7b"
  textoCopiado.style.visibility = "visible";
  textoCopiado.style.opacity = 1;

  copyTextToClipboard(codigoPartida.textContent);
  
}

function botonInactivoTextoCopiado() {
  let textoCopiado = document.getElementById("textoCopiado");


  textoCopiado.style.opacity = 0;
  botonCopiar.style.backgroundColor = ""

  setTimeout(function() {
    textoCopiado.style.visibility = "hidden";
  }, 500);
}

async function copyTextToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    console.log('Texto copiado al portapapeles');

    campoMensaje.textContent = "Código copiado";
    campoMensaje.style.color = "rgb(29, 28, 28)";
    campoMensaje.style.opacity = "1";
    campoMensaje.style.visibility = "visible";
  } catch (err) {
    console.log('Error al copiar texto', err);
  }
}

document.addEventListener("keydown", function(event) {
  if ((event.key === "c"  && event.shiftKey) || (event.key === "C"  && event.shiftKey)) {
    if (!estado10) {
      estado10 = true;
      botonActivoTextoCopiado();
  
      setTimeout(function() {
        botonInactivoTextoCopiado();
        estado10 = false;
      }, 2000);
    }
  }
});




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
  boton.style.boxShadow = "0px 0px 5px 3px #b4a9876e, inset 0px 0px 5px 3px #b4a9876e";
}

function botonInactivoRestart() {
  let restartShadow = document.getElementById("restartShadow");
  let restartLight = document.getElementById("restartLight");
  let boton = document.getElementById("botonRestart");

  restartShadow.style.display = "block";
  restartLight.style.opacity = 0;
  restartShadow.style.opacity = 1;
  boton.style.borderColor = "rgb(29, 28, 28)";
  boton.style.boxShadow = "0px 0px 20px rgba(0, 0, 0, 0.208)";
}

document.addEventListener("keydown", function(event) {
  if (event.key === "r" || event.key === "R") {
    if (!estado7) {
      estado7 = true;
      botonActivoRestart();
  
      setTimeout(function() {
        botonInactivoRestart();
        estado7 = false;
      }, 1000);
    }
  }
});





