const URL = 'http://localhost:3000/greetings/'
remove = () => {
    document.getElementById("delete").style.display = 'block'
    document.getElementById("update").style.display = 'none'
    document.getElementById('add').style.display = 'none'
    document.getElementById('main').style.display = 'none'
}
add = () => {
    document.getElementById('add').style.display = 'block'
    document.getElementById('main').style.display = 'none'
    document.getElementById('update').style.display = 'none'
    document.getElementById("delete").style.display = 'none'
}
edit = () => {
    document.getElementById("update").style.display = 'block'
    document.getElementById('add').style.display = 'none'
    document.getElementById('main').style.display = 'none'
    document.getElementById("delete").style.display = 'none'
}
get = () => {
    document.getElementById('add').style.display = 'none';
    document.getElementById('update').style.display = 'none'
    document.getElementById("delete").style.display = 'none'
    fetch(URL)
        .then(response => response.json())
        .then(data => createElements(data))
        .catch(err => console.log(err))
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
        editButton.className = "edit-button"
        deleteButton.className = "delete-button"
        firstPara.innerHTML = data.data[index]._id;
        secondPara.innerHTML = data.data[index].name;
        thirdPara.innerHTML = data.data[index].message;
        editButton.innerHTML = "Edit";
        deleteButton.innerHTML = "Delete";
        index++;

        firstDiv.append(firstPara,secondPara,thirdPara,editButton,deleteButton);
        mainDiv.append(firstDiv);
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
            console.log("Data: "+data)
            document.getElementById("success-message").innerHTML = data.message
        })
        .catch((error) => {
            console.error('Error:', error);
        });
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
        document.getElementById("update-message").innerHTML = data.message
    })
    .catch((error) => {
        console.error('Error:', error)
    });
}

removeData = () =>{
    var id = document.getElementById("idToDelete").value;

    fetch(URL+id, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("delete-message").innerHTML = data.message
    })
}
