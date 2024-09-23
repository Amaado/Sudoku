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

    setTimeout(() => document.getElementById("hourglass").classList.add("ready"), 100);
  }, 1100);
}

function setInitialSand() {
  inputFullness.value = 0;
  setSandFullness(0);
  
  const interval = setInterval(() => {
    if (inputFullness.value < 0) {
      inputFullness.value = inputFullness.value-1;
    }    
  }, 5);
}

window.onload = function() {
  setInitialSand();
};
