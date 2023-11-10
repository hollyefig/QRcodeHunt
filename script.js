const keyCode = [3, 5, 2, 9],
  stages = ["stage1", "stage2", "stage3"],
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
  wrapper = document.querySelector(".wrapper");

// KEY CODE SETUP AT TOPBAR
keyCode.forEach((e, index) => {
  let num = document.createElement("div");
  let underline = document.createElement("div");
  num.setAttribute("class", `num_${index} opacity0`);

  underline.setAttribute("class", "numUnderline");
  num.textContent = e;
  document.querySelector(".keyWrapper").append(num, underline);
});

// TITLE TEXT ANIMATION
titleText.forEach((e) => {
  let span = document.createElement("span");
  if (e === " ") {
    document.querySelector(".title").appendChild(document.createElement("br"));
  } else {
    span.textContent = e;
    document.querySelector(".title").appendChild(span);
  }
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
      wrapper.setAttribute("id", stages[i]);
      let n = stages.indexOf(stages[i]);
      timeline
        .to(`.num_${n - 1}`, { opacity: 1 })
        .fromTo(`.num_${n - 1}`, scaleExpand, scaleDefault, "<")
        .from(".topBar", topBarSet);
    }
  } else {
    if (currentUrl.includes("index")) {
      wrapper.setAttribute("id", "stage1");
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
    .to(".proceed, .title", { display: "none" }, "<.5")
    .to(".questionWrapper", { display: "flex", opacity: 1, y: -20 });
};

// BLUR BG
const selectAnswer = (e) => {
  console.log(e);
  document.querySelector(".blurBg").style.display = "block";
};

const closeBlurBg = () => {
  document.querySelector(".blurBg").style.display = "none";
};

// SET UP QUESTIONS PER PAGE
for (let i = 0; i < stages.length; i++) {
  let currentStage = wrapper.attributes.id.value,
    questionWrapper = document.querySelector(".questionWrapper");

  if (currentStage === stages[i]) {
    questionWrapper.children[0].textContent = data[i].q;
    data[i].options.forEach((e) => {
      let li = document.createElement("li");
      li.textContent = e.text;
      li.setAttribute("class", "listItem");
      li.setAttribute("onclick", `selectAnswer(${e.isTrue})`);
      questionWrapper.children[1].appendChild(li);
    });
  }
}
