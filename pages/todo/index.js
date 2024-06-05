const taskKey = '@tasks'

let selectedTaskId = null

function editTask(event){
  event.preventDefault()
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || []
  const task = tasks[selectedTaskId]
  const editTitle = document.querySelector('#editTaskForm #title')
  const editDescription = document.querySelector('#editTaskForm #description')
  const dialog = document.querySelector('dialog')
  task.title = editTitle.value
  task.description = editDescription.value
  tasks[selectedTaskId] = task
  localStorage.setItem(taskKey,JSON.stringify(tasks))
  dialog.close()
  window.location.reload(true)
}


// Função para adicionar tarefa
function addTask(event) {
  event.preventDefault() // Evita o recarregamento da página
  const taskId = new Date().getTime()
  const taskList = document.querySelector('#taskList')

  const form = document.querySelector('#taskForm')
  const formData = new FormData(form)

  const taskTitle = formData.get('title')
  const taskDescription = formData.get('description')

  const li = document.createElement('li')

  li.id = `id-${taskId}`
  li.innerHTML = `
    <div>
      <h2>${taskTitle}</h2>
      <p>${taskDescription}</p>
    </div>
    <button title="Editar tarefa" onClick="openEditDialog(${taskId})">✏️</button>
    <button id="buttonDelete"title="Deletar tarefa" onClick="deleteDialog(${taskId})">❌</button>
  `

  taskList.appendChild(li)

  // Salvar tarefas no localStorage
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || []
  tasks.push({
    id: taskId,
    title: taskTitle,
    description: taskDescription,
  })
  localStorage.setItem(taskKey, JSON.stringify(tasks))

  form.reset()
}

function editaTask(taskId){
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || []
  selectedTaskId = tasks.findIndex((task) => task.id === taskId)
  const task = tasks[selectedTaskId]
}

function openEditDialog(taskId) {
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || []
  selectedTaskId = tasks.findIndex((task) => task.id === taskId)
  const task = tasks[selectedTaskId]
  const dialog = document.querySelector('dialog')
  const editTitle = document.querySelector('#editTaskForm #title')
  const editDescription = document.querySelector('#editTaskForm #description')
  editTitle.value = task.title
  editDescription.value = task.description
  dialog.showModal()
}

function closeDialog() {
  const dialog = document.querySelector('dialog')
  dialog.close()
}

// Carregar tarefas do localStorage ao recarregar a página
window.addEventListener('DOMContentLoaded', () => {
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || []
  const taskList = document.querySelector('#taskList')
  taskList.innerHTML = tasks
    .map(
      (task) => `
      <li id='id-${task.id}'>
        <div>
          <h2>${task.title}</h2>
          <p>${task.description}</p>
        </div>
        <button title="Editar tarefa" onClick="openEditDialog(${task.id})">✏️</button>
        <button id="buttonDelete"title="Deletar tarefa" onClick="deleteDialog(${task.id})">❌</button>
      </li>
    `
    )
    .join('')
})

function deleteDialog(id){
  const lista = document.getElementById('taskList')
  const filhoRemover =  document.getElementById('id-'+id)
  lista.removeChild(filhoRemover)
  const task = JSON.parse(localStorage.getItem(taskKey))
  selectedTaskId = task.findIndex((task) => task.id === id)
  let a = task.splice(selectedTaskId,1)
  localStorage.setItem(taskKey,JSON.stringify(task))
}

const formEdita = document.getElementById('editTaskForm')