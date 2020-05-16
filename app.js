
//Define UI vars
const form=document.querySelector('#task-form');
const taskList=document.querySelector('.collection');
const clearBtn=document.querySelector('.clear-tasks');
const filter=document.querySelector('#filter');
const taskInput=document.querySelector('#task');

//Add Task Event
form.addEventListener('submit',addTask);
//Remove Task Event
taskList.addEventListener('click',remove);
//Clear All Task Event
clearBtn.addEventListener('click',clear);
//Filter Task Event
filter.addEventListener('keyup',filterTasks);
//DOM Load Event
document.addEventListener('DOMContentLoaded',getTasks);


function addTask(e){
   if(taskInput.value===''){
    alert("Add a Task");
   }
   //Create li event
   
    const li=document.createElement('li');
    li.className="collection-item";
    li.appendChild(document.createTextNode(taskInput.value));
    const link=document.createElement('a');
    link.className="delete-item secondary-content";
    link.innerHTML='<i class="fa fa-remove"></i>';
    li.appendChild(link);
    console.log(li);
    taskList.appendChild(li);

    //Store in LS
storeTaskInLocalStorage(taskInput.value);

taskInput.value="";
    e.preventDefault(); 
}


function remove(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm("Are you sure want to delete it")){
e.target.parentElement.parentElement.remove();}
        }
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
}

function clear(){
 taskList.innerHTML='';   
 localStorage.clear();
}


function filterTasks(e){
    const text=e.target.value.toLowerCase();
    console.log(text);
    document.querySelectorAll(".collection-item").forEach(
        function(data){
            const task=data.firstChild.textContent;
            if(task.toLowerCase().indexOf(text)!=-1){
                data.style.display="block"
            }
            else{
                data.style.display="none"
            }
        }
    )
}

function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
        const li=document.createElement('li');
        li.className="collection-item";
        li.appendChild(document.createTextNode(task));
        const link=document.createElement('a');
        link.className="delete-item secondary-content";
        link.innerHTML='<i class="fa fa-remove"></i>';
        li.appendChild(link);
        console.log(li);
        taskList.appendChild(li);
    })
}
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task,index){
  if(taskItem.textContent===task){
      tasks.splice(index,1);
  }
    })
    localStorage.setItem("tasks",JSON.stringify(tasks))
}