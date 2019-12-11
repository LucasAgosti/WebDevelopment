const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle co";
const LINE_THROUGH = "lineThrough";

let LIST = [], id = 0;

const options = {weekday : "long", month: "short", day: "numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

function addTask(task, id, done, trash){
    
    if(trash){
        return;
    }
    
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    
    const item = `    
                    <li class="item">
                        <i class="far ${DONE} co" job="complete" id="${id}"></i>
                        <p class="text ${LINE}">${task}</p>
                        <i class="fas fa-minus-circle de" job="delete" id="${id}"></i> 
                    </li>
                `;
    
    const position = "beforeend";
    
    list.insertAdjacentHTML(position, item);
}

document.addEventListener("keyup", function(even){
    if(event.keyCode == 13){
        const task = input.value;
        
        if(task){
            addTask(task, id, false, false);
            
            LIST.push({
                name : task, 
                id: id,
                done : false,
                trash : false 
            });
            
            id++;
        }
        input.value = "";
    }
});

function completeTask(element){
    
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

function removeTask(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    
    LIST[element.id].trash = true;
}

list.addEventListener("click", function(event){
    const element = event.target;
    const elementJob = element.attributes.job.value;
    
    if(elementJob == "complete"){
        addTask(element);
    }else if(elementJob == "delete  "){
        removeTask(element);
    }
});