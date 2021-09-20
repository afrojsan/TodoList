const fetchLoginForm = document.querySelector('#fetchLoginForm')
const signUp = document.querySelector('#signUp')
console.log(fetchLoginForm);

//POST
fetchLoginForm.addEventListener('submit', async(event) => {
    event.preventDefault();
    const form = event.target;
    const formObject = {};
    formObject['username'] = form.fetchUsername.value;
    formObject['password'] = form.fetchPassword.value;
    console.log(formObject);

    const response = await fetch('http://localhost:8080/user/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formObject),
    })
    let jsonResponse = await response.json();
    console.log(response);
    if (response.ok === true) {
        window.location.replace("../../desktop&mobile.html")
    } else {
        alert(`Please enter the right email or password`)
    }
});

/*
const formObject = {};
formObject['username'] = form.fetchUsername.value;
formObject['password'] = form.fetchPassword.value;

//UPDATE
fetch('http://localhost:8080/user/login', {
    method: 'PUT',
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(formObject), //need to define form object//
})
.then(res => res.json())
.then(data => console.log(data));

//DELETE
fetch('http://localhost:8080/login', {
    method: 'DELETE'
        .console.log(fetchLoginForm)
});
*/

/*
// [todo]
const fetchTodolist = document.querySelector('#showTodolist');
fetchTodolist.addEventListener('click', async(e) => {
    e.preventDefault();
    const data = await fetch('http://localhost:8080/todolist')
    const jsonResponse = await data.json()
    let displayArea = document.querySelector('#fetch-area')
    let displayhtml = "" //`<div>ID, Name, Description, Assigned to, Due Date, Status</div>`
    for (let i of jsonResponse) {
        displayhtml = displayhtml + `
        <div>
        <form id='data-${i.id}'>
        <div>ID: <span class='dataField' id='id'>${i.id}</span></div>
        <div>Task Name: <span class='dataField' id='name'>${i.name}</span></div>
        <div>Description: <span class='dataField' id='description'>${i.description}</span></div>
        <div>Assigned to: <span class='dataField' id='assignedto'>${i.assignedto}</span></div>
        <div>Due Date: <span class='dataField' id='duedate'>${i.duedate}</span></div>
        <div>Status: <span class='dataField' id='status'>${i.status}</span></div>
        <BR>
        <button class='button edit'>EDIT</button>
        <button class='button delete'>DELETE</button>
        <hr>
        <script>
        </script>
        </form>
        </div>`
    }
    displayArea.innerHTML = displayhtml;
    // document.querySelector('.button.delete').addEventListener('click', async(e) => {
    //     e.preventDefault()
    //     const delResponse = await fetch(`http://localhost:8080/todolist/${i.id}`, {method: 'DELETE'})
    //     if((await delResponse.json()).result == 'deleted') {}
    // })
})


const editButton = document.querySelector('.edit.button');
console.log(editButton)
editButton.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(e)
})
*/