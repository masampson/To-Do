"use strict";

// JQUERY

$(document).ready(function () {
  let toDoList = [];
  const doInput = document.getElementById("do-input");
  let itemsList = document.querySelector(".to-do-items");

  // CLEAR UI
  const clearUI = () => (itemsList.innerHTML = "");
  // DISPLAY ALL ITEMS
  const displayAll = function () {
    clearUI();
    $.each(toDoList, function (index, item) {
      itemsList.insertAdjacentHTML(
        "beforeend",
        `<li class="item-row">
                  <input class="check-off" type="checkbox" name="mark-done" id="${index}"/>
                  <label for="mark-done" class="${
                    item.status === "active" ? "item" : "item-done"
                  }" >${item.val}</label>
                  <button class="delete">X</button>
                </li>`
      );
    });
  };

  $("#all").click(displayAll);
  // ADD A TO DO ITEM
  $("#do-button").click(function (e) {
    e.preventDefault();
    toDoList.push({ val: doInput.value, status: "active" });
    doInput.value = "";
    displayAll();
  });

  // DISPLAY ACTIVE ITEMS
  $("#active").click(function () {
    clearUI();
    $.each(
      toDoList.filter((x) => x.status === "active"),
      function (index, item) {
        itemsList.insertAdjacentHTML(
          "beforeend",
          `<li class="item-row">
                        <input class="check-off" type="checkbox" name="mark-done" id="${index}"/>
                        <label for="mark-done" class="item" >${item.val}</label>
                        <button class="delete">X</button>
                      </li>`
        );
      }
    );
  });
  // DISPLAY COMPLETED ITEMS
  $("#done").click(function () {
    clearUI();
    $.each(
      toDoList.filter((x) => x.status === "complete"),
      function (index, item) {
        itemsList.insertAdjacentHTML(
          "beforeend",
          `<li class="item-row">
                <input class="check-off" type="checkbox" name="mark-done" id="${index}"/>
                <label for="mark-done" class="item-done" >${item.val}</label>
                <button class="delete">X</button>
              </li>`
        );
      }
    );
  });
  // DELETE OR MARK COMPLETED
  $(".to-do-items").click(function (e) {
    const item = e.target;
    const itemClass = item.classList[0];
    if (itemClass === "delete") {
      toDoList.splice(item.previousElementSibling.previousElementSibling.id, 1);
      displayAll();
    }
    if (itemClass === "check-off") {
      if (toDoList[item.id].status === "complete") {
        toDoList[item.id].status = "active";
      } else if (toDoList[item.id].status === "active") {
        toDoList[item.id].status = "complete";
      }
      displayAll();
    }
  });

  // KILL ALL COMPLETED ITEMS
  $("#kill").click(function () {
    for (let i = toDoList.length - 1; i >= 0; i--) {
      if (toDoList[i].status === "complete") {
        toDoList.splice(i, 1);
      }
    }
    displayAll();
  });
  // END OF JQUERY
});
