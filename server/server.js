const app = require('./app');
const http = require('http');
require("dotenv").config();
const connectDB = require('./models/dbconnect');

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  const server = http.createServer(app);

  server.listen(PORT, () => {
    console.log(` Server is running at http://localhost:${PORT}`);
  });
});
