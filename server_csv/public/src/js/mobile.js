const showListButton = document.querySelector('#show-list');
const displayList = document.querySelector('#list');
const submitButton = document.querySelector('#inputForm');
const showButton = document.querySelector('#show-button');
const list = document.querySelector('#list-Form');
const hideButton = document.querySelector('#hide-list-button');







async function showData() {


    const res = await fetch('http://localhost:8080/todolist', {
        method: 'GET'
    })
    const dataArr = await res.json();
    // console.log(res);
    // console.log(dataArr);
    displayList.innerHTML = ` `;

    for (i = 0; i < dataArr.length; i++) {
        // console.log(dataArr[i].id);
        // console.log(dataArr[i].name);
        // console.log(dataArr[i].description);
        // console.log(dataArr[i].assignedto);
        // console.log(dataArr[i].duedate);

        displayList.innerHTML += `
        <form id='data-detail-form' class='data-detail-form'>
       
        <table>
            <tr>
                <td colspan="5">
                    <div class='id'>ID: ${dataArr[i].id}</div>
                </td>
                <tr>
                    <td colspan="5">
                        <div class="name">Name: ${dataArr[i].name}</div>
                    </td>
                    <tr>
                        <td colspan="5">
                            <div class="description">Description: ${dataArr[i].description}</div>
                        </td>
                    </tr>
                    <td>
                        <div class="assigned-to">Assigned To: ${dataArr[i].assignedto}</div>
                    </td>
                    <td>
                        <div class="due-date">Due Date: ${dataArr[i].duedate}</div>
                    </td>
                    <tr>

                        <td colspan="5">
                            <div class="status">Status: ${dataArr[i].status}</div>
                        </td>
                    </tr>
                </tr>
        </table>
        
    </form>
    <div class="for-list-button">

    <button class="delete-button" id="${dataArr[i].id}">DELETE</button>
    <button class="update-button" id="${dataArr[i].id}">UPDATE</button>
    </div>
    <br>
        `
    };

    const deleteButton = document.querySelectorAll('.delete-button');


    for (let elenment of deleteButton) {
        elenment.addEventListener('click', () => {
            deleteItem(elenment.id)
        })
    };

    const updateButton = document.querySelectorAll('.update-button');
    for (let elenment of updateButton) {
        elenment.addEventListener('click', () => {
            updateItem(elenment.id)
        })
    }
}

showListButton.addEventListener('click', showData);

async function addToServer(event) {

    event.preventDefault();
    const form = event.target

    const dataObj = {
        id: form.id.value,
        name: form.name.value,
        description: form.description.value,
        assignedto: form.assignedTo.value,
        duedate: form.dueDate.value,
        status: form.status.value
    }

    const res = await fetch('http://localhost:8080/todolist', {
        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(dataObj)
    })


    if (res.ok) {
        // console.log(await res.json())
        showData()
    }
}

submitButton.addEventListener('submit', addToServer);

function showInputForm() {
    if (list.style.display === 'none') {
        list.style.display = 'flex';
    } else {
        list.style.display = 'none';
    }
}

showButton.addEventListener('click', showInputForm);

hideButton.addEventListener('click', () => {
    displayList.innerHTML = '';
});

// ------------------deleteItem-------------------
async function deleteItem(id) {
    const url = 'http://localhost:8080/todolist/' + id
    const setting = {
        method: 'DELETE'
    }
    const res = await fetch(url, setting)
    if (res.ok) {
        displayList.innerHTML = "<div> item: " + id + " is deleted.</div>"
    }
}

// ------------------updateItem-------------------
async function updateItem(id) {
    let res = await fetch('http://localhost:8080/todolist');
    let selectedItem = {};
    let updatedItem = {};
    let resArr = await res.json();
    for (let elenment of resArr) {
        if (elenment.id === id) {
            selectedItem = {...elenment }
        }
    }

    displayList.innerHTML = `
    <div class="updatelist">
    <form id='update-form'>
    
    

    <table>
    <tr>
                            <td>
                                <lable for="id ">ID:</lable>
                            </td>
                            <td>
                                <input type="text " size="50 " name="id" id="id" value="${selectedItem.id}" readonly>
                            </td>
                        </tr>
                        <tr>
                            
                        </tr>
                        <tr>
                            <td>
                                <lable for="due-date ">Due Date:</lable>
                            </td>
                            <td>
                                <input type="date" size="50 " name="duedate" id="due-date" value="${selectedItem.duedate}">
                            </td>
                        </tr>
                        <tr>
                            
                        </tr>
                        <tr>
                            <td>
                                <lable for="name ">Name:</lable>
                            </td>
                            <td>
                                <input type="text " size="50 " name="name" id="name" value="${selectedItem.name}">
                            </td>
                        </tr>
                        <tr>
                            
                        </tr>
                        <tr>
                            <td>
                                <lable for="description ">Description:</lable>
                            </td>
                            <td>
                                <input type="text " size="50 " name="description" id="description" value="${selectedItem.description}">
                            </td>
                        </tr>
                        <tr>
                            
                        </tr>
                        <tr>
                            <td>
                                <lable for="status ">Status:</lable>
                            </td>
                            <td>
                                <input type="text " size="50 " name="status" id="status"   onfocus="this.value=''" list="ops" value="${selectedItem.status}">
                                <datalist id="ops" >
                                <option value="REVIEW" ></option>
                                <option value="IN PROGRESS" ></option>
                                <option value="DONE"></option>
                                </datalist>
                                
                            </td>
                        </tr>
                        <tr>
                            
                        </tr>
                        <tr>
                            <td>
                                <lable for="assigned-to ">Assigned To:</lable>
                            </td>
                            <td>
                                <input type="text " size="50 " name="assignedto" id="assigned-to " value= "${selectedItem.assignedto}">
                            </td>
                        </tr>

                    </table>
                    
                    <div class="update-button-pos">
                    <button class='updateButton' >UPDATED!</button>
                    </div>
    </form>
    <button id='cancelButton' >Cancel</button>
    </div>
    `
    document.querySelector('#cancelButton').addEventListener('click', () => {
        showData();
    });

    document.querySelector('#update-form').addEventListener('submit', (event) => {
        event.preventDefault();
        updatedItem.id = event.target.id.value
        updatedItem.name = event.target.name.value
        updatedItem.description = event.target.description.value
        updatedItem.assignedto = event.target.assignedto.value
        updatedItem.duedate = event.target.duedate.value
        updatedItem.status = event.target.status.value
        performUpdate(updatedItem)
    })
}

const performUpdate = async(data) => {
    let dataObj = {
        id: data.id,
        name: data.name,
        description: data.description,
        assignedto: data.assignedto,
        duedate: data.duedate,
        status: data.status
    }
    const url = 'http://localhost:8080/todolist/' + data.id
    let res = await fetch(url, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataObj)
    })

    if (res.ok) {
        document.querySelector('#list ').innerHTML = `
        <div>Item ${data.id} is updated</div>
        <div id='data-${data.id}' class='data-field'>
        <div class='id'>ID: ${data.id}</div>
        <div class="name">Name: ${data.name}</div>
        <div class="description">Description: ${data.description}</div>
        <div class="assigned-to">Assigned To: ${data.assignedto}</div>
        <div class="due-date">DUE Date: ${data.duedate}</div>
        <div class="status">Status: ${data.status}</div>
        </div>
        `
    }
}