const keyCode = [3, 5, 2, 9],
  stages = ["stage1", "stage2", "stage3", "stage4", "stage5"],
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

// KEY CODE SETUP AT TOPBAR
keyCode.forEach((e, index) => {
  let numWrapper = document.createElement("div");
  let num = document.createElement("span");
  let underline = document.createElement("div");
  numWrapper.setAttribute("class", `num_${index}`);
  num.style.opacity = 0;

  underline.setAttribute("class", "numUnderline");
  num.textContent = e;
  document.querySelector(".keyWrapper").append(numWrapper, underline);
  numWrapper.appendChild(num);
});

// GSAP standards
let timeline = gsap.timeline({
  defaults: { delay: 1, duration: 0.5, ease: "power2" },
});
const scaleExpand = { scale: 2 },
  scaleDefault = { scale: 1, delay: 0, duration: 0.4 },
  topBarSet = { height: topBarHeight, duration: 0.7, delay: 0.3 };

// GET HINT
const getHint = () => {
  const msg = document.querySelector(".blurBgMsgWrapper span");
  let num =
    parseInt(document.querySelector(".wrapper").getAttribute("id").slice(-1)) -
    1;
  timeline
    .to(".blurBgMsgWrapper", { backgroundColor: colors.light, delay: 0.5 })
    .to(".blurBgMsgWrapper h2", { height: 0, padding: 0, margin: 0, delay: 0 })
    .to(".getHint", { height: 0, padding: 0, margin: 0, delay: 0 }, "<")
    .add(() => (msg.textContent = data[num].hint))
    .to(msg, { color: colors.mediumDark, duration: 1, delay: 0 });

  document.querySelector(".blurBg").removeAttribute("onclick");
};

// ENTER IN THE UNLOCKED KEY NUMBER
const enterKey = (e) => {
  const keyEntryMsg = document.querySelector(".keyEntryMsg");
  // animations for keyPress
  timeline
    .to(`.num_${e} > span`, { opacity: 1, delay: 0 })
    .fromTo(`.num_${e} > span`, scaleExpand, scaleDefault, "<")
    .to(".keyEntryDiv", { height: "auto", delay: 0 })
    .to(".keyEntryDiv", { opacity: 1, delay: 0 }, "<.3");
  document.querySelector(`.num_${e}`).classList.remove("numBgFlash");

  // entry for key input message
  for (let i = 0; i < stages.length; i++) {
    let currentStage = wrapper.attributes.id.value;
    if (currentStage === stages[i]) {
      keyEntryMsg.textContent = data[i].keyMsg;
    }
  }
};

// GO TO NEXT QUESTION
const nextQ = () => {
  timeline
    .to(".keyEntryDiv", { delay: 0, opacity: 0 })
    .to(".topBar", topBarSet)
    .to(".keyEntryDiv", { height: 0, delay: 0 }, "<")
    .to(
      "body",
      { backgroundPosition: "0px -190px", delay: 0, duration: 1.5 },
      "<"
    )
    .to(".questionWrapper", { display: "flex", opacity: 1, y: -20 }, "<");
};

// PAGE LOAD ANIMATIONS, ASSIGN ATTRIBUTE
for (let i = 0; i < stages.length; i++) {
  if (stages[i] !== "stage1") {
    if (currentUrl.includes(stages[i])) {
      //set wrapper name
      wrapper.setAttribute("id", stages[i]);
      document.querySelector(".topBar").style.height = "100vh";
      let n = stages.indexOf(stages[i]) - 1,
        currentNum = document.querySelector(`.num_${n}`);
      // Add in current keycodes entered
      if (i > 1) {
        for (let k = 0; k < i - 1; k++) {
          document.querySelector(`.num_${k} > span`).style.opacity = 1;
          document
            .querySelector(`.num_${k} > span`)
            .removeAttribute("onclick", `enterKey(${k})`);
        }
      }
      currentNum.classList.add("numBgFlash");
      currentNum.setAttribute("onclick", `enterKey(${n})`);
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
    .from(".questionWrapper", { opacity: 0, y: 40 }, "<");
};

// BLUR BG, QUESTION ANSWER REVEAL
const selectAnswer = (e) => {
  const msgH2 = document.querySelector(".blurBgMsgWrapper > div > h2"),
    msgSpan = document.querySelector(".blurBgMsgWrapper > div > span");

  document.querySelector(".blurBg").style.display = "flex";
  document.querySelector(".blurBgMsgWrapper").style.display = "flex";
  gsap.timeline().to(".blurBgMsgWrapper", {
    opacity: 1,
    duration: 0.3,
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

// CLOSE BLUR BG
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
let currentStage = wrapper.attributes.id.value,
  i = parseInt(currentStage.slice(-1) - 1);
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
