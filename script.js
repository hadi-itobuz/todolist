const todoContainer = document.getElementById("todo__container");
const todoItem = document.getElementsByClassName("todo__container__item");
const addBtn = document.getElementById("add-todo");
const todoInput = document.getElementById("todo-input");
const allBtn = document.getElementById("all");
const activeBtn = document.getElementById("active");
const completeBtn = document.getElementById("complete");
const clearBtn = document.getElementById("clear");
const heading = document.getElementById("heading")
const headingText = "Todo List..."
const todoList = JSON.parse(localStorage.getItem("todoItems")) || [];
const editIp = document.createElement("input");//adding input to get edited text
editIp.id = "editInput";
let uniqueID = JSON.parse(localStorage.getItem("uid")) || 0;
textSequence(0, '');
function textSequence(i, value) {
    if (headingText.length > i) {
        setTimeout(function () {
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
    task.classList.add("todo-task");
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

const createBtn = (img) => {
    const btn = document.createElement("button");
    btn.classList.add("todo-btn");
    const btnImg = document.createElement("img");
    btnImg.src = `./images/${img}.png`;
    btn.appendChild(btnImg);
    return btn;
}

const createDelBtn = todoItem => {
    const delBtn = createBtn('delete');
    delBtn.addEventListener('click', () => deleteTodo(todoItem));
    return delBtn;
}

const createEditBtn = (task) => {
    const editBtn = createBtn('edit')
    editBtn.addEventListener('click', () => {
        editIp.value = task.innerText;
        editBtn.parentNode.parentNode.prepend(editIp);
        task.style.display = "none";
    })
    return editBtn;
}

const createUndoBtn = (todoItem) => {
    console.log('todoItem :>> ', todoItem)
}

const createTodo = (todoItem) => {//creating todo
    const newTodo = createNewTodo(todoItem.uid);
    const task = createTask(todoItem.task);
    const isDone = createIsDone(todoItem, task);
    const delBtn = createDelBtn(todoItem);
    const editBtn = createEditBtn(task);
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

//Event Listners
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

editIp.addEventListener("keypress", (e) => {
    if (e.key === 'Enter') {
        const parent = editIp.parentNode;
        const task = parent.getElementsByClassName("todo-task")[0];
        const taskObj = todoList.find(e => e.uid === parent.id);
        const editedText = editIp.value.trim();
        if (editedText.length > 0) {
            task.innerText = editedText;
            taskObj.task = editedText;
            console.log('task.innerHTML :>> ', task.innerHTML);
            localStorage.setItem("todoItems", JSON.stringify(todoList));
        }
        task.style.display = "flex";
        editIp.remove();
    }
})