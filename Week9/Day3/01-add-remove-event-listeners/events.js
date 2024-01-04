// Your code here
window.addEventListener("DOMContentLoaded", () => {
  // alert('DOM has loaded')
  // get input element
  const redInput = document.getElementById("red-input");
  // add event listener
  const changeRed = (event) => {
    // get the value
    const value = redInput.value;
    // console.log('value ', value)
    console.log("event target value", event);

    // if value is red change background to red
    if (value.toLowerCase() === "red") {
      redInput.style.backgroundColor = "red";
    } else {
      redInput.style.backgroundColor = "";
    }
  }
  redInput.addEventListener("input", changeRed);

  const submitButton = document.querySelector("#add-item");
  const listInput = document.querySelector("#list-add");
  const listContainer = document.querySelector("ul");

  const createList = () => {
    // create li
    if (!listInput.value) return;
    const listItem = document.createElement("li");
    // set li inner text to input value
    listItem.innerText = listInput.value;
    // append li to list container
    listContainer.appendChild(listItem);
    // clear input
    listInput.value = "";
  }
  // add event listener to button
  submitButton.addEventListener("click", createList);

  // select #color-select
  const colorSelect = document.getElementById("color-select");
  // select section
  const section = document.getElementById("section-3");
  // create event listener *using input*
  const changeColor = (event) => {
    // change the background of section
    section.style.backgroundColor = event.target.value;
  }

  colorSelect.addEventListener("change", changeColor);


  //select remove listener button
  const removeButton = document.getElementById('remove-listeners')
  //add event listener
  removeButton.addEventListener('click', () => {
      //remove prev event listeners
      redInput.removeEventListener("input", changeRed);
      submitButton.removeEventListener("click", createList);
      colorSelect.removeEventListener("change", changeColor);
  })
});
