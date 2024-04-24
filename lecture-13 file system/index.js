const http = require("http");
const fs = require("fs");
const formidable = require("formidable");

const server = http.createServer();

// server.on("request", (req, res) => {
//   console.log(req.url, " ", req.method);

//   const data = "This is file system class from april'24";

//   if (req.url === "/" && req.method === "GET") {
//     return res.end("Home route working");
//   }
//   //write
//   else if (req.url === "/writefile" && req.method === "GET") {
//     fs.writeFile("demo.txt", data, (err) => {
//       if (err) throw err;
//     });
//     return res.end("write successfull");
//   }
//   //append
//   else if (req.url === "/appendfile" && req.method === "GET") {
//     fs.appendFile("demo.txt", data, (err) => {
//       if (err) throw err;
//     });
//     return res.end("append successfull");
//   }
//   //read
//   else if (req.url === "/readfile" && req.method === "GET") {
//     fs.readFile("demo.txt", (err, data) => {
//       if (err) throw err;
//       console.log(data);

//       return res.end(data);
//     });
//   }
//   ///delete
//   else if (req.url === "/deletefile" && req.method === "GET") {
//     fs.unlink("demo.txt", (err) => {
//       if (err) throw err;
//       return res.end("Delete successfull");
//     });
//   }
//   //rename
//   else if (req.url === "/renamefile" && req.method === "GET") {
//     fs.rename("demo.txt", "newDemo.txt", (err) => {
//       if (err) throw err;
//       return res.end("rename successfull");
//     });
//   } else if (req.url === "/streamread" && req.method === "GET") {
//     const rStream = fs.createReadStream("demo.txt");

//     rStream.on("data", (char) => {
//       console.log(char);
//       res.end(char);
//     });

//     rStream.on("end", () => {
//       return res.end();
//     });
//   }
// });

server.on("request", (req, res) => {
  if (req.method === "POST" && req.url === "/file-upload") {
    const form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
      if (err) throw err;
      console.log(files);
      const oldPath = files.fileToUpload[0].filepath;

      const newPath =
        __dirname + "/uploads/" + files.fileToUpload[0].originalFilename;

      fs.rename(oldPath, newPath, (err) => {
        if (err) throw err;
        return res.end("file uploaded successfully");
      });
    });
  } else if (req.method === "GET" && req.url === "/get-form") {
    fs.readFile("form.html", (err, data) => {
      if (err) throw err;
      return res.end(data);
    });
  }
});

server.listen(8000, () => {
  console.log("HTTP server is running on PORT:8000");
});
