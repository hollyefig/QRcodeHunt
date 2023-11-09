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

// PAGE LOAD ANIMATIONS

let timeline = gsap.timeline({
  defaults: { delay: 1, duration: 0.5, ease: "power2" },
});

const scaleExpand = { scale: 2 },
  scaleDefault = { scale: 1, delay: 0, duration: 0.4 },
  topBarSet = { height: "100vh", duration: 0.7, delay: 0.3 };

//  execute animation for stage 2
if (currentUrl.includes("stage2")) {
  timeline
    .to(".num_0", { opacity: 1 })
    .fromTo(".num_0", scaleExpand, scaleDefault, "<")
    .from(".topBar", topBarSet);
}
//  execute animation for stage 3
else if (currentUrl.includes("stage3")) {
  document.querySelector(".num_0").style.opacity = 1;
  timeline
    .to(".num_1", { opacity: 1 })
    .fromTo(".num_1", scaleExpand, scaleDefault, "<")
    .from(".topBar", topBarSet);
}
//  index default
else {
  // default timeline
  timeline
    .from(".topBar", { y: -topBarHeight })
    .from(".title > span", { opacity: 0, stagger: 0.1, delay: 0 })
    .to(".title > span", { color: colors.light, stagger: 0.1, delay: 0 }, "<.1")
    .from(".proceed", { opacity: 0, y: 20, delay: 0 });
}

// PROCEED BUTTON

const proceed = () => {
  let tl = gsap.timeline({
    defaults: { delay: 0, duration: 0.5, ease: "power2" },
  });

  tl.to(".proceed, .title", { opacity: 0, y: -20 })
    .to(".proceed, .title", { display: "none" }, "<.5")
    .to(".round1Wrapper", { opacity: 1, y: -20 });
};
