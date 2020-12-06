list = () => {
    document.getElementById("list1").style.display = 'block'
    document.getElementById("list2").style.display = 'block'
    document.getElementById("list3").style.display = 'block'
}
remove = () => {
    document.getElementById("list1").style.display = 'none'
    document.getElementById("list2").style.display = 'none'
    document.getElementById("list3").style.display = 'none'
}
add = () => {
    document.getElementById('add').style.display = 'block'
    document.getElementById('main').style.display = 'none'
}
edit = () => {
    document.getElementById("message").innerHTML = "Hi"
}
get = () => {debugger;
    document.getElementById('add').style.display = 'none';
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
   /*  addData = () => {debugger;
        name = document.getElementById("name").value;
        message = document.getElementById("message").value;
        fetch('http://localhost:3000/greetings/', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: name, message: message}),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
} */