const taskKey = '@tasks'

function abrirDialog(titulo,desc){
  const modal = document.getElementById('dialogEditar')
  const title = document.getElementById('titulo')
  const descricao = document.getElementById('descricao')
  
  title.setAttribute('placeholder',titulo)
  descricao.setAttribute('placeholder',desc)
  modal.showModal()
}

function fecharModal(){
  const modal = document.getElementById('dialogEditar')
  modal.close()
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
  const botaoEditar = criaBotaoEditar();

  li.id = taskId
  li.innerHTML = `  
      <h2>${taskTitle}</h2>
      <p>${taskDescription}</p>
  `
  taskList.appendChild(botaoEditar)
  taskList.appendChild(li)
  
  // Salvar tarefas no localStorage
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || []
  tasks.push({ title: taskTitle, description: taskDescription })
  localStorage.setItem(taskKey, JSON.stringify(tasks))

  form.reset()
}

function criaBotaoEditar(){
  const botaoEditar = document.createElement('button')
  botaoEditar.setAttribute('onClick','abrirDialog()')
  botaoEditar.setAttribute('title','Editar tarefa')
  botaoEditar.append('✏️');
  return botaoEditar;
}

// Carregar tarefas do localStorage ao recarregar a página
window.addEventListener('DOMContentLoaded', () => {
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || []
  const taskList = document.querySelector('#taskList')
  for(let task of tasks){
  const botaoEditar = criaBotaoEditar()
  taskList.append(botaoEditar);
  taskList.innerHTML = `<button onClick="abrirDialog(${task.title,task.description})" title = "Editar tarefa">✏️</button><li><h2>${task.title}</h2><p>${task.description}</p></li>`
}
})
