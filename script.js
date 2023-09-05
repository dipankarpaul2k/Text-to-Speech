const select = document.querySelector("#voiceSelect");
const speakBtn = document.querySelector("#speakButton");
const stopBtn = document.querySelector("#stopButton");
const options = document.querySelectorAll("[type = 'range'], [name = 'text']");

const msg = new SpeechSynthesisUtterance();
let voiceList = [];

msg.text = document.querySelector('[name="text"]').value;
console.log(msg.text);

function fetchVoiceList() {
  voiceList = this.getVoices();
  console.log(voiceList);

  select.innerHTML = voiceList
    .map(
      (voice) =>
        `<option value='${voice.name}'>${voice.name} (${voice.lang})</option>`
    )
    .join("");
}

function setVoice() {
  msg.voice = voiceList.find((voice) => voice.name === this.value);
  toggle();
}

function toggle(startOver = true) {
  speechSynthesis.cancel();
  if (startOver) {
    speechSynthesis.speak(msg);
  }
}

function setOptions() {
  console.log(this.name, this.value);
  msg[this.name] = this.value;
  toggle();
}

function displayValues() {
  document.querySelector(".rateValue").innerHTML =
    document.querySelector("[name = 'rate']").value;
  document.querySelector(".pitchValue").innerHTML =
    document.querySelector("[name = 'pitch']").value;
}

speechSynthesis.addEventListener("voiceschanged", fetchVoiceList);
select.addEventListener("change", setVoice);
speakBtn.addEventListener("click", toggle);
stopBtn.addEventListener("click", () => toggle(false));
options.forEach((option) => {
  option.addEventListener("change", setOptions);
  option.addEventListener("input", displayValues);
});
