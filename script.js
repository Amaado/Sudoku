let inputFullness = document.getElementById("input-fullness");
let inputFlip = document.getElementById("input-flip");

let handler1 = function(e) {
  setSandFullness(e.target.value);
}

let handler2 = function(e) {
  flip();
}

inputFullness.addEventListener("change", handler1);
inputFlip.addEventListener("click", handler2);

function setSandFullness(percent) {
  document.querySelector(".sand.top").style.height = `${percent}%`;
  document.querySelector(".sand.bottom").style.height = `${100 - percent}%`;
  inputFullness.value = percent;
  console.log(inputFullness.value);
}

function flip() {
  document.getElementById("hourglass").classList.add("flip");
  document.getElementById("hourglass").classList.remove("ready");

  setTimeout(() => {
    setSandFullness(100);
    document.getElementById("hourglass").classList.remove("flip");

    setTimeout(() => {
      document.getElementById("hourglass").classList.add("ready");

      let currentPercent = 100;
      let intervalDuration = 5; // Intervalo de tiempo en milisegundos
      let totalTime = 400; // Duración total en milisegundos
      let steps = totalTime / intervalDuration; // Total de pasos
      let decrementPerStep = 100 / steps; // Cantidad de decremento en cada paso

      const interval = setInterval(() => {
        if (currentPercent <= 0) {
          clearInterval(interval); // Detén el intervalo cuando llegue a 0
          setSandFullness(0);
          return;
        }
        currentPercent -= decrementPerStep;
        setSandFullness(currentPercent); // Actualiza el llenado de arena
      }, intervalDuration); // Cada iteración ocurre cada 5 ms
    }, 100);
  }, 350);
}

function setInitialSand() {
  setSandFullness(0);
}

window.onload = function() {
  setInitialSand();
};
