const URL = 'http://localhost:3000/greetings/'

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
    for(const q of data.data) {
        const firstDiv = document.createElement('div');
        const firstPara = document.createElement('p');
        const secondPara = document.createElement('p');
        const thirdPara = document.createElement('p');
        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');

        firstDiv.className = "content"
        const dataObject = {
            id: data.data[index]._id,
            name:data.data[index].name,
            message:data.data[index].message
        }
        editButton.className = "edit-button"
        deleteButton.className = "delete-button"
        firstPara.innerHTML = data.data[index].name;
        secondPara.innerHTML = data.data[index].message;
        thirdPara.innerHTML = data.data[index].createdAt;
        editButton.innerHTML = "Edit";
        deleteButton.innerHTML = "Delete";
        index++;

        firstDiv.append(firstPara,secondPara,thirdPara,editButton,deleteButton);
        mainDiv.append(firstDiv);
        editButton.addEventListener("click", () => { editData(dataObject)});
        deleteButton.addEventListener("click", () => { removeData(dataObject)})
        mainDiv.style.display = 'block'
    }
}
addData = () => {
        const data = {
            name : document.getElementById("name").value,
            message : document.getElementById("message").value
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
            if(!data.success){
                document.getElementById("name_error").innerHTML = "Invalid input"
            }
            else{
                alert(data.message)
            }
        })
    }

updateData = () => {
    var id = document.getElementById("id").value;
    const data = {
        name : document.getElementById("newName").value,
        message : document.getElementById("newMessage").value
      }
    fetch(URL+id, {
        method: 'PUT',
        headers:{
            'content-Type' : 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log("data: "+data)
        if(!data.success){
            document.getElementById("newName_error").innerHTML = "Invalid input"
        }
        else{
            alert(data.message)
        }
    })
}

removeData = (dataObject) => {
    var id = dataObject.id;

    fetch(URL+id, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message)
    })
}

editData = (dataObject) => {
    document.getElementById('main').style.display = 'none'
    document.getElementById("update").style.display = 'block'
    document.getElementById("newName").value = dataObject.name;
    document.getElementById("newMessage").value = dataObject.message;
    document.getElementById("id").value = dataObject.id;
    document.getElementById("paraId").style.display = 'none'
}
