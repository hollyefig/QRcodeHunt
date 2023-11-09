const keyCode = [3, 5, 2, 9],
  currentUrl = window.location.href,
  titleText = "QR Code Hunt!".split(""),
  colors = {
    dark: "#0e100f",
    mediumDark: "#3b438f",
    normal: "#d556fa",
    mediumLight: "#8de6e9",
    light: "#fefce1",
  },
  topBarHeight = 100;

keyCode.forEach((e, index) => {
  let num = document.createElement("div");
  let underline = document.createElement("div");
  num.setAttribute("class", `num_${index} opacity0`);

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

console.log(currentUrl.includes("stage2"));

if (currentUrl.includes("stage2")) {
  let timeline = gsap.timeline({
    defaults: { delay: 1, duration: 0.5, ease: "power2" },
  });
  timeline
    .to(".num_0", { opacity: 1 })
    .from(".topBar", { height: "100vh", duration: 0.7 });
} else {
  // default timeline
  let timeline = gsap.timeline({
    defaults: { delay: 1, duration: 0.5, ease: "power2" },
  });
  timeline
    .from(".topBar", { y: -topBarHeight })
    .from(".title > span", { opacity: 0, stagger: 0.1, delay: 0 });
}
