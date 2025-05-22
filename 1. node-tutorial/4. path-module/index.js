const path = require("path");

console.log("Directory name:", path.dirname(__filename));
//just give the directory name of the current file : users/projects/me

console.log("File name", path.basename(__filename));
//just filename : index.js

console.log("file extension", path.extname(__filename));
//give .js

const joinPath = path.join("/user", "documents", "node", "projects");
console.log("Joined path", joinPath);
//combine strings in a single path /user/documents/node/projects
//its just a string addtion nothing modified from this in file system

const resolvePath = path.resolve("user", "documents", "node", "project");
console.log("Resolve path:", resolvePath);
//resolves to an absoulte path starting from working dir
//like im in users/tejash so it will create : users/tejash/user/documents/node/project

const normalizePath = path.normalize("/user/.documents/../node/projects");
console.log("normalizePath", normalizePath);
//: /user/node/projects , .documents is hidden file
