// func to grab url
const getCurrentURL = () => {
  return window.location.href;
};
const url = getCurrentURL(),
  keyCode = [3, 5, 7, 9],
  ul = document.querySelector(".keySet");

const addKey = (n) => {
  document.querySelector(`.addKey${n}`).href = `${url}#${keyCode[n - 1]}`;
  ul.children[n - 1].textContent = keyCode[n - 1];
};

window.onload = function () {
  console.log("current", getCurrentURL());
};
