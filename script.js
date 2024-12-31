const todoContainer = document.getElementById("todo__container");
const todoItem = document.getElementsByClassName("todo__container__item");
const addBtn = document.getElementById("add-todo");
const todoInput = document.getElementById("todo-input");
const todoList = [];
const allBtn = document.getElementById("all");
const activeBtn = document.getElementById("active");
const completeBtn = document.getElementById("complete");
const clearBtn = document.getElementById("clear");
let uniqueID = 0;
class todo {//class
    constructor(task) {
        this.uid = `todo${++uniqueID}`;
        this.task = task;
        this.isDone = false;
        addTodo(this);
    }
}
const createNewTodo=(uid)=>{
    const newTodo = document.createElement("div");
    newTodo.classList.add("todo__container__item");
    newTodo.id = `${uid}`;
    return newTodo;
}
const createTask=(txt)=>{
    const task = document.createElement("p");
    task.innerHTML = txt;
    return task;
}
const createIsDone=(todoItem,task)=>{
    const isDone = document.createElement("button");
    isDone.classList.add("delete-todo");
    const img = document.createElement("img");
    isDone.appendChild(img);
    img.src = './images/true.png';
    isDone.addEventListener('click', () => {
        todoItem.isDone = !todoItem.isDone;
        img.src = (!todoItem.isDone) ? './images/true.png' : './images/false.png';
        task.style.textDecoration = (todoItem.isDone) ? 'line-through' : 'none';
    });
    return isDone;
}
const createDelBtn=(newTodo,todoItem)=>{
    const delBtn = document.createElement("button");
    delBtn.classList.add("delete-todo");
    const delImg = document.createElement("img");
    delImg.src = "./images/delete.png";
    delBtn.appendChild(delImg);
    delBtn.addEventListener('click', () => {
        newTodo.remove();
        const index = todoList.indexOf(todoItem);
        if (index > -1) { // only splice array when item is found
            todoList.splice(index, 1); //remove one item only
        }
    })
    return delBtn;
}
const createTodo = (todoItem) => {//creating todo
    todoList.unshift(todoItem);
    const newTodo = createNewTodo(todoItem.uid);
    const task=createTask(todoItem.task);
    const isDone=createIsDone(todoItem,task);
    const delBtn=createDelBtn(newTodo,todoItem);
    const btns = document.createElement("span");
    btns.appendChild(isDone);
    btns.appendChild(delBtn);
    newTodo.appendChild(task);
    newTodo.appendChild(btns);
    return newTodo;
}
const addTodo = (todoItem) => {//creating & adding todo to todoContainer
    todoContainer.prepend(createTodo(todoItem));
    allBtn.click();
}
addBtn.addEventListener('click', (e) => {
    const task = todoInput.value;
    todoInput.value = '';
    if (!todoList.find(e => e.task === task) && task.trim().length) {
        new todo(task);
    } else {
        alert("Invalid input");
    }
})
todoInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        addBtn.click();
    }
})
allBtn.addEventListener('click', () => {
    for (let i = 0; i < todoItem.length; i++) {
        todoItem[i].style.display = "flex";
    }
});
activeBtn.addEventListener('click', () => {
    for (let i = 0; i < todoItem.length; i++) {
        const id = todoItem[i].id;
        if (todoList.find((e) => e.uid === id).isDone) {
            todoItem[i].style.display = "none";
        } else {
            todoItem[i].style.display = "flex";
        }
    }
})
completeBtn.addEventListener('click', () => {
    for (let i = 0; i < todoItem.length; i++) {
        const id = todoItem[i].id;
        if (todoList.find((e) => e.uid === id).isDone) {
            todoItem[i].style.display = "flex";
        } else {
            todoItem[i].style.display = "none";
        }
    }
})
clearBtn.addEventListener('click', () => {
    const done = todoList.filter((e) => e.isDone === true);
    done.forEach(element => {
        document.getElementById(element.uid).remove();
        const index = todoList.indexOf(element);
        if (index > -1) { // only splice array when item is found
            todoList.splice(index, 1); //remove one item only
        }
    });
})