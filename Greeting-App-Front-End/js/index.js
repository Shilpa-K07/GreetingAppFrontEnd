const URL = 'http://localhost:3000/greetings/'
window.onload = () => {
    get();
}

add = () => {
    document.getElementById('add').style.display = 'block'
    document.getElementById('main').style.display = 'none'
    document.getElementById('update').style.display = 'none'
}

get = () => {
    document.getElementById('add').style.display = 'none';
    document.getElementById('update').style.display = 'none'

    fetch(URL)
        .then(response => response.json())
        .then(data => createElements(data))
}

createElements = (data) => {
    var index = 0;
    const mainDiv = document.querySelector('#main');

    for (const q of data.data) {
        const firstDiv = document.createElement('div');
        const firstPara = document.createElement('p');
        const secondPara = document.createElement('p');
        const thirdPara = document.createElement('p');
        const fourthPara = document.createElement('p')
        const editButton = document.createElement('img');
        const deleteButton = document.createElement('img');

        const dataObject = {
            id: data.data[index]._id,
            name: data.data[index].name,
            message: data.data[index].message
        }

        var date = new Date(data.data[index].createdAt);

        firstDiv.className = "content"
        fourthPara.className = "edit-delete-height"
        deleteButton.className = "delete-icon"
        editButton.src = "assests/edit.png"
        deleteButton.src = "assests/delete.png"
        firstPara.innerHTML = data.data[index].name;
        secondPara.innerHTML = data.data[index].message;
        thirdPara.innerHTML = date.toLocaleString();
        index++;

        fourthPara.append(editButton)
        fourthPara.append(deleteButton)
        firstDiv.append(firstPara, secondPara, thirdPara, fourthPara);
        mainDiv.append(firstDiv);
        editButton.addEventListener("click", () => { editData(dataObject) });
        deleteButton.addEventListener("click", () => { removeData(dataObject) })
        mainDiv.style.display = 'block'
    }
}

addData = () => {
    const data = {
        name: document.getElementById("name").value,
        message: document.getElementById("message").value
    }

    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            if (!data.success && data.message.includes("name")) {
                document.getElementById("name_error").innerHTML = "Invalid input"
            }
            else if (!data.success && data.message.includes("message")) {
                document.getElementById("message_error").innerHTML = "Message can not be empty"
            }
            else {
                alert(data.message)
            }
        })
    setTimeout(() => { document.getElementById("addForm").reset(); }, 1000);
}

updateData = () => {
    var id = document.getElementById("id").value;
    const data = {
        name: document.getElementById("newName").value,
        message: document.getElementById("newMessage").value
    }

    fetch(URL + id, {
        method: 'PUT',
        headers: {
            'content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            if (!data.success && data.message.includes("name")) {
                document.getElementById("newName_error").innerHTML = "Invalid input"
            }
            else if (!data.success && data.message.includes("message")) {
                document.getElementById("newMessage_error").innerHTML = "Message can not be empty"
            }
            else {
                document.getElementById("update").style.display = 'none'
                setTimeout(() => { alert(data.message); }, 500);
            }
        })
    setTimeout(() => { location.reload(); }, 1000);
}

deleteData = () => {
    var id = document.getElementById("deleteId").value

    fetch(URL + id, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById("delete").style.display = 'none'
            setTimeout(() => { alert(data.message); }, 500);
        })
    setTimeout(() => { location.reload(); }, 1000)
}

removeData = (dataObject) => {
    document.getElementById("delete").style.display = 'block'
    document.getElementById("deleteId").value = dataObject.id;
    document.getElementById("deleteId").style.display = 'none'
    blurBackground();
}

editData = (dataObject) => {
    validateNewName();
    validateNewMessage();
    document.getElementById("update").style.display = 'block'
    document.getElementById("newName").value = dataObject.name;
    document.getElementById("newMessage").value = dataObject.message;
    document.getElementById("id").value = dataObject.id;
    document.getElementById("paraId").style.display = 'none'
    blurBackground();
}

cancelDelete = () => {
    document.getElementById("delete").style.display = 'none'
    closeBlur();
}

closeEditForm = () => {
    document.getElementById("update").style.display = "none"
    closeBlur();
}

closeAddForm = () => {
    document.getElementById("add").style.display = "none"
}

validateName = () => {
    document.getElementById("name_error").innerHTML = "&nbsp"
}

validateMessage = () => {
    document.getElementById("message_error").innerHTML = "&nbsp"
}

validateNewName = () => {
    document.getElementById("newName_error").innerHTML = "&nbsp"
}

validateNewMessage = () => {
    document.getElementById("newMessage_error").innerHTML = "&nbsp"
}
blurBackground = () => {
    document.getElementById("main").style.filter = 'blur(3px)'
    document.getElementById("g-container").style.filter = 'blur(3px)'
    document.getElementById("s-nav").style.filter = 'blur(3px)'
    document.getElementById("body").style.overflow = 'hidden'
}
closeBlur = () => {
    document.getElementById("main").style.filter = 'none'
    document.getElementById("g-container").style.filter = 'none'
    document.getElementById("s-nav").style.filter = 'none'
    document.getElementById("body").style.overflow = 'auto'
}