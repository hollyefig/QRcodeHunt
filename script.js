const keyCode = [6, 8, 4, 5],
  currentUrl = window.location.href,
  titleText = "QR Code Hunt!".split(""),
  colors = {
    dark: "#0e100f",
    mediumDark: "#3b438f",
    normal: "#a056fa",
    mediumLight: "#8de6e9",
    light: "#fefce1",
  },
  topBarHeight = 70,
  wrapper = document.querySelector(".wrapper"),
  questionWrapper = document.querySelector(".questionWrapper");

//  ASSIGN STAGES ARRAY
let stages = [];
for (let i = 0; i < data.length; i++) {
  stages.push(`stage${i + 1}`);
}

// SET UP VARIABLES
let setCurrent = new URL(window.location.href);
// set a current variable
let currentStage = stages[0];
// Create a new URLSearchParams object or get existing parameters
const params = setCurrent.searchParams;
// Set the variable in the URL
params.set("stages", currentStage);
// Replace the current URL with the updated parameters
window.history.replaceState({}, "", setCurrent);

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
    .to(".questionWrapper", { opacity: 1 }, "<")
    .from(".questionWrapper", { y: 40 }, "<");
};

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

// CONFETTI !!!
const confettiAnimation = () => {
  const confettiCount = 100, // Number of confetti particles
    body = document.querySelector("body"),
    colorSet = [colors.mediumDark, colors.normal, colors.mediumLight];

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.backgroundColor =
      colorSet[Math.floor(Math.random() * colorSet.length)]; // Randomly choose a color
    body.appendChild(confetti);

    // Set random horizontal position
    confetti.style.left = Math.random() * 100 + "vw"; // Random horizontal position

    // Set varied animation duration for each confetti
    confetti.style.animationDuration = Math.random() * 3 + 1 + "s"; // Random animation duration between 1 to 4 seconds

    // Set varied vertical positions for each confetti
    confetti.style.top = Math.random() * 100 + "vh"; // Random vertical position
  }

  // Remove confetti after 5 seconds
  setTimeout(() => {
    const confetti = document.querySelectorAll(".confetti");
    confetti.forEach((item) => {
      item.remove();
    });
  }, 5000); // Remove after 5 seconds (5000 milliseconds)
};

// ENTER IN THE UNLOCKED KEY NUMBER
const enterKey = (e) => {
  const keyEntryMsg = document.querySelector(".keyEntryMsg");
  // insert next question button except for final stage
  if (!currentStage.includes("stage5")) {
    const nextQ = document.createElement("button");
    nextQ.classList.add("nextQ");
    nextQ.setAttribute("type", "button");
    nextQ.setAttribute("onclick", "nextQ()");
    nextQ.textContent = "Next Question";
    keyEntryMsg.after(nextQ);
    document.querySelector(`.num_${e}`).removeAttribute("onclick", "enterKey");
  }

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
  // confetti!!!
  currentStage.includes(`stage${data.length}`) &&
    (confettiAnimation(), new Audio("sounds/zelda.mp3").play());
};

// GO TO NEXT QUESTION
const nextQ = () => {
  timeline
    .to(".keyEntryDiv", { delay: 0, opacity: 0 })
    .to(".topBar", topBarSet)
    .to(".keyWrapper", { scale: 2.5, delay: 0 }, "<")
    .to(".keyEntryDiv", { height: 0, delay: 0 }, "<")
    .to(
      "body",
      { backgroundPosition: "0px -190px", delay: 0, duration: 1.5 },
      "<"
    )
    .to(".questionWrapper", { display: "flex", opacity: 1 }, "<")
    .from(".questionWrapper", { y: 20, delay: 0 }, "<");
};

// & PAGE LOAD ANIMATIONS, ASSIGN ATTRIBUTE, ASSIGN URL VARIABLE
stages.forEach((e, index) => {
  // Set URL variable to current
  if (currentUrl.includes(e)) {
    currentStage = e;
    params.set("stages", currentStage);
    window.history.replaceState({}, "", setCurrent);
    wrapper.setAttribute("id", e);

    // set up questions/options
    let n = index;
    if (currentStage !== `stage${data.length}`) {
      // set up questions
      const qDiv = document.querySelector(".question");
      qDiv.textContent = data[n].q;
      // set up options
      data[n].options.forEach((e) => {
        let div = document.createElement("div");
        div.textContent = e.text;
        div.setAttribute("class", "listItem");
        div.setAttribute("onclick", `selectAnswer(${e.isTrue})`);
        document.querySelector(".optionWrapper").appendChild(div);
      });
    }

    if (e !== "stage1") {
      document.querySelector(".keyWrapper").style.transform = "scale(3.0)";
      //set divs for !stage1
      const keyEntryDiv = document.createElement("div");
      keyEntryDiv.classList.add("keyEntryDiv");
      const keyEntryMsg = document.createElement("span");
      keyEntryMsg.classList.add("keyEntryMsg");

      document.querySelector(".topBar").append(keyEntryDiv);
      keyEntryDiv.appendChild(keyEntryMsg);

      document.querySelector(".topBar").style.height = "100vh";
      let n = stages.indexOf(e),
        currentNum = document.querySelector(`.num_${n - 1}`);

      // Add in current keycodes entered
      if (n > 1) {
        for (let k = 0; k < n - 1; k++) {
          document.querySelector(`.num_${k} > span`).style.opacity = 1;
          document
            .querySelector(`.num_${k} > span`)
            .removeAttribute("onclick", `enterKey(${k})`);
        }
      }
      currentNum.classList.add("numBgFlash");
      currentNum.setAttribute("onclick", `enterKey(${n - 1})`);
      if (e === "stage3") {
        const q = document.querySelector(".question");
        const img = document.createElement("img");
        img.src = "./IMGs/Aero_V-dramon.png";
        img.classList.add("digimonImg");
        q.parentNode.insertBefore(img, q);
      }
    }
    // settings for initial page
    else if (e === "stage1") {
      // create divs for initial page
      const title = document.createElement("div");
      title.classList.add("title");
      const button = document.createElement("button");
      button.classList.add("proceed");
      button.setAttribute("type", "button");
      button.setAttribute("onclick", "proceed()");
      button.textContent = "Proceed!";

      wrapper.prepend(title);
      title.after(button);

      // title text animation
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
});

// BLUR BG, QUESTION ANSWER REVEAL
const selectAnswer = (e) => {
  const msgH2 = document.querySelector(".blurBgMsgWrapper > div > h2"),
    msgSpan = document.querySelector(".blurBgMsgWrapper > div > span");
  document.querySelector(".blurBg").classList.add("displayFlex");
  document.querySelector(".blurBgMsgWrapper").classList.add("displayFlex");

  gsap.timeline().to(".blurBgMsgWrapper", {
    opacity: 1,
    duration: 0.3,
    delay: 0.1,
    scale: 1,
  });

  // if answered wrong
  if (!e) {
    msgH2.textContent = "(⋟﹏⋞)";
    msgSpan.textContent = "try again!";
  }
  // if answered correctly
  else {
    msgH2.textContent = "٩(◕‿◕｡)۶";
    msgSpan.textContent = "that's correct!";
    document.querySelector(".getHint").classList.add("displayFlex");
    document.querySelector(".blurBgMsgWrapper").style.backgroundColor =
      colors.normal;
    new Audio("sounds/wow.mp3").play();
  }
};

// CLOSE BLUR BG
const closeBlurBg = () => {
  document.querySelector(".blurBg").classList.remove("displayFlex");
  document.querySelector(".blurBgMsgWrapper").classList.remove("displayFlex");
  document.querySelector(".getHint").classList.remove("displayFlex");
  document.querySelector(".blurBgMsgWrapper").style.opacity = 0;
  document.querySelector(".blurBgMsgWrapper").style.backgroundColor =
    colors.mediumDark;
};
window.addEventListener("keydown", (e) => {
  e.key === "Escape" && closeBlurBg();
});
