for (let i = 1; i <= 9; i++) {
  for (let j = 1; j <= 9; j++) {
    document.getElementById("input" + i + "." + j).onblur =
      function comprobar() {
        let input = document.getElementById("input" + i + "." + j);
        let celda = document.getElementById(i + "." + j);

        if (isNaN(input.value)) {
          //input.style.backgroundColor = "#b82200a9";
          input.style.background = "url('img/redSpot.png') center no-repeat";
          input.style.backgroundSize = "cover";

          //celda.style.zIndex=1;
        } else if (0 < input.value) {
          input.style.background = "";
        } else {
          //input.style.backgroundColor = "#45ff34ad";

          input.style.background = "url('img/greenSpot.png') center no-repeat";
          input.style.backgroundSize = "cover";

          //input.style.color = "#c8bda177";
          //input.style.color = "red";
          //input.style.mixBlendMode = "";
        }
      };
  }
}










/*
function restaurarHover();

function restaurarHover() {
  let cells = document.querySelectorAll("td");

  cells.forEach(function (cell) {});
}
*/

/*
function ForbidenInput(input) {
  var valor = input.value;

  if (valor === '0' || isNaN(valor)) {
      input.value = '';
      
  }
}
*/
document.addEventListener("DOMContentLoaded", function hovers() {
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
      if (
        target.id.endsWith("." + 3) ||
        target.id.endsWith("." + 6) ||
        target.id.endsWith("." + 9)
      ) {
        target.classList.add("hover-border-replace");
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
  });

  document.addEventListener("click", function (event) {
    if (!event.target.closest("td")) {
      cells.forEach(function (cell) {
        cell.classList.remove("hover-row");
        cell.classList.remove("hover-column");
      });
    }
  });
});



document.addEventListener("DOMContentLoaded", function () {
  const iconoAjustes = document.getElementById("botonAjustes");
  const menu = document.getElementById("menu");

  iconoAjustes.addEventListener("click", function () {
    menu.classList.toggle("active");
    
  });
});







var estado = false; // Estado inicial: falso

document.getElementById("botonAjustes").onclick = function toggleEstado() {
    var boton = document.getElementById("botonAjustes");
    estado = !estado; // Cambiar el estado (de verdadero a falso o de falso a verdadero)
    
    // Llamar a la función correspondiente según el estado
    if (estado) {
        botonActivo();
    } else {
        botonInactivo();
    }
}

function botonActivo() {
  
  botonAjustesLight.style.transform = "translate(0%, 0%) rotate(420deg)";
  botonAjustesShadow.style.transform = "translate(0%, 0%) rotate(420deg)";
  botonAjustesLight.style.display = "block";
  botonAjustesLight.style.opacity = 1; // Hacer visible el botón activo
  botonAjustesShadow.style.opacity = 0; // Hacer invisible el botón inactivo

  
}

function botonInactivo() {
  botonAjustesLight.style.transform = "translate(0%, 0%) rotate(0deg)"; // Restaurar la rotación a cero grados
  botonAjustesShadow.style.transform = "translate(0%, 0%) rotate(0deg)";
  botonAjustesShadow.style.display = "block";
  botonAjustesLight.style.opacity = 0; // Hacer invisible el botón activo
    botonAjustesShadow.style.opacity = 1; // Hacer visible el botón inactivo

    
  }










document.getElementById("botonLimpiar").onclick = function limpiar() {
  let boton= document.getElementById("botonLimpiar")
  let clean = document.getElementById("clean");
  let cleanGif = document.getElementById("cleanGif");

  cleanGif.style.display = "block";
  clean.style.display = "block";
  clean.style.opacity = "100";
  cleanGif.style.opacity = "0";
  cleanGif.style.transition = "opacity 1s ease-in";
  

  setTimeout(function () {
    cleanGif.style.opacity = "50";
    clean.style.opacity = "50";
    
  }, 250);

  setTimeout(function () {
    clean.style.opacity = "0";
    clean.style.display = "none";
    cleanGif.style.opacity = "100";
    boton.style.borderColor = "#BDAA7B";
    
    
  }, 500);

  setTimeout(function () {
    for (let i = 1; i <= 9; i++) {
      for (let j = 1; j <= 9; j++) {
        let input = document.getElementById("input" + i + "." + j);
        let celda = document.getElementById(i + "." + j);
        
        input.style.background = "none";
        
      }
    }
    
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