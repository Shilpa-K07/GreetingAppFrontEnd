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
    document.getElementById("list1").style.display = 'block'
    document.getElementById("message").innerHTML = "Hello"
}
edit = () => {
    document.getElementById("message").innerHTML = "Hi"
}
get = () => {
    debugger;
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
    }
}