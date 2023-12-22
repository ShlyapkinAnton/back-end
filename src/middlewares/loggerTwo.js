const loggerTwo = (request, response, next) => {
  console.log("2 Request Type:", request.method);
  next();
};

module.exports = loggerTwo;