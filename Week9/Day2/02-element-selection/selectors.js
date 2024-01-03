const select = () => {
  /* Write queries for each of the following */
  //   const section2 = document.querySelectorAll("#two, #three");
  //   console.log("section 2 ", section2);
  /* Section 1 */
  // 1. Get all seeded fruit elements
  // Your code here
  let seededFruits = document.querySelectorAll("li.seed");
  console.log("seeded fruits ", seededFruits);
  // 2. Get all seedless fruit elements
  // Your code here
  const seedlessFruits = document.querySelectorAll("li.seedless");
  console.log("seedless fruits ", seedlessFruits);
  // 3. Get first seedless fruit element
  // Your code here
  const firstSeedlessFruit = document.querySelector(".seedless");
  console.log("first seedless fruit ", firstSeedlessFruit);
  /* Section 2 */
  // 4. Get inner span with text "you"
  // Your code here
  console.log(
    "you span ",
    document.getElementById("wrapper").getElementsByTagName("span")[0]
  );

  // 5. Get all children of element "wrapper"
  // Your code here
  const wrapper = document.getElementById("wrapper");
  console.log("wrapper children ", wrapper.children);

  // 6. Get all odd number list items in the list
  // Your code here
  const oddListItems = document.querySelectorAll("#two li.odd");
  console.log("Odd List Items: ", oddListItems);
  // 7. Get all even number list items in the list
  // Your code here
  const allEven = document.querySelectorAll("ol li:not(.odd)");
  console.log("allEven", allEven);
  /* Section 3 */
  // 8. Get all tech companies without a class name
  // Your code here
  const links = document.getElementById("three");
  const allTech = links.querySelectorAll("p a:not([class])");
  console.log("AllTech", allTech);
  // 9. Get "Amazon" list element
  // Your code here
  const amazon = links.getElementsByClassName("shopping");
  console.log("amazon", amazon);
  // 10. Get all unicorn list elements (not the image element)
  // Your code here
  const unicorns = document.querySelectorAll("#three > ul > li");
  console.log('unicorns ',unicorns);

  const unicornLists = document.querySelectorAll(".unicorn");
  const lists = []
  for(const unicorn of unicornLists) lists.push(unicorn.parentElement)

  console.log('unicorn list ', lists)
};

window.onload = select;
