const addButton = document.querySelector("#liveToastBtn");
const input = document.querySelector("#task");
const list = document.querySelector("#list");
let listElements = document.querySelectorAll("#list>li");

addButton.addEventListener("click",addTasks);

const remove = element => element.parentNode.remove();
function addTasks() {
    if(input.value.trim() == "") 
    {
        $(".error").toast("show");
    }
    else
    {
        let element = document.createElement("li");
        element.innerHTML = `${input.value}<span class="close" onClick="remove(this)">x</span>`;
        console.log(element.innerHTML);
        element.addEventListener("click",taskEnd);
        list.insertBefore(element,list.childNodes[0]);
        input.value="";
        $(".success").toast("show");
        saveLocalStorage();
    }
}


function taskEnd(){
    this.classList.toggle("checked");
    saveLocalStorage();
}

function postTasks(txt,classname){
    let element = document.createElement("li");
    element.innerHTML = txt;
    element.className = classname;
    element.addEventListener("click",taskEnd);
    list.append(element);
}

function getTasks(){
    let tasks = JSON.parse(localStorage.getItem("items")) || [];
    let classNames = JSON.parse(localStorage.getItem("classes")) || [];
    tasks.forEach((element,index) =>{
        postTasks(element,classNames[index])
    });
    console.log(tasks);
}
function saveLocalStorage(){
    let toLocalStorage = [];
    let elements = document.querySelectorAll("#list>li");
    let classNames = [];

    for(let i=0;i<elements.length;i++){
        toLocalStorage.push(elements[i].innerHTML);
        classNames.push(elements[i].className);
    }

    console.log(toLocalStorage);

    localStorage.setItem("items",JSON.stringify(toLocalStorage));
    localStorage.setItem("classes", JSON.stringify(classNames))
}

window.onload = getTasks;