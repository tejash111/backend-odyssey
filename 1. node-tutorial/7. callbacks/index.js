const fs = require("fs");

function person(name, callbackFn) {
  console.log(`Hello ${name}`);
  callbackFn();  //this will go to address and prinnt india 
  //callback is a function passed as an argument to another function
}

function address() {
  console.log("India");
}

person("Sangam Mukherjee", address);

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file", err);
    return;
  }

  console.log(data);
});
