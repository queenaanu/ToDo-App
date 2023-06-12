const theme = document.getElementById('theme');
const newItemInput = document.getElementById('addition');
const todolist = document.querySelector('.content ul');
const itemsLeft = document.querySelector('.items-left span');



itemsLeft.innerText = todolist.children.length
theme.addEventListener('click', () => {
    document.body.classList.toggle('theme-light');
});

document.querySelector('.add-new-item span').addEventListener('click', () => {
    if (newItemInput.value.length > 0) {
        createNewTodoItem(newItemInput.value);
        newItemInput.value = '';
    }
});

newItemInput.addEventListener('keypress', (e) => {
    if (e.key == 'Enter' || e.keyCode === 13) {
        createNewTodoItem(newItemInput.value);
        newItemInput.value = '';
    }
});

function createNewTodoItem(text) {
    const elem = document.createElement('li');
    elem.classList.add('flex-row');

    elem.innerHTML = `
        <label class="list-item">
        <input type="checkbox" name="todoitem">
        <span class="checkmark"></span>
        <span class="text">${text}</span>
    </label>
    <span class="remove"></span>
    `;


    const id = document.querySelector(".filter input[type='radio']:checked").id
    if (id === 'completed'){
        elem.classList.add("hidden");
    }
   todolist.append(elem);
   updateItemsCount(1);
    }

function updateItemsCount(num) {
    if(num > 0)
    itemsLeft.innerText = todolist.children.length + num - 1
    if(num < 0) itemsLeft.innerText = todolist.children.length + num + 1
}

//remove todo item

function removeTodoItem(elem) {
    elem.remove();
    updateItemsCount(-1);
}

todolist.addEventListener('click',(event) => {
    if (event.target.classList.contains('remove')) {
        removeTodoItem(event.target.parentElement);
    }
});

// clear completed items

document.querySelectorAll('.filter input').forEach(radio => (
    radio.addEventListener('change', (e) => (
        filtertodoItems(e.target.id)
    ))
));

//filter todo list items
document.querySelectorAll('.filter input').forEach(radio => (
    radio.addEventListener('change', (e) => (
        filtertodoItems(e.target.id)
    ))
))

function filtertodoItems(id) {
    const allItems = todolist.querySelectorAll('li');

    switch(id) {
        case 'all':
            allItems.forEach(item => (
                item.classList.remove('hidden')
            ))
            break;
        case 'active':
            allItems.forEach(item => {
                if(item.querySelector('input').checked)
                    item.classList.add('hidden') 
            })
            break;
        default:
            allItems.forEach(item => {
            if(item.querySelector('input').checked)
                item.classList.add('hidden')
            }
            )
            break;
            }
        }
