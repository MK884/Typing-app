
var textContent = document.querySelector(".text-content p");
var tryAgainBtn = document.querySelector(".btn");
var inputField = document.querySelector(".input-txt");
var mistake = document.querySelector(".mistake");
var timeTag = document.querySelector(".time");
var wpmTag = document.querySelector(".wpm");
var cpmTag = document.querySelector(".cpm");
var timeUpTag = document.querySelector(".wrapper h2");
let timer,
  maxTime = 15,
  timeLeft = maxTime;
charIndex = mistakesCnt = isTyping = 0;

const randomPara = () => {
  let randomIndex = Math.floor(Math.random() * paragraphs.length);
  textContent.innerHTML = "";
  paragraphs[randomIndex].split("").forEach((span) => {
    let spanTag = `<span>${span}</span>`;
    textContent.innerHTML += spanTag;
  });
  textContent.querySelectorAll("span")[0].classList.add('active');
  document.addEventListener("keydown", () => inputField.focus());
  textContent.addEventListener("click", () => inputField.focus());
};

const initTyping = () => {
  let typedChar = inputField.value.split("")[charIndex];
  let charecters = textContent.querySelectorAll("span");
  if (charIndex < charecters.length - 1 && timeLeft > 0) {
    if (!isTyping) {
      timer = setInterval(initTime, 1000);
      isTyping = 1;
    }
    if (typedChar == null) {
      charIndex--;
      if (charecters[charIndex].classList.contains("incorrect")) {
        mistakesCnt--;
      }
      charecters[charIndex].classList.remove("incorrect", "correct");
    } else {
      if (charecters[charIndex].innerText === typedChar) {
        charecters[charIndex].classList.add("correct");
      } else {
        charecters[charIndex].classList.add("incorrect");
        mistakesCnt++;
      }
      charIndex++;
    }
    charecters.forEach((span) => span.classList.remove("active"));

    let wpm = Math.round(
      ((charIndex - mistakesCnt) / 5 / (maxTime - timeLeft)) * 60
    );
    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
    charecters[charIndex].classList.add("active");
    mistake.innerText = mistakesCnt;
    cpmTag.innerText = charIndex - mistakesCnt;
    wpmTag.innerText = wpm;
  } else {
    clearInterval(timer);
    inputField.value = "";
    timeUpTag.classList.add("active");
  }
};

function initTime() {
  if (timeLeft > 0) {
    timeLeft--;
    timeTag.innerText = timeLeft;
    if(timeLeft <=10 ){
      timeTag.classList.add('last');
    }
  } else {
    clearInterval(timer);
  }
}

function resetGame() {
  // console.log('click');
  randomPara();
  clearInterval(timer);
  timeLeft = maxTime;
  mistakesCnt = charIndex = isTyping = 0;
  inputField.value = "";
  timeTag.innerText = timeLeft;
  cpmTag.innerText = 0;
  wpmTag.innerText = 0;
  mistake.innerText = 0;
  timeUpTag.classList.remove('active');
  timeTag.classList.remove('last');
}
tryAgainBtn.addEventListener("click", resetGame);
inputField.addEventListener("input", initTyping);
randomPara();
