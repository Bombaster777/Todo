
document.getElementById('addTodo').addEventListener('click', async () => {
    const input = document.getElementById("todoText");
    const title = input.value;


    if (title) {
        const res = await fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ title, completed: false })
        });
        const todo = await res.json();
        todoToHtml(todo);
        input.value = '';
    }
})




async function getAllTodos() {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
    const todos = await res.json();
    console.log(todos);
    todos.forEach(todo => todoToHtml(todo));
}

window.addEventListener('DomContentLoaded', getAllTodos());

function todoToHtml({ id, completed, title }) {
    const todoList = document.getElementById('todos');


    todoList.insertAdjacentHTML('beforeend',
        `<div class="form-check" id='todo${id}'>
            <label for="form-check-label">
                    <input class="form-check-input" type="checkbox" ${completed && 'checked'}>
                ${title}
             </label>
            <button onclick='deleteTodo(${id})' class="btn-close" style="font-size: 10px;"></button>
        </div>`
    );
}
async function deleteTodo(id) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: "DELETE",
        header: {
            'Content-type': 'application/json',
        }
    });
    const data = await res.json();
    if (data) {
        document.getElementById(`todo${id}`).remove();
    }
}