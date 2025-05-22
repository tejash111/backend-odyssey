const fs = require("fs");
const path = require("path");

const dataFolder = path.join(__dirname, "data");
// : file-system/data

//if data folder not exist create one 
if (!fs.existsSync(dataFolder)) {
  fs.mkdirSync(dataFolder);   //this will create the folder 
  console.log("data folder created");
}

const filePath = path.join(dataFolder, "example.txt");

//sync way of creating the file
fs.writeFileSync(filePath, "Hello from node js");
console.log("file created successfully");

//to read a file
const readContentFromFile = fs.readFileSync(filePath, "utf8");
console.log("File content:", readContentFromFile);

//to insert or update a file
fs.appendFileSync(filePath, "\nThis is a new line added to that file");
console.log("new file content added");

//async way of creating the file
const asyncFilePath = path.join(dataFolder, "async-example.txt");
fs.writeFile(asyncFilePath, "Hello, Async node js", (err) => {
  if (err) throw err;
  console.log("Async file is created successfully");

  fs.readFile(asyncFilePath, "utf8", (err, data) => {
    if (err) throw err;
    console.log("Async file content:", data);

    fs.appendFile(asyncFilePath, "\nThis ia another line added", (err) => {
      if (err) throw err;
      console.log("New line added to async file");

      fs.readFile(asyncFilePath, "utf8", (err, updatedData) => {
        if (err) throw err;
        console.log("Updated file content", updatedData);
      });
    });
  });
});
