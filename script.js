const listWrapper = document.querySelector('.list-wrapper');
let tasks = [];
let input = document.querySelector('#list-input');
const addBtn = document.querySelector('#add-button');
let startMsg = document.querySelector('#start-message');
let tasksList = document.querySelector('#list');

//переміщення списку по сторінці
let move = false;
let offsetX;
let offsetY;

//запис положення курсора при натисканні на wrapper
listWrapper.addEventListener('mousedown', (e) => {
    move = true;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
});

//зміна положення елемента
document.addEventListener('mousemove', (e) => {
    if(move) {
        listWrapper.style.top = e.clientY - offsetY + 'px';
        listWrapper.style.left = e.clientX - offsetX + 'px';
    }
});

document.addEventListener('mouseup', (e) => {
    move = false;
});

addBtn.addEventListener('click', addTaskHandler);

input.addEventListener('keydown', function (e) {
    if(e.code === 'Enter') addTaskHandler();
});

function addTaskHandler() {
    if(input.value) {
        if(!startMsg.hidden) startMsg.hidden = true;        

        let newTask = new Task(input.value);
        newTask.createTaskElement(tasksList);
        newTask.createLiCloseBtn(tasksList);

        tasks.push(newTask);

        input.value = '';
    } else {
        alert(`Add task name!`);
    }
}

function Task(inputText) {
    this.text = inputText;
    this.checked = false;
    this.li = null;
    this.span = null;
}

Task.prototype.createTaskElement = function (list) {
    this.li = document.createElement('li');
    this.li.classList.add('list-item');
    this.li.textContent = this.text;
    list.append(this.li);
}

Task.prototype.createLiCloseBtn = function (list) {
        this.span = document.createElement('span');
        this.span.classList.add('close');
        this.span.textContent = '\u00D7';
        this.li.append(this.span);
}

tasksList.addEventListener('click', removeOrSelectHandler);

//додавання класу "checked" при кліку на li або видалення завдання при кліку на "X"
function removeOrSelectHandler(e) {
    if(e.target.className === 'close') {
        e.target.parentElement.remove();
        //якщо немає завдань, то показуємо стартове повідомлення
        if((startMsg.hidden) && (list.children.length <= 1)) {
            startMsg.hidden = false;
        }
    }
    if(e.target.classList.contains('list-item')) e.target.classList.toggle('checked');   
}