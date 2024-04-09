const listWrapper = document.querySelector('.list-wrapper');
const listHeader = document.querySelector('#list-header');
let listInput = document.querySelector('#list-input');
const addBtn = document.querySelector('#add-button');
let list = document.querySelector('#list');
let startMsg = document.querySelector('#start-message');

addBtn.addEventListener('click', addNewElementHandler);
//додавання елемента при натисканні "Enter"
listInput.addEventListener('keydown', (e) => {
    if(e.code === 'Enter') {
        addNewElementHandler();
    }
});

//створюємо новий елемент у списку
function addNewElementHandler() {
    let inputValue = listInput.value;
    let li = document.createElement('li');
    li.classList.add('list-item');
    let liText = document.createTextNode(inputValue);

    if(!startMsg.hidden) {
        startMsg.hidden = true;
    }

    (inputValue === '') ? alert('Can you write something?') : li.appendChild(liText);
    list.appendChild(li);
    listInput.value = '';

    let liCloseBtn = createLiCloseBtn();
    li.appendChild(liCloseBtn);
}


function createLiCloseBtn() {
    let span = document.createElement('span');
    span.className = 'close';
    let spanText = document.createTextNode('\u00D7');
    span.appendChild(spanText);
    return span;
}

list.addEventListener('click', removeOrSelectHandler);

//додавання класу "checked" при кліку на li або видалення завдання при кліку на "X"
function removeOrSelectHandler(e) {
    switch(e.target.className) {
        case 'close': e.target.parentElement.remove();
                    //якщо немає завдань, то показуємо стартове повідомлення
                    if((startMsg.hidden) && (list.children.length <= 1)) {
                        startMsg.hidden = false;
                    }
            break;
        case 'list-item': e.target.classList.toggle('checked');
            break;
    }    
}

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
