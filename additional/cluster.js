const cluster = require("cluster");
const http = require("http");
const numOfCpus = require("os").cpus().length;

if (cluster.isMaster) {
  console.log(`This is the master process with pid: ${process.pid}`);
  for (let i = 0; i < numOfCpus; i++) {
    cluster.fork();
  }
} else {
  console.log(`This is the worker process with pid: ${process.pid}`);
  http
    .createServer((req, res) => {
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          port: 3000,
          processId: process.pid,
        })
      );
    })
    .listen(3000);
}
