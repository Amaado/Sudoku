for (let i = 1; i <= 9; i++) {
  for (let j = 1; j <= 9; j++) {
    document.getElementById("input" + i + "." + j).onblur =
      function comprobar() {
        let input = document.getElementById("input" + i + "." + j);
        let celda = document.getElementById(i + "." + j);

        if (isNaN(input.value)) {
          //input.style.backgroundColor = "#b82200a9";
          input.style.background = "url('img/redSpot.png') center no-repeat";
          input.style.backgroundSize = "cover" ;
          
          //celda.style.zIndex=1;

        } else if (0 < input.value) {
          input.style.background = "";

        } else {
          //input.style.backgroundColor = "#45ff34ad";
          
          input.style.background = "url('img/greenSpot.png') center no-repeat";
          input.style.backgroundSize = "cover" ;
          
          //input.style.color = "#c8bda177";
          //input.style.color = "red";
          //input.style.mixBlendMode = "";
          


        }
      };
  }
}


document.getElementById("botonLimpiar").onclick = function limpiar() {
  for (let i = 1; i <= 9; i++) {
    for (let j = 1; j <= 9; j++) {
      let input = document.getElementById("input" + i + "." + j);
      let celda = document.getElementById(i + "." + j);

      input.style.background = "none";
      restaurarHover();
    }
  }
};


function restaurarHover() {
  let cells = document.querySelectorAll("td");

  cells.forEach(function (cell) {
    
  });
}



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

document.addEventListener("DOMContentLoaded", function() {
  const iconoAjustes = document.getElementById("settings");
  const menu = document.getElementById("menu");

  iconoAjustes.addEventListener("click", function() {
    menu.classList.toggle("active");
  });
});