const todoContainer = document.getElementById("todo__container");
const todoItem = document.getElementsByClassName("todo__container__item");
const addBtn = document.getElementById("add-todo");
const todoInput = document.getElementById("todo-input");
const allBtn = document.getElementById("all");
const activeBtn = document.getElementById("active");
const completeBtn = document.getElementById("complete");
const clearBtn = document.getElementById("clear");
const todoList = JSON.parse(localStorage.getItem("todoItems")) || [];
let uniqueID = JSON.parse(localStorage.getItem("uid")) || 0;
const heading=document.getElementById("heading")
const headingText="Todo List"

textSequence(0, '');
function textSequence(i, value) {
  if (headingText.length > i) {
    setTimeout(function() {
      value += headingText[i];
      heading.innerHTML = value;
      textSequence(++i, value);
    }, 150);
  } 
}

class todo {//class
    constructor(task) {
        this.uid = `todo${++uniqueID}`;//upadating and assigning uid
        this.task = task;
        this.isDone = false;
        todoList.push(this);
        addTodo(this);//adding newly created todo to DOM
        localStorage.setItem("todoItems", JSON.stringify(todoList));
        localStorage.setItem("uid", JSON.stringify(uniqueID));
    }
}

const deleteTodo = (item) => {//function to delete todoList item
    document.getElementById(item.uid).remove();//removing from DOM
    const index = todoList.indexOf(item);
    if (index > -1) //found
        todoList.splice(index, 1);//removing from array
    localStorage.setItem("todoItems", JSON.stringify(todoList));
}

const createNewTodo = (uid) => {//creating new todo item div
    const newTodo = document.createElement("div");
    newTodo.classList.add("todo__container__item");
    newTodo.id = `${uid}`;
    return newTodo;
}

const createTask = (taskText) => {
    const task = document.createElement("p");
    task.innerHTML = taskText;
    return task;
}

const createIsDone = (todoItem, task) => {
    const isDone = document.createElement("button");
    isDone.classList.add("todo-btn");
    const img = document.createElement("img");
    isDone.appendChild(img);
    img.src = (!todoItem.isDone) ? './images/true.png' : './images/false.png';
    isDone.addEventListener('click', () => {
        todoItem.isDone = !todoItem.isDone;
        img.src = (!todoItem.isDone) ? './images/true.png' : './images/false.png';//changing icon
        task.style.textDecoration = (todoItem.isDone) ? 'line-through' : 'none';
        localStorage.setItem("todoItems", JSON.stringify(todoList));
    });
    return isDone;
}

const createDelBtn = (todoItem) => {
    const delBtn = document.createElement("button");
    delBtn.classList.add("todo-btn");
    const delImg = document.createElement("img");
    delImg.src = "./images/delete.png";
    delBtn.appendChild(delImg);
    delBtn.addEventListener('click', () => deleteTodo(todoItem));
    return delBtn;
}

const createEditBtn = (todoItem, task) => {
    const editBtn = document.createElement("button");
    editBtn.classList.add("todo-btn");
    const editImg = document.createElement("img");
    editImg.src = "./images/edit.png";
    editBtn.appendChild(editImg);

    const editIp = document.createElement("input");//adding input to get edited text
    editIp.style.backgroundColor = "transparent";
    editIp.name = "editip";
    editIp.addEventListener("keypress", (e) => {
        if (e.key === 'Enter') {
            if (editIp.value.trim().length) { //if not empty
                task.innerText = editIp.value; //updating dom
                todoItem.task = editIp.value; //updating array
                localStorage.setItem("todoItems", JSON.stringify(todoList));
            }
            editIp.remove(); //removing editng option
            task.style.display = "inline"; //bringing back task
        }
    })
    editBtn.addEventListener('click', () => {
        task.style.display = "none";
        editIp.value = todoItem.task;
        editBtn.parentNode.parentNode.prepend(editIp);//adding editing option
        task.parentNode.addEventListener('mouseleave', () => {
            editIp.dispatchEvent(new KeyboardEvent('keypress', { 'key': 'Enter' }));
        })
    })

    return editBtn;
}

const createTodo = (todoItem) => {//creating todo
    const newTodo = createNewTodo(todoItem.uid);
    const task = createTask(todoItem.task);
    const isDone = createIsDone(todoItem, task);
    const delBtn = createDelBtn(todoItem);
    const editBtn = createEditBtn(todoItem, task);
    const btns = document.createElement("span");
    btns.style.minWidth = "115px";
    btns.appendChild(isDone);
    btns.appendChild(delBtn);
    btns.appendChild(editBtn);
    newTodo.appendChild(task);
    newTodo.appendChild(btns);
    return newTodo;
}

const addTodo = (todoItem) => {//creating & adding todo to todoContainer
    todoContainer.prepend(createTodo(todoItem));
    allBtn.click();
}

addBtn.addEventListener('click', (e) => {//add btn
    const task = todoInput.value.trim();
    todoInput.value = '';
    (!todoList.find(e => e.task === task) && task.length) ? new todo(task) : alert("Invalid input");//adding if not repated and not empty
})

todoInput.addEventListener('keyup', (e) => {//if enter is pressed while typing
    if (e.key === 'Enter') addBtn.click();
})

allBtn.addEventListener('click', () => {
    for (let i = 0; i < todoItem.length; i++)//making evrything
        todoItem[i].style.display = "flex";//visible
});

const changeDisplay = (displayConditon) => {
    for (let i = 0; i < todoItem.length; i++)//maing visble or invisible based on condition
        todoItem[i].style.display = (displayConditon(todoItem[i].id)) ? "flex" : "none";
}

activeBtn.addEventListener('click', () => {
    changeDisplay((id) => !todoList.find((e) => e.uid === id).isDone);//if task is not done 
})

completeBtn.addEventListener('click', () => {
    changeDisplay((id) => todoList.find((e) => e.uid === id).isDone);//if is done
})

clearBtn.addEventListener('click', () => {
    const done = todoList.filter((e) => e.isDone === true);
    done.forEach(e => deleteTodo(e));
})

todoList.forEach(e => {//adding elemnts presnt in todo list to DOM on reload
    addTodo(e);
});