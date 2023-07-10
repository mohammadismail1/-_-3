const addBtn = document.querySelector("#add-btn");
const newTaskInput = document.querySelector("#wrapper input");
const taskContainer = document.querySelector("#tasks");
const error = document.getElementById("error");
const countValue = document.querySelector(".count-value");
const pendCont = document.getElementById("pend");
const compCont = document.getElementById("comp");

const pendingToDo = localStorage.getItem("ptodo")
  ? JSON.parse(localStorage.getItem("ptodo"))
  : [];
const completedToDo = localStorage.getItem("ctodo")
  ? JSON.parse(localStorage.getItem("ctodo"))
  : [];
addBtn.addEventListener("click", addToDo);

function displayPendingTodos() {
  pendCont.innerHTML = "";
  const head = `<h4>Pending Tasks </h4>`;
  pendCont.insertAdjacentHTML("afterbegin", head);

  pendingToDo.forEach((elem, i) => {
    const task = `<div class="taskpend">
        <span class="tasknamecop">${elem}</span>
        </div>`;

    pendCont.insertAdjacentHTML("beforeend", task);
  });
}
function displayCompletedTodos() {
  compCont.innerHTML = "";
  const head = `<h4>Completed Tasks </h4>`;
  compCont.insertAdjacentHTML("afterbegin", head);

  completedToDo.forEach((elem, i) => {
    const task = `<div class="taskpend">
        <span class="tasknamecop">${elem}</span>
        </div>`;

    compCont.insertAdjacentHTML("beforeend", task);
  });
}
function addToDo() {
  const taskName = newTaskInput.value.trim();
  error.style.display = "none";

  if (taskName === "") {
    setTimeout(() => {
      error.style.display = "block";
    }, 200);
    return;
  } else {
    pendingToDo.push(newTaskInput.value);
    displayToDos();
    displayPendingTodos();
    displayCompletedTodos();
    localStorage.setItem("ptodo", JSON.stringify(pendingToDo));
    console.log(pendingToDo);
    newTaskInput.value = "";
  }
}

function displayToDos() {
  let myDiv = document.getElementById("taskList");
  myDiv.innerHTML = "";

  pendingToDo.forEach((elem, i) => {
    const task = `<div class="task">
        <input type="checkbox" class="task-check" id=${i}>
        <span class="taskname">${elem}</span>
        <button class="edit" id=${i}>
        <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button class="delete" id=${i}> 
        <i class="fa-solid fa-trash"></i>
        </button> </div>`;

    myDiv.insertAdjacentHTML("beforeend", task);
  });
  completedToDo.forEach((elem, i) => {
    const task = `<div class="task">
        <input type="checkbox" class="task-check" id=${i} checked>
        <span class="taskname">${elem}</span>
        <button class="edit" id=${i + 1000}>
        <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button class="delete" id=${i + 1000}> 
        <i class="fa-solid fa-trash"></i>
        </button> </div>`;

    myDiv.insertAdjacentHTML("beforeend", task);
  });
  activateDelete();
  activateEdit();
  activateCheck();
}

function removeTodo(e) {
  if (e.target.id >= 1000) {
    completedToDo.splice(e.target.id - 1000, 1);
    localStorage.setItem("ctodo", JSON.stringify(completedToDo));
  } else {
    pendingToDo.splice(e.target.id, 1);
    localStorage.setItem("ptodo", JSON.stringify(pendingToDo));
  }
  displayToDos();
  displayPendingTodos();
  displayCompletedTodos();
}

function activateDelete() {
  const deleteButtons = document.querySelectorAll(".delete");
  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", removeTodo);
  });
}

function activateEdit() {
  const editButtons = document.querySelectorAll(".edit");
  editButtons.forEach((elem) => {
    elem.addEventListener("click", editTodo);
  });
}

function editTodo(e) {
  if (e.target.id >= 1000) {
    newTaskInput.value = completedToDo[e.target.id - 1000];
  } else {
    newTaskInput.value = pendingToDo[e.target.id];
  }
  removeTodo(e);
}

function activateCheck() {
  const tasksCheck = document.querySelectorAll(".task-check");
  tasksCheck.forEach((elem) => {
    elem.addEventListener("click", completeTodo);
  });
}

function completeTodo(e) {
  if (e.target.checked) {
    completedToDo.push(pendingToDo[e.target.id]);
    localStorage.setItem("ctodo", JSON.stringify(completedToDo));
    pendingToDo.splice(e.target.id, 1);
    localStorage.setItem("ptodo", JSON.stringify(pendingToDo));
  } else {
    pendingToDo.push(completedToDo[e.target.id]);
    localStorage.setItem("ptodo", JSON.stringify(pendingToDo));
    completedToDo.splice(e.target.id, 1);
    localStorage.setItem("ctodo", JSON.stringify(completedToDo));
  }

  displayToDos();
  displayCompletedTodos();
  displayPendingTodos();
}

displayPendingTodos();
displayCompletedTodos();
displayToDos();
