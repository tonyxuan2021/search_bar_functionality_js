const userCardTemplate = document.querySelector("[data-user-template]");
const userCardContainer = document.querySelector("[data-user-cards-container]");

const searchInput = document.querySelector("[data-search]");

let users = [];

searchInput.addEventListener("input", (e) => {
  const value = e.target.value;
  users.forEach((user) => {
    const isVisible = user.name.includes(value) || user.email.includes(value);
    user.element.classlist.toggle("hide", !isVisible);
  });
});

fetch("https://jsonplaceholder.typicode.com/users")
  .then((res) => {
    return res.json();
    //json() is to convert response to json
  })
  .then((data) => {
    users = data.map((user) => {
      const card = userCardTemplate.content.cloneNode(true).children[0];
      const header = card.querySelector("[data-header]");
      const body = card.querySelector("[data-body]");
      header.textContent = user.name;
      body.textContent = user.email;
      userCardContainer.append(card);
      return {
        name: user.name,
        email: user.email,
        element: card,
      };
    });
  });
