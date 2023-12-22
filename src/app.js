const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./routes/users");
const bookRouter = require("./routes/books");
const loggerOne = require("./middlewares/loggerOne");

dotenv.config();

const {
  PORT = 3000,
  API_URL = "http://127.0.0.1",
  MONGO_URL = "mongodb://127.0.0.1:27017/backend",
} = process.env;

mongoose
  .connect(MONGO_URL)
  .then(console.log("Connected to MongoDB"))
  .catch((error) => console.log(error));
const app = express();

app.use(cors());

app.use(loggerOne);

app.use(bodyParser.json());

app.use(userRouter);
app.use(bookRouter);

app.listen(PORT, () => {
  console.log(`Сервер запущен по адресу: ${API_URL}:${PORT}`);
});

// const http = require("http");
// const getUsers = require("./modules/users");
// const getBooks = require("./modules/books");

// const hostname = "127.0.0.1";
// const port = 3003;

// const server = http.createServer((request, response) => {
//   const url = new URL(request.url, `http://${request.headers.host}`);
//   const searchParams = url.searchParams;

//   if (!searchParams.toString().length) {
//     response.statusCode = 200;
//     response.statusMessage = "OK";
//     response.setHeader("Content-Type", "text/plain");
//     response.write("Hello, World!");
//     response.end();
//     return;
//   }
//   for (let [key, value] of searchParams.entries()) {
//     switch (key) {
//       case "users":
//         response.statusCode = 200;
//         response.statusMessage = "OK";
//         response.setHeader("Content-Type", "application/json");
//         response.write(getUsers());
//         response.end();
//         break;
//       case "books":
//         response.statusCode = 200;
//         response.statusMessage = "OK";
//         response.setHeader("Content-Type", "application/json");
//         response.write(getBooks());
//         response.end();
//         break;
//       case "hello":
//         if (value) {
//           response.statusCode = 200;
//           response.statusMessage = "OK";
//           response.setHeader("Content-Type", "text/plain");
//           response.write(`Hello, ${value}.`);
//           response.end();
//         } else {
//           response.statusCode = 400;
//           response.statusMessage = "Bad Request";
//           response.setHeader("Content-Type", "text/plain");
//           response.write("Enter a name");
//           response.end();
//         }
//         break;
//       default:
//         response.statusCode = 500;
//         response.statusMessage = "Internal Server Error";
//         response.setHeader("Content-Type", "text/plain");
//         response.write("Internal Server Error");
//         response.end();
//         break;
//     }
//   }
// });

// server.listen(port, hostname, () => {
//   console.log(`Сервер запущен по адресу http://${hostname}:${port}`);
// });
