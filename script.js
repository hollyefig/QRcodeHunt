// func to grab url
const getCurrentURL = () => {
  return window.location.href;
};
const url = getCurrentURL(),
  keyCode = [3, 5, 7, 9],
  ul = document.querySelector(".keySet");

console.log(`${url}&string=${keyCode[0]}`);

const addKey = (n) => {
  document.querySelector(`.addKey${n}`).href = `${url}#${keyCode[n - 1]}`;
  ul.children[n - 1].textContent = keyCode[n - 1];
};
