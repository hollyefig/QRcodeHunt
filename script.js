const keyCode = [3, 5, 2, 9],
  titleText = "QR Code Hunt!".split(""),
  colors = {
    dark: "#0e100f",
    mediumDark: "#3b438f",
    normal: "#d556fa",
    mediumLight: "#8de6e9",
    light: "#fefce1",
  },
  topBarHeight = 100;

keyCode.forEach((e) => {
  let num = document.createElement("div");
  let underline = document.createElement("div");
  num.setAttribute("class", "num");
  underline.setAttribute("class", "numUnderline");
  num.textContent = e;
  document.querySelector(".keyWrapper").append(num, underline);
});

titleText.forEach((e) => {
  let span = document.createElement("span");
  if (e === " ") {
    document.querySelector(".title").appendChild(document.createElement("br"));
  } else {
    span.textContent = e;
    document.querySelector(".title").appendChild(span);
  }
});

// default timeline
let timeline = gsap.timeline({
  defaults: { delay: 1, duration: 0.5, ease: "power2" },
});
timeline
  .from(".topBar", { y: -topBarHeight })
  .from(".title > span", { opacity: 0, stagger: 0.1, delay: 0 });
