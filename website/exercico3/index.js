document.addEventListener("DOMContentLoaded", function () {
  // Elementos do DOM
  const todoForm = document.getElementById("todo-form");
  const taskInput = document.getElementById("task-input");
  const todoList = document.getElementById("todo-list");
  const errorMessage = document.getElementById("error-message");
  const statusMessage = document.getElementById("status-message");

  // Gerenciar foco
  let lastFocusedElement = null;

  // Adicionar tarefa
  todoForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addTask();
  });

  // Validação em tempo real
  taskInput.addEventListener("input", function () {
    clearError();
  });

  // Tecla Enter no input
  taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addTask();
    }
  });

  function addTask() {
    const taskText = taskInput.value.trim();

    // Validação
    if (!taskText) {
      showError("Por favor, digite uma tarefa.");
      taskInput.focus();
      return;
    }

    if (taskText.length < 2) {
      showError("A tarefa deve ter pelo menos 2 caracteres.");
      taskInput.focus();
      return;
    }

    // Criar elemento da tarefa
    const taskId = "task-" + Date.now();
    const listItem = document.createElement("li");
    listItem.className = "todo-item";
    listItem.id = taskId;

    listItem.innerHTML = `
            <span class="todo-text">${escapeHtml(taskText)}</span>
            <button 
                class="delete-btn" 
                aria-label="Remover tarefa: ${escapeHtml(taskText)}"
                data-task-id="${taskId}">
                Remover
            </button>
        `;

    // Adicionar à lista
    todoList.appendChild(listItem);

    // Adicionar evento de remoção
    const deleteBtn = listItem.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", function () {
      removeTask(taskId, taskText);
    });

    // Adicionar suporte a teclado para o item
    listItem.setAttribute("tabindex", "0");
    listItem.addEventListener("keydown", function (event) {
      if (event.key === "Delete" || event.key === "Backspace") {
        event.preventDefault();
        removeTask(taskId, taskText);
      }
    });

    // Limpar input e focar nele
    taskInput.value = "";
    taskInput.focus();

    // Feedback para leitores de tela
    announceToScreenReader(`Tarefa "${taskText}" adicionada com sucesso.`);

    // Atualizar status
    updateStatusMessage();

    // Salvar foco atual
    lastFocusedElement = listItem;
  }

  function removeTask(taskId, taskText) {
    const taskElement = document.getElementById(taskId);

    if (taskElement) {
      // Animação de remoção
      taskElement.style.transform = "translateX(-100%)";
      taskElement.style.opacity = "0";

      setTimeout(() => {
        taskElement.remove();
        updateStatusMessage();

        // Feedback para leitores de tela
        announceToScreenReader(`Tarefa "${taskText}" removida.`);

        // Retornar foco para o input ou próximo elemento
        if (todoList.children.length > 0) {
          todoList.children[0].focus();
        } else {
          taskInput.focus();
        }
      }, 300);
    }
  }

  function showError(message) {
    errorMessage.textContent = message;
    errorMessage.hidden = false;

    // Announce error to screen readers
    announceToScreenReader(message);

    // Focar no input para correção
    taskInput.focus();
  }

  function clearError() {
    errorMessage.textContent = "";
    errorMessage.hidden = true;
  }

  function updateStatusMessage() {
    const taskCount = todoList.children.length;
    const message =
      taskCount === 0
        ? "Nenhuma tarefa na lista."
        : `${taskCount} ${taskCount === 1 ? "tarefa" : "tarefas"} na lista.`;

    statusMessage.textContent = message;
  }

  function announceToScreenReader(message) {
    // Criar elemento temporário para anunciar mensagens
    const announcement = document.createElement("div");
    announcement.setAttribute("aria-live", "polite");
    announcement.setAttribute("aria-atomic", "true");
    announcement.className = "sr-only";
    announcement.textContent = message;

    document.body.appendChild(announcement);

    // Remover após anunciar
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  // Inicializar
  updateStatusMessage();
  taskInput.focus();
});
