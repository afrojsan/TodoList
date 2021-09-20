const dataForm = document.querySelector('#desktop-text-area')
const toDoData = document.querySelector('#list-all-text-content')
const submit = document.querySelector('#desktop-submit')
const showDataButton = document.querySelector('#desktop-show-data')
const listDataFrom = document.querySelector('#list-all-text-content-form')

// set up Desktop POST input data to sever and addDate function in the end
dataForm.addEventListener('submit', async(event) => {
    event.preventDefault();
    const form = event.target
    const dataObj = {
        duedate: form.desktopDuedate.value,
        name: form.desktopName.value,
        description: form.desktopDescription.value,
        assignedto: form.desktopAssignedto.value,
        status: form.desktopStatus.value
    }
    console.log(dataObj)

    const response = await fetch('http://localhost:8080/todolist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataObj)

    })
    const data = await response.json()
    addData()


})




// Show Data
async function DesktopshowData() {

    const response = await fetch('http://localhost:8080/todolist', {
        method: 'GET'
    })
    const dataArr = await response.json()
    toDoData.innerHTML = ''
    for (let i = 0; i < dataArr.length; i++) {
        toDoData.innerHTML += `
        <div id="list-all-text-content" class="list-all-text-content">
            <form id="list-all-text-content-form">
                <div class="list-tetx">
                    <div>NO.${dataArr[i].id}</div>
                    <div>Date:${dataArr[i].duedate} </div>
                    <div>Name: ${dataArr[i].name}</div>
                    <div>Description:${dataArr[i].description} </div>
                    <div>Assigned: ${dataArr[i].assignedto}</div>
                    <div>Status: ${dataArr[i].status}</div>
                </div>
                <div class="list-all-text-content-button">
                    <button id="desktopDeleteButton" class="desktopDeleteButton" data-id="${dataArr[i].id}"><img src="./src/image/trash-icon.svg"></button>
                
                    <button id="edit-button" class="edit-button" data-id="${dataArr[i].id}"><img src="./src/image/edit-icon.svg"></i></button>
                </div> 
            </form>
        </div>
        `
    }
    const updateButton = document.querySelectorAll('#edit-button')
    for (let elenment of updateButton) {
        elenment.addEventListener('click', (event) => {
            event.preventDefault();
            updateData(elenment.getAttribute('data-id'))
        })
    }

    const deleteButton = document.querySelectorAll('#desktopDeleteButton')
    for (let elenment of deleteButton) {
        elenment.addEventListener('click', (event) => {
            event.preventDefault()
            desktopDeleteItem(elenment.getAttribute('data-id'))
        })
    }

}

showDataButton.addEventListener('click', DesktopshowData)





// set up Desktop addData function
async function addData() {
    const response = await fetch('http://localhost:8080/todolist', {
        method: 'GET'
    })
    const dataArr = await response.json()
    toDoData.innerHTML = ''
    for (let i = 0; i < dataArr.length; i++) {
        toDoData.innerHTML += `
        <div id="list-all-text-content" class="list-all-text-content">
            <form id="list-all-text-content-form">
                <div class="list-tetx">
                    <div>NO.${dataArr[i].id}</div>
                    <div>Date:${dataArr[i].duedate} </div>
                    <div>Name: ${dataArr[i].name}</div>
                    <div>Description:${dataArr[i].description} </div>
                    <div>Assigned: ${dataArr[i].assignedto}</div>
                    <div>Status: ${dataArr[i].status}</div>
                </div>
                <div class="list-all-text-content-button">
                    <button id="desktopDeleteButton" class="desktopDeleteButton" data-id="${dataArr[i].id}"><img src="./src/image/trash-icon.svg"></button>

                    <button id="edit-button" class="edit-button" data-id="${dataArr[i].id}"><img src="./src/image/edit-icon.svg"></i></button>
                </div> 
            </form>
        </div>
        `
    }

    const updateButtons = document.querySelectorAll('#edit-button')
    for (let elenment of updateButtons) {
        elenment.addEventListener('click', (event) => {
            event.preventDefault();
            updateData(elenment.getAttribute('data-id'))
        })
    }

    const deleteButton = document.querySelectorAll('#desktopDeleteButton')
    for (let elenment of deleteButton) {
        elenment.addEventListener('click', (event) => {
            event.preventDefault()
            desktopDeleteItem(elenment.getAttribute('data-id'))
        })
    }

}



// update todolist setup
const updateData = async(id) => {
    let selectedItem = {}
    let updatedItem = {}
    let response = await fetch('http://localhost:8080/todolist')
    let resArr = await response.json()
    for (let resItem of resArr) {
        if (resItem.id === id) {
            selectedItem = {...resItem }
        }
    }

    toDoData.innerHTML = `
    <form id='desktopUpDataForm'>
        <div id="desktopId" class="desktopId">
            <label for="desktopId">ID:</label>
            <br>    
            <input type="text" name="desktopId" value="${selectedItem.id}" disabled>
        </div>

        <div id="desktopDuedate" class="desktopDuedate">
            <label for="desktopDuedate">Due Date:</label>
            <br>
            <input type="date" name="desktopDuedate" value="${selectedItem.duedate}" required>
        </div>

        <div id="desktopName" class="desktopName">
            <label for="desktopName'">Name:</label>
            <br>
            <input type="text" name="desktopName" value="${selectedItem.name}" required>
        </div>

        <div id="desktopDescription" class="desktopDescription">
            <label for="desktopDescription'">Description:</label>
            <br>
            <input type="text" name="desktopDescription" value="${selectedItem.description}" required>
        </div>

        <div id="desktopAssignedto" class="desktopAssignedto">
            <label for="desktopAssignedto'">Assigned:</label>
            <br>
            <input type="text" name="desktopAssignedto" value="${selectedItem.assignedto}" required>
        </div>

        <div id="desktopStatus" class="desktopStatus">
            <label for="desktopStatus'">Status:</label>
            <br>
            <input type="text" name="desktopStatus" value="${selectedItem.status}" required>
        </div>
        <button class='button' type='submit'>UPDATED!</button>
        </form>
        <button id='desktopCancelButton'>Cancel</button>
    `

    document.querySelector('#desktopCancelButton').addEventListener('click', () => {
        DesktopshowData()
    })


    document.querySelector('#desktopUpDataForm').addEventListener('submit', (event) => {
        event.preventDefault();
        updatedItem.id = event.target.desktopId.value
        updatedItem.duedate = event.target.desktopDuedate.value
        updatedItem.name = event.target.desktopName.value
        updatedItem.description = event.target.desktopDescription.value
        updatedItem.assignedto = event.target.desktopAssignedto.value
        updatedItem.status = event.target.desktopStatus.value
        update(updatedItem)
    })

    toDoData.style = 'text-align:center'
}

const update = async(data) => {
    let dataObj = {
        id: data.id,
        duedate: data.duedate,
        name: data.name,
        description: data.description,
        assignedto: data.assignedto,
        status: data.status
    }
    const ulr = 'http://localhost:8080/todolist/' + data.id

    let response = await fetch(ulr, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataObj)
    })

    if (response.ok) {
        toDoData.innerHTML = `
        Your list has been updated please click show list to check!!
        `
    }
}




// delete button
async function desktopDeleteItem(id) {
    const url = 'http://localhost:8080/todolist/' + id
    const setting = {
        method: 'DELETE'
    }
    console.log('hello')
    const response = await fetch(url, setting)
    if (response.ok) {
        toDoData.innerHTML = `
            Your item has been deleted please click show list to check!!
            `
    }
}