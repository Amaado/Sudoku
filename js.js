for (let i = 1; i <= 9; i++) {
  for (let j = 1; j <= 9; j++) {
    document.getElementById("input" + i + "." + j).onblur =
      function comprobar() {
        let input = document.getElementById("input" + i + "." + j);
        let celda = document.getElementById(i + "." + j);

        if (isNaN(input.value)) {
          input.style.background = "url('img/redSpot.png') center no-repeat";
          input.style.backgroundSize = "cover";


        } else if (0 < input.value) {
          input.style.background = "";

        } else {
          input.style.background = "url('img/greenSpot.png') center no-repeat";
          input.style.backgroundSize = "cover";

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




document.addEventListener("DOMContentLoaded", function () {
  const iconoAjustes = document.getElementById("botonAjustes");
  const menu = document.getElementById("menu");

  iconoAjustes.addEventListener("click", function () {
    menu.classList.toggle("active");
  });
});

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


estado2=false;

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
  function botonActivoCross_hoverActivo() {
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
  }
  botonActivoCross_hoverActivo();

  crossLight.style.display = "block";
  crossLight.style.opacity = 1;
  crossShadow.style.opacity = 0;
  botonCross.style.borderColor = "#BDAA7B";
}

function botonInactivoCross() {
  function botonActivoCross_hoverNoActivo() {
    var cells = document.querySelectorAll("td");

    function handleClick() {
      cells.forEach(function (cell) {
        if(target.id.endsWith(1 + "." + 3) ||
        target.id.endsWith(1 + "." + 6) ||
        target.id.endsWith(1 + "." + 9) ||
        target.id.endsWith(2 + "." + 3) ||
        target.id.endsWith(2 + "." + 6) ||
        target.id.endsWith(2 + "." + 9) ||
        target.id.endsWith(3 + "." + 3) ||
        target.id.endsWith(3 + "." + 6) ||
        target.id.endsWith(3 + "." + 9) ||
        target.id.endsWith(7 + "." + 3) ||
        target.id.endsWith(7 + "." + 6) ||
        target.id.endsWith(7 + "." + 9) ||
        target.id.endsWith(8 + "." + 3) ||
        target.id.endsWith(8 + "." + 6) ||
        target.id.endsWith(8 + "." + 9) ||
        target.id.endsWith(9 + "." + 3) ||
        target.id.endsWith(9 + "." + 6) ||
        target.id.endsWith(9 + "." + 9)){
          cell.classList.remove("hover-row-default-color");
        cell.classList.remove("hover-column-default-color");

        }else{ 
        cell.classList.remove("hover-row-default");
        cell.classList.remove("hover-column-default");
        }

      });

      var cellId = this.id;
      var [row, column] = cellId.split(".");

      cells.forEach(function (target) {
        if (target.id.startsWith(row + ".")) {
          if(
            target.id.endsWith(1 + "." + 3) ||
            target.id.endsWith(1 + "." + 6) ||
            target.id.endsWith(1 + "." + 9) ||
            target.id.endsWith(2 + "." + 3) ||
            target.id.endsWith(2 + "." + 6) ||
            target.id.endsWith(2 + "." + 9) ||
            target.id.endsWith(3 + "." + 3) ||
            target.id.endsWith(3 + "." + 6) ||
            target.id.endsWith(3 + "." + 9) ||
            target.id.endsWith(7 + "." + 3) ||
            target.id.endsWith(7 + "." + 6) ||
            target.id.endsWith(7 + "." + 9) ||
            target.id.endsWith(8 + "." + 3) ||
            target.id.endsWith(8 + "." + 6) ||
            target.id.endsWith(8 + "." + 9) ||
            target.id.endsWith(9 + "." + 3) ||
            target.id.endsWith(9 + "." + 6) ||
            target.id.endsWith(9 + "." + 9)){
            target.classList.add("hover-row-default-color");
          }else{
            target.classList.add("hover-row-default");
          }
          
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

          if(target.id.endsWith(1 + "." + 3) ||
          target.id.endsWith(1 + "." + 6) ||
          target.id.endsWith(1 + "." + 9) ||
          target.id.endsWith(2 + "." + 3) ||
          target.id.endsWith(2 + "." + 6) ||
          target.id.endsWith(2 + "." + 9) ||
          target.id.endsWith(3 + "." + 3) ||
          target.id.endsWith(3 + "." + 6) ||
          target.id.endsWith(3 + "." + 9) ||
          target.id.endsWith(7 + "." + 3) ||
          target.id.endsWith(7 + "." + 6) ||
          target.id.endsWith(7 + "." + 9) ||
          target.id.endsWith(8 + "." + 3) ||
          target.id.endsWith(8 + "." + 6) ||
          target.id.endsWith(8 + "." + 9) ||
          target.id.endsWith(9 + "." + 3) ||
          target.id.endsWith(9 + "." + 6) ||
          target.id.endsWith(9 + "." + 9)){
            target.classList.add("hover-column-default-color");
          }
          target.classList.add("hover-column-default");
        }
      });
    }

    cells.forEach(function (cell) {
      cell.addEventListener("click", handleClick);
    });

    document.addEventListener("click", function (event) {
      if (!event.target.closest("td")) {
        cells.forEach(function (cell) {

          if(target.id.endsWith(1 + "." + 3) ||
          target.id.endsWith(1 + "." + 6) ||
          target.id.endsWith(1 + "." + 9) ||
          target.id.endsWith(2 + "." + 3) ||
          target.id.endsWith(2 + "." + 6) ||
          target.id.endsWith(2 + "." + 9) ||
          target.id.endsWith(3 + "." + 3) ||
          target.id.endsWith(3 + "." + 6) ||
          target.id.endsWith(3 + "." + 9) ||
          target.id.endsWith(7 + "." + 3) ||
          target.id.endsWith(7 + "." + 6) ||
          target.id.endsWith(7 + "." + 9) ||
          target.id.endsWith(8 + "." + 3) ||
          target.id.endsWith(8 + "." + 6) ||
          target.id.endsWith(8 + "." + 9) ||
          target.id.endsWith(9 + "." + 3) ||
          target.id.endsWith(9 + "." + 6) ||
          target.id.endsWith(9 + "." + 9)){
            cell.classList.remove("hover-row-default-color");
            cell.classList.remove("hover-column-default-color");
          }else{ 
          cell.classList.remove("hover-row-default");
          cell.classList.remove("hover-column-default");
          }
        });
      }
    });
  }
  botonActivoCross_hoverNoActivo();



  crossShadow.style.display = "block";
  crossLight.style.opacity = 0;
  crossShadow.style.opacity = 1;
  botonCross.style.borderColor = "black";
}




/*
estado2=false;

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
  function hovers() {
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
  }
  hovers();

  crossLight.style.display = "block";
  crossLight.style.opacity = 1;
  crossShadow.style.opacity = 0;
  botonCross.style.borderColor = "#BDAA7B";
}

function botonInactivoCross() {
  crossShadow.style.display = "block";
  crossLight.style.opacity = 0;
  crossShadow.style.opacity = 1;
  botonCross.style.borderColor = "black";
}
*/




/*
function hovers() {
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
}

hovers();

*/




estado3=false;

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
  equalsLight.style.display = "block";
  equalsLight.style.opacity = 1;
  equalsShadow.style.opacity = 0;
  botonEquals.style.borderColor = "#BDAA7B";
}

function botonInactivoEquals() {
  equalsShadow.style.display = "block";
  equalsLight.style.opacity = 0;
  equalsShadow.style.opacity = 1;
  botonEquals.style.borderColor = "black";
}

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
