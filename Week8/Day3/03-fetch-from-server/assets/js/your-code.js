export function getAllDogs() {
  // Your code here
  const url = "/dogs";
  const headers = { "Content-Type": "Request body's Content-Type" };
  // Use the URLSearchParams API to format your body as shown below
  const body = new URLSearchParams({
    key: "value",
  });

  const options = {
    method: "GET",
  };

  return fetch(url);
}

export function getDogNumberTwo() {
  // Your code here
}

export function postNewDog() {
  // Your code here
  const url = "/dogs";
  const headers = { "Content-Type": "application/x-www-form-urlencoded" };
  // Use the URLSearchParams API to format your body as shown below
  const body = new URLSearchParams({
    name: "Kaido",
    age: 1,
  });

  const options = {
    method: "POST",
    headers: headers,
    body: body,
  };

  return fetch(url, options);
}

export function postNewDogV2(name, age) {
  // Your code here
}

export function deleteDog(id) {
  // Your code here
}
