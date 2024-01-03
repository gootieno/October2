/****************************** ADD DOG BUTTON ******************************/
const add = document.getElementById("add");
add.addEventListener("click", async () => {
  try {
    const res = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await res.json();
    console.log("data ", data);
    const url = data.message; // URL of new dog image

    const urlParts = url.split("/");
    console.log("url parts ", urlParts);

    const breed = urlParts[4];
    /*--------------- Get breed (Hint: Parse from URL) ---------------- */
    /* 
        <li>
            <figure>
                <img src="https://images.dog.ceo/breeds/hound-afghan/n02088094_1007.jpg" />
                <figcaption>hound-afghan</figcaption>
            </figure>
        </li>

        create/select elements

        give elements attributes/data 

        append elements
        */

    // Your code here
    const listContainer = document.querySelector("ul");

    const listItem = document.createElement("li");
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figCaption = document.createElement("figcaption");

    listItem.style.border = "2px solid red";

    img.setAttribute("src", url);
    figCaption.innerText = breed;

    figure.append(img, figCaption);
    listItem.appendChild(figure);

    console.log("list item ", listItem);
    listContainer.appendChild(listItem);
    /*------------ Create new dog card with the url above ------------- */
    /* (use the HTML structure for the current dog image in the index.html
            file to create a new image with the url) */
    // Your code here

    /* Add the new dog card as a child to the ul in the .gallery element */
    // Your code here
  } catch (e) {
    console.log("Couldn't fetch dog :(");
  }
});

/************************** REMOVE FIRST DOG BUTTON **************************/
const removeFirst = document.getElementById("remove-first");
removeFirst.addEventListener("click", () => {
  /*-------------------- Select the first dog card --------------------- */
  // Your code here
  const firstDogCard = document.querySelector(".gallery ul li");
  /*-------------------- Remove the first dog card --------------------- */
  // Your code here
  if (firstDogCard) firstDogCard.remove();
});

/************************** REMOVE LAST DOG BUTTON ***************************/
const removeLast = document.getElementById("remove-last");
removeLast.addEventListener("click", () => {
  /*-------------------- Select the last dog card ----------------------- */
  // Your code here
  const dogs = document.querySelectorAll("li");
  const lastDog = dogs[dogs.length - 1];
  /*-------------------- Remove the last dog card ----------------------- */
  // Your code here
  if (lastDog) lastDog.remove();
});

const themeButton = document.getElementById("theme-button");
themeButton.addEventListener("click", () => {
  if (document.body.className.includes("dark-mode")) {
    document.body.classList.remove("dark-mode");
  } else {
    document.body.classList.add("dark-mode");
  }
});
