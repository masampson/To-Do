"use strict";

let toDoList = new Map();
let num = 0;
const doInput = document.getElementById("do-input");

const addItem = function () {
  if (doInput.value === "") {
    alert("Please enter an item");
  } else {
    num++;
    let item = `item${num}`;
    //   const doInput = document.getElementById("do-input");
    toDoList.set(item, doInput.value);
    document.querySelector(".to-do-items").insertAdjacentHTML(
      "beforeend",
      `<div class="item-row" id="${item}">
          <h3 class="item">${toDoList.get(`${item}`)}</h3>
          <button class="delete" id="${item}-button">Did</button>
      </div>`
    );
    document
      .getElementById(`${item}-button`)
      .addEventListener("click", function () {
        document.getElementById(`${item}`).remove();
      });
    doInput.value = "";
  }
};

document.getElementById("do-button").addEventListener("click", addItem);
