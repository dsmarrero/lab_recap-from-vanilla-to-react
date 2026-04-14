const userListContainer = document.getElementById("user-list-container");
const loadMoreButton = document.getElementById("load-more-btn");

let skip = 0;
const limit = 10;

async function fetchUsers() {
  try {
    loadMoreButton.textContent = "Cargando…";
    loadMoreButton.disabled = true;

    const response = await fetch(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`);
    const jsonResponse = await response.json();
    const users = jsonResponse.users;
    users.forEach((user) => {
      const userCard = document.createElement("div");
      userCard.className = "user-card";
      userCard.innerHTML = `
        <img src="${user.image}" alt="${user.firstName}" />
        <p>${user.firstName} ${user.lastName}</p>
      `;
      userListContainer.appendChild(userCard);
    });

    skip += limit;
  } catch (error) {
    console.error("Error al cargar los usuarios:", error);
    userListContainer.innerHTML = "<p>Algo ha ido mal</p>";
  } finally {
    loadMoreButton.disabled = false;
    loadMoreButton.textContent = "Cargar más";
  }
}
loadMoreButton.addEventListener("click", fetchUsers);

fetchUsers();
