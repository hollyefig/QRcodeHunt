document.addEventListener("DOMContentLoaded", function () {
  const puzzleContainer = document.getElementById("puzzle-container");
  const puzzlePieces = document.querySelectorAll(".puzzle-piece");
  const congratsMessage = document.getElementById("congratsMessage");

  let completedPieces = 0;

  puzzlePieces.forEach((e, index) => {
    e.textContent = index;
  });

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
      draggedPiece.classList.add("correct");
      completedPieces++;

      // Check if all pieces are in the correct position
      if (completedPieces === puzzlePieces.length) {
        showCongratsMessage();
      }
    }
  }

  function showCongratsMessage() {
    congratsMessage.style.display = "block";
  }
});
