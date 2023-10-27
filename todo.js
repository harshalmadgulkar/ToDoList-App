( function () {
  console.log("Working");
  var a = 10;

  let tasks = [];
  const tasksList = document.getElementById("list");
  const addTaskInput = document.getElementById("add");
  const tasksCounter = document.getElementById("tasks-counter");

  async function fetchToDos() {
  try {
    const response = await fetch ('https://jsonplaceholder.typicode.com/todos');
    const data = await response.json();
    tasks = data.slice(0,5);
    renderList();
  } catch (error) {
    console.log('error',error);
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

  function addTaskToDOM(task) {
  const li = document.createElement('li');

  li.innerHTML = `
        <input type="checkbox" id="${task.id}" ${task.completed? 'checked' : ''}
        class="custom-checkbox">
        <label for="${task.id}">${task.title}</label>
        <img src="bin.svg" class="delete" data-id="${task.id}" alt="">
  `;

  tasksList.append(li);
  }

  function renderList() {
  tasksList.innerHTML= '';

  for(let i=0 ; i<tasks.length; i++){
    addTaskToDOM(tasks[i]);
  }

  tasksCounter.innerHTML = tasks.length;
  }

  function toggleTask(taskId) {
  const newTask = tasks.filter(function (task) {
    return task.id == Number(taskId);
  })
  if(newTask.length > 0){
    const currentTask = newTask[0];

    currentTask.completed = !currentTask.completed;
    renderList();
    showNotification('Task toggled successfully');
    return;
  }
  else{
    showNotification('Could not toggle the task');
  }
  }

  function deleteTask(taskId) {
  const newTasks = tasks.filter(function (task) {
    return task.id !== Number(taskId);
  });
  tasks = newTasks;
  renderList();
  showNotification("Task deleted successfully");
  }

  function addTask(task) {
  if (task) {
    // tasks.push(task);
    tasks.unshift(task);
    renderList();
    showNotification("Task added successfully");
    return;
  }

  showNotification("Task can not be added");
  }

  function showNotification(text) {
  // alert(text);
  }

  function handleInputKeypress(e) {
  if (e.key == "Enter") {
    const text = e.target.value;

    if (!text) {
      showNotification("Text can not be empty");
      return;
    }

    const task = {
      title: text,
      id: Date.now(),
      completed: false,
    };

    e.target.value = "";
    addTask(task);
  }
  }

  function handleClickListener(e) {
  const target = e.target;
  // console.log(target);

  if (target.className == 'delete') {
    const taskId = target.dataset.id;
    deleteTask(taskId);
    return;
  }
  else if (target.className == 'custom-checkbox') {
    const taskIdCheckbox = target.id;
    // console.log(taskIdCheckbox);
    // console.log('check box target found');
    toggleTask(taskIdCheckbox);
    return;
  }
  }

  function initializeApp() {
  fetchToDos();
  addTaskInput.addEventListener("keyup", handleInputKeypress);
  document.addEventListener('click', handleClickListener);
  }

  initializeApp();
})();




//Using Better Comments (setting available in ctrl+,)
// ( "better-comments.tags" ) can change formatting from setting
// simple comment
//? blue 
//! red comment
//todo comment in orange
//* green color
//- fnwoejf
//test write test cases