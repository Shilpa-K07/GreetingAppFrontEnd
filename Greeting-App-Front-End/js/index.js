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
}
edit = () => {
    document.getElementById("update").style.display = 'block'
    document.getElementById('add').style.display = 'none'
    document.getElementById('main').style.display = 'none'
}
get = () => {
    document.getElementById('add').style.display = 'none';
    document.getElementById('update').style.display = 'none'
    fetch('http://localhost:3000/greetings/')
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
        firstDiv.className = "content"

        firstPara.innerHTML = data.data[index]._id;
        secondPara.innerHTML = data.data[index].name;
        thirdPara.innerHTML = data.data[index].message;
        index++;

        firstDiv.append(firstPara,secondPara,thirdPara);
        mainDiv.append(firstDiv);
        mainDiv.style.display = 'block'
    }
}
addData = () => {
        var name = document.getElementById("name").value;
        var message = document.getElementById("message").value;
        fetch('http://localhost:3000/greetings/', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: name, message: message}),
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById("success-message").innerHTML = data.message
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

updateData = () => {debugger;
    var id = document.getElementById("id").value;
    var name = document.getElementById("newName").value;
    var message = document.getElementById("newMessage").value;

    fetch('http://localhost:3000/greetings/'+id, {
        method: 'PUT',
        headers:{
            'content-Tye' : 'application/json',
        },
        body: JSON.stringify({name: name, message: message})
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("update-message").innerHTML = data.message
    })
    .catch((error) => {
        console.error('Error:', error)
    });
}

removeData = () =>{debugger;
    var id = document.getElementById("idToDelete").value;

    fetch('http://localhost:3000/greetings/'+id, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("delete-message").innerHTML = data.message
    })
}