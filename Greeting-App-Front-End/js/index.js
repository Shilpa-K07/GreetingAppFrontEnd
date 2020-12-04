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
    fetch('http://localhost:3000/greetings/')
    .then(
    response => response.json())
    .then(people => {
    const names = data.map(data => data.name).join("\n");
    console.log(names)
    })
}

