document.addEventListener("DOMContentLoaded", function () {
  const getDataButton = document.getElementById("getDataButton");
  const userDataDiv = document.getElementById("userData");

  getDataButton.addEventListener("click", function () {
    // Tarefa 5: Desabilitar botão após clique
    getDataButton.disabled = true;

    // Tarefa 3: Fetch data da API
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((users) => {
        displayUserData(users);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        userDataDiv.innerHTML = "<p>Error loading user data</p>";
        // Reabilitar botão em caso de erro
        getDataButton.disabled = false;
      });
  });

  function displayUserData(users) {
    let html = '<table class="user-table">';

    // Cabeçalho da tabela
    html += "<thead><tr>";
    html += '<th class="id">ID</th>';
    html += '<th class="username">Username</th>';
    html += '<th class="name">Name</th>';
    html += '<th class="email">Email</th>';
    html += '<th class="phone">Phone</th>';
    html += '<th class="website">Website</th>';
    html += '<th class="address">Address</th>';
    html += '<th class="company">Company</th>';
    html += "</tr></thead>";

    // Corpo da tabela
    html += "<tbody>";
    users.forEach((user) => {
      html += "<tr>";
      html += `<td class="id">${user.id}</td>`;
      html += `<td class="username">${user.username}</td>`;
      html += `<td class="name">${user.name}</td>`;
      html += `<td class="email">${user.email}</td>`;
      html += `<td class="phone">${user.phone}</td>`;
      html += `<td class="website">${user.website}</td>`;
      html += `<td class="address">${user.address.street}, ${user.address.city}</td>`;
      html += `<td class="company">${user.company.name}</td>`;
      html += "</tr>";
    });
    html += "</tbody></table>";

    userDataDiv.innerHTML = html;
  }
});
