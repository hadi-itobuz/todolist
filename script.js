const todoContainer = document.getElementById("todo__container");
const todoItem = document.getElementsByClassName("todo__container__item");
const addBtn = document.getElementById("add-todo");
const todoInput = document.getElementById("todo-input");
const allBtn = document.getElementById("all");
const activeBtn = document.getElementById("active");
const completeBtn = document.getElementById("complete");
const clearBtn = document.getElementById("clear");
let todoList = [];//empty todolist to store todo objects
// const todoList=JSON.parse(localStorage.getItem("todoItems")) || [];
let uniqueID = 0;

class todo {//class
    constructor(task) {
        this.uid = `todo${++uniqueID}`;//upadating and assigning uid
        this.task = task;
        this.isDone = false;
        addTodo(this);//adding newly created todo to Document
        // localStorage.setItem("todoItems",JSON.stringify(todoList))
    }
}

const deleteTodo = (item) => {//function to delete todoList item
    document.getElementById(item.uid).remove();//removing from DOM
    const index = todoList.indexOf(item);
    if (index > -1) //found
        todoList.splice(index, 1);//removing from array
}

const createNewTodo = (uid) => {//creating new todo item div
    const newTodo = document.createElement("div");
    newTodo.classList.add("todo__container__item");
    newTodo.id = `${uid}`;
    return newTodo;
}

const createTask = (txt) => {
    const task = document.createElement("p");
    task.innerHTML = txt;
    return task;
}

const createIsDone = (todoItem, task) => {
    const isDone = document.createElement("button");
    isDone.classList.add("todo-btn");
    const img = document.createElement("img");
    isDone.appendChild(img);
    img.src = './images/true.png';
    isDone.addEventListener('click', () => {
        todoItem.isDone = !todoItem.isDone;
        img.src = (!todoItem.isDone) ? './images/true.png' : './images/false.png';//changing icon
        task.style.textDecoration = (todoItem.isDone) ? 'line-through' : 'none';
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
            }
            editIp.remove(); //removing editng option
            task.style.display = "inline"; //bringing back task
        }
    })
    editBtn.addEventListener('click', () => {
        task.style.display = "none";
        editIp.value = todoItem.task;
        editBtn.parentNode.parentNode.prepend(editIp);//adding editing option
        task.parentNode.addEventListener('mouseleave',()=>{
            editIp.dispatchEvent(new KeyboardEvent('keypress',  {'key':'Enter'}));
        })
    })
    
    return editBtn;
}

const createTodo = (todoItem) => {//creating todo
    todoList.unshift(todoItem);
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
    const task = todoInput.value;
    todoInput.value = '';
    (!todoList.find(e => e.task === task) && task.trim().length) ? new todo(task) : alert("Invalid input");//adding if not repated and not empty
})

todoInput.addEventListener('keyup', (e) => {//if enter is pressed while typing
    if (e.key === 'Enter') addBtn.click();
})

allBtn.addEventListener('click', () => {
    for (let i = 0; i < todoItem.length; i++)//making evrything
        todoItem[i].style.display = "flex";//visible
});

const changeDisplay = (conditon) => {
    for (let i = 0; i < todoItem.length; i++)//maing visble or invisible based on condition
        todoItem[i].style.display = (conditon(todoItem[i].id)) ? "flex" : "none";
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