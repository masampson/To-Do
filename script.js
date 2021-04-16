"use strict";

// SELECTIONS
const doInput = document.getElementById("do-input");
let itemsList = document.querySelector(".to-do-items");
let toDoRows = document.querySelectorAll(".item-row");

// BUTTONS
const activeButton = document.getElementById("active");
const doneButton = document.getElementById("done");
const allButton = document.getElementById("all");
const killDoneButton = document.getElementById("kill");
const doButton = document.getElementById("do-button");

// ARRAY VERSION / PURE FUNCTIONS

// DECLARATIONS
let toDoList = [];

// FUNCTIONS
const addToDo = function (e) {
  e.preventDefault();
  toDoList.push({ val: doInput.value, status: "active" });
  doInput.value = "";
  displayAll();
};

function deleteCheck(e) {
  const item = e.target;
  const itemClass = item.classList[0];
  if (itemClass === "delete") {
    const todo = item.parentElement;
    todo.remove();
  }
  if (itemClass === "check-off") {
    if (toDoList[item.id].status === "complete") {
      toDoList[item.id].status = "active";
    } else if (toDoList[item.id].status === "active") {
      toDoList[item.id].status = "complete";
    }
    displayAll();
  }
}

const clearUI = () => (itemsList.innerHTML = "");

const displayAll = function () {
  clearUI();
  toDoList.forEach((x, index) => {
    itemsList.insertAdjacentHTML(
      "beforeend",
      `<li class="item-row">
                <input class="check-off" type="checkbox" name="mark-done" id="${index}"/>
                <label for="mark-done" class="${
                  x.status === "active" ? "item" : "item-done"
                }" >${x.val}</label>
                <button class="delete">X</button>
              </li>`
    );
  });
};

const displayDone = function () {
  clearUI();
  toDoList
    .filter((x) => x.status === "complete")
    .forEach((x, index) => {
      itemsList.insertAdjacentHTML(
        "beforeend",
        `<li class="item-row">
                <input class="check-off" type="checkbox" name="mark-done" id="${index}"/>
                <label for="mark-done" class="item-done" >${x.val}</label>
                <button class="delete">X</button>
              </li>`
      );
    });
};

const displayActive = function () {
  clearUI();
  toDoList
    .filter((x) => x.status === "active")
    .forEach((x, index) => {
      itemsList.insertAdjacentHTML(
        "beforeend",
        `<li class="item-row">
                <input class="check-off" type="checkbox" name="mark-done" id="${index}"/>
                <label for="mark-done" class="item" >${x.val}</label>
                <button class="delete">X</button>
              </li>`
      );
    });
};

// JQUERY WORKSPACE

const killDone = function () {
  for (let i = toDoList.length - 1; i >= 0; i--) {
    if (toDoList[i].status === "complete") {
      toDoList.splice(i, 1);
    }
  }
  displayAll();
};

// LISTENERS
doButton.addEventListener("click", addToDo);
doneButton.addEventListener("click", displayDone);
allButton.addEventListener("click", displayAll);
activeButton.addEventListener("click", displayActive);
itemsList.addEventListener("click", deleteCheck);
killDoneButton.addEventListener("click", killDone);

// FUNCTIONS

// const addItem = function (e) {
//   e.preventDefault();
//   if (doInput.value === "") {
//     alert("Please enter an item");
//   } else {
//     itemsList.insertAdjacentHTML(
//       "beforeend",
//       `<li class="item-row">
//           <input class="check-off" type="checkbox" name="mark-done" />
//           <label for="mark-done" class="item">${doInput.value}</label>
//           <button class="delete">X</button>
//         </li>`
//     );
//   }
//   doInput.value = "";
// };

// function deleteCheck(e) {
//   const item = e.target;
//   if (item.classList[0] === "delete") {
//     const todo = item.parentElement;
//     todo.remove();
//   }
//   if (item.classList[0] === "check-off") {
//     const todo = item.nextElementSibling;
//     todo.classList.toggle("item-done");
//   }
// }

// const filtering = function (e) {
//   let toDoElements = document.querySelectorAll("label");
//   switch (e.target) {
//     case doneButton:
//       for (let i = 0; i < toDoElements.length; i++) {
//         if (toDoElements[i].classList[1] !== "item-done") {
//           toDoElements[i].parentElement.style.display = "none";
//         } else {
//           toDoElements[i].parentElement.style.display = "";
//         }
//       }
//       break;
//     case activeButton:
//       for (let i = 0; i < toDoElements.length; i++) {
//         if (toDoElements[i].classList[1] === "item-done") {
//           toDoElements[i].parentElement.style.display = "none";
//         } else {
//           toDoElements[i].parentElement.style.display = "";
//         }
//       }
//       break;
//     case allButton:
//       for (let i = 0; i < toDoElements.length; i++) {
//         toDoElements[i].parentElement.style.display = "";
//       }
//       break;
//     case killDoneButton:
//       for (let i = 0; i < toDoElements.length; i++) {
//         if (toDoElements[i].classList[1] === "item-done") {
//           toDoElements[i].parentElement.remove();
//         } else {
//           toDoElements[i].parentElement.style.display = "";
//         }
//       }
//   }
// };

// // LISTENERS
// document.getElementById("do-button").addEventListener("click", addItem);
// itemsList.addEventListener("click", deleteCheck);
// doneButton.addEventListener("click", filtering);
// allButton.addEventListener("click", filtering);
// activeButton.addEventListener("click", filtering);
// killDoneButton.addEventListener("click", filtering);

// OLD STUFF

// OLD FILTERING
// const filterDone = function (e) {
//   let toDoElements = document.querySelectorAll("label");
//   for (let i = 0; i < toDoElements.length; i++) {
//     if (toDoElements[i].classList[1] !== "item-done") {
//       toDoElements[i].parentElement.style.display = "none";
//     } else {
//       toDoElements[i].parentElement.style.display = "";
//     }
//   }
// };

// const filterAll = function (e) {
//   let toDoElements = document.querySelectorAll("label");
//   for (let i = 0; i < toDoElements.length; i++) {
//     toDoElements[i].parentElement.style.display = "";
//   }
// };

// const filterActive = function (e) {
//   let toDoElements = document.querySelectorAll("label");
//   for (let i = 0; i < toDoElements.length; i++) {
//     if (toDoElements[i].classList[1] === "item-done") {
//       toDoElements[i].parentElement.style.display = "none";
//     } else {
//       toDoElements[i].parentElement.style.display = "";
//     }
//   }
// };

// const killDone = function () {
//   let toDoElements = document.querySelectorAll("label");
//   for (let i = 0; i < toDoElements.length; i++) {
//     if (toDoElements[i].classList[1] === "item-done") {
//       toDoElements[i].parentElement.remove();
//     } else {
//       toDoElements[i].parentElement.style.display = "";
//     }
//   }
// };

// document.getElementById("done").addEventListener("click", filterDone);
// document.getElementById("all").addEventListener("click", filterAll);
// document.getElementById("active").addEventListener("click", filterActive);
// document.getElementById("kill").addEventListener("click", killDone);

// OLD MAP METHOD

// const addItem = function () {
//   if (doInput.value === "") {
//     alert("Please enter an item");
//   } else {
//     num++;
//     let item = `item${num}`;
//     toDoList.set(item, doInput.value);
//     itemsList.insertAdjacentHTML(
//       "beforeend",
//       `<div class="item-row">
//           <h3 class="item" id="${item}">${toDoList.get(`${item}`)}</h3>
//           <button class="delete" id="${item}-button">✔️</button>
//       </div>`
//     );
//     document
//       .getElementById(`${item}-button`)
//       .addEventListener("click", function () {
//         document.getElementById(`${item}`).classList.toggle("item-done");
//         document
//           .getElementById(`${item}-button`)
//           .classList.toggle("delete-undo");
//       });
//     doInput.value = "";
//     console.log(toDoList);
//   }
//   console.log(toDoRows);
// };

// const showDone;
// document.getElementById("done").addEventListener("click", showDone);
// Display

// ALTS;
// const displayItems = function (map) {
//   itemsList.innerHTML = "";
//   for (const [i, val] of map) {
//     console.log(i);
//     console.log(val.done);
//     itemsList.insertAdjacentHTML(
//       "beforeend",
//       `<div class="item-row" id="${i}-block">
//           <h3 class= "item" id="${i}">${val.toDo}</h3>
//           <button class="delete" id="${i}-button">Did</button>
//       </div>`
//     );
//     document
//       .getElementById(`${i}-button`)
//       .addEventListener("click", function () {
//         val.done = "done";
//         console.log(val.done);
//       });
//   }
//   doInput.value = "";
// };

// const addItem = function () {
//   if (doInput.value === "") {
//     alert("Please enter an item");
//   } else {
//     num++;
//     let item = `item${num}`;
//     toDoList.set(item, { toDo: doInput.value, done: "active" });
//     console.log(toDoList);
//     displayItems(toDoList);
//   }
// };
