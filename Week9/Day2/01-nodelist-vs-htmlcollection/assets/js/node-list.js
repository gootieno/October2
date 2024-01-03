export default () => {
  const bodyChildNodes = document.body.childNodes; // NodeList [text, div, text]
  console.log("body child nodes ", bodyChildNodes);

  const div = bodyChildNodes[1]; // NOT bodyChildNodes[0]

  const divChildNodes = div.childNodes; // NodeList [text, span, text]
  console.log("div child nodes ", divChildNodes);
  console.log("text info ", divChildNodes[0]);
  const helloWorld = divChildNodes[0].textContent; // Hello World!\n
  console.log("hello world ", helloWorld);
  const span = divChildNodes[1]; // <span>Yes!</span>
  console.log("span ", span);
  // debugger
};
