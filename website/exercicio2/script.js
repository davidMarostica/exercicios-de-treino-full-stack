document.addEventListener("DOMContentLoaded", function () {
  // Elementos do DOM
  const revealButton = document.getElementById("revealButton");
  const hiddenContent = document.getElementById("hiddenContent");
  const sampleForm = document.getElementById("sampleForm");
  const nameInput = document.getElementById("name");
  const ageInput = document.getElementById("age");
  const nameError = document.getElementById("nameError");
  const ageError = document.getElementById("ageError");

  // Tarefa 2: Mostrar/Esconder conteúdo
  revealButton.addEventListener("click", function () {
    if (hiddenContent.classList.contains("hidden")) {
      hiddenContent.classList.remove("hidden");
      revealButton.textContent = "Hide Content";
    } else {
      hiddenContent.classList.add("hidden");
      revealButton.textContent = "Show Content";
    }
  });

  // Tarefa 5: Validação do formulário
  sampleForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Impede envio padrão

    let isValid = true;

    // Validar Nome (mais de 8 caracteres)
    if (nameInput.value.trim().length <= 8) {
      nameError.textContent = "Name must have more than 8 characters";
      isValid = false;
    } else {
      nameError.textContent = "";
    }

    // Validar Idade (entre 4 e 99)
    const age = parseInt(ageInput.value);
    if (isNaN(age) || age < 4 || age > 99) {
      ageError.textContent = "Age must be between 4 and 99";
      isValid = false;
    } else {
      ageError.textContent = "";
    }

    // Se tudo válido, mostrar mensagem de sucesso
    if (isValid) {
      alert("Form submitted successfully!");
      sampleForm.reset(); // Limpar formulário
    }
  });

  // Validação em tempo real para melhor UX
  nameInput.addEventListener("input", function () {
    if (nameInput.value.length > 8) {
      nameError.textContent = "";
    }
  });

  ageInput.addEventListener("input", function () {
    const age = parseInt(ageInput.value);
    if (!isNaN(age) && age >= 4 && age <= 99) {
      ageError.textContent = "";
    }
  });
});
