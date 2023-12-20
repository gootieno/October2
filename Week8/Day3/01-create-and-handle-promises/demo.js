const putOnLeash = (wantsAwalk) => {
  // 3min (3ms)

  return new Promise((resolve, reject) => {
    let leashIsOn;
    if (wantsAwalk === true) {
      setTimeout(() => {
        leashIsOn = true;
        resolve(leashIsOn);
        console.log("putting on the leash");
      }, 3000);
    } else {
      leashIsOn = false;
      reject(`leash status: ${leashIsOn}.. cant walk the dog`);
    }
  });
};

const walkDog = (leashStatus) => {
  // 2min
  return new Promise((resolve, reject) => {
    if (leashStatus === true) {
      setTimeout(() => {
        console.log("walking kaido");
        resolve("Finished walking Kaido");
      }, 2000);
    } else {
      reject("Dont walk without leash!");
    }
  });
};

const walkKaido = () => {
  // console.log(putOnLeash())
  const wantsAwalk = false;
  putOnLeash(wantsAwalk)
    .then((leashOn) => walkDog(leashOn))
    .then((walkStatus) => console.log(walkStatus))
    .catch((error) => console.log(error));
};

walkKaido();
