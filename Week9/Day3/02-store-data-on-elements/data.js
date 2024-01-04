// Your code here
window.addEventListener("DOMContentLoaded", () => {
  const name = document.getElementById("name");
  const type = document.getElementById("type");
  const submit = document.getElementById("add");
  const shoppingList = document.getElementById("shopping-list");

  submit.addEventListener("click", (event) => {
    event.preventDefault();

    console.log("name value ", name.value);
    console.log("type value ", type.value);

    const list = document.createElement("li");
    list.setAttribute("data-type", type.value);
    list.innerText = name.value;

    shoppingList.appendChild(list);
    name.value = "";
  });
});
