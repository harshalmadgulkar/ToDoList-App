var ToDoListApp = ( function () {
    console.log("App Started");
    //? var a given to show how to get required vars/functions from one js file to global/ another js
    //? you can access in console using global var "ToDoListApp" i.e ToDoListApp.a
    var a = 10;
  
    let tasks = []; //? array to contain all task objects as data
    const tasksList = document.getElementById("list");  //? access all task in DOM
    const addTaskInput = document.getElementById("add");  //? access input box
    const tasksCounter = document.getElementById("tasks-counter");  //? number to show in DOM
  
    async function fetchToDos() { //? async function
      try { //? try-catch block
        const response = await fetch ('https://jsonplaceholder.typicode.com/todos');  //? wait to fetch dummy API assign to "response"
        const data = await response.json(); //? wait to convert "response" to "json object" and assign to "data"
        tasks = data.slice(0,5);  //? this will get first 5 objects from all and assign to "tasks" array
        renderList(); //? invoke renderList func
      } catch (error) { //? get error as parameter if occured
        console.log('error',error); //? print error in console
      }
    }
  
    /*function fetchToDos() {
    // Get Request
    fetch('https://jsonplaceholder.typicode.com/todos')
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      tasks = data.slice(0, 5);
      renderList();
    })
    .catch(function (error) {
      console.log('error',error);
    })
    }
    */
  
    function addTaskToDOM(task) { //? take task as parameter from "tasks" array
      const li = document.createElement('li');  //? create li tag as HTML code
    
      li.innerHTML = `
            <input type="checkbox" id="${task.id}" ${task.completed? 'checked' : ''}
            class="custom-checkbox">
            <label for="${task.id}">${task.title}</label> 
            <img src="bin.svg" class="delete" data-id="${task.id}" alt="">
      `;

      //? write in "li" tag
      //? create checkbox field & give task.id (from task object) to "id"
      //? & find task.completed value if true mark checkbox as 'checked' else false --> '' will do nothing in HTML
      //? create label field & give task.id (from task object) to "id" also add title
      //? add bin.svg svg/image & add task.id
    
      tasksList.append(li); //? add "li" to "tasksList" in DOM
    }
  
    function renderList() {
      tasksList.innerHTML= '';  //? clear the "tasksList" from DOM
    
      for(let i=0 ; i<tasks.length; i++){ //? run over "tasks" array
        addTaskToDOM(tasks[i]); //? invoke "addTaskToDOM" func with each element of "tasks" array as parameter
      }
    
      tasksCounter.innerHTML = tasks.length;  //? find length of "tasks" array & show this on DOM
    }
  
    function toggleTask(taskId) {
      const newTask = tasks.filter(function (task) {  //? run over "tasks" array and filter given "function(task)" function & assign to "newTasks"
        return task.id == Number(taskId); //? return a single "taskId" & assign to "newTask"
      })
      if(newTask.length > 0){ //? true if "newTask" contains any element
        const currentTask = newTask[0]; //? assign first element to "currentTask"
    
        currentTask.completed = !currentTask.completed; //? reverse the value of key of "completed" of given "taskId"
        renderList(); //? invoke "renderList" func
        showNotification('Task toggled successfully');
        return; //? will end function
      }
      else{
        showNotification('Could not toggle the task');
      }
    }
  
    function deleteTask(taskId) { //? take "taskId" as parameter
      const newTasks = tasks.filter(function (task) { //? run over "tasks" array and filter given "function(task)" function & assign to "newTasks"
        return task.id !== Number(taskId);  //? return all "tasks" array by removing task of specified "taskId"
      });
      tasks = newTasks; //? assign "newTasks" array to "tasks" array
      renderList(); //? invoke "renderList" func
      showNotification("Task deleted successfully");
    }
  
    function addTask(task) {  //? take "task" as parameter
      if (task) { //? true if task added
        // tasks.push(task);
        tasks.unshift(task);  //? add "task" to "tasks" array at "tasks[0]" at first position
        renderList(); //? invoke "renderList" func
        showNotification("Task added successfully");
        return; //? will end function
      }
    
      showNotification("Task can not be added");
    }
  
    function showNotification(text) {
    // alert(text);
    }
  
    function handleInputKeypress(e) { //? event as parameter
      if (e.key == "Enter") { //? check if the keyup is "Enter"
        const text = e.target.value;  //? value will be text typed in input filed on DOM assign to "text"
    
        if (!text) {  //? will give false if value is empty
          showNotification("Text can not be empty");
          return; //? will end function
        }
    
        const task = {  //? create task object
          title: text,  //? assign "text" as value to "title" key
          id: Date.now(), //? give id according to "Date.now()"
          completed: false, //? mark "completed" as false by default
        };
    
        e.target.value = "";  //? clear text typed in inputbox on DOM
        addTask(task);  //? invoke "addTask" func with "task" as parameter
      }
    }
  
    function handleClickListener(e) { //? event as parameter
      const target = e.target;  //? find target element
      // console.log(target);
    
      if (target.className == 'delete') { //? check "target"'s className
        const taskId = target.dataset.id; //? find "data-id" for that "target.dataset.id" is written
        deleteTask(taskId); //? invoke "deleteTask" func with "taskId" as parameter
        return; //? will end function
      }
      else if (target.className == 'custom-checkbox') { //? check "target"'s className
        const taskIdCheckbox = target.id; //? find & assign "target.id" to "taskIdCheckbox"
        // console.log(taskIdCheckbox);
        // console.log('check box target found');
        toggleTask(taskIdCheckbox); //? invoke "toggleTask" func with "taskIdCheckbox" as parameter
        return; //? will end function
      }
    }
  
    function initializeApp() {  //? fuction to start App
    fetchToDos(); //? invoke "fetchToDos" func
    addTaskInput.addEventListener("keyup", handleInputKeypress);  //? "keyup" event to inputbox of DOM
    document.addEventListener('click', handleClickListener);  //? "click" event to whole DOM this Event Delegation  in which we add eventListner to the parent of elemets from which we expect that event so that we can handle it from any where in parent element
    }
  
    // initializeApp(); //? uncomment if you want to start App from this js file & comment index.html :35
    return {
        initializeApp : initializeApp,
        a : a,
    }
  })();


