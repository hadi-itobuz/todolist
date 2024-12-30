const todoContainer = document.getElementById("todo__container");
const todoItem=document.getElementsByClassName("todo__container__item");
const addBtn = document.getElementById("add-todo");
const todoInput = document.getElementById("todo-input");
const deleteBtns = document.getElementsByClassName("delete-todo");
const todoList = [];
const allBtn=document.getElementById("all");
const activeBtn=document.getElementById("active");
const completeBtn=document.getElementById("complete");
const clearBtn=document.getElementById("clear");
let uniqueID = 0;
class todo {//class
    constructor(task) {
        this.uid = `todo${++uniqueID}`;
        this.task = task;
        this.isDone = false;
        addTodo(this);
    }
}
const createTodo=(todoItem)=>{
    todoList.unshift(todoItem);

    const newTodo = document.createElement("div");
    newTodo.classList.add("todo__container__item");
    newTodo.id = `${todoItem.uid}`;
    const task = document.createElement("p");
    task.innerHTML = todoItem.task;

    const isDone = document.createElement("button");
    isDone.classList.add("delete-todo");
    // isDone.innerHTML = todoItem.isDone;
    const img=document.createElement("img");
    isDone.appendChild(img);
    img.src='./images/true.png';
    isDone.addEventListener('click', () => {
        todoItem.isDone = !todoItem.isDone;
        img.src=(!todoItem.isDone)?'./images/true.png':'./images/false.png';
        task.style.textDecoration=(todoItem.isDone)?'line-through':'none';
        
    });
    newTodo.appendChild(task);
    newTodo.appendChild(isDone);
    return newTodo;
}
const addTodo = (todoItem) => {//creating & adding todo to todoContainer
    todoContainer.appendChild(createTodo(todoItem));
}
addBtn.addEventListener('click', (e) => {
    const task = todoInput.value;
    todoInput.value = '';
    if(!todoList.find(e=>e.task===task) && task.trim().length){
        new todo(task);
    }
})
allBtn.addEventListener('click',()=>{
    for(let i=0;i<todoItem.length;i++){
        todoItem[i].style.display="flex";
    }
});
activeBtn.addEventListener('click',()=>{
    for(let i=0;i<todoItem.length;i++){
        const id=todoItem[i].id;
        if(todoList.find((e) => e.uid===id).isDone){
            todoItem[i].style.display="none";
        }else{
            todoItem[i].style.display="flex";
        }
    }
})
completeBtn.addEventListener('click',()=>{
    for(let i=0;i<todoItem.length;i++){
        const id=todoItem[i].id;
        if(todoList.find((e) => e.uid===id).isDone){
            todoItem[i].style.display="flex";
        }else{
            todoItem[i].style.display="none";
        }
    }
})
clearBtn.addEventListener('click',()=>{
    for(let i=0;i<todoItem.length;i++){
        const id=todoItem[i].id;
        if(todoList.find((e) => e.uid===id).isDone){
            todoItem[i].remove();   
        }
    }
})