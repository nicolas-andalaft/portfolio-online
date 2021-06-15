function onLoad() {
  const skillBars = document.getElementsByClassName("skill-bar");
  for (element of skillBars) {
    setSkillBar(element);
  }

  const skillDots = document.getElementsByClassName("skill-dots");
  for (element of skillDots) {
    setSkillDots(element);
  }
}

function setSkillBar(element) {
  const total = 45;
  let value = element.getAttribute("value");
  value = parseInt(value * total);
  element.innerHTML = "[" + "█".repeat(value) + "/".repeat(total - value) + "]";
}

function setSkillDots(element) {
  element.innerHTML +=
    "<span class='dots'></span><span class='primary-color'>[✓]OK</span>";
}
