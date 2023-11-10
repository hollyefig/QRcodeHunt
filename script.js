const keyCode = [3, 5, 2, 9],
  stages = ["stage1", "stage2", "stage3", "stage4"],
  currentUrl = window.location.href,
  titleText = "QR Code Hunt!".split(""),
  colors = {
    dark: "#0e100f",
    mediumDark: "#3b438f",
    normal: "#d556fa",
    mediumLight: "#8de6e9",
    light: "#fefce1",
  },
  topBarHeight = 100,
  wrapper = document.querySelector(".wrapper"),
  questionWrapper = document.querySelector(".questionWrapper");

console.log();

// KEY CODE SETUP AT TOPBAR
keyCode.forEach((e, index) => {
  let num = document.createElement("div");
  let underline = document.createElement("div");
  num.setAttribute("class", `num_${index}`);
  num.style.opacity = 0;

  underline.setAttribute("class", "numUnderline");
  num.textContent = e;
  document.querySelector(".keyWrapper").append(num, underline);
});

// PAGE LOAD ANIMATIONS, ASSIGN ATTRIBUTE
let timeline = gsap.timeline({
  defaults: { delay: 1, duration: 0.5, ease: "power2" },
});

const scaleExpand = { scale: 2 },
  scaleDefault = { scale: 1, delay: 0, duration: 0.4 },
  topBarSet = { height: "100vh", duration: 0.7, delay: 0.3 };

for (let i = 0; i < stages.length; i++) {
  if (stages[i] !== "stage1") {
    if (currentUrl.includes(stages[i])) {
      //set wrapper name
      wrapper.setAttribute("id", stages[i]);
      let n = stages.indexOf(stages[i]) - 1;
      // Add in current keycodes entered
      console.log("get length", i);
      if (i > 1) {
        for (let k = 0; k < i - 1; k++) {
          document.querySelector(`.num_${k}`).style.opacity = 1;
        }
      }
      timeline
        .to(`.num_${n}`, { opacity: 1 })
        .fromTo(`.num_${n}`, scaleExpand, scaleDefault, "<")
        .from(".topBar", topBarSet)
        .to(
          "body",
          { backgroundPosition: "0px -190px", delay: 0, duration: 1.5 },
          "<"
        )
        .to(".questionWrapper", { display: "flex", opacity: 1, y: -20 }, "<");
    }
  } else {
    if (!currentUrl.includes("stages")) {
      wrapper.setAttribute("id", "stage1");
      // TITLE TEXT ANIMATION
      titleText.forEach((e) => {
        let span = document.createElement("span");
        if (e === " ") {
          document
            .querySelector(".title")
            .appendChild(document.createElement("br"));
        } else {
          span.textContent = e;
          document.querySelector(".title").appendChild(span);
        }
      });
      // default timeline
      timeline
        .from(".topBar", { y: -topBarHeight })
        .from(".title > span", { opacity: 0, stagger: 0.1, delay: 0 })
        .to(
          ".title > span",
          { color: colors.light, stagger: 0.1, delay: 0 },
          "<.1"
        )
        .from(".proceed", { opacity: 0, y: 20, delay: 0 });
    }
  }
}

// PROCEED BUTTON
const proceed = () => {
  let tl = gsap.timeline({
    defaults: { delay: 0, duration: 0.5, ease: "power2" },
  });
  tl.to(".proceed, .title", { opacity: 0, y: -20 })
    .to(
      "body",
      { backgroundPosition: "0px -190px", delay: 0, duration: 1.5 },
      "<"
    )
    .to(".proceed, .title", { display: "none", duration: 0 }, "<.5")
    .to(".questionWrapper", { display: "flex", duration: 0 }, "<")
    .to(".questionWrapper", { opacity: 1, y: -20 }, "<");
};

// BLUR BG, QUESTION ANSWER REVEAL
const selectAnswer = (e) => {
  const msgH2 = document.querySelector(".blurBgMsgWrapper > div > h2"),
    msgSpan = document.querySelector(".blurBgMsgWrapper > div > span");

  document.querySelector(".blurBg").style.display = "flex";
  document.querySelector(".blurBgMsgWrapper").style.display = "flex";
  gsap.timeline().to(".blurBgMsgWrapper", {
    opacity: 1,
    duration: 0.5,
    delay: 0.1,
    scale: 1,
  });

  if (!e) {
    msgH2.textContent = "(⋟﹏⋞)";
    msgSpan.textContent = "try again!";
  } else {
    msgH2.textContent = "٩(◕‿◕｡)۶";
    msgSpan.textContent = "that's correct!";
    document.querySelector(".getHint").style.display = "block";
    document.querySelector(".blurBgMsgWrapper").style.backgroundColor =
      colors.normal;

    !currentUrl.includes("stages")
      ? new Audio("sounds/wow.mp3").play()
      : new Audio("../sounds/wow.mp3").play();
  }
};

const closeBlurBg = () => {
  document.querySelector(".blurBg").style.display = "none";
  document.querySelector(".blurBgMsgWrapper").style.opacity = 0;
  document.querySelector(".blurBgMsgWrapper").style.display = "none";
  document.querySelector(".blurBgMsgWrapper").style.backgroundColor =
    colors.mediumDark;
  document.querySelector(".getHint").style.display = "none";
};
window.addEventListener("keydown", (e) => {
  e.key === "Escape" && closeBlurBg();
});

// SET UP QUESTIONS PER PAGE
for (let i = 0; i < stages.length; i++) {
  let currentStage = wrapper.attributes.id.value;

  if (currentStage === stages[i]) {
    document.querySelector(".question").textContent = data[i].q;
    data[i].options.forEach((e) => {
      let div = document.createElement("div");
      div.textContent = e.text;
      div.setAttribute("class", "listItem");
      div.setAttribute("onclick", `selectAnswer(${e.isTrue})`);
      document.querySelector(".optionWrapper").appendChild(div);
    });
  }
}
