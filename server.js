require("./DB/mongo");
const app = require("./app");

const server = app.listen(4001, (res) => {
  console.log("Server listening on port 4001");
});
