document.addEventListener("DOMContentLoaded", function () {
  const puzzleContainer = document.querySelector(".puzzlePage");
  const puzzlePieces = document.querySelectorAll(".puzzle-piece");
  const congratsMsg = document.getElementById("congratsMessage");

  gsap.from(puzzleContainer, { opacity: 0, duration: 0.5, delay: 1 });

  congratsMsg.style.top =
    parseInt(getComputedStyle(congratsMsg).height) * -1.3 + "px";

  let completedPieces = 0;

  puzzlePieces.forEach((e, index) => {
    let num = index + 1;
    let img = document.createElement("img");
    img.setAttribute("src", `./IMGs/pieces/Frame${num}.png`);
    img.setAttribute("style", "width: 100%; opacity: .5");

    e.appendChild(img);
    // e.style.backgroundImage = `url('/puzzle/IMGs/pieces/Frame${num}.png')`;
  });

  // ~ randomize position start
  const randomPos = (p, window) => {
    let num = window - parseInt(getComputedStyle(p).width);
    const top = Math.floor(Math.random() * num);
    const left = Math.floor(Math.random() * num);
    p.style.top = top + "px";
    p.style.left = left + "px";

    let dataPos = p.getAttribute("data-correct-position").split(",");
    // change position requirements
    dataPos = dataPos.map((d, index) => {
      if (index === 0) {
        const oldLeft = parseInt(d);
        let update = oldLeft - left;
        return update.toString();
      }
      if (index > 0) {
        const oldTop = parseInt(d);
        let update = oldTop - top;
        return update.toString();
      }
    });
    p.setAttribute("data-correct-position", dataPos.join());
  };

  // ! change sizes on load
  if (window.screen.width <= 400) {
    const windowWidth = window.screen.width;
    puzzlePieces.forEach((p) => {
      // change width
      p.style.width = windowWidth / 4 + "px";
      //current width of puzzle piece as a number
      pWidth = parseInt(getComputedStyle(p).width);
      // data positions for each piece
      let dataPos = p.getAttribute("data-correct-position").split(",");
      // change position requirements
      dataPos = dataPos.map((d) => {
        let num = parseInt(d[0]);
        num = num * pWidth;
        return num.toString();
      });
      p.setAttribute("data-correct-position", dataPos.join());
      randomPos(p, windowWidth);
    });
  } else if (window.screen.width > 400) {
    let windowWidth = 400;
    puzzlePieces.forEach((p) => {
      randomPos(p, windowWidth);
    });
  }

  // ! change sizes when resizing
  window.addEventListener("resize", (e) => {
    const windowWidth = e.target.outerWidth;
    if (windowWidth <= 400) {
      puzzlePieces.forEach((p) => {
        // change width
        p.style.width = windowWidth / 4 + "px";
        //current width of puzzle piece as a number
        pWidth = parseInt(getComputedStyle(p).width);
        // data positions for each piece
        let dataPos = p.getAttribute("data-correct-position").split(",");
        // change position requirements
        dataPos = dataPos.map((d) => {
          let num = parseInt(d[0]);
          num = num * pWidth;
          return num.toString();
        });
        p.setAttribute("data-correct-position", dataPos.join());
        randomPos(p, windowWidth);
      });
    }
  });

  interact(".puzzle-piece").draggable({
    inertia: true,
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: "parent",
      }),
    ],
    autoScroll: true,
    onmove: dragMoveListener,
    onend: checkPuzzle,
  });

  function dragMoveListener(event) {
    const target = event.target;

    const x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
    const y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

    target.style.transform = `translate(${x}px, ${y}px)`;
    target.setAttribute("data-x", x);
    target.setAttribute("data-y", y);
  }

  function checkPuzzle(event) {
    const draggedPiece = event.target;
    const correctPosition = draggedPiece
      .getAttribute("data-correct-position")
      .split(",");
    const currentX = parseFloat(draggedPiece.getAttribute("data-x")) || 0;
    const currentY = parseFloat(draggedPiece.getAttribute("data-y")) || 0;

    // Check if the piece is in the correct position
    if (
      Math.abs(currentX - parseFloat(correctPosition[0])) < 10 &&
      Math.abs(currentY - parseFloat(correctPosition[1])) < 10
    ) {
      draggedPiece.children[0].classList.add("correct");
      draggedPiece.classList.add("below");
      completedPieces++;

      // Check if all pieces are in the correct position
      if (completedPieces === puzzlePieces.length) {
        showCongratsMessage();
      }
    }
  }

  function dragMoveListener(event) {
    const target = event.target;

    // Check if the piece is marked as correct, and if so, prevent dragging
    if (target.children[0].classList.contains("correct")) {
      return;
    }

    const x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
    const y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

    target.style.transform = `translate(${x}px, ${y}px)`;
    target.setAttribute("data-x", x);
    target.setAttribute("data-y", y);
  }

  // & When puzzle is complete
  function showCongratsMessage() {
    gsap
      .timeline({ defaults: { duration: 0.5, ease: "power1.out" } })
      .to("#congratsMessage", { top: 0 });
    new Audio("../sounds/wow.mp3").play();
  }
});
