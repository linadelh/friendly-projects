
let tasks = [];
let newTask = document.getElementById("newTask");
 
document.addEventListener("DOMContentLoaded" , ()=>{
  const storedtask = JSON.parse(localStorage.getItem("tasks"));
  if (storedtask) {
  storedtask.forEach((task) => tasks.push(task));
  updateTaskList();
  stat();
}
})



const addTask = () => {
  const taskInput =  document.getElementById("taskInput");
  const text = taskInput.value ; 
  
  if (text) {
    tasks.push({
        text : text ,  
        completed : false})

        updateTaskList();
        savetask();
  }
 //   Tu crées une tâche avec 2 infos :
// Le texte de la tâche
// Et si elle est terminée ou pas (false au début)
  console.log(tasks);
}



newTask.addEventListener("click" , function(e){
   e.preventDefault();
     addTask();
})



const toggletaskcomplete = (index) => {
  if (!tasks[index].completed) {
    tasks[index].completed = true;
    mabrouk();
  } else {
    tasks[index].completed = false;
  }
  updateTaskList();
};


const deleteTask =(index) => {
  tasks.splice(index , 1);
  stat();
  updateTaskList();
  savetask();
}


const editTask = (index)=> {
  const taskinput = document.getElementById("taskInput");
  taskinput.value = tasks[index].text ; 
  tasks.splice(index,1); 
  updateTaskList();
  savetask();
}


function stat(){
let stat = document.getElementById("numbers") ; 
let numcompleted = 0 ; 
let pourcentage = 0 ; 


tasks.forEach(task => {
  if (task.completed){
    numcompleted++ ; 
  }
});

 pourcentage = (numcompleted / tasks.length) * 100;

stat.innerHTML = `${numcompleted}/${tasks.length}`


let progress = document.getElementById("progress");

if(tasks.length !== 0){
progress.style.width = `${pourcentage}%` ; 
}else{
  progress.style.width = `0%` ; 
}

};



const savetask = () => {
 localStorage.setItem('tasks' , JSON.stringify(tasks));
}


const updateTaskList = () => {
   const taskList = document.getElementById("task-list") ;
   taskList.innerHTML = '' ; 
   tasks.forEach ((task , index) => {
    const listitems = document.createElement('li');
    listitems.innerHTML =  
    `  <div class = "taskitems">
        <div class ="task ${task.completed ? "completed" :""}" >
            <input type="checkbox" class ="checkbox" ${task.completed ? "checked" : ""}/>
            <p>${task.text}</p>
        </div>
        <div class ="icons">
        <img src="./img/edit.png"/ onClick="editTask(${index})"> 
        <img src="./img/bin.png"/ onClick="deleteTask(${index})"> 
        </div>
      </div>
    `
    listitems.addEventListener("change" , ()=> toggletaskcomplete(index));
    stat();
    savetask();
    taskList.appendChild(listitems); 

   });

};

function mabrouk(){
  const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}